import { store } from "../store/store"
import { getRenderedDimensions } from "./DimensionsLogic"

let reevaluationPossible = true //automatically evaluate position on first tree render
let resourcePositionsStabilized = false
export const treeContainerGPosition = {
    x: 0,
    y: 0
}

export function setTreePosition(x, y) {
    treeContainerGPosition.x = x
    treeContainerGPosition.y = y
}

export function getRelativePositionOfElementInContainer(container, element) {

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

export function getZoomParams(isCentered) {

    const treeContainerG = document.getElementById('treeContainerG')
    const treeContainerSvg = document.getElementById('treeContainerSvg')


    const treeDims = getRenderedDimensions(treeContainerG, 1)
    const treeSvgDims = getRenderedDimensions(treeContainerSvg, 1)

    console.log(treeDims)
    console.log(treeSvgDims)
    console.log(isCentered)

    const offSets = {}

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

export function getBushDragDisplacement(x, y, dx, dy, bushWidth, bushHeight) {
    const treeContainerSvg = document.getElementById('treeContainerSvg')
    const treeSvgDims = getRenderedDimensions(treeContainerSvg, 1)
    const treeScale = store.getState().scale.treeScale

    // console.log('x', x)
    // console.log('y', y * treeScale)
    // console.log('treeSvgDims.height', treeSvgDims.height)
    // console.log('dx', dx)
    // console.log('dy', dy)
    // console.log('treeSvgDims', treeSvgDims)

    // dy = dy * treeScale


    const potentialNewX = x + dx
    const potentialLeftEdgeX = (potentialNewX - bushWidth/2 / treeScale) * treeScale
    const potentialRightEdgeX = (potentialNewX + bushWidth/2 / treeScale) * treeScale

    const theDx = 
        potentialLeftEdgeX < 0 ? dx - potentialLeftEdgeX :
        potentialRightEdgeX > treeSvgDims.width ? dx + (treeSvgDims.width - potentialRightEdgeX) :
        dx

    const potentialNewY = y + dy
    const potentialTopY = (potentialNewY) * treeScale
    const potentialBottomY = (potentialNewY + bushHeight/treeScale) * treeScale

    const theDy = 
        potentialTopY < 0 ? dy - potentialTopY :
        potentialBottomY > treeSvgDims.height ? dy + (treeSvgDims.height - potentialBottomY) :
        dy

    // console.log('potentialBottomY', potentialBottomY)
    // console.log('potentialNewX', potentialNewX + bushWidth/2 )
    // console.log('theDx', theDx)
    // console.log('theDy', theDy)

    return {
        dx: theDx,
        dy: theDy
    }

}


export function isResourcePositionReevaluationPossibleGlobal() {
    return reevaluationPossible
}

export function setIsResourcePositionReevaluationPossibleGlobal(val) {
    reevaluationPossible = val
}


