import { useEffect, useRef } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { positionsActions } from "../store/store"
import { setReevaluationPossible } from "../util/relativePositionManager"


const useDimensions = (computeRenderedDimensions ,initWidth, initHeight) => {
    let [renderedWidth, setRenderedWidth] = useState(initWidth)
    let [renderedHeight, setRenderedHeight] = useState(initHeight)
    const doUpdate = useRef(true)

    const dispatch = useDispatch()
    
    function update() {
        setTimeout(() => {
            try {
                const [computedWidth, computedHeight] = computeRenderedDimensions()
                setRenderedWidth(computedWidth)
                setRenderedHeight(computedHeight)
                doUpdate.current = false //no more updates after reference element set
            } catch (err){
                console.log(err.message)
                if (err.message.includes('Cannot read properties of null')){
                    console.log('reference element is not set: skipping update')

                    //try update when reference element not set
                    console.log('trying to update dimensions again')
                    doUpdate.current = true; 
                    //also reevaluate resource icon positions
                    
                    console.log('enabling icon positions update')
                    // setReevaluationPossible(true)
                    
                }
            }
            
        }, 1)
    }
   
    useEffect(() => {
        if (doUpdate.current){
            update()
        }
        
    })

    return [renderedWidth, renderedHeight]
}

export default useDimensions