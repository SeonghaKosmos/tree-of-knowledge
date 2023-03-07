import { isInEdge, getTranslateXYRatio, edgeHoverDetectingContainer } from "./EdgeHoverPanLogic";
import * as d3 from 'd3'




export default function setupEdgeHoverPan(zoomEventSourceId, zoom) {
    const zoomEventSourceContainer = d3.select(`#${zoomEventSourceId}`)

    const zoomWindow = document.getElementById(zoomEventSourceId)
    const zoomWindowRect = zoomWindow.getBoundingClientRect()


    function translationStep(zoomWindowMouseEventX, zoomWindowMouseEventY) {
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

        if (isInEdge(event.x, event.y)) {            
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
