import { useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import styled from "styled-components";
import { useResourceIconStyle } from "../../hooks/resource-icon/use-resource-icon-style";
import { getRelativePositionOfElementInContainer, isResourcePositionReevaluationPossibleGlobal } from "../../util/positionManager";
import ResourceConnectionLine from "./ResourceConnectionLine";
import React from "react";
import ReactDOM from "react-dom";
import { useResourceIconGraphicsManager } from "../../hooks/resource-icon/use-resource-icon-graphics-manager";
import { scale } from "../../store/visuals/zoomSlice";
import './ResourceIcon.css'
import { allCreatedResources, Resource } from "../../util/Resource";

export const positionEvalInhibitor = { val: false }

const ResourceIconRoot = styled.div`
    width: ${props => (`${props.width}px`)};
    height: ${props => (`${props.height}px`)}; 
    scale: ${props => (props.scale)};

`








function ResourceIcon(props) {

    console.log('rendering ResourceIcon')

    //<graphics datum>
    const [resourceGraphicsDatum, graphicsDatumActions, visionScale] = useResourceIconGraphicsManager(props.resource)
    const isConnected = resourceGraphicsDatum.state.isConnected
    const isConnectionLinesVisible = resourceGraphicsDatum.state.isConnectionLinesVisible
    //<graphics datum>



    //<styles>
    // const [width, height, treeScale] =
    //     useSelector((state) =>
    //         [state.dimensions.resourceWidth,
    //         state.dimensions.resourceHeight,
    //         state.scale.treeScale], shallowEqual)


    const [width, height, treeScale, scale] =
        useSelector((state) =>
            [state.dimensions.resourceWidth,
            state.dimensions.resourceHeight,
            state.scale.treeScale,
            state.zoom.scale], shallowEqual)


    const resourceIconScale = useSelector((state) => state.scale[visionScale].resourceIconScale, shallowEqual)
    const styleClasses = useResourceIconStyle(resourceGraphicsDatum)
    //</styles>

    //<element ids>
    const positionReferenceContainer = document.getElementById('positionReferenceContainer')
    const resourceIconsContainer = document.getElementById('resourceIconsContainer')
    //</element ids>


    //position reevaluation
    useEffect(() => {
        //report the position of resource
        // console.log('report position triggered')
        if (resourceGraphicsDatum.variables.isResourcePositionReevaluationPossible || isConnected) { //reevaluate position of connected rerendered icons




            // console.log('%creporting icon position', 'color:green')


            let relativePosition

            if (isConnected) {
                relativePosition = getRelativePositionOfElementInContainer(
                    positionReferenceContainer,
                    document.getElementById(`placeholder_${props.resource.id}`)
                )
            } else { //use dummy for position if resource itself at overlay container
                relativePosition = getRelativePositionOfElementInContainer(
                    positionReferenceContainer,
                    document.getElementById(props.resource.id)
                )
            }




            relativePosition.x /= scale
            relativePosition.y /= scale

            // console.log(relativePosition)

            let topLeftPosition
            if (resourceIconScale < 1) {
                topLeftPosition = {
                    //icon scale places the shrunk icon at the center of original icon
                    //global scale shrinks x, y by itself
                    x: (relativePosition.x - treeScale * (width - resourceIconScale * width) / 2) / treeScale,
                    y: (relativePosition.y - treeScale * (height - resourceIconScale * height) / 2) / treeScale

                }
            } else {
                topLeftPosition = {
                    x: relativePosition.x / treeScale,
                    y: relativePosition.y / treeScale
                }
            }

            const centerPosition = {
                x: (relativePosition.x + width * treeScale * resourceIconScale / 2) / treeScale,
                y: (relativePosition.y + height * treeScale * resourceIconScale / 2) / treeScale
            }

            // console.log('relativePosition: ', relativePosition)
            // console.log('referencePos: ', positionReferenceContainer.getBoundingClientRect())
            // if (isConnected){
            //     console.log('icon pos: ', document.getElementById(`placeholder_${props.resource.id}`).getBoundingClientRect())
            // }

            graphicsDatumActions.storeAbsolutePosition(topLeftPosition, centerPosition)
            // console.log(topLeftPosition)
            // console.log(document.getElementById(props.resource.id))
            graphicsDatumActions.setIsResourcePositionReevaluationPossible(false)

            //no delay

        }

        // resourceGraphicsDatum.state.delayLightUpStyle = false


    })

    const onClick = (event) => {
        // console.log('clicked')
        graphicsDatumActions.setIsConnected(!isConnected)
        event.stopPropagation()
    }


    const onMouseEnter = (event) => {
        graphicsDatumActions.updateConnectedResourceIconPositions()
    }






    const resourceIcon =
        <ResourceIconRoot
            className={`resourceIcon ${styleClasses.join(' ')}`}
            id={props.resource.id}
            width={width}
            height={height}
            scale={resourceIconScale}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
        >

            {props.resource.name}
        </ResourceIconRoot>

    // console.log('current topleft: ', resourceGraphicsDatum.variables.current.position.topLeft)
    // if (props.resource.id === 'dachem'){
    //     // console.log('treecontainerg: ',positionReferenceContainer.getBoundingClientRect())
    //     // console.log('resourceicon: ',document.getElementById(props.resource.id).getBoundingClientRect())
    //     console.log('resource datum: ',resourceGraphicsData['dachem'].variables.current.position.bushScale)
    // }

    return (

        <>
            {/* show connection lines if connected and is the source (showconnected = true)*/}
            {(isConnected && isConnectionLinesVisible) && props.resource.connections.map((connectedResourceId) => {
                return <ResourceConnectionLine
                    resource1={props.resource}
                    resource2={allCreatedResources[connectedResourceId]} /> //draw line between this resource and connected resource
            })}

            {/* show resourceIcon in original place if not connected */}
            {!isConnected && resourceIcon}

            {/* show resourceIcon in treeOverlayElementsContainer 
            and leave dummy if connected */}
            {isConnected && ReactDOM.createPortal(
                <foreignObject
                    className="resourceIconForeignObject"
                    id={`resourceIconForeignObject${props.resource.id}`}
                    width={width}
                    height={height}
                    x={resourceGraphicsDatum.variables.current.position.topLeft.x}
                    y={resourceGraphicsDatum.variables.current.position.topLeft.y}>

                    {resourceIcon}

                </foreignObject>,

                resourceIconsContainer
            )}
            {isConnected && <ResourceIconRoot
                id={`placeholder_${props.resource.id}`}
                width={width}
                height={height}
                scale={resourceIconScale}
                backgroundColor={'transparent'} />
            }

        </>

    )
}
export default React.memo(ResourceIcon)


