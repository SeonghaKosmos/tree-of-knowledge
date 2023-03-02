import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom'
import { connectedResourceGraphicsDataIdsGlobal, getGraphicsDataFromIds, treeEditUpdates, updateConnectedResourceIconPositions, updateResourceIconPositions, useResourceIconGraphicsManager } from '../../hooks/resource-icon/use-resource-icon-graphics-manager';
import styles from '../tree.module.css'
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Resource from '../../util/Resource';
import D3TreeFiller from './D3TreeFiller';





function D3Tree(props) {

    //clear resource Icon state
    // const resourceIconsActions = useResourceIconGraphicsManager()
    //cancel tree shading


    console.log('rendering D3Tree')
    const nodeHeight = props.nodeHeight + 2 * props.nodePadding
    const nodeWidth = props.nodeWidth + 2 * props.nodePadding

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


    function createBushNodes() {
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

                        d.x += event.dx
                        d.y -= event.dy


                        createOrUpdateLinks()
                        const bushResourceIds = Resource.getIdList(d.data.resources)
                        updateResourceIconPositions(bushResourceIds)
                        // if (event.type === 'end'){
                        //     //update resource position at the end of drag
                        //     updateConnectedResourceIconPositions()
                        // }

                        const coords = getCoords(d, getNodeDimensionsByName(d.data.name))
                        return `translate(${coords.x}, ${coords.y})`

                    })

            }))
    }




    // Links

    useEffect(() => {
        createBushNodes()
        createOrUpdateLinks()
    })





    

    return (
        <>
            <svg id={props.containerSvgId} className={`${styles.treeContainerSvg} zoom-in-cursor`} width={props.treeWidth} height={props.treeHeight}>
                <g id={props.containerGId} scale={props.treeScale}>
                    <svg id={props.positionReferenceContainerId}></svg>
                    <g id={props.opacityControlGId}>
                        <g id={props.linksGId} />
                        <g id={props.nodesGId} />
                    </g>
                    {/* add connection lines container if id available */}
                    <g className={props.overLaidElementsContainerId}>
                        <g id={props.resourceConnectionLinesContainerId} />
                        <g id={props.resourceIconsContainerId} />
                    </g>
                </g>
            </svg>

            <D3TreeFiller
                descendants={root.current.descendants()}
                nodeWidth={props.nodeWidth}
                nodeHeight={props.nodeHeight}
                nodeComponentFunc={props.nodeComponentFunc}/>
        </>
    )
}
export default React.memo(D3Tree)