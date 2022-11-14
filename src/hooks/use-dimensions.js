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
                console.log(`%c${err.message}`, 'color: orange')
                if (err.message.includes('Cannot read properties of null')){
                    console.log('%creference element is not set: skipping update', 'color: orange')

                    //try update when reference element not set
                    console.log('%ctrying to update dimensions again', 'color: orange')
                    doUpdate.current = true; 
                    //also reevaluate resource icon positions
                    
                    console.log('%cenabling icon positions update', 'color: orange')
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