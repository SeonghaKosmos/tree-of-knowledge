import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    treeScale: 0.7,
    'bushScale': {
        resourceIconScale: 1
    },
    'subBushScale': {
        resourceIconScale: 0.5
    },
    'subTreeScale': {
        resourceIconScale: 0.1
    }
}

const scaleSlice = createSlice({
    name:'scale',
    initialState,
    reducers: {
        setTreeScale(state, action) {
            state.treeScale = action.payload
        },
        
    }
})

export default scaleSlice

