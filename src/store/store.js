import {configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import dimensionsSlice from './dimensionsSlice'
import scaleSlice from './scaleSlice'
import treeDataSlice from './treeDataSlice'
import zoomSlice from './zoomSlice'




let store = configureStore({
    reducer: {
        dimensions: dimensionsSlice.reducer,
        scale: scaleSlice.reducer,
        treeData: treeDataSlice.reducer,
        zoom: zoomSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false //prevent non serializable Resource object warnings
    })
})


export const dimensionSliceActions = dimensionsSlice.actions
export const scaleSliceActions = scaleSlice.actions
export const TreeDataSliceActions = treeDataSlice.actions
export const zoomSliceActions = zoomSlice.actions
export default store


