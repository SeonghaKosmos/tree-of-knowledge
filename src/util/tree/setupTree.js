

import {store} from '../../store/store';
import setupZoom from "./setupZoom"
import { getZoomParams } from "../positionManager";
import { motherTreeBushPositions, motherTreeRootRef } from "../../components/tree/D3Tree";

let prevOffsets

export default async function setupTree({updateTreePositionFunc, dispatch, bushWidth, treeDepth = 0} = {}){

    // let [renderedWidth, setRenderedWidth] = useState(initWidth)
    // let [renderedHeight, setRenderedHeight] = useState(initHeight)
    console.log('setting up tree')

    const treeScale = store.getState().scale.treeScale * Math.pow(0.1, treeDepth)
    const [treeDims, offSets] = getZoomParams()

    // console.log(offSets)
    // console.log(originalmotherTreeRootRef.descendants())
    // console.log(motherTreeRootRef.descendants())






    motherTreeRootRef.current.descendants()
    .map((node) => {
        node.x = motherTreeBushPositions.current[node.data.id].x + offSets.x / treeScale + bushWidth / 2
        node.y = motherTreeBushPositions.current[node.data.id].y + offSets.y / treeScale

    })



    const treeDisplacementOnReCenter = prevOffsets ? 
    {
        x: prevOffsets.x - offSets.x,
        y: prevOffsets.y - offSets.y
    }
    :
    {
        x: 0,
        y: 0
    }

    prevOffsets = {...offSets}

    updateTreePositionFunc()
    setupZoom(
        {
            eventSourceId: 'treeContainerSvg', 
            applyZoomTargetId: 'treeContainerG',
            zoomEventTargetRenderedDims: treeDims,
            offSets,
            treeDisplacementOnReCenter,
            dispatch
        }
    )

    return 'setup done'

}
