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

export function getRelativePositionOfElementInContainer(container, element, unScaleElement = false) {



    const containerRect = container.getBoundingClientRect()
    const elementRect = element.getBoundingClientRect()


    let elemTop = elementRect.top
    let elemLeft = elementRect.left

    if (unScaleElement) {

        let elemTranslateX = 0
        let elemTranslateY = 0
        let elemScale = 1

        try {
            const elemTransformMatrix = element.transform.baseVal.consolidate().matrix
            elemTranslateX = elemTransformMatrix.e
            elemTranslateY = elemTransformMatrix.f
            elemScale = elemTransformMatrix.a
        } catch (err) {
            console.log(err)
            console.log('getRelativePositionOfElementInContainer: no transform for element')
        }



        elemLeft -= elemTranslateX
        elemLeft /= elemScale


        elemTop -= elemTranslateY
        elemTop /= elemScale

    }


    const y = elemTop - containerRect.top;
    const x = elemLeft - containerRect.left;


    // console.log(`container: ${containerRect.left}, ${containerRect.top}`)

    return {
        x: x,
        y: y
    }
}

export function getZoomParams(
    {
        isCentered = true,
        zoomActionTargetContainerId = 'treeContainerG',
        zoomEventSourceContainerId = 'treeContainerSvg',
    } = {}) {



    const zoomEventSourceContainerScale = store.getState().zoom.scale

    const zoomActionTargetContainer = document.getElementById(zoomActionTargetContainerId)
    const zoomEventSourceContainer = document.getElementById(zoomEventSourceContainerId)


    const zoomActionTargetContainerDims = getRenderedDimensions(zoomActionTargetContainer, zoomEventSourceContainerScale)
    const zoomEventSourceContainerDims = getRenderedDimensions(zoomEventSourceContainer, 1)


    // console.log(treeDims)
    // console.log(treeSvgDims)
    // console.log(isCentered)

    const offSets = {}
    // console.log('treeSvgDims: ', treeSvgDims)
    // console.log('treeDims: ', treeDims)

    if (isCentered) {
        offSets.x = (zoomEventSourceContainerDims.width - zoomActionTargetContainerDims.width) / 2
        offSets.y = (zoomEventSourceContainerDims.height - zoomActionTargetContainerDims.height) / 2
    } else {
        const treeRelativePos = getRelativePositionOfElementInContainer(zoomEventSourceContainer, zoomActionTargetContainer, true)
        offSets.x = treeRelativePos.x
        offSets.y = treeRelativePos.y
    }


    return [zoomActionTargetContainerDims, offSets]




    // const prevXLine = document.getElementById('testLineX')
    // const prevYLine = document.getElementById('testLineY')

    // if (prevXLine){
    //     zoomEventSourceContainer.removeChild(prevXLine)
    // }
    // if (prevYLine){
    //     zoomEventSourceContainer.removeChild(prevYLine)
    // }
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


