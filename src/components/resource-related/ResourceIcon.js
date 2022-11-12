import { useEffect, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import styled from "styled-components";
import { useResourceIconStyle } from "../../hooks/use-resource-icon-style";
import { getRelativePositionOfElementInContainer } from "../../util/relativePositionManager";
import ResourceConnectionLine from "./ResourceConnectionLine";
import React from "react";
import ReactDOM from "react-dom";
import {useResourceIconsDataManager} from "../../hooks/use-resource-icons-data-manager";


const ResourceIconRoot = styled.div`
    width: ${props => (`${props.width}px`)};
    height: ${props => (`${props.height}px`)}; 
    scale: ${props => (props.scale)};

    font-size: 6px;
    padding-top: 0.2em;
    text-align:center;
    background-color: ${props => (props.backgroundColor)};
    color: black;

    border-radius: ${props => (props.borderRadius)};
    color: ${props => (props.color)};

    pointer-events: auto;

`







function ResourceIcon(props){
    console.log('rendering ResourceIcon')

    const [resourceDatum, datumActions] = useResourceIconsDataManager(props.resource)
    const isConnected = resourceDatum.state.isConnected
    const isConnectionLinesVisible = resourceDatum.state.isConnectionLinesVisible
    // console.log(isConnectionVisible)

    const [width, height, scale] = 
        useSelector((state) => 
            [state.dimensions.resourceWidth, 
            state.dimensions.resourceHeight,
            state.scale.treeScale], shallowEqual)
    // const width = 24
    // const height = 30
    
    const [borderRadius, color] = useResourceIconStyle()
    // const borderRadius = '50%'
    // const color = 'red'
    const backgroundColor = isConnected ? 'crimson' : 'rgb(235, 75, 75)'

    const [resourceConnectionLinesContainerId, treeContainerGId] = useSelector((state) => 
        [state.importantElementIds.resourceConnectionLinesContainerId, state.importantElementIds.treeContainerG], shallowEqual)


    const resourceConnectionLinesContainer = document.getElementById(resourceConnectionLinesContainerId)
    const treeContainerG = document.getElementById(treeContainerGId)

    // const resourceConnectionLinesContainerId = 'resourceConnectionLinesContainer'
    
    useEffect(()=>{

        //report the position of resource
        const relativePosition = getRelativePositionOfElementInContainer(
            resourceConnectionLinesContainer,
            document.getElementById(props.resource.id)
        )

        const position = {
            x: relativePosition.x / scale,
            y: relativePosition.y / scale
        }

        const centerPosition = {
            x: (relativePosition.x + width*scale/2) / scale,
            y: (relativePosition.y + height*scale/2) /scale
        }

        datumActions.setAbsolutePosition(position)
        datumActions.setAbsoluteCenterPosition(centerPosition)
    })


    // const [showConnections, setShowConnections] = useState(false)
    // const showConnections = false;

    const onClick = () => {

        console.log('clicked')
        datumActions.setIsConnected(!isConnected)
        datumActions.setIsConnectionLinesVisible(!isConnectionLinesVisible)
        datumActions.commitState()
        // setShowConnections(!showConnections)
    }

    const resourceIcon = 
    <ResourceIconRoot
        id={props.resource.id}
        width={width} 
        height={height} 
        scale={props.scale}
        borderRadius={borderRadius}
        color={color}
        backgroundColor = {backgroundColor}
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
                x={resourceDatum.variables.current.absolutePosition.x}
                y={resourceDatum.variables.current.absolutePosition.y}>

                    {resourceIcon}

                </foreignObject>,

                resourceConnectionLinesContainer
            )}
            {isConnected && <div style={{width:width, height:height, backgroundColor: 'transparent'}}/>}

        </>
        
    )
}
export default React.memo(ResourceIcon)


