import * as d3 from 'd3'
import { useEffect, useRef } from 'react';
import { connectedResourceGraphicsDataIdsGlobal, updateResourceIconPositions } from '../../hooks/resource-icon/use-resource-icon-graphics-manager';
import styles from '../tree.module.css'
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getResourceIdsList } from '../../util/Resource';
import D3TreeFiller from './D3TreeFiller';
import { getBushDragDisplacement, getBushPositionsFromRoot, getRelativePositionOfElementInContainer, getZoomParams } from '../../util/positionManager';
import setupZoom from '../../util/setupZoom';
import setupTree from '../../util/tree/setupTree';
import { repeatSetTimeout } from '../../util/Global';
import { getRenderedDimensions } from '../../util/DimensionsLogic';
import { sendSaveBushPositionsPostReq } from '../../network/requests';



export let motherTreeRootRef
export let motherTreeBushPositions

function D3Tree(props) {



    console.log('rendering D3Tree')



    //tree dimensions
    const treeDimParams = props.treeDimParams
    console.log('treeScale: ',props.treeScale)



    const nodeHeight = treeDimParams.nodeHeight + 2 * treeDimParams.nodePadding
    const nodeWidth = treeDimParams.nodeWidth + 2 * treeDimParams.nodePadding


    const standardNodeDimensions = {
        nodeWidth,
        nodeHeight
    }


    const [originNodeWidth, originNodeHeight,
        rootNodeWidth, rootNodeHeight] = useSelector((state) => [
            state.dimensions.originNodeWidth,
            state.dimensions.originNodeHeight,
            state.dimensions.rootNodeWidth,
            state.dimensions.rootNodeHeight], shallowEqual)

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
        let yCoord = d.y + nodeHeight / 2

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


    function generateTreeData() {
        // console.log(props.hierarchy)
        const treeLayout = d3.tree()
            .size([treeDimParams.treeWidth, treeDimParams.treeHeight])
            .separation(() => 2)

        const root = d3.hierarchy(props.hierarchy)

        treeLayout(root)

        //use loaded bush positions
        if (props.bushPositions) {
            root.descendants().map((node) => {
                const bushPosition = props.bushPositions[node.data.id]
                node.x = bushPosition.x
                node.y = bushPosition.y
            })
        }



        return root
    }


    function invertTreeData(root) {
        root.descendants().map((node) => {
            node.y = treeDimParams.treeHeight - node.y
        })
    }


    const root = generateTreeData()
    if (!props.bushPositions) {
        invertTreeData(root)
    }

    const motherTreeBushPositionsRef = useRef(getBushPositionsFromRoot(root))
    const rootRef = useRef(root)
    if (props.setupTree) {
        motherTreeRootRef = { ...rootRef }
        motherTreeBushPositions = {...motherTreeBushPositionsRef}
    }







    function updateLinePositions() {

        d3.select(`svg #${props.linksGId}`)
            .selectAll('line.link')
            .attr('x1', function (d) { return d.source.x; })
            .attr('y1', function (d) { 
                return getCoords(d.source, { nodeHeight }).y; 
            })
            .attr('x2', function (d) { return d.target.x; })
            .attr('y2', function (d) {
                return getCoords(d.target, { nodeHeight }).y;
            })
    }


    function createLinks() {

        d3.select(`svg #${props.linksGId}`)
            .selectAll('line.link')
            .data(rootRef.current.links())
            .join('line')
            .classed(`link ${props.linkClass}`, true)
            .attr('data-sourceID', (d) => {
                return `${d.source.data.id}`
            })
            .attr('data-targetID', (d) => {
                return `${d.target.data.id}`
            })

        updateLinePositions()



    }


    function onBushDragEnd(){
        const [treeDims, offSets] = getZoomParams({isCentered:false})
        setupZoom(
            {
                eventSourceId: 'treeContainerSvg',
                applyZoomTargetId: 'treeContainerG',
                zoomEventTargetRenderedDims: treeDims,
                offSets
            }

        )



        const bushPositions = getBushPositionsFromRoot(rootRef.current, offSets)
        sendSaveBushPositionsPostReq(bushPositions)
    }


    function updateBushPosition(displacement, d, bushId){
        d.x += displacement.dx
        d.y += displacement.dy

        // console.log(motherTreeBushPositions.current)
        motherTreeBushPositions.current[bushId].x += displacement.dx
        motherTreeBushPositions.current[bushId].y += displacement.dy
    }


    function updateBushPositions(d, event){



        
        if (d.data.id === 'daIdOfRoot'){

            const treeContainerG = document.getElementById('treeContainerG')
            const treeContainerSvg = document.getElementById('treeContainerSvg')

            const treeDims = getRenderedDimensions(treeContainerG, 1)
            const treeContainerGPos = getRelativePositionOfElementInContainer(treeContainerSvg, treeContainerG)


            const bushDisplacement = getBushDragDisplacement(
                treeContainerGPos.x + treeDims.width / 2, treeContainerGPos.y,
                event.dx, event.dy,
                treeDims.width, treeDims.height,
                1)

            motherTreeRootRef.current.descendants()
            .forEach( node => {
                // console.log(node)
                updateBushPosition(bushDisplacement, node, node.data.id)
                updateTreePosition()
            })
        } else {
            const bushDisplacement = getBushDragDisplacement(
                d.x, d.y,
                event.dx, event.dy,
                treeDimParams.nodeWidth, treeDimParams.nodeHeight,
                props.treeScale)

            updateBushPosition(bushDisplacement, d, d.data.id)
        }


    }


    function setupBushDrag(nodesSelection) {
        nodesSelection
            .call(d3.drag().on('drag end', (event) => {
                d3.select(`#${event.subject.data.id}`)
                    .attr('transform', function (d) {
                    
                        updateBushPositions(d, event)
                        updateLinePositions()
                        const bushResourceIds = getResourceIdsList(d.data.resources)
                        updateResourceIconPositions(bushResourceIds)



                        if (event.type === 'end') {
                            onBushDragEnd()
                        }


                        const coords = getCoords(d, getNodeDimensionsByName(d.data.name))
                        return `translate(${coords.x}, ${coords.y})`

                    })

            }))
    }


    function updateNodePositions() {
        d3.select(`svg #${props.nodesGId}`)
            .selectAll(`g.${styles.node}`)
            .attr('transform', function (d) {
                //smaller g for origin node
                const coords = getCoords(d, getNodeDimensionsByName(d.data.name))
                // console.log(d.data.name, d.x, d.y)
                // console.log(d.data.name, coords.x, coords.y)
                // console.log(d.data.name, d)
                return `translate(${coords.x}, ${coords.y})`
            })
    }


    function createBushNodes() {
        const nodesSelection =
            d3.select(`svg #${props.nodesGId}`)
                .selectAll(`g.${styles.node}`)
                .data(rootRef.current.descendants(), (d) => d.data.id)
                .join('g')
                .classed(`${styles.node} drop-shadowed-bush`, true)
                .attr('id', (d) => {
                    return d.data.id
                })

        updateNodePositions()
        if (props.editable) {
            setupBushDrag(nodesSelection)
        }

    }



    const updateTreePosition = () => {
        updateLinePositions()
        updateNodePositions()

    }

    


    function createTree() {
        createBushNodes()
        createLinks()
    }


    const dispatch = useDispatch()


    let afterResizeAnimationTimeout
    const onScreenResize = (event) => {
        updateResourceIconPositions(connectedResourceGraphicsDataIdsGlobal)

        if (afterResizeAnimationTimeout) {
            clearTimeout(afterResizeAnimationTimeout)
        }
        afterResizeAnimationTimeout = repeatSetTimeout(12, 50, () => updateResourceIconPositions(connectedResourceGraphicsDataIdsGlobal))

        setupTree({
            updateTreePositionFunc: updateTreePosition,
            dispatch, 
            bushWidth: treeDimParams.nodeWidth + 2 * treeDimParams.nodePadding
        })

    }



    useEffect(() => {
        createTree()
        window.addEventListener('resize', onScreenResize)
    })







    return (
        <>
            <svg id={props.containerSvgId} className={`${styles.treeContainerSvg} zoom-in-cursor`} width={window.screen.width} height={window.screen.height}>
                <g id={props.containerGId} className={props.fadeIn && 'delayedInvisability'}>
                    <g style={{ scale: 0.7, transform: `scale(${props.treeScale})`, transformOrigin: '0 0' }}>
                        <svg id={props.positionReferenceContainerId}></svg>
                        <g id={props.brightnessControlGId}>
                            <g id={props.linksGId} />
                            <g id={props.nodesGId} />
                        </g>
                        {/* add connection lines container if id available */}
                        <g className={props.overLaidElementsContainerId}>
                            <g id={props.resourceConnectionLinesContainerId} />
                            <g id={props.resourceIconsContainerId} />
                        </g>
                    </g>

                </g>
            </svg>

            <D3TreeFiller
                setupTree={props.setupTree}
                dataRoot={rootRef}
                nodeWidth={treeDimParams.nodeWidth}
                nodeHeight={treeDimParams.nodeHeight}
                nodePadding={treeDimParams.nodePadding}
                updateTreePositionFunc={updateTreePosition}
                nodeComponentFunc={props.nodeComponentFunc} />
        </>
    )
}



D3Tree.defaultProps = {
    setupTree: false,
    editable: false,
    fadeIn: false,
    treeScale: 1,
}



export default React.memo(D3Tree)