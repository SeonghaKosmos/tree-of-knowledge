import { useEffect, useRef } from "react"
import { useState } from "react"


const useDimensions = (computeRenderedDimensions ,initWidth, initHeight) => {
    let [renderedWidth, setRenderedWidth] = useState(initWidth)
    let [renderedHeight, setRenderedHeight] = useState(initHeight)
    const doUpdate = useRef(true)
    
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
                    doUpdate.current = true; //try update when reference element not set
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