export function getRenderedDimensions(element, scale){
          
          return {
            width: element.getBoundingClientRect().width / scale + 60, //width (+60 - temporary fix to dimension mismatch)
            height: element.getBoundingClientRect().height / scale //height
          }
          
}