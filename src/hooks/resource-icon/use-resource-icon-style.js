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

        if (isMinusculeScale && scaleDependentClass != 'minusculeScale'){
            
            setScaleDependentClass('minusculeScale')
            
        } else if ( !isMinusculeScale && scaleDependentClass != 'notMinusculeScale'){
   
            setScaleDependentClass('notMinusculeScale')
        } else{
            // console.log('doing nothing')
        }
        

    }, [isMinusculeScale])

    const styleClasses = [scaleDependentClass, connectionDependentClass, delayedLightUp]
    return styleClasses
}