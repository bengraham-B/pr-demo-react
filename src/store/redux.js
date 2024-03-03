import { createSlice } from "@reduxjs/toolkit";

export const prSlice = createSlice({
    name:"prRedux",

    initialState: {
        reduxPrArray:[],
        searchArray: [],
        userAuthStatus: false,
        userAdminStatus: false,
        userName: null,
    },

    reducers: {
        testReducer: (state, value) => {
            state.reduxPrArray.push(value.payload)
        },

        searchReducer: (state, value) => {
            state.searchArray.push(value.payload)
        },

        adminReducer: (state, value) => {
            state.userAdmin = value.payload
        }
    },
})

export const {testReducer, adminReducer, searchReducer} = prSlice.actions;
export default prSlice.reducer