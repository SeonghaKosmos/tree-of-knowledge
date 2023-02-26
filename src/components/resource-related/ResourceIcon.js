import { useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import styled from "styled-components";
import { useResourceIconStyle } from "../../hooks/resource-icon/use-resource-icon-style";
import { getRelativePositionOfElementInContainer, isResourcePositionReevaluationPossible, isResourcePositionsStabilized, setIsResourcePositionReevaluationPossible } from "../../util/positionManager";
import ResourceConnectionLine from "./ResourceConnectionLine";
import React from "react";
import ReactDOM from "react-dom";
import { resourceGraphicsData, useResourceIconGraphicsManager } from "../../hooks/resource-icon/use-resource-icon-graphics-manager";
import { scale } from "../../store/visuals/zoomSlice";


export const positionEvalInhibitor = {val:false}

const ResourceIconRoot = styled.div`
    width: ${props => (`${props.width}px`)};
    height: ${props => (`${props.height}px`)}; 
    scale: ${props => (props.scale)};

    font-size: 6px;
    padding-top: 0.2em;
    text-align:center;
    filter: brightness(${props => (props.brightness)});
    background-color: ${props => (props.backgroundColor)};
    /* background-color: rgb(235, 75, 75); */
    color: black;

    border-radius: ${props => (props.borderRadius)};
    color: ${props => (props.color)};

    pointer-events: auto;

`








function ResourceIcon(props){

    console.log('rendering ResourceIcon')

    //<graphics datum>
    const [resourceGraphicsDatum, graphicsDatumActions, visionScale] = useResourceIconGraphicsManager(props.resource)
    const isConnected = resourceGraphicsDatum.state.isConnected
    const isConnectionLinesVisible = resourceGraphicsDatum.state.isConnectionLinesVisible
    //<graphics datum>



    //<styles>
    const [width, height, treeScale, scale] = 
        useSelector((state) => 
            [state.dimensions.resourceWidth, 
            state.dimensions.resourceHeight,
            state.scale.treeScale,
            state.zoom.scale], shallowEqual)
    
    const theScale = scale.val

    const resourceIconScale = props.scale
    
    const [borderRadius, color] = useResourceIconStyle()

    const brightness = isConnected ? '130%' : 'inherit'
    const backgroundColor = isConnected ? '#f15125' : '#f07655'
    //</styles>

    //<element ids>
    const positionReferenceContainer = document.getElementById('positionReferenceContainer')
    const resourceIconsContainer = document.getElementById('treeContainerG')
    const placeHolder = <svg width={width} height={height}/>
    //</element ids>


    //position reevaluation
    useEffect(()=>{
        //report the position of resource
        // console.log('report position triggered')
        if (isResourcePositionReevaluationPossible()){
            


            console.log('reporting icon position')

            let relativePosition

            if (isConnected){
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
            if (resourceIconScale < 1){
                topLeftPosition = {
                    //icon scale places shrunk icon at the center of original icon
                    //global scale shrinks x, y by itself
                    x: (relativePosition.x - treeScale*(width - resourceIconScale*width)/2) / treeScale,
                    y: (relativePosition.y - treeScale*(height - resourceIconScale*height)/2) / treeScale
    
                }
            } else{
                topLeftPosition = {
                    x: relativePosition.x / treeScale,
                    y: relativePosition.y / treeScale
                }
            }

            const centerPosition = {
                x: (relativePosition.x + width*treeScale*resourceIconScale/2) / treeScale,
                y: (relativePosition.y + height*treeScale*resourceIconScale/2) /treeScale
            }

            // console.log(position.x)
            // console.log(position.y)
            graphicsDatumActions.CheckPositionsAreUnchanged(topLeftPosition, centerPosition)

            // console.log(props.resource.id)
            // console.log(document.getElementById('treeContainerSvg'))
            if (!isResourcePositionsStabilized() && !positionEvalInhibitor.val){
                // console.log(relativePosition)
                // console.log(resourceGraphicsData)
                graphicsDatumActions.storeAbsolutePosition(topLeftPosition, centerPosition)
            }

        }

      
    })

    const onClick = (event) => {
        // console.log('clicked')
        graphicsDatumActions.setIsConnected(!isConnected)
        event.stopPropagation()
    }


    
    const resourceIcon = 
    <ResourceIconRoot
        id={props.resource.id}
        width={width} 
        height={height} 
        scale={props.scale}
        borderRadius={borderRadius}
        color={color}
        backgroundColor={backgroundColor}
        brightness = {brightness}
        onClick={onClick}
        >

        {props.resource.name}
    </ResourceIconRoot>


    // if (props.resource.id === 'dachem'){
    //     // console.log('treecontainerg: ',positionReferenceContainer.getBoundingClientRect())
    //     // console.log('resourceicon: ',document.getElementById(props.resource.id).getBoundingClientRect())
    //     console.log('resource datum: ',resourceGraphicsData['dachem'].variables.current.position.bushScale)
    // }

    return(
        
        <>
            {/* show connection lines if connected and is the source (showconnected = true)*/}
            {(isConnected && isConnectionLinesVisible) && props.resource.connections.map((connectedResource)=>{
                return <ResourceConnectionLine
                    resource1={props.resource}
                    resource2={connectedResource}/> //draw line between this resource and connected resource
            })}

            {/* show resourceIcon in original place if not connected */}
            {!isConnected && resourceIcon}

            {/* show resourceIcon in treeOverlayElementsContainer 
            and leave dummy if connected */}
            {isConnected && ReactDOM.createPortal( 
                <foreignObject 
                width={width} 
                height={height} 
                x={resourceGraphicsDatum.variables.current.position[visionScale].topLeft.x}
                y={resourceGraphicsDatum.variables.current.position[visionScale].topLeft.y}>

                    {resourceIcon}

                </foreignObject>,

                resourceIconsContainer
            )}
            {isConnected && <ResourceIconRoot
                id={`placeholder_${props.resource.id}`}
                width={width} 
                height={height} 
                scale={props.scale}
                backgroundColor={'transparent'}/>
            }

        </>
        
    )
}
export default React.memo(ResourceIcon)


