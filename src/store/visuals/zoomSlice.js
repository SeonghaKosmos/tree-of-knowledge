import { createSlice } from '@reduxjs/toolkit'
import { setIsResourcePositionReevaluationPossible } from '../../util/positionManager'

let visionScaleJustChanged = false

export const scale = {val: 1}
export const visionScale = {val: 'bushScale'}

const initialState = {
    scale: 1,
    maxScale: 8,
    subBushScaleBoundary: 4.5,
    minusculeBushScaleBoundary: 2.5,
    visionScale: 'bushScale',
    treeContainerSvgStyleClass: 'zoom-in-cursor'
}

export const zoomSlice = createSlice({
    name:'zoom',
    initialState,
    reducers: {

        setScale(state, action) {
            
            state.scale = action.payload
            scale.val = action.payload
            // update vision scale

            if (state.scale < state.subBushScaleBoundary && state.visionScale != 'bushScale'){
                state.visionScale = 'bushScale'
                visionScale.val = 'bushScale'
                console.log('%cscale: bushScale','color:green')
                // setIsResourcePositionReevaluationPossible(true)
                // setIsResourcePositionReevaluationPossible(true) //update resource positions
            } else if (state.scale >= state.subBushScaleBoundary && state.visionScale != 'subBushScale'){
                state.visionScale = 'subBushScale'
                visionScale.val = 'subBushScale'
                console.log('%cscale: subBushScale','color:green')
                // setIsResourcePositionReevaluationPossible(true)
                // setIsResourcePositionReevaluationPossible(true) //update resource positions
            }

            state.treeContainerSvgStyleClass = state.scale === state.maxScale ? 'zoom-out-cursor' : 'zoom-in-cursor'
        }, 
        setVisionScale(state, action){
            state.visionScale = action.payload
        }
    }
})



