

import {store} from '../../store/store';
import setupZoom from "./setupZoom"
import { getZoomParams } from "../positionManager";
import { motherTreeRootRef } from "../../components/tree/D3Tree";
import { getRenderedDimensions } from '../DimensionsLogic';


let prevOffsets = {
    x: 0,
    y: 0
}


export default async function setupMotherTree(updateTreePositionFunc, dispatch){

    // let [renderedWidth, setRenderedWidth] = useState(initWidth)
    // let [renderedHeight, setRenderedHeight] = useState(initHeight)
    console.log('setting up tree')

    const treeScale = store.getState().scale.treeScale
    const [treeDims, offSets] = getZoomParams(true)

    // console.log(offSets)
    // console.log(originalmotherTreeRootRef.descendants())
    // console.log(motherTreeRootRef.descendants())

    const deltaX = offSets.x - prevOffsets.x
    const deltaY = offSets.y - prevOffsets.y



   


    motherTreeRootRef.current.descendants().map((node) => {
        node.x += deltaX / treeScale
        node.y += deltaY / treeScale
        // node.y -= 100
    })




    updateTreePositionFunc()
    setupZoom(
        'treeContainerSvg', 
        'treeContainerG',
        treeDims,
        offSets,
        dispatch
    )

    prevOffsets = {...offSets}


    return 'setup done'

}
