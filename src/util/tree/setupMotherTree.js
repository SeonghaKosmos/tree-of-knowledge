

import {store} from '../../store/store';
import setupZoom from "./setupZoom"
import { getZoomParams } from "../positionManager";
import { motherTreeBushPositions, motherTreeRootRef } from "../../components/tree/D3Tree";



export default async function setupMotherTree(updateTreePositionFunc, dispatch, bushWidth){

    // let [renderedWidth, setRenderedWidth] = useState(initWidth)
    // let [renderedHeight, setRenderedHeight] = useState(initHeight)
    console.log('setting up tree')

    const treeScale = store.getState().scale.treeScale
    const [treeDims, offSets] = getZoomParams(true)

    // console.log(offSets)
    // console.log(originalmotherTreeRootRef.descendants())
    // console.log(motherTreeRootRef.descendants())






    motherTreeRootRef.current.descendants().map((node) => {
        node.x = motherTreeBushPositions.current[node.data.id].x + offSets.x / treeScale + bushWidth / 2
        node.y = motherTreeBushPositions.current[node.data.id].y + offSets.y / treeScale

    })




    updateTreePositionFunc()
    setupZoom(
        'treeContainerSvg', 
        'treeContainerG',
        treeDims,
        offSets,
        dispatch
    )



    return 'setup done'

}
