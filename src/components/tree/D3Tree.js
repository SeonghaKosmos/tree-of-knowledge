import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom'
import { treeEditUpdates, useResourceIconGraphicsManager } from '../../hooks/resource-icon/use-resource-icon-graphics-manager';
import styles from '../tree.module.css'
import React from 'react';
import PositionReferenceContainer from './PositionReferenceContainer';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getRenderedDimensions } from '../../util/DimensionsLogic';
import { renderedDimensionsActions } from '../../store/store';
import { getRelativePositionOfElementInContainer, setTreePosition, treeContainerGPosition } from '../../util/positionManager';
import { positionEvalInhibitor } from '../resource-related/ResourceIcon';
import './d3Tree.css'





function D3Tree(props) {

    //clear resource Icon state
    const resourceIconsActions = useResourceIconGraphicsManager()
    //cancel tree shading


    // console.log('rendering D3Tree')
    const nodeHeight = props.nodeHeight + 2 * props.nodePadding
    const nodeWidth = props.nodeWidth + 2 * props.nodePadding

    const standardNodeDimensions = {
        nodeWidth,
        nodeHeight
    }



    const [originNodeWidth, originNodeHeight,
        rootNodeWidth, rootNodeHeight,
        treeScale] = useSelector((state) => [
            state.dimensions.originNodeWidth,
            state.dimensions.originNodeHeight,
            state.dimensions.rootNodeWidth,
            state.dimensions.rootNodeHeight,
            state.scale.treeScale], shallowEqual)

    function getNodeDimensionsByName(name) {
        if (name === 'Origin') {
            return {
                nodeWidth: originNodeWidth,
                nodeHeight: originNodeHeight
            }
        } else if (name === 'Root') {
            return {
                nodeWidth: rootNodeWidth,
                nodeHeight: rootNodeHeight
            }
        }
        return standardNodeDimensions
    }



    function getCoords(d, nodeData) {

        // console.log(`init: ${nodeData.nodeWidth}, ${nodeData.nodeHeight}`)
        let yCoord = props.treeHeight - d.y + nodeHeight / 2//invert (bottom to top) and add space for first node 

        //for links
        if (!nodeData.nodeWidth) {
            return { y: yCoord }
        }


        const xCoord = d.x - nodeData.nodeWidth / 2//center
        yCoord = yCoord - nodeData.nodeHeight / 2 //center 
        // console.log(`final: ${xCoord}, ${yCoord}`)
        return {
            x: xCoord,
            y: yCoord
        }


    }







    let runD3 = useRef(false)
    let rundD3Complete = useRef(false)
    const [reRenderTrigger, setReRenderTrigger] = useState({})


    function updateD3RunRefs() {

        // console.log('before update:')
        // console.log(`runD3: ${runD3.current}`)
        // console.log(`runD3Complete: ${rundD3Complete.current}`)

        if (rundD3Complete.current) {
            runD3.current = false
            rundD3Complete.current = false //reset to initial state
        } else {
            runD3.current = true
        }

        // console.log('after update:')
        // console.log(`runD3: ${runD3.current}`)
        // console.log(`runD3Complete: ${rundD3Complete.current}`)

    }



    function generateTreeData() {
        const treeLayout = d3.tree()
            .size([props.treeWidth, props.treeHeight])
            .separation(() => 2)

        const root = d3.hierarchy(props.data)

        treeLayout(root)

        return root
    }

    const root = useRef(generateTreeData())



    function createOrUpdateLinks() {
        d3.select(`svg #${props.linksGId}`)
            .selectAll('line.link')
            .data(root.current.links())
            .join('line')
            .classed(`link ${props.linkClass}`, true)
            .attr('x1', function (d) { return d.source.x; })
            .attr('y1', function (d) { return getCoords(d.source, { nodeHeight }).y; })
            .attr('x2', function (d) { return d.target.x; })
            .attr('y2', function (d) {
                return getCoords(d.target, { nodeHeight }).y;
            })
            .attr('data-sourceID', (d) => {
                return `${d.source.data.id}`
            })
            .attr('data-targetID', (d) => {
                return `${d.target.data.id}`
            })
    }


    const dispatch = useDispatch()

    useEffect(() => { //create tree

        if (runD3.current) {
            // console.log(descendants)
            // descendants = descendants.filter(descendant =>
            //     descendant.data.name != 'Root')
            // console.log(descendants)

            //nodes
            d3.select(`svg #${props.nodesGId}`)
                .selectAll(`g.${styles.node}`)
                .data(root.current.descendants())
                .join('g')
                .classed(`${styles.node}`, true)
                .attr('transform', function (d) {
                    //smaller g for origin node
                    const coords = getCoords(d, getNodeDimensionsByName(d.data.name))
                    return `translate(${coords.x}, ${coords.y})`
                })
                .attr('id', (d) => {
                    return d.data.id
                })
                .call(d3.drag().on('drag', (event) => {
                    d3.select(`#${event.subject.data.id}`)
                        .attr('transform', function (d) {

                            const { x: prevTreeX, y: prevTreeY } = treeContainerGPosition
                            const { x: treeX, y: treeY } = getRelativePositionOfElementInContainer(document.getElementById('treeOfKnowledgeContainerRoot'), document.getElementById(props.containerGId))
                            setTreePosition(treeX, treeY)
                            // console.log("treepos:", treeX, treeY)

                            const treePosDx = (treeX - prevTreeX) == 0 ? event.dx : 0
                            const treePosDy = (treeY - prevTreeY) == 0 ? event.dy : 0

                            const isTreePosChanged = treeX - prevTreeX != 0 || treeY - prevTreeY != 0

                            // console.log("isTreePosChanged:", isTreePosChanged)
                            // console.log(document.getElementById('treeContainerG').getBoundingClientRect())
                            d.x += event.dx
                            d.y -= event.dy
                            createOrUpdateLinks()
                            // positionEvalInhibitor.val = true
                            // treeEditUpdates(event.dx, event.dy, d.data.id, isTreePosChanged)
                            const coords = getCoords(d, getNodeDimensionsByName(d.data.name))

                            // console.log(getRenderedDimensions(document.getElementById(props.containerGId), treeScale))
                            return `translate(${coords.x}, ${coords.y})`

                        })

                    // const renderedTreeDims = getRenderedDimensions(document.getElementById('treeContainerG'), treeScale)
                    // console.log(renderedTreeDims)
                    // dispatch(renderedDimensionsActions.setTreeDimensions({
                    //     width: renderedTreeDims.width,
                    //     height: renderedTreeDims.height
                    //   }))
                }))

            // Links
            createOrUpdateLinks()

            rundD3Complete.current = true
            setReRenderTrigger({})

            // console.log('d3 complete')
        }

    })



    const NodeComponent = props.nodeComponentFunc
    return (
        <>
            {/* tree template */}
            <svg id={props.containerSvgId} >
                <g id={props.containerGId} scale={treeScale}>
                    <svg id="positionReferenceContainer"></svg>
                    <g id='opacityControlG'>
                        <g id={props.linksGId} />
                        <g id={props.nodesGId} />
                    </g>
                    {/* add connection lines container if id available */}
                    <g id={'overLaidElementsContainer'}>
                        <g id={'resourceConnectionLinesContainer'} />
                        <g id={'resourceIconsContainer'} />
                    </g>
                    <PositionReferenceContainer />
                </g>
            </svg>
            {/* fill tree */}
            {rundD3Complete.current && root.current.descendants().map(descendant => {
                const node = document.getElementById(descendant.data.name)
                runD3.current = false
                // console.log('adding nodes')


                return ReactDOM.createPortal(
                    <NodeComponent
                        data={descendant.data}
                        width={props.nodeWidth}
                        height={props.nodeHeight} />

                    ,

                    document.getElementById(descendant.data.id))

            })}

            {updateD3RunRefs()}
        </>
    )
}
export default React.memo(D3Tree)