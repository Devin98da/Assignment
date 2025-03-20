import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getStudents = createAsyncThunk("admin/getStudents",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get("http://localhost:5000/api/admin/students/get");
            return res.data;

        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data.message || "Fetchin students is failed!");
        }
    }
)

export const addStudent = createAsyncThunk("admin/addStudent",
    async (studentData, { rejectWithValue }) => {


        const formData = new FormData();
        formData.append("id", studentData.id);
        formData.append("name", studentData.name);
        formData.append("email", studentData.email);
        formData.append("age", studentData.age);
        formData.append("image", studentData.image);
        formData.append("status", studentData.status);


        try {
            const res = await axios.post("http://localhost:5000/api/admin/students/add", formData);
            return res.data;

        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data.message || "Login is failed!");
        }
    }
);

export const editStudent = createAsyncThunk(
    "admin/editStudent",
    async (studentData, { rejectWithValue }) => {
        console.log(studentData);
        const {editStudentData, editStudentId} = studentData;

        const formData = new FormData();
        formData.append("id", editStudentData.id);
        formData.append("name", editStudentData.name);
        formData.append("email", editStudentData.email);
        formData.append("age", editStudentData.age);
        formData.append("image", editStudentData.image);
        formData.append("status", editStudentData.status);

        console.log(formData.get('id'));
        console.log(formData.get('name'));
        console.log(formData.get('email'));
        console.log(formData.get('age'));
        console.log(formData.get('status'));
        console.log(formData.get('image'));

        try {
            const res = await axios.put("http://localhost:5000/api/admin/students/edit/" + editStudentId, formData);
            return res.data.student;
        } catch (error) {
            console.log(error)
            return rejectWithValue(
                error.response.data.message || "Failed to update student status"
            );
        }
    }
);

export const deleteStudent = createAsyncThunk("admin/deleteStudent",
    async (studentId, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/admin/students/delete/${studentId}`);
            return res.data;

        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data.message || "Fetchin students is failed!");
        }
    }
);

export const toggleStudentStatus = createAsyncThunk(
    "admin/toggleStudentStatus",
    async (studentId, { rejectWithValue }) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/admin/students/toggle-status/${studentId}`);
            return res.data.student;
        } catch (error) {
            console.log(error)
            return rejectWithValue(
                error.response.data.message || "Failed to update student status"
            );
        }
    }
);


const adminSlice = createSlice({
    name: 'students',
    initialState: {
        students: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addStudent.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(addStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.students = [...state.students, action.payload.student];
            })
            .addCase(addStudent.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            // fetch
            .addCase(getStudents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStudents.fulfilled, (state, action) => {
                state.loading = false;
                state.students = action.payload;
            })
            .addCase(getStudents.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            //delete
            .addCase(deleteStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload)
                state.students = state.students.filter(student =>
                    student._id !== action.payload.id
                )
            })
            .addCase(deleteStudent.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            //edit 
            .addCase(editStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editStudent.fulfilled, (state, action) => {
                state.loading = false;
                const updatedStudent = action.payload.updatedStudent;
                const index = state.students.findIndex(s => s._id === updatedStudent._id);
                if (index !== -1) {
                    state.students[index] = updatedStudent;
                }
            })
            .addCase(editStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //toggel status
            .addCase(toggleStudentStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleStudentStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updatedStudent = action.payload;
                const index = state.students.findIndex(s => s._id === updatedStudent._id);
                if (index !== -1) {
                    state.students[index] = updatedStudent;
                }
            })
            .addCase(toggleStudentStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    }
})

export const { resetAuthError } = adminSlice.actions;
export default adminSlice.reducer;