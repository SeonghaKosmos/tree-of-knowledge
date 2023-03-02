import { useEffect, useReducer, useState } from "react"
import { shallowEqual, useSelector } from "react-redux"


export function useResourceIconStyle(isConnected){
    
    const minusculeBushScaleBoundary = useSelector((state) => state.zoom.minusculeBushScaleBoundary, shallowEqual)
    const isMinusculeScale = useSelector((state) => state.zoom.scale < minusculeBushScaleBoundary, shallowEqual)

    const [styleClasses, setStyleClasses] = useState('minusculeScale')
    const connectedIconStyleClass = isConnected ? 'isConnected' : ''
    console.log('evaluating styles')

    useEffect(()=>{ //update styles when scale changes

        if (isMinusculeScale){
            
            setStyleClasses('minusculeScale')
            
        } else if ( !isMinusculeScale ){
   
            setStyleClasses('notMinusculeScale')
        } else{
            // console.log('doing nothing')
        }
        

    }, [isMinusculeScale])

    return styleClasses+' '+connectedIconStyleClass
}