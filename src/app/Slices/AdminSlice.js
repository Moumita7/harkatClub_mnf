import { createSlice } from "@reduxjs/toolkit";

export const AdminSlice = createSlice({
    name: "admin",
    initialState: { value: null },
    reducers: {
        setAdmin(state, action) {
            state.value = action?.payload;
        },
        removeAdmin(state) {
            state.value = null;
        }
    }
})

export const { setAdmin, removeAdmin } = AdminSlice.actions;
export default AdminSlice.reducer;