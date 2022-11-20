import { isInEdge, getTranslateXYRatio } from "../util/EdgeHoverPanLogic";
import { getScaleFromTransformString, getTranslateFromTransformString } from "../util/d3Related";
import * as d3 from 'd3'



export function setUpHoverPan(zoomEventSourceId, applyZoomTargetId, zoom){


    const zoomEventSourceContainer = d3.select(`#${zoomEventSourceId}`) 
    const zoomActionTargetContainer = d3.select(`#${applyZoomTargetId}`)

    const zoomWindow = document.getElementById(zoomEventSourceId)
    const zoomWindowRect = zoomWindow.getBoundingClientRect()
    const zoomWindowX = zoomWindowRect.x
    const zoomWindowY = zoomWindowRect.y

    
    function translationStep(zoomWindowMouseEventX, zoomWindowMouseEventY){
    const 
        translateRatio = getTranslateXYRatio(zoomWindowMouseEventX, zoomWindowMouseEventY)

        console.log(translateRatio.x, translateRatio.y)
        zoomEventSourceContainer
        // .transition()
        .call(zoom.translateBy, translateRatio.x, translateRatio.y)
        // zoomActionTargetContainer.attr('transform',
        // `translate(${newTranslate.x}, ${newTranslate.y}) scale(${currentScale})`)
    }


    let translateIntervalId
    const handleHoveringMappDrag = (event) => {
    

        clearInterval(translateIntervalId)

        const zoomWindowMouseEventX = event.x - zoomWindowX
        const zoomWindowMouseEventY = event.y - zoomWindowY
        if (isInEdge(zoomWindowMouseEventX, zoomWindowMouseEventY)){

        //continue moving even when mouse is not moving
        translateIntervalId = setInterval(
            () => translationStep(zoomWindowMouseEventX, zoomWindowMouseEventY)
            , 1)


        }

    }

    const handleMouseLeave = () => {
        clearInterval(translateIntervalId)
    }


    zoomEventSourceContainer
    .on('mousemove', handleHoveringMappDrag)
    .on('mouseleave', handleMouseLeave)

}
      