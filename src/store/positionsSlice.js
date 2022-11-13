import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    reevaluateResourceIconPositionsTrigger: {}
}

const positionsSlice = createSlice({
    name:'positions',
    initialState,
    reducers: {
        triggerIconPositionEvaluation(state, action) {
            state.reevaluateResourceIconPositionsTrigger = {}
        },
    }
})

export default positionsSlice

