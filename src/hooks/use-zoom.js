import { useEffect } from "react"
import * as d3 from 'd3'
import { useDispatch } from "react-redux"
import { zoomSliceActions } from "../store/store"


let broadCaster = setTimeout(()=>{}, 1);


const useZoom = (inputSourceId, applyZoomTargetId, renderedTreeWidth, renderedTreeHeight) => {

    const dispatch = useDispatch()
    
    function broadCastScale(e){

      clearTimeout(broadCaster)
      broadCaster = setTimeout(() => {
        console.log(`current tree scale: ${e.transform.k}`) 
      }, 100)
      
    }
    
    useEffect(() => {
      //set zoom behavior
      const handleZoom = (e) => {
        //update scale
        dispatch(zoomSliceActions.setScale(e.transform.k))

        broadCastScale(e)
        // document.getElementById(inputSourceId).style.transform = 
        // `translate(${e.transform.x}px, ${e.transform.x}px) scale(${e.transform.k})`

        d3.select(inputSourceId)
          .attr('transform', e.transform)
      }
      

      let zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on('zoom', handleZoom)
        .translateExtent([[0,0], [renderedTreeWidth * 1.3, renderedTreeHeight]])

      
      d3.select(applyZoomTargetId)
        .call(zoom)
    }, [renderedTreeWidth, renderedTreeHeight])
    

}

export default useZoom