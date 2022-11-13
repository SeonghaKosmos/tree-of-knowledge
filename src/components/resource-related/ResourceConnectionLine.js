import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import ReactDOM from 'react-dom'
import React from "react";
import { useresourceGraphicsDatumSelector } from "../../hooks/use-resource-icon-graphics-manager";

const ResourceConnectionLineRoot = styled.polyline`

    fill-rule: evenodd;
    fill: red;
    stroke: rgb(64, 153, 255);
    stroke-width: 3px;
    filter: brightness(125%);
    
`

function ResourceConnectionLine(props){
    // console.log('rendering ResourceConnectionLine')
    const resourceGraphicsDatum1 = useresourceGraphicsDatumSelector(props.resource1.id)
    const resourceGraphicsDatum2 = useresourceGraphicsDatumSelector(props.resource2.id)

    const scale = useSelector((state) => 
    state.scale.treeScale, shallowEqual)

    const resourceConnectionLinesContainerId = useSelector((state) => 
        state.importantElementIds.resourceConnectionLinesContainerId, shallowEqual)
    
    const x1 = resourceGraphicsDatum1.variables.current.absoluteCenterPosition.x
    const y1 = resourceGraphicsDatum1.variables.current.absoluteCenterPosition.y
    const x2 = resourceGraphicsDatum2.variables.current.absoluteCenterPosition.x
    const y2 = resourceGraphicsDatum2.variables.current.absoluteCenterPosition.y


    return(
        <>
            {ReactDOM.createPortal(
                <ResourceConnectionLineRoot 
                    className="resourceConnectionLine" 
                    points={`${x1},${y1} ${x2},${y2}`}
                />
                , document.getElementById(resourceConnectionLinesContainerId)
            )}
        </>
    )
}
export default React.memo(ResourceConnectionLine) 


// x1={x1} 
// y1={y1} 
// x2={x2} 
// y2={y2}