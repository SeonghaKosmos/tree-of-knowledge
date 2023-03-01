import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    treeWidth: 1300,
    treeHeight: 770,
    resourceHeight: 30,
    resourceWidth: 24,
    subBushHeight: 30,
    bushPadding: 20,
    originNodeWidth: 25,
    originNodeHeight: 35,
    rootNodeWidth: 150,
    rootNodeHeight: 170,
    bushWidth: 120,
    bushHeight: 120
}


export const rawDimensions = {...initialState}


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

