import { useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import styled from "styled-components";
import { useResourceIconStyle } from "../../hooks/use-resource-icon-style";
import { getRelativePositionOfElementInContainer, isReevaluationPossible } from "../../util/relativePositionManager";
import ResourceConnectionLine from "./ResourceConnectionLine";
import React from "react";
import ReactDOM from "react-dom";
import {useResourceIconGraphicsManager} from "../../hooks/use-resource-icon-graphics-manager";
import { positionsActions } from "../../store/store";
import { usePositionsReevaluationTrigger } from "../../hooks/use-positions-reevaluation-trigger";


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
    const [width, height, scale] = 
        useSelector((state) => 
            [state.dimensions.resourceWidth, 
            state.dimensions.resourceHeight,
            state.scale.treeScale], shallowEqual)
    

    const resourceIconScale = props.scale
    
    const [borderRadius, color] = useResourceIconStyle()

    const brightness = isConnected ? '130%' : 'inherit'
    const backgroundColor = isConnected ? '#f15125' : '#f07655'
    //</styles>

    //<element ids>
    const resourceConnectionLinesContainerId = useSelector((state) => 
        state.importantElementIds.resourceConnectionLinesContainerId, shallowEqual)
    const resourceConnectionLinesContainer = document.getElementById(resourceConnectionLinesContainerId)
    //</element ids>

    //reevaluation
    
    useEffect(()=>{

          //report the position of resource
        // console.log('report position triggered')
        if (isReevaluationPossible()){
            console.log('reporting icon position')
            const relativePosition = getRelativePositionOfElementInContainer(
                resourceConnectionLinesContainer,
                document.getElementById(props.resource.id)
            )

            let topLeftPosition
            if (resourceIconScale < 1){
                topLeftPosition = {
                    //icon scale places shrunk icon at the center of original icon
                    //global scale shrinks x, y by itself
                    x: (relativePosition.x - scale*(width - resourceIconScale*width)/2) / scale,
                    y: (relativePosition.y - scale*(height - resourceIconScale*height)/2) / scale
    
                }
            } else{
                topLeftPosition = {
                    x: relativePosition.x / scale,
                    y: relativePosition.y / scale
                }
            }

            const centerPosition = {
                x: (relativePosition.x + width*scale*resourceIconScale/2) / scale,
                y: (relativePosition.y + height*scale*resourceIconScale/2) /scale
            }

            // console.log(position.x)
            // console.log(position.y)
            graphicsDatumActions.storeAbsolutePosition(topLeftPosition, centerPosition)
        }

      
    })
    // [reevaluationTrigger.current]


    // const [showConnections, setShowConnections] = useState(false)
    // const showConnections = false;

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

            {/* show resourceIcon in resourceConnectionLinesContainer 
            and leave dummy if connected */}
            {isConnected && ReactDOM.createPortal( 
                <foreignObject 
                width={width} 
                height={height} 
                x={resourceGraphicsDatum.variables.current.position[visionScale].topLeft.x}
                y={resourceGraphicsDatum.variables.current.position[visionScale].topLeft.y}>

                    {resourceIcon}

                </foreignObject>,

                resourceConnectionLinesContainer
            )}
            {isConnected && <div style={{width:width, height:height, backgroundColor: 'transparent'}}/>}

        </>
        
    )
}
export default React.memo(ResourceIcon)


