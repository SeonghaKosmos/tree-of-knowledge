import { useEffect } from "react";
import { isInEdge, setEdge } from "../util/EdgeLogic";
import * as d3 from 'd3'
import { useSelector } from "react-redux";


export default function useEdgeMouseTreeNavigation(zoomEventSourceId){

    const zoomableScreenWidth = useSelector(state => state.renderedDimensions.zoomableScreenWidth)
    const zoomableScreenHeight = useSelector(state => state.renderedDimensions.zoomableScreenHeight)
    setEdge(zoomableScreenWidth, zoomableScreenHeight)
    

    useEffect(() => {
        const zoomEventSourceContainer = d3.select(`#${zoomEventSourceId}`) 

        const zoomWindow = document.getElementById(zoomEventSourceId)
        const zoomWindowRect = zoomWindow.getBoundingClientRect()
        const zoomWindowX = zoomWindowRect.x
        const zoomWindowY = zoomWindowRect.y
  
  
        const handleHoveringMappDrag = (event) => {
  
          const zoomWindowMouseEventX = event.x - zoomWindowX
          const zoomWindowMouseEventY = event.y - zoomWindowY
          if (isInEdge(zoomWindowMouseEventX, zoomWindowMouseEventY)){
            console.log('in edge')
          }
          // console.log(zoomWindowMouseEventX, zoomWindowMouseEventY)
        }


        zoomEventSourceContainer.on('mousemove', handleHoveringMappDrag)
    })

}