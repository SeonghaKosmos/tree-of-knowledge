import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    resourceHeight: 30,
    resourceWidth: 24,
    subBushHeight: 30,
    bushPadding: 20,
    'bushScale': {
        bushWidth: 120,
        bushHeight: 100,
        originNodeWidth: 50,
        originNodeHeight: 50,
        rootNodeWidth: 150,
        rootNodeHeight: 170,
        treeWidth: 1300,
        treeHeight: 770
    },
    'subBushScale': {
        bushWidth: 100,
        bushHeight: 130,
        treeWidth: 1200,
        treeHeight: 750
    }
    
}


const dimensionsSlice = createSlice({
    name:'dimensions',
    initialState,
    reducers: {
    //     // setBushWidth(state, action) {
    //     //     state.bushWidth = action.payload
    //     // },
    //     // setBushHeight(state, action) {
    //     //     state.bushHeight = action.payload
    //     // },
    //     // setBushDimensions(state, action){
    //     //     state.bushHeight = action.payload
    //     //     state.bushWidth = action.payload
    //     // },
    //     // setTreeWidth(state, action) {
    //     //     state.treeWidth = action.payload
    //     // },
    //     // setTreeHeight(state, action) {
    //     //     state.treeHeight = action.payload
    //     // },
    //     // setTreeDimensions(state, action){
    //     //     state.treeHeight = action.payload.height
    //     //     state.treeWidth = action.payload.width
    //     // }
    }
})

export default dimensionsSlice

