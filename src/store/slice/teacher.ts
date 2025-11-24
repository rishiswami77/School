import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit'

// const apiUrl = import.meta.env.ngrok_API_URL;

// Define a type for the slice state
export interface TeacherState {
    isLoading: boolean,
    data: any[] | null,
    isError: boolean,
}

// Define the initial state using that type
const initialState: TeacherState = {
    isLoading: false,
    data: null,
    isError: false,
}

// Define the CreateAnsyncThunk api
export const fetchTeacherList = createAsyncThunk('fetchTeacherList', async () => {
    try {
        const res = await fetch(`http://localhost/backend/api/?action=teacherlist`);

        if (!res.ok) {
            return console.log("Server error");
        }

        return await res.json();
    } catch (err) {
        return console.log(err);
    }
})

export const fetchDeleteTeacher = createAsyncThunk('fetchDeleteStudent', async (id: number) => {
    try {
        const res = await fetch(`http://localhost/backend/api/?action=deleteteacher&id=${id}`);

        if (!res.ok) {
            return console.log("Server error");
        }
        const data = await res.json();
        return { ...data, id }
    } catch (err) {
        return console.log(err);
    }
})
export const teacher = createSlice({
    name: 'teacher',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //  List Teacher
        builder.addCase(fetchTeacherList.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
            .addCase(fetchTeacherList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.isError = false
            })
            .addCase(fetchTeacherList.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                console.log("Error", action.payload)
            })

        // Delete teacher
        builder.addCase(fetchDeleteTeacher.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
            .addCase(fetchDeleteTeacher.fulfilled, (state, action) => {
                state.isLoading = false;

                const { success, studentId } = action.payload;

                // check for API success
                if (success !== "Student deleted") {
                    state.isError = true;
                    return;
                }

                // if data is null, nothing to remove
                if (!Array.isArray(state.data)) {
                    return;
                }

                // remove student by ID
                state.data = state.data.filter(student => student.id !== studentId);
            })


            .addCase(fetchDeleteTeacher.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                console.log("Error", action.payload)
            })
    }
})

export default teacher.reducer