import { createSlice } from '@reduxjs/toolkit'
import ConnectionStatusFlags from '../components/resource-related/ConnectionStatusFlags'

const initialState = {
    scale: 1,
    subBushScaleBoundary: 4.5,
    minusculeBushScaleBoundary: 2.5,
    visionScale: 'subBushScale' //set initial scale to smallest to calculate position (usePositionsSimulation)
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
            ConnectionStatusFlags.updateVisionScale(state.visionScale)
        }, 
        setVisionScale(state, action){
            state.visionScale = action.payload
        }
    }
})

export default zoomSlice

