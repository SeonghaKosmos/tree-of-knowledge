import * as d3 from 'd3'
import { configureEdgeHoverPanLogic } from "./pan/EdgeHoverPanLogic";
import { setTreeContainerSvgClass } from "./d3Related";
import setupEdgeHoverPan from "./pan/EdgeHoverPan";
import { store, zoomSliceActions } from "../store/store";

let broadCaster = setTimeout(() => { }, 1);
let theDispatch

const setupZoom = (
  {
    eventSourceId, 
    applyZoomTargetId,
    zoomEventTargetRenderedDims,
    offSets,
    treeDisplacementOnReCenter = {
      x: 0,
      y: 0
    },
    dispatch
  } = {}
) => {

  // console.log('zoomEventTargetRenderedDims',zoomEventTargetRenderedDims)
  // console.log('offSets', offSets)

  const maxScale = store.getState().zoom.maxScale

  theDispatch = dispatch ? dispatch : theDispatch

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

    // console.log('handling zoom')
    // console.log(e)
    theDispatch(zoomSliceActions.setScale(e.transform.k))
    setTreeContainerSvgClass(e.transform.k === maxScale)
    broadCastScale(e)

    zoomActionTargetContainer.attr('transform', e.transform)

  }


  // console.log(treeContainerSvgDimensions)

  const zoomExtent = [[offSets.x, offSets.y],
  [zoomEventTargetRenderedDims.width + offSets.x, zoomEventTargetRenderedDims.height + offSets.y]]

  const zoom = d3.zoom()
    .scaleExtent([1, maxScale])
    .on('zoom', handleZoom)
    .extent(zoomExtent)
    .translateExtent(zoomExtent)



  zoomEventSourceContainer.call(zoom)

  //conserve tree position
  zoomEventSourceContainer
    .transition()
    .duration(0)
    .call(zoom.translateBy, treeDisplacementOnReCenter.x, treeDisplacementOnReCenter.y);


  if (process.env.REACT_APP_IS_LOCAL === 'false'){
    configureEdgeHoverPanLogic('App', 20)
    setupEdgeHoverPan(eventSourceId, zoom)
  }






}

export default setupZoom