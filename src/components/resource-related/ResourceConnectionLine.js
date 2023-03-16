import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import ReactDOM from 'react-dom'
import React, { useEffect, useRef } from "react";
import * as d3 from 'd3'
import { useresourceGraphicsDatumSelector } from "../../hooks/resource-icon/use-resource-icon-graphics-manager";

const ResourceConnectionLineRoot = styled.line.attrs(props => ({
    style: {
        strokeWidth: props.strokeWidth,
    },
  }))`

    fill-rule: evenodd;
    fill: red;
    stroke: rgb(115, 213, 240);
    filter: brightness(120%);
    
`

function ResourceConnectionLine(props) {
    console.log('rendering ResourceConnectionLine')
    const resourceGraphicsDatum1 = useresourceGraphicsDatumSelector(props.resource1.id)
    const resourceGraphicsDatum2 = useresourceGraphicsDatumSelector(props.resource2.id)


    const [visionScale, scale] = useSelector(
        state => [state.zoom.visionScale,
        state.zoom.scale]

        , shallowEqual)

    const strokeWidth = 3 / scale


    const x1 = resourceGraphicsDatum1.variables.current.position.center.x
    const y1 = resourceGraphicsDatum1.variables.current.position.center.y
    const x2 = resourceGraphicsDatum2.variables.current.position.center.x
    const y2 = resourceGraphicsDatum2.variables.current.position.center.y
    
    const id= 'resourceConnectionLine-'+resourceGraphicsDatum1.thisResource.id+'-'+resourceGraphicsDatum2.thisResource.id


    const isRunAnimation = useRef(true)
    useEffect(()=>{
        if (isRunAnimation.current){
            d3.select(`#${id}`)
            .transition()
            .duration(200)
            .attr('x2', x2)
            .attr('y2', y2)
        }

        return () => isRunAnimation.current = false

    })

    return (
        <>
            {ReactDOM.createPortal(
                <ResourceConnectionLineRoot
                    id={id}
                    className="resourceConnectionLine"
                    // points={`${x1},${y1} ${x2},${y2}`}
                    x1={x1}
                    x2={isRunAnimation.current ? x1 : x2}
                    y1={y1}
                    y2={isRunAnimation.current ? y1 : y2}
                    strokeWidth={strokeWidth}
                >
                    {/* <animate
                        attributeName="x2"
                        from={x1}
                        to={x2}
                        dur="0.2s" />
                    <animate
                        attributeName="y2"
                        from={y1}
                        to={y2}
                        dur="0.2s" /> */}
                </ResourceConnectionLineRoot>
                , document.getElementById('resourceConnectionLinesContainer')
            )}
        </>
    )
}
export default ResourceConnectionLine


// x1={x1} 
// y1={y1} 
// x2={x2} 
// y2={y2}