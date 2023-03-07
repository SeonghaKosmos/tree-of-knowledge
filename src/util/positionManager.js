import { getRenderedDimensions } from "./DimensionsLogic"

let reevaluationPossible = true //automatically evaluate position on first tree render
let resourcePositionsStabilized = false
export const treeContainerGPosition = {
    x: 0,
    y: 0
}

export function setTreePosition(x, y){
    treeContainerGPosition.x = x
    treeContainerGPosition.y = y
}

export function getRelativePositionOfElementInContainer(container, element){

    const containerRect = container.getBoundingClientRect()
    const elementRect = element.getBoundingClientRect()

    const y = elementRect.top - containerRect.top;
    const x = elementRect.left - containerRect.left;


    // console.log(`container: ${containerRect.left}, ${containerRect.top}`)

    return {
        x: x,
        y: y
    }
}

export function getZoomParams(isCentered){

    const treeContainerG = document.getElementById('treeContainerG')
    const treeContainerSvg = document.getElementById('treeContainerSvg')


    const treeDims = getRenderedDimensions(treeContainerG, 1)
    const treeSvgDims = getRenderedDimensions(treeContainerSvg, 1)

    console.log(treeDims)
    console.log(treeSvgDims)
    console.log(isCentered)

    const offSets  = {}

    if (isCentered) {
        offSets.x = (treeSvgDims.width - treeDims.width) / 2
        offSets.y = (treeSvgDims.height - treeDims.height) / 2 
    } else {
        const treeRelativePos = getRelativePositionOfElementInContainer(treeContainerSvg, treeContainerG)
        offSets.x = treeRelativePos.x
        offSets.y = treeRelativePos.y
    }


    return [treeDims, offSets]
}


export function isResourcePositionReevaluationPossibleGlobal(){
    return reevaluationPossible
}

export function setIsResourcePositionReevaluationPossibleGlobal(val){
    reevaluationPossible = val
}


