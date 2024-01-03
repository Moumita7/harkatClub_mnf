import { apiSlice } from "./baseEndpoints";

export const harkatClubSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getHatkatData: builder.query({
            query: () => ({
                url: `/harkat/api/v1/Clubs`,
                method: "GET",
            }),
            providesTags: ["clubs"]
        }),
        getHatkatDataNew: builder.query({
            query: () => ({
                url: `/harkat/clublistingapi`,
                method: "GET",
            }),
            providesTags: ["clubss"]
        }),
    
        getClubMember: builder.query({
            query: () => ({
                url: `/harkat/club-user`,
                method: "GET",
            }),
            providesTags: ["clubsm"]
        }),
        getClubData: builder.query({
            query: (id) => ({
                url: `/harkat/club-api/${id}`,
                method: "GET",  
            }),
            providesTags: ["club"]
        }),
        getEvent: builder.query({
            query: (id) => ({
                url: `/harkat/club-events?club_id=${id}`,
                method: "GET", 
            }),
            providesTags: ["club_images"]
        }),
        deleteClubMedia: builder.mutation({
            query: (id) => ({
                url: `/harkat/api/v1/Club-Media/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["club_media"]
        }),
        updateClubMedia: builder.mutation({
            query: (data) => {
                const id = data.id;
                const body = data.body;
                return {
                    url: `/harkat/api/v1/Club-Media/${id}/`,
                    method: 'PUT',
                    body: body,
                }
            },
            invalidatesTags: ["club_media"]
        }),
        getClubMedia: builder.query({
            query: ({ id, page_number }) => ({
                url: `/harkat/club-media?club_id=${id}&page=${page_number}`,
                method: "GET",
            }),
            providesTags: ["club_media"]
        }),
        uploadVideo: builder.mutation({
            query: (body) => ({
                url: `/harkat/api/v1/Club-Media/`,
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["club_media"]
        }),
        uploadImage: builder.mutation({
            query: (body) => ({
                url: `/harkat/api/v1/Club-Media/`,
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["club_media"]
        }),
        createEvent: builder.mutation({
            query: (body) => ({
                url: `/harkat/api/v1/Club-Events/`,
                method: "POST",
                body: body, 
            }),
            invalidatesTags: ["club_events"]
        }),
        requestJoinform: builder.mutation({
            query: (body) => ({
                url: `/harkat/api/v1/join-club-member/`,
                method: "POST",
                body: body,  
            }),
            invalidatesTags: ["join-club-member"]
        }),
        memberUpdate: builder.mutation({
            query: (body) => ({
                url: `/harkat/club-member-handler`,
                method: "PUT",
                body: body,
            }),
            invalidatesTags: ["member-hanlder"]
        }),
        memberBlock: builder.mutation({
            query: (body) => ({
                url: `/harkat/club-member-handler`,
                method: "PUT",
                body: body,
            }),
            invalidatesTags: ["member-hanlder"]
        }),
        deleteRQ: builder.mutation({
            query: (id) => ({
                url: `/harkat/api/v1/join-club-member/${id}`,
                method: "DELETE",  
            }),
            invalidatesTags: ["member-hanlder"]
        }),
       
             getShareData: builder.query({
            query: (id) => ({
                url: `/memberpage/centraldatabaseapi/userid${id}`,
                method: "GET", 
            }),
            providesTags: ["sharedata"]
        }),
    }),
})

export const { useGetHatkatDataQuery,useGetHatkatDataNewQuery, useGetClubDataQuery, useGetClubMemberQuery, useCreateEventMutation, useRequestJoinformMutation, useMemberUpdateMutation, useGetEventQuery, useUpdateClubMediaMutation, useGetClubMediaQuery, useDeleteClubMediaMutation, useUploadImageMutation, useUploadVideoMutation, useMemberBlockMutation, useDeleteRQMutation ,useGetShareData} = harkatClubSlice;