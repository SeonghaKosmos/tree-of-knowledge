import { getRenderedDimensions } from "../DimensionsLogic"



export const edgeHoverDetectingContainer = {id:''}


//edge logic
let edgeThickness

export function configureEdgeHoverPanLogic(edgeHoverDetectorContainerId, edgeThick){
    edgeHoverDetectingContainer.id = edgeHoverDetectorContainerId
    edgeThickness = edgeThick
}


export function isInEdge(x, y){

    const edgeHoverDetectingContainerDims = getRenderedDimensions(document.getElementById(edgeHoverDetectingContainer.id), 1)
    // console.log(edgeHoverDetectingContainerDims)
    const smallRect = {
        minX: edgeThickness, // + 0
        maxX: edgeHoverDetectingContainerDims.width - edgeThickness,
        minY: edgeThickness,
        maxY: edgeHoverDetectingContainerDims.height - edgeThickness
    }

    if (
    (x <= smallRect.minX || x >= smallRect.maxX) ||
    (y <= smallRect.minY || y >= smallRect.maxY)){
        // console.log('is in edge')
        return true
    } return false
}


/*translate logic*/

export function getTranslateXYRatio(x, y){

    const edgeHoverDetectingContainerDims = getRenderedDimensions(document.getElementById(edgeHoverDetectingContainer.id), 1)
    const centerOfElement = {
        x: edgeHoverDetectingContainerDims.width / 2,
        y: edgeHoverDetectingContainerDims.height / 2
    }

    const XdistanceFromCenter = centerOfElement.x - x
    const YdistanceFromCenter = centerOfElement.y - y

    const denominator = Math.abs(XdistanceFromCenter) + Math.abs(YdistanceFromCenter)

    return {
        x: XdistanceFromCenter / denominator,
        y: YdistanceFromCenter / denominator
    }
}


