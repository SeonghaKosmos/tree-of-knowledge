import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    reevaluationTrigger: {}
}

const positionsSlice = createSlice({
    name:'positions',
    initialState,
    reducers: {
        triggerReevaluation(state, action) {
            state = {reevaluationTrigger:{}}
        }
    }
})

export default positionsSlice

