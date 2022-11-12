import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import ReactDOM from 'react-dom'
import React from "react";
import { useResourceDatumSelector } from "../../hooks/use-resource-icons-data-manager";

const ResourceConnectionLineRoot = styled.polyline`

    fill-rule: evenodd;
    fill: red;
    stroke: rgb(26, 204, 204);
    stroke-width: 3px;
    
`

function ResourceConnectionLine(props){
    // console.log('rendering ResourceConnectionLine')
    const resourceDatum1 = useResourceDatumSelector(props.resource1.id)
    const resourceDatum2 = useResourceDatumSelector(props.resource2.id)

    const scale = useSelector((state) => 
    state.scale.treeScale, shallowEqual)

    const resourceConnectionLinesContainerId = useSelector((state) => 
        state.importantElementIds.resourceConnectionLinesContainerId, shallowEqual)
    
    const x1 = resourceDatum1.variables.current.absoluteCenterPosition.x
    const y1 = resourceDatum1.variables.current.absoluteCenterPosition.y
    const x2 = resourceDatum2.variables.current.absoluteCenterPosition.x
    const y2 = resourceDatum2.variables.current.absoluteCenterPosition.y


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