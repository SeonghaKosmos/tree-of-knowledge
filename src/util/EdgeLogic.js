import { max } from "d3"

let elementWidth
let elementHeight
let edgeThickness

export function setEdge(elemWidth, elemHeight, edgeThick){
    elementWidth = elemWidth
    elementHeight = elemHeight
    edgeThickness = edgeThick
}


function isOutsideSmallRect(x, y){
    const smallRect = {
        minX: edgeThickness, // + 0
        maxX: elementWidth - edgeThickness,
        minY: edgeThickness,
        maxY: elementHeight - edgeThickness
    }

    // console.log(smallRect.minX, smallRect.maxX, smallRect.minY, smallRect.maxY)
    // console.log(x, y)
    if (
    (x <= smallRect.minX || x >= smallRect.maxX) ||
    (y <= smallRect.minY || y >= smallRect.maxY)){
        return true
    } return false
}

// function isInsideLargeRect(x, y){
//     const largeRect = {
//         minX: 0, // + 0
//         maxX: elementWidth,
//         minY: 0,
//         maxY: elementHeight
//     }

//     if (
//     (largeRect.minX <= x && x <= largeRect.maxX) &&
//     (largeRect.minY <= y && y <= largeRect.maxY)){
//         return true
//     } return false
// }


export function isInEdge(x, y){

    if (isOutsideSmallRect(x, y)){
        return true
    }return false
}