import { useEffect } from "react"
import * as d3 from 'd3'
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { zoomSliceActions } from "../store/store"
import {configureEdgeHoverPanLogic} from "../util/EdgeHoverPanLogic";
import { useEdgeHoverPan } from "./use-edge-hover-pan";


let broadCaster = setTimeout(()=>{}, 1);


const useZoom = (eventSourceId, applyZoomTargetId, renderedTreeWidth, renderedTreeHeight) => {


    const setUpEdgeHoverPan = useEdgeHoverPan()
    const maxScale = useSelector((state) => state.zoom.maxScale, shallowEqual)
    console.log('maxScale:',maxScale)
    
    const dispatch = useDispatch()
    // useEdgeMouseTreeNavigation(eventSourceId, applyZoomTargetId, zoom)
    
    function broadCastScale(e){

      clearTimeout(broadCaster)
      broadCaster = setTimeout(() => {
        console.log(`current tree scale: ${e.transform.k}`) 
      }, 100)
      
    }


    const zoomableScreenWidth = useSelector(state => state.renderedDimensions.zoomableScreenWidth)
    const zoomableScreenHeight = useSelector(state => state.renderedDimensions.zoomableScreenHeight)
    configureEdgeHoverPanLogic(zoomableScreenWidth, zoomableScreenHeight, 20)

    useEffect(() => {

      //i.e. zoomWindow
      const zoomEventSourceContainer = d3.select(`#${eventSourceId}`) 
      const zoomActionTargetContainer = d3.select(`#${applyZoomTargetId}`)
      //set zoom behavior
      const handleZoom = (e) => {
        //update scale
        dispatch(zoomSliceActions.setScale(e.transform.k))

        broadCastScale(e)
        // document.getElementById(eventSourceId).style.transform = 
        // `translate(${e.transform.x}px, ${e.transform.x}px) scale(${e.transform.k})`
        zoomActionTargetContainer.attr('transform', e.transform)
      }
      
      const zoom = d3.zoom()
      .scaleExtent([1, maxScale])
      .on('zoom', handleZoom)
      .translateExtent([[0, 0], [renderedTreeWidth * 1.07, renderedTreeHeight]])

      zoomEventSourceContainer.call(zoom)
      //pan
      setUpEdgeHoverPan(eventSourceId, 'hoverPanDetector', zoom)



    }, [renderedTreeWidth, renderedTreeHeight])
    

}

export default useZoom