


let elementWidth
let elementHeight


//edge logic
let edgeThickness

export function configureEdgeHoverNavigationLogic(elemWidth, elemHeight, edgeThick){
    elementWidth = elemWidth
    elementHeight = elemHeight
    edgeThickness = edgeThick
}


function isOutsideMainBodyRect(x, y){
    const smallRect = {
        minX: edgeThickness, // + 0
        maxX: elementWidth - edgeThickness,
        minY: edgeThickness,
        maxY: elementHeight - edgeThickness
    }

    if (
    (x <= smallRect.minX || x >= smallRect.maxX) ||
    (y <= smallRect.minY || y >= smallRect.maxY)){
        return true
    } return false
}

function isInsideLargeRect(x, y){
    const largeRect = {
        minX: 0, // + 0
        maxX: elementWidth,
        minY: 0,
        maxY: elementHeight
    }

    if (
    (largeRect.minX <= x && x <= largeRect.maxX) &&
    (largeRect.minY <= y && y <= largeRect.maxY)){
        return true
    } return false
}


export function isInEdge(x, y){

    if (isOutsideMainBodyRect(x, y)){
        return true
    }return false
}


/*translate logic*/

export function getTranslateXYRatio(x, y){
    const centerOfElement = {
        x: elementWidth / 2,
        y: elementHeight / 2
    }

    const XdistanceFromCenter = centerOfElement.x - x
    const YdistanceFromCenter = centerOfElement.y - y

    const denominator = Math.abs(XdistanceFromCenter) + Math.abs(YdistanceFromCenter)

    return {
        x: XdistanceFromCenter / denominator,
        y: YdistanceFromCenter / denominator
    }
}


