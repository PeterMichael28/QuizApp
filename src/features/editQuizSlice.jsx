


import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  editMode: false,
  selectedQuestion: {}
}

const editQuizSlice = createSlice({
  name: 'ediQuiz',
  initialState,
  reducers: {

    selectQuestion: ( state, action ) => {

      
      const { index, questionText, options } = action.payload
      const ques = {
        index,
        questionText,
        options
      }

      state.selectedQuestion = ques
    },

    setEditModeTrue: ( state, action ) => {
      let currentMode = state.editMode
      currentMode = true
      state.editMode = currentMode
      
    },

    setEditModeFalse: ( state, action ) => {
      let currentMode = state.editMode
      currentMode = false
      state.editMode = currentMode
      
    }
  }
});

export const {selectQuestion, setEditModeTrue, setEditModeFalse} = editQuizSlice.actions

export const selectQues = ( state ) => state.editQuiz.selectedQuestion
export const isEditMode = ( state ) => state.editQuiz.editMode

export default editQuizSlice.reducer