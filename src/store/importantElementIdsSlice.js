import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    treeContainerGId: 'treeContainerG', 
    brightnessControlGId: 'brightnessControlG',
    treeOverlayElementsContainerId: 'treeOverlayElementsContainer'
}

const importantElementIdsSlice = createSlice({
    name:'importantElementIds',
    initialState
})

export default importantElementIdsSlice

