import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    treeContainerGId: 'treeContainerG', 
    opacityControlGId: 'opacityControlG',
    resourceConnectionLinesContainerId: 'resourceConnectionLinesContainer'
}

const importantElementIdsSlice = createSlice({
    name:'importantElementIds',
    initialState
})

export default importantElementIdsSlice

