import { useEffect, useReducer, useState } from "react"
import { useSelector } from "react-redux"


export function useResourceIconStyle(){
    const scale = useSelector((state) => state.zoom.scale)
    const minusculeBushScaleBoundary = useSelector((state) => state.zoom.minusculeBushScaleBoundary)

    const styleReducer = (state, action) => {
        if (action.scale < minusculeBushScaleBoundary){
            if (state.visionScale!='minusculeBushScale'){ //do not update state of visionscale has not changed
                return {
                    borderRadius: '50%', 
                    color:'transparent', 
                    visionScale: 'minusculeBushScale'}
            }
            return state  //return previous styles
                
        } else {
            if (state.visionScale!='bushScale'){ //do not update state of visionscale has not changed
                return {
                    borderRadius: 0, 
                    color:'black', 
                    visionScale: 'bushScale'}
            } 
            return state  //return previous styles
                
        }
    }


    const [styleState, dispatchStyle] = useReducer(styleReducer, {
        borderRadius: '50%', 
        color:'transparent', 
        visionScale: 'minusculeBushScale'})


    useEffect(()=>{ //update styles when scale changes

        dispatchStyle({scale: scale})

    }, [scale])

    return [styleState.borderRadius, styleState.color]
}