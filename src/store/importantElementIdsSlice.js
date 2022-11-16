import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    treeContainerGId: 'treeContainerG', 
    opacityControlGId: 'opacityControlG',
    treeOverlayElementsContainerId: 'treeOverlayElementsContainer'
}

const importantElementIdsSlice = createSlice({
    name:'importantElementIds',
    initialState
})

export default importantElementIdsSlice

