import { createSlice } from '@reduxjs/toolkit'
import { reShuffle } from '../utils/datas';



const initialState = {
  quizDetails: {
    quizName: '',
    time: '',
    id: '',
    description: '',
    questions: []
  },
  currentQuestion: 0
   

}

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
      

    setQuiz: ( state, action ) => {
      const { quizName, time, questions, id, description } = action.payload;

      const newQuiz = { 
        quizName,
        time,
        id,
        questions,
        description
       }
      
      //  state.quiz.quizDetails = newQuiz
      // console.log(newQuiz)
      state.quizDetails = newQuiz
      // console.log(state.quizDetails)

    },

//selected answer reducer
    setSelectedAnswer: ( state, action ) => {
     
      const answer = action.payload
      const ques = state.quizDetails.questions
      const curretnQues = ques[ state.currentQuestion ]
      curretnQues.selectedAnswer = answer
      ques[state.currentQuestion] = curretnQues
      state.quizDetails.questions = ques
      
    },

    //next question reducer
    nextquestion: ( state, action ) => {
     let current = state.currentQuestion
      current++
      state.currentQuestion = current
    },
    

    //previous question reducer
    prevQuestion: ( state, action ) => {
      let current = state.currentQuestion
      current--
      state.currentQuestion = current
    },

    resetQues: ( state, action) => {

      const option = action.payload
      if ( option ) {
        return initialState
      }
      //resetting current question back to 0
     const newCurrentQuestionIndex = 0 
     
      state.currentQuestion = newCurrentQuestionIndex;
     
      // resetting all selected answer
      let quizDetails = state.quizDetails;
   
      const resetAnswer = quizDetails.questions.map( question => ({...question, selectedAnswer: ''}) );
    
    
      // reshuffling the questions
      const reShuffleQuestions = reShuffle( resetAnswer );

      //reshuffling the options 
      const reShuffleOptions = reShuffleQuestions.map( question => {
        let data = [...question.options]
        return {
          ...question,
          options: reShuffle( data )
        }
      })
      
      //updating the quiz details
      quizDetails = {
        ...quizDetails,
        questions:reShuffleOptions
      }

      
     
      //updating the state
      state.quizDetails = {...quizDetails}
    }
  },
})

// Action creators are generated for each case reducer function
export const {setQuiz, setSelectedAnswer, nextquestion, prevQuestion, resetQues } = quizSlice.actions
//selecting all quiz details
export const selectQuiz = ( state ) => state.quiz.quizDetails

//current question index
export const selectCurrentQuestion = ( state ) => state.quiz.currentQuestion

//selecting the list of right answers
export const selectRightAnswers = ( state ) => state.quiz.quizDetails.questions?.filter( question => question.selectedAnswer === question.correctAnswer ).length


//selecting the list of wrong answers
export const selectWrongAnswers = ( state ) => state.quiz.quizDetails.questions?.filter( question =>( question.selectedAnswer !== question.correctAnswer) && (question.selectedAnswer !== '') ).length


//selecting the list of omitted questions
export const selectOmittedQuestions = ( state ) => state.quiz.quizDetails.questions?.filter( question => !question.selectedAnswer ).length

//selecting number of all questions
export const selectAllQuestions = (state) => state.quiz.quizDetails.questions?.length


export default quizSlice.reducer