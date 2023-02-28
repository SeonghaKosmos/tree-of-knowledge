import { isInEdge, getTranslateXYRatio, edgeHoverDetectingContainer } from "../util/EdgeHoverPanLogic";
import { getScaleFromTransformString, getTranslateFromTransformString } from "../util/d3Related";
import * as d3 from 'd3'


export function useEdgeHoverPan(){

    return function setupEdgeHoverPan (zoomEventSourceId, zoom){
        const zoomEventSourceContainer = d3.select(`#${zoomEventSourceId}`) 
        console.log(zoomEventSourceContainer)

        const zoomWindow = document.getElementById(zoomEventSourceId)
        const zoomWindowRect = zoomWindow.getBoundingClientRect()
        const zoomWindowX = zoomWindowRect.x
        const zoomWindowY = zoomWindowRect.y

        
        function translationStep(zoomWindowMouseEventX, zoomWindowMouseEventY){
        const 
            translateRatio = getTranslateXYRatio(zoomWindowMouseEventX, zoomWindowMouseEventY)
            // console.log(translateRatio)
            // console.log(translateRatio.x, translateRatio.y)
            zoomEventSourceContainer
            .transition()
            .duration(0)
            .call(zoom.translateBy, translateRatio.x, translateRatio.y)
            // zoomActionTargetContainer.attr('transform',
            // `translate(${newTranslate.x}, ${newTranslate.y}) scale(${currentScale})`)
        }


        let translateIntervalId
        const handleHoveringMappDrag = (event) => {
        
            // console.log('hovering')
            clearInterval(translateIntervalId)

            if (isInEdge(event.x, event.y)){
            //continue moving even when mouse is not moving
            translateIntervalId = setInterval(
                () => translationStep(event.x, event.y)
                , 1)


            }

        }

        const handleMouseLeave = () => {
            console.log('clearing interval')
            clearInterval(translateIntervalId)
        }


        const edgeHoverDetector = d3.select(`#${edgeHoverDetectingContainer.id}`)
        edgeHoverDetector
        .on('mousemove', handleHoveringMappDrag)
        .on('mouseleave', handleMouseLeave)


    }

    

}
      