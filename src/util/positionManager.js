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

    // console.log(treeDims)
    // console.log(treeSvgDims)
    // console.log(isCentered)

    const offSets = {}
    console.log('treeSvgDims: ', treeSvgDims)
    console.log('treeDims: ', treeDims)

    if (isCentered) {
        offSets.x = (treeSvgDims.width - treeDims.width) / 2
        offSets.y = (treeSvgDims.height - treeDims.height) / 2
    } else {
        const treeRelativePos = getRelativePositionOfElementInContainer(treeContainerSvg, treeContainerG)
        offSets.x = treeRelativePos.x
        offSets.y = treeRelativePos.y
    }

    const prevXLine = document.getElementById('testLineX')
    const prevYLine = document.getElementById('testLineY')

    if (prevXLine){
        treeContainerSvg.removeChild(prevXLine)
    }
    if (prevYLine){
        treeContainerSvg.removeChild(prevYLine)
    }
    // const lineX = document.createElementNS("http://www.w3.org/2000/svg", "line")
    // lineX.setAttribute("x1", "0");
    // lineX.setAttribute("y1", "100");
    // lineX.setAttribute("x2", offSets.x);
    // lineX.setAttribute("y2", "100");
    // lineX.style.stroke = '#8f6b4d'
    // lineX.style.strokeWidth = '7px'
    // lineX.id = 'testLineX'

    // const lineY = document.createElementNS("http://www.w3.org/2000/svg", "line")
    // lineY.setAttribute("x1", "700");
    // lineY.setAttribute("y1", "0");
    // lineY.setAttribute("x2", 700);
    // lineY.setAttribute("y2", offSets.y);
    // lineY.style.stroke = '#8f6b4d'
    // lineY.style.strokeWidth = '7px'
    // lineY.id = 'testLineY'


    // treeContainerSvg.appendChild(lineX)
    // treeContainerSvg.appendChild(lineY)

    return [treeDims, offSets]
}


export function getBushPositionsFromRoot(root, offSets) {

    if (!offSets) {
        offSets = {
            x: 0,
            y: 0,
        }
    }
    const descendants = root.descendants()
    const bushPositions = {}
    descendants.forEach(node => {
        bushPositions[node.data.id] = {
            x: node.x - offSets.x,
            y: node.y - offSets.y
        }
    });

    return bushPositions
}

export function getBushDragDisplacement(x, y, dx, dy, bushWidth, bushHeight, treeScale) {
    const treeContainerSvg = document.getElementById('treeContainerSvg')
    const treeSvgDims = getRenderedDimensions(treeContainerSvg, 1)
    // const treeScale = store.getState().scale.treeScale

    // console.log('x', x)
    // console.log('y', y * treeScale)
    // console.log('treeSvgDims.height', treeSvgDims.height)
    // console.log('dx', dx)
    // console.log('dy', dy)
    // console.log('treeSvgDims', treeSvgDims)

    // dy = dy * treeScale


    const potentialNewX = x + dx
    const potentialLeftEdgeX = (potentialNewX - bushWidth / 2 / treeScale) * treeScale
    const potentialRightEdgeX = (potentialNewX + bushWidth / 2 / treeScale) * treeScale

    const theDx =
        potentialLeftEdgeX < 0 ? dx - potentialLeftEdgeX :
            potentialRightEdgeX > treeSvgDims.width ? dx + (treeSvgDims.width - potentialRightEdgeX) :
                dx

    const potentialNewY = y + dy
    const potentialTopY = (potentialNewY) * treeScale
    const potentialBottomY = (potentialNewY + bushHeight / treeScale) * treeScale

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


