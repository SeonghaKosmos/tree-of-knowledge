import {configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import dimensionsSlice from './visuals/dimensionsSlice'
import importantElementIdsSlice from './importantElementIdsSlice'
import scaleSlice from './visuals/scaleSlice'
import treeDataSlice from './treeDataSlice'
import {zoomSlice} from './visuals/zoomSlice'
import renderedDimensionsSlice from './visuals/renderedDimensionsSlice'



export let store = configureStore({
    reducer: {
        dimensions: dimensionsSlice.reducer,
        scale: scaleSlice.reducer,
        treeData: treeDataSlice.reducer,
        zoom: zoomSlice.reducer,
        importantElementIds: importantElementIdsSlice.reducer,
        renderedDimensions: renderedDimensionsSlice.reducer,
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
export const renderedDimensionsActions = renderedDimensionsSlice.actions


