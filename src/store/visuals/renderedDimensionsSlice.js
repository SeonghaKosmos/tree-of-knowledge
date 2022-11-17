import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    screenWidth: 0,
    screenHeight: 0,
    renderedTreeWidth: 0,
    renderedTreeHeight: 0,
    zoomableScreenWidth: 0,
    zoomableScreenHeight: 0
}

const renderedDimensionsSlice = createSlice({
    name:'renderedDimensions',
    initialState,
    reducers: {
        setTreeDimensions(state, action) {
            state.renderedTreeWidth = action.payload.width
            state.renderedTreeHeight = action.payload.height
        },
        setZoomableScreenDimensions(state, action) {
            state.zoomableScreenWidth = action.payload.width
            state.zoomableScreenHeight = action.payload.height
        },
        setScreenDimensions(state, action){
            state.screenWidth = action.payload.width
            state.screenHeight = action.payload.height
        }
    }
})

export default renderedDimensionsSlice

