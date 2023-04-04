import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    scale: 1,
    maxScale: 12,
    subTreeScaleBoundary: 8,
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

            function getVisionScaleName(){

                if (state.scale >= state.subTreeScaleBoundary){
                    return 'subTreeScale'
                }
                else if (state.scale >= state.subBushScaleBoundary){
                    return 'subBushScale'
                } 
                return 'bushScale'
            }
            
            state.scale = action.payload

            // update vision scale
            const newVisionScale = getVisionScaleName(state, action)
            if (newVisionScale !== state.visionScale){

                state.visionScale = newVisionScale
                console.log(`%cscale: ${newVisionScale}`,'color:green')
            }
            

            state.treeContainerSvgStyleClass = state.scale === state.maxScale ? 'zoom-out-cursor' : 'zoom-in-cursor'
        }, 
        setVisionScale(state, action){
            state.visionScale = action.payload
        }
    }
})






