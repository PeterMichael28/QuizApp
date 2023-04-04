import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isEditMode, selectQues, setEditModeFalse } from '../features/editQuizSlice';

const CreateQuestionPage = ({onAddQuestion}) => {
    const dispatch = useDispatch()

    const selectedQues = useSelector(selectQues)


    const [questionText, setQuestionText] = useState('');
    const [choice1, setChoice1] = useState('');
    const [choice2, setChoice2] = useState('');
    const [choice3, setChoice3] = useState('');
    const [choice4, setChoice4] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');

    const handleSubmit = async (e) => {
      
        e.preventDefault()
       
        onAddQuestion( {
            question: questionText,
            options: [ choice1, choice2, choice3, choice4 ],
            correctAnswer: correctAnswer,
        })

      

        // console.log(data)
        setQuestionText('');
        setChoice1('');
        setChoice2('');
        setChoice3('');
        setChoice4('');
        setCorrectAnswer('');
      };
  return (
      <div className='create-ques'>
           <h2>Create a New Question</h2>
      <form onSubmit={handleSubmit}>
        <div className='input-div'>
          <label>Question Text:</label>
          <input type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} required />
        </div>
        <div className='input-div'>
          <label>Choice 1:</label>
          <input type="text" value={choice1} onChange={(e) => setChoice1(e.target.value)} required />
        </div>
        <div className='input-div'>
          <label>Choice 2:</label>
          <input type="text" value={choice2} onChange={(e) => setChoice2(e.target.value)} required />
        </div>
        <div className='input-div'>
          <label>Choice 3:</label>
          <input type="text" value={choice3} onChange={(e) => setChoice3(e.target.value)} required />
        </div>
        <div className='input-div'>
          <label>Choice 4:</label>
          <input type="text" value={choice4} onChange={(e) => setChoice4(e.target.value)} required />
        </div>
        <div className='input-div'>
          <label>Correct Answer:</label>
          <select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} required>
            <option value="">Select Correct Answer</option>
            <option value={choice1}>Choice 1</option>
            <option value={choice2}>Choice 2</option>
            <option value={choice3}>Choice 3</option>
            <option value={choice4}>Choice 4</option>
          </select>
        </div>
              <button type='submit'>Save Question</button>
      </form>
    </div>
  )
}

export default CreateQuestionPage