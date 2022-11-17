import { useEffect } from "react"
import * as d3 from 'd3'
import { useDispatch, useSelector } from "react-redux"
import { zoomSliceActions } from "../store/store"
import { isInEdge, setEdge } from "../util/EdgeLogic";


let broadCaster = setTimeout(()=>{}, 1);


const useZoom = (eventSourceId, applyZoomTargetId, renderedTreeWidth, renderedTreeHeight) => {

    const dispatch = useDispatch()
    
    function broadCastScale(e){

      clearTimeout(broadCaster)
      broadCaster = setTimeout(() => {
        console.log(`current tree scale: ${e.transform.k}`) 
      }, 100)
      
    }

    const zoomableScreenWidth = useSelector(state => state.renderedDimensions.zoomableScreenWidth)
    const zoomableScreenHeight = useSelector(state => state.renderedDimensions.zoomableScreenHeight)
    console.log(zoomableScreenWidth, zoomableScreenHeight)
    setEdge(zoomableScreenWidth, zoomableScreenHeight)
    
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
      

      let zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on('zoom', handleZoom)
        .translateExtent([[0,0], [renderedTreeWidth * 1.3, renderedTreeHeight]])

      zoomEventSourceContainer.call(zoom)


      //hover navigation


      const zoomWindow = document.getElementById(eventSourceId)
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

    }, [renderedTreeWidth, renderedTreeHeight])
    

}

export default useZoom