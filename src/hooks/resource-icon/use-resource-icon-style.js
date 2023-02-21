import { useEffect, useReducer, useState } from "react"
import { shallowEqual, useSelector } from "react-redux"


export function useResourceIconStyle(){
    
    const minusculeBushScaleBoundary = useSelector((state) => state.zoom.minusculeBushScaleBoundary, shallowEqual)
    const isMinusculeScale = useSelector((state) => state.zoom.scale < minusculeBushScaleBoundary, shallowEqual)

    const styleReducer = (state, action) => {
        return action
    }


    const [styleState, dispatchStyle] = useReducer(styleReducer, {
        borderRadius: '50%', 
        color:'transparent', 
        visionScale: 'minusculeBushScale'})


    useEffect(()=>{ //update styles when scale changes

        if (isMinusculeScale){
            
            dispatchStyle({
                borderRadius: '50%', 
                color:'transparent', 
                visionScale: 'minusculeBushScale'})
            
        } else if ( !isMinusculeScale ){
   
            dispatchStyle({
                borderRadius: 0, 
                color:'black', 
                visionScale: 'bushScale'})
        } else{
            // console.log('doing nothing')
        }
        

    }, [isMinusculeScale])

    return [styleState.borderRadius, styleState.color]
}