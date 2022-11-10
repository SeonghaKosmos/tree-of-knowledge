import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    scale: 1,
    subBushScaleBoundary: 4.5,
    minusculeBushScaleBoundary: 2.5,
    visionScale: 'bushScale'
}

const zoomSlice = createSlice({
    name:'zoom',
    initialState,
    reducers: {

        setScale(state, action) {
            state.scale = action.payload

            //update vision scale
            if (state.scale < state.subBushScaleBoundary){
                state.visionScale = 'bushScale'
            } else {
                state.visionScale = 'subBushScale'
            }
        }
    }
})

export default zoomSlice

