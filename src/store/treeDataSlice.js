import {createSlice } from '@reduxjs/toolkit'
import { treeData } from '../util/treeData'


const initialState = {
  structure: treeData
}

const treeDataSlice = createSlice({
    name:'treeData',
    initialState
})


export default treeDataSlice