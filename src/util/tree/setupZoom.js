import * as d3 from 'd3'
import { configureEdgeHoverPanLogic } from "../pan/EdgeHoverPanLogic";
import { setTreeContainerSvgClass } from "../d3Related";
import setupEdgeHoverPan from "../pan/EdgeHoverPan";
import { maxScale } from "../../store/visuals/zoomSlice";
import { zoomSliceActions } from "../../store/store";

let broadCaster = setTimeout(() => { }, 1);
let theDispatch

const setupZoom = (eventSourceId, applyZoomTargetId,
  renderedDims,
  offSets,
  dispatch) => {

  // console.log('renderedDims',renderedDims)
  // console.log('offSets', offSets)
  theDispatch = dispatch ? dispatch : theDispatch

  // useEdgeMouseTreeNavigation(eventSourceId, applyZoomTargetId, zoom)   

  function broadCastScale(e) {

    clearTimeout(broadCaster)
    broadCaster = setTimeout(() => {
      console.log(`current tree scale: ${e.transform.k}`)
    }, 100)

  }

  //i.e. zoomWindow
  const zoomEventSourceContainer = d3.select(`#${eventSourceId}`)
  const zoomActionTargetContainer = d3.select(`#${applyZoomTargetId}`)
  //set zoom behavior
  const handleZoom = (e) => {
    //update scale
    // console.log('handling zoom')
    theDispatch(zoomSliceActions.setScale(e.transform.k))
    setTreeContainerSvgClass(e.transform.k === maxScale.val)
    broadCastScale(e)
    // document.getElementById(eventSourceId).style.transform = 
    // `translate(${e.transform.x}px, ${e.transform.x}px) scale(${e.transform.k})`
    zoomActionTargetContainer.attr('transform', e.transform)
  }


  // console.log(treeContainerSvgDimensions)

  const zoomExtent = [[offSets.x, offSets.y],
  [renderedDims.width + offSets.x, renderedDims.height + offSets.y]]

  const zoom = d3.zoom()
    .scaleExtent([1, maxScale.val])
    .on('zoom', handleZoom)
    .extent(zoomExtent)
    .translateExtent(zoomExtent)



  zoomEventSourceContainer.call(zoom)

  // zoomEventSourceContainer
  // .transition()
  // .duration(0)
  // .call(zoom.scaleBy, 0.7)
  //pan
  configureEdgeHoverPanLogic('App', 20)
  // setupEdgeHoverPan(eventSourceId, zoom)





}

export default setupZoom