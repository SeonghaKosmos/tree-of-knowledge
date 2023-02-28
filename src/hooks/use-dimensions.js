import { useEffect, useRef } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { positionsActions, renderedDimensionsActions } from "../store/store"
import { getRenderedDimensions } from "../util/DimensionsLogic"
import { setReevaluationPossible } from "../util/positionManager"


const useDimensions = (scale) => {
    // let [renderedWidth, setRenderedWidth] = useState(initWidth)
    // let [renderedHeight, setRenderedHeight] = useState(initHeight)
    const doDimensionsUpdate = useRef(true)

    const dispatch = useDispatch()
    
    function update() {
        setTimeout(() => {
            const treeContainerSvgStyle = document.getElementById('treeContainerSvg').style
            const treeContainerRootStyle = document.getElementById('treeOfKnowledgeContainerRoot').style
    
            const treeDims = getRenderedDimensions(document.getElementById('treeContainerG'), scale)
      
            treeContainerSvgStyle.width = treeDims.width
            treeContainerSvgStyle.height = treeDims.height
            treeContainerRootStyle.width = treeDims.width
            treeContainerRootStyle.height = treeDims.height
    
            dispatch(renderedDimensionsActions.setTreeDimensions({
                width: treeDims.width,
                height: treeDims.height
            }))
        }, 1)
    }
   
    useEffect(() => {
        if (doDimensionsUpdate.current){
            update()
        }
        
    }, [])

}

export default useDimensions