import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit'

const apiUrl = import.meta.env.ngrok_API_URL;
// Define a type for the slice state
export interface StudentState {
    isLoading: boolean,
    data: any[] | null,
    isError: boolean,
}

// Define the initial state using that type
const initialState: StudentState = {
    isLoading: false,
    data: null,
    isError: false,
}

// Define the CreateAnsyncThunk api
export const fetchStudentList = createAsyncThunk('fetchStudentList', async () => {
    try {
        const res = await fetch(`${apiUrl}?action=studentlist`);

        if (!res.ok) {
            console.log("Server error", res.status);
            return;
        }

        return await res.json();
    } catch (err) {
        return console.log(err);
    }
})
export const fetchAddStudent = createAsyncThunk(
    "fetchAddStudent",
    async (formdata: any, { rejectWithValue }) => {
        try {
            // FIRST REQUEST
            const res1 = await fetch(
                `${apiUrl}?action=addstudent`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: formdata.name,
                        father_name: formdata.father_name,
                        mother_name: formdata.mother_name,
                        class: formdata.class,
                        year: formdata.year,
                        teacher_name: formdata.teacher_name,
                    }),
                }
            );

            const studentData = await res1.json();

            if (studentData.status !== "success") {
                return rejectWithValue("Error Adding Student");
            }

            const student_id = studentData.id;

            // SECOND REQUEST
            const res2 = await fetch(
                `${apiUrl}?action=addstudentdetails`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        student_id,
                        rollNumber: formdata.rollNumber,
                        age: formdata.age,
                        course: formdata.course,
                        section: formdata.section,
                        attendance: formdata.attendance,
                        feesStatus: formdata.feesStatus,
                        grade: formdata.grade,
                        email: formdata.email,
                        phone: formdata.phone,
                        address: formdata.details_address,
                        pastYearMarks: formdata.pastYearMarks,
                        passingYear: formdata.passingYear
                    }),
                }
            );
            const detailsData = await res2.json();

            if (detailsData.status !== "success") {
                return rejectWithValue("Error Adding Student Details");
            }

            return {
                id: student_id,
                ...formdata,
            };

        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);


export const fetchDeleteStudent = createAsyncThunk('fetchDeleteStudent', async (id: number) => {
    try {
        const res = await fetch(`${apiUrl}?action=deletestudent&id=${id}`);

        if (!res.ok) {
            return console.log("Server error");
        }
        const data = await res.json();
        return { ...data, id }
    } catch (err) {
        return console.log(err);
    }
})

export const student = createSlice({
    name: 'student',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // list students
        builder.addCase(fetchStudentList.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
            .addCase(fetchStudentList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.isError = false
            })
            .addCase(fetchStudentList.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                console.log("Error", action.payload)
            });

        //  Add Student
        builder
            .addCase(fetchAddStudent.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchAddStudent.fulfilled, (state, action) => {
                state.isLoading = false;

                if (!Array.isArray(state.data)) {
                    state.data = [];
                }
                state.data.push(action.payload);
            })
            .addCase(fetchAddStudent.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                console.log("Add student error:", action.payload);
            });


        // Delete Student
        builder.addCase(fetchDeleteStudent.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
            .addCase(fetchDeleteStudent.fulfilled, (state, action) => {
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


            .addCase(fetchDeleteStudent.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                console.log("Error", action.payload)
            })
    }
})

export default student.reducer