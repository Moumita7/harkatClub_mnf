import { createSlice } from "@reduxjs/toolkit";

export const ClubCurrentMemberSlice = createSlice({
    name: "clubcurrentmember",
    initialState: { member_Club_id: "", member_status: "", member_id: "" },
    reducers: {
        setClubCurrentMember(state, action) {
            state.member_Club_id = action?.payload?.member_Club_id;
            state.member_status = action?.payload?.member_status;
            state.member_id = action?.payload?.member_id;
        },
        removeClubCurrentMember(state) {
            state.member_club_id = "";
            state.member_status = "";
            state.member_id = "";
        }
    }
})

export const { setClubCurrentMember, removeClubCurrentMember } = ClubCurrentMemberSlice.actions;
export default ClubCurrentMemberSlice.reducer;