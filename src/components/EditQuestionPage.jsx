import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isEditMode, selectQues, setEditModeFalse } from '../features/editQuizSlice';

const EditQuestionPage = ({onAddQuestion}) => {

    const dispatch = useDispatch()
    const editRef = useRef()

    const selectedQues = useSelector(selectQues)

  const editMode = useSelector( isEditMode )
  
    const index = selectedQues.index 

    const [questionText, setQuestionText] = useState(selectedQues.questionText );
    const [choice1, setChoice1] = useState( selectedQues.options[0]);
    const [choice2, setChoice2] = useState(selectedQues.options[1]);
    const [choice3, setChoice3] = useState(selectedQues.options[2]);
    const [choice4, setChoice4] = useState( selectedQues.options[3]);
    const [correctAnswer, setCorrectAnswer] = useState('');


    //handle submit question
    const handleEditSubmit = async (e) => {
      e.preventDefault()

      // Replace all line breaks with '\n' before saving the question text to the database
 
      
        onAddQuestion( {
            question: questionText,
            options: [ choice1, choice2, choice3, choice4 ],
            correctAnswer: correctAnswer,
        }, index)

     
            dispatch(setEditModeFalse())
       

        // console.log(data)
        setQuestionText('');
        setChoice1('');
        setChoice2('');
        setChoice3('');
        setChoice4('');
        setCorrectAnswer('');
    };
    

  useEffect( () => {
    window.scrollTo(0, 0)
  }, [] )


  return (
    <section className='create-ques'>
           <h1>Edit Question</h1>
      <form onSubmit={handleEditSubmit }>
        <div className='input-div'>
          <label>Question Text:</label>
          <textarea value={ questionText } onChange={ ( e ) => setQuestionText( e.target.value ) } required id='inp' />
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
              <button type='submit'>Save Edit</button>
      </form>
    </section>
  )
}

export default EditQuestionPage