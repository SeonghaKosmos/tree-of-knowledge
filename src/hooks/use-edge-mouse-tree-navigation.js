import { useEffect } from "react";
import { isInEdge, configureEdgeHoverNavigationLogic, getTranslateXYRatio } from "../util/EdgeHoverNavigationLogic";
import * as d3 from 'd3'
import { useSelector } from "react-redux";
import { getScaleFromTransformString, getTranslateFromTransformString } from "../util/d3Related";




export default function useEdgeMouseTreeNavigation(zoomEventSourceId, applyZoomTargetId){

    const zoomableScreenWidth = useSelector(state => state.renderedDimensions.zoomableScreenWidth)
    const zoomableScreenHeight = useSelector(state => state.renderedDimensions.zoomableScreenHeight)
    configureEdgeHoverNavigationLogic(zoomableScreenWidth, zoomableScreenHeight, 20)
    

    useEffect(() => {
        const zoomEventSourceContainer = d3.select(`#${zoomEventSourceId}`)

        const zoomWindow = document.getElementById(zoomEventSourceId)
        const zoomWindowRect = zoomWindow.getBoundingClientRect()
        const zoomWindowX = zoomWindowRect.x
        const zoomWindowY = zoomWindowRect.y


        const zoomActionTargetContainer = d3.select(`#${applyZoomTargetId}`) 
        const zoomActionTargetElem = document.getElementById(applyZoomTargetId)
  

        function translationStep(zoomWindowMouseEventX, zoomWindowMouseEventY){
          const 
            translateRatio = getTranslateXYRatio(zoomWindowMouseEventX, zoomWindowMouseEventY),
            currentTransform = zoomActionTargetContainer.attr('transform'),
            currentTranslate = getTranslateFromTransformString(currentTransform)
            

            const currentScale = getScaleFromTransformString(currentTransform)
            console.log(currentScale)

            const newTranslate = {
              x: currentTranslate.x + translateRatio.x*6,
              y: currentTranslate.y + translateRatio.y*6
            }

            
            zoomActionTargetContainer.attr('transform',
            `translate(${newTranslate.x}, ${newTranslate.y}) scale(${currentScale})`)
        }


        let translateIntervalId
        let isTranlateWithinBounds = true
        const handleHoveringMappDrag = (event) => {
          
          if (isTranlateWithinBounds){
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
          // console.log(zoomWindowMouseEventX, zoomWindowMouseEventY)
        }

        const handleMouseLeave = () => {
          clearInterval(translateIntervalId)
        }


        zoomEventSourceContainer
        .on('mousemove', handleHoveringMappDrag)
        .on('mouseleave', handleMouseLeave)

        zoomActionTargetContainer
        .on('mouseenter', ()=>isTranlateWithinBounds = true)
        .on('mouseleave', ()=>{
          clearInterval(translateIntervalId)
          isTranlateWithinBounds = false
        })
        .on('mousemove', () => console.log(isTranlateWithinBounds))
    })

}