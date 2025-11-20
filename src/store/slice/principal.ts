import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface PrincipalDetailsState {
    isLoading: boolean,
    data: [] | null,
    isError: boolean,
}

// Define the initial state using that type
const initialState: PrincipalDetailsState = {
    isLoading: false,
    data: null,
    isError: false,
}

// Define the CreateAnsyncThunk api
export const fetchPrincipalDetails = createAsyncThunk('fetchPrincipalDetails', async () => {
    try {
        const res = await fetch("http://localhost/backend/api/?action=principaldetails");

        if (!res.ok) {
            return console.log("Server error");
        }

        return await res.json();
    } catch (err) {
        return console.log(err);
    }
})

export const principalDetails = createSlice({
    name: 'principalDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPrincipalDetails.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
            .addCase(fetchPrincipalDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.isError = false
            })
            .addCase(fetchPrincipalDetails.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                console.log("Error", action.payload)
            })
    }
})

export default principalDetails.reducer