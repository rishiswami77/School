import { configureStore } from '@reduxjs/toolkit'
import teacherReducer from './slice/teacher'
import studentReducer from './slice/student'
import principalDetailsReducer from './slice/principal'

export const store = configureStore({
    reducer: {
        teacher: teacherReducer,
        student: studentReducer,
        principalDetails: principalDetailsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store