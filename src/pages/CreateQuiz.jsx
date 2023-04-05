import React, { useState } from 'react'
import CreateQuestionPage from '../components/CreateQuestionPage';
import EditQuestionPage from '../components/EditQuestionPage';
import { useDispatch, useSelector } from 'react-redux';
import { isEditMode, selectQuestion, setEditModeTrue } from '../features/editQuizSlice';
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
// import { db } from '../firebase/firebase';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { onClickLight } from '../utils/datas';
import ThreeDotsLoader from '../components/ThreeDotsLoader';



const CreateQuiz = () => {
  const navigate = useNavigate()

  const [quizName, setQuizName] = useState('');
  const [email, setEmail] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [onSave, setOnSave] = useState(false)
  const [pageNav, setPageNav] = useState(false)

  const dispatch = useDispatch()
  const editMode = useSelector(isEditMode)



//on add each questions
  const handleAddQuestion = (newQuestion, index) => {

    if ( index || index === 0  ) {
      const filteredQuestion = questions.filter((ques, i) => i !== index)

      const updatedQues = [...filteredQuestion, newQuestion]
      setQuestions(updatedQues);


    } else {

      const filteredQuestion = questions
  
      const updatedQues = [...filteredQuestion, newQuestion]
    setQuestions(updatedQues);
    }

    toast.success('Question Added!!!')
  };


//saving quiz
  const handleSaveQuiz = async () => {
    //checking if all fields are filled

    if ( !quizName || !quizDescription || timeLimit < 0 || questions.length === 0 ) {
      toast.error('All fields are required')
        return
    }
    setOnSave(true)
    const quizDetails = {
      quizName,
      quizDescription,
      questions,
      timeLimit,
      email
    }

    // const randomNum = Math.ceil(Math.random() * 100)
    // console.log(quizDetails)
     await setDoc(doc(db, "quizDetails", uuidv4()), {
       ...quizDetails,
       timeStamp: serverTimestamp()
      });

     
      toast.success('Quiz saved successfully!!!')
      setOnSave(false)
      navigate('/quiz-categories')

    

    //save to database
  }

  //setting the global state to the selected question
  const handleSetEdit = (questionText, options, index) => {
    dispatch( selectQuestion( {
        index,
        questionText,
        options
  }))
  // console.log(questionText, options, index)

  dispatch(setEditModeTrue())
}

  //deleting a question function
  const handleDelete = (index) => {
    const filteredQuestion = questions.filter((ques, i) => i !== index)


  setQuestions(filteredQuestion);
  toast.error('Question Deleted!!!')
  }

  //handling the cancel button
const handleCancel = () => {
    //confirm ad tell user that are they sure they want to cancel, as all changes will be lost if they proceed
    navigate('/quiz-categories')
  }



  return (
    <div className='create-quiz'>

      
      
        <h1 className='h1'>Create a New Quiz</h1>
      <div>
        {/* first page */}
        {!pageNav &&
          (<div>       
      <div className='input-div'>
          <label>Email:</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder='example@example.com'/>
        </div>
        <div className='input-div'>
          <label>Quiz Name:</label>
          <input type="text" value={quizName} onChange={(e) => setQuizName(e.target.value)} required placeholder='Quiz name...'/>
        </div>
        <div className='input-div'>
          <label>Quiz Description:</label>
          <textarea value={quizDescription} onChange={(e) => setQuizDescription(e.target.value)} required placeholder='more about your quiz...'/>
        </div>

        <div className='input-div'>
          <label>Time Limit: <small>in minutes</small></label>
          <input type="telephone" value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} placeholder='time limit in minutes'/>
        </div>

        <hr />
          </div>)
        }
      
        
        {/* second page */}
        {pageNav &&
         ( <div>
        {!editMode && <CreateQuestionPage onAddQuestion={handleAddQuestion} />}
         {editMode && <EditQuestionPage onAddQuestion={handleAddQuestion} />}
         <hr />
        { questions.length > 0 && (
          <div className='ques-list'>
                <h2>Questions</h2>
                        {
                            <div className='ques-con'>
                            { questions?.map( ( question, index ) => (
                          <div key={index} className='ques-card'>
                            <h3>Question {index + 1}</h3>
                            <p>Question: {question.question}</p>
                            <p>Options:</p>
                            <ul>
                              {question?.options?.map((option, index) => (
                                <li key={ index }>Option { index }: {option}</li>
                              ))}
                            </ul>
                            <p>Correct Answer: {question?.correctAnswer}</p>
                            <div className='btns-con'>
                            <button onClick={() => handleSetEdit(question.question, question.options, index)} className='edit'><AiFillEdit /></button>
                            <button onClick={() => handleDelete(index)} className='delete'><MdDelete /></button>
                              
                            </div>
                          </div>
                          ) )}

                        </div>
                          }
                       
          </div>
        )
        
        }   
<hr />
          </div>)
        }

        
        <div className='action-btns'>
          
        { <button style={{background : '#01bdd7'}} className='save-btn' onClick={ () => setPageNav( !pageNav )  }>{pageNav ? 'Back' : 'Next' }</button>}
        {pageNav && <button type="submit" onClick={handleSaveQuiz} className='save-btn'>{!onSave ? 'Create Quiz' : <ThreeDotsLoader color='white'/>}</button>}
       
        <button className='save-btn cancel' onClick={() =>  onClickLight('Cancel ', 'Are you sure you want to cancel and leave this page? All changes will be lost', handleCancel, null, 'Yes')}>Cancel</button>
       </div>
      </div>
    </div>
  )
}

export default CreateQuiz