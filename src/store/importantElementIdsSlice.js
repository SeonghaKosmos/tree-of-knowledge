import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    treeContainerGId: 'treeContainerG',
    resourceConnectionLinesContainerId: 'resourceConnectionLinesContainer'
}

const importantElementIdsSlice = createSlice({
    name:'importantElementIds',
    initialState
})

export default importantElementIdsSlice

