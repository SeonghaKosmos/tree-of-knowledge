import { useEffect, useReducer, useRef, useState } from "react"
import { shallowEqual, useSelector } from "react-redux"


export function useResourceIconStyle(resourceGraphicsDatum){
    
    const isConnected = resourceGraphicsDatum.state.isConnected
    const delayedLightUp = resourceGraphicsDatum.state.delayLightUpStyle ? 'delayedLightUp' : ''
    const minusculeBushScaleBoundary = useSelector((state) => state.zoom.minusculeBushScaleBoundary, shallowEqual)
    const isMinusculeScale = useSelector((state) => state.zoom.scale < minusculeBushScaleBoundary, shallowEqual)

    // const styleClasses
    const [scaleDependentClass, setScaleDependentClass] = useState('minusculeScale')
    const connectionDependentClass = isConnected ? 'isConnected' : ''
    // console.log('delayedLightUp: ',delayedLightUp)

    useEffect(()=>{ //update styles when scale changes

        console.log('%cupdating style', 'color:green')
        console.log(isMinusculeScale)
        console.log(scaleDependentClass)

        if (isMinusculeScale){
            
            setScaleDependentClass(prevState => {

                if (prevState != 'minusculeScale'){
                    return 'minusculeScale'
                }
                return prevState

            })
            
        } else {
   
            setScaleDependentClass(prevState => {

                if (prevState != 'notMinusculeScale'){
                    return 'notMinusculeScale'
                }
                return prevState

            })
        } 
        

    }, [isMinusculeScale])

    const styleClasses = [scaleDependentClass, connectionDependentClass, delayedLightUp]
    return styleClasses
}