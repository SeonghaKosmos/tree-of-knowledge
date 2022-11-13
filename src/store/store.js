import {configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import dimensionsSlice from './dimensionsSlice'
import importantElementIdsSlice from './importantElementIdsSlice'
import positionsSlice from './positionsSlice'
import scaleSlice from './scaleSlice'
import treeDataSlice from './treeDataSlice'
import zoomSlice from './zoomSlice'




let store = configureStore({
    reducer: {
        dimensions: dimensionsSlice.reducer,
        scale: scaleSlice.reducer,
        treeData: treeDataSlice.reducer,
        zoom: zoomSlice.reducer,
        importantElementIds: importantElementIdsSlice.reducer,
        positions: positionsSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false //prevent non serializable Resource object warnings
    })
})


export const dimensionSliceActions = dimensionsSlice.actions
export const scaleSliceActions = scaleSlice.actions
export const TreeDataSliceActions = treeDataSlice.actions
export const zoomSliceActions = zoomSlice.actions
export const importantElementIdsActions = importantElementIdsSlice.actions
export const positionsActions = positionsSlice.actions
export default store


