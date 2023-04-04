import { configureStore } from '@reduxjs/toolkit'
import quizReducer from '../features/quizSlice'
import editQuizReducer from '../features/editQuizSlice'

export const store = configureStore({
  reducer: {
    'quiz': quizReducer,
    'editQuiz': editQuizReducer
  },
})
