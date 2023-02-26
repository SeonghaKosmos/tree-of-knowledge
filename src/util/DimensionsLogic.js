export function getRenderedDimensions(element, scale){
          
  return {
    width: element.getBoundingClientRect().width / scale ,
    height: element.getBoundingClientRect().height / scale //height
  }
          
}