import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import ReactDOM from 'react-dom'
import React from "react";
import { useresourceGraphicsDatumSelector } from "../../hooks/resource-icon/use-resource-icon-graphics-manager";

const ResourceConnectionLineRoot = styled.polyline`

    fill-rule: evenodd;
    fill: red;
    stroke: rgb(115, 213, 240);
    filter: brightness(120%);
    stroke-width: ${props => `${props.strokeWidth}px`};
    
`

function ResourceConnectionLine(props){
    console.log('rendering ResourceConnectionLine')
    const resourceGraphicsDatum1 = useresourceGraphicsDatumSelector(props.resource1.id)
    const resourceGraphicsDatum2 = useresourceGraphicsDatumSelector(props.resource2.id)

    
    const visionScale = useSelector(state => state.zoom.visionScale, shallowEqual)
    const zoomScale = useSelector(state => state.zoom.scale, shallowEqual)
    const strokeWidth = 3 / zoomScale

    const treeOverlayElementsContainerId = useSelector((state) => 
        state.importantElementIds.treeOverlayElementsContainerId, shallowEqual)
    
    const x1 = resourceGraphicsDatum1.variables.current.position[visionScale].center.x
    const y1 = resourceGraphicsDatum1.variables.current.position[visionScale].center.y
    const x2 = resourceGraphicsDatum2.variables.current.position[visionScale].center.x
    const y2 = resourceGraphicsDatum2.variables.current.position[visionScale].center.y


    return(
        <>
            {ReactDOM.createPortal(
                <ResourceConnectionLineRoot 
                    className="resourceConnectionLine" 
                    points={`${x1},${y1} ${x2},${y2}`}
                    strokeWidth={strokeWidth}
                />
                , document.getElementById('treeContainerG')
            )}
        </>
    )
}
export default ResourceConnectionLine


// x1={x1} 
// y1={y1} 
// x2={x2} 
// y2={y2}