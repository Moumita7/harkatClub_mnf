import { createSlice } from "@reduxjs/toolkit";

export const memberSlice = createSlice({
    name: "members",
    initialState: { value: [] },
    reducers: {
        setMember(state, action) {
            state.value = action?.payload;
        },
        removeMember(state) {
            state.value = [];
        }
    }
})

export const { setMember, removeMember } = memberSlice.actions;
export default memberSlice.reducer;