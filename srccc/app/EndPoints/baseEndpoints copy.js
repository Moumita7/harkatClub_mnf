import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
const URL = "http://115.245.192.138/harkat";
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}
const csrfToken = Cookies.get('csrftoken')
const csrf = {
    'X-CSRFToken': csrfToken
}
export const baseApi = createApi({
    reducerPath: "HarkatBase",
    baseQuery: fetchBaseQuery({
        baseUrl: URL,
    }),
    tagTypes: ["harkat", "club", "post"],
    endpoints: (builder) => ({
        getHatkatData: builder.query({
            query: () => ({
                url: `/api/v1/Clubs`,
                method: "GET",
                headers: headers
            }),
            providesTags: ["clubs"]
        }),
        getClubMember: builder.query({
            query: () => ({
                url: `/club-user`,
                method: "GET",
                headers: headers
            }),
            providesTags: ["clubs"]
        }),
        getClubData: builder.query({
            query: (id) => ({
                url: `/club-api/${id}`,
                method: "GET",
                headers: headers
            }),
            providesTags: ["club"]
        }),
        getEvent: builder.query({
            query: (id) => ({
                url: `/club-events?club_id=${id}`,
                method: "GET",
                headers: headers
            }),
            providesTags: ["club_images"]
        }),
        deleteClubMedia: builder.mutation({
            query: (id) => ({
                url: `/api/v1/Club-Media/${id}/`,
                method: "DELETE",
                headers: csrf
            }),
            invalidatesTags: ["club_media"]
        }),
        updateClubMedia: builder.mutation({
            query: (data) => {
                const id = data.id;
                const body = data.body;
                return {
                    url: `/api/v1/Club-Media/${id}/`,
                    method: 'PUT',
                    body: body,
                    headers: csrf
                }
            },
            invalidatesTags: ["club_media"]
        }),
        getClubMedia: builder.query({
            query: ({ id, page_number }) => ({
                url: `/club-media?club_id=${id}&page=${page_number}`,
                method: "GET",
                headers: headers
            }),
            providesTags: ["club_media"]
        }),
        uploadVideo: builder.mutation({
            query: (body) => ({
                url: `/api/v1/Club-Media/`,
                method: "POST",
                body: body,
                headers: csrf
            }),
            invalidatesTags: ["club_media"]
        }),
        uploadImage: builder.mutation({
            query: (body) => ({
                url: `/api/v1/Club-Media/`,
                method: "POST",
                body: body,
                headers: csrf
            }),
            invalidatesTags: ["club_media"]
        }),
        createEvent: builder.mutation({
            query: (body) => ({
                url: `/api/v1/Club-Events/`,
                method: "POST",
                body: body,
                headers: csrf
            }),
            invalidatesTags: ["club_events"]
        }),
        requestJoinform: builder.mutation({
            query: (body) => ({
                url: `/api/v1/join-club-member/`,
                method: "POST",
                body: body,
                headers: csrf
            }),
            invalidatesTags: ["join-club-member"]
        }),
        memberUpdate: builder.mutation({
            query: (body) => ({
                url: `/club-member-handler`,
                method: "PUT",
                body: body,
                headers: csrf
            }),
            invalidatesTags: ["member-hanlder"]
        }),
        memberBlock: builder.mutation({
            query: (body) => ({
                url: `/club-member-handler`,
                method: "PUT",
                body: body,
                headers: csrf
            }),
            invalidatesTags: ["member-hanlder"]
        }),
        deleteRQ: builder.mutation({
            query: (id) => ({
                url: `/api/v1/join-club-member/${id}`,
                method: "DELETE",
                headers: csrf
            }),
            invalidatesTags: ["member-hanlder"]
        }),
    }),
})

export const { useGetHatkatDataQuery, useGetClubDataQuery, useGetClubMemberQuery, useCreateEventMutation, useRequestJoinformMutation, useMemberUpdateMutation, useGetEventQuery, useUpdateClubMediaMutation, useGetClubMediaQuery, useDeleteClubMediaMutation, useUploadImageMutation, useUploadVideoMutation, useMemberBlockMutation, useDeleteRQMutation } = baseApi;