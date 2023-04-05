import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Spinner from '../components/Spinner';
import EmailValidation from "../components/EmailValidation";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const Instructions = () => {

    const {quizId} = useParams()
    const navigate = useNavigate()

  const [ loading, setLoading ] = useState( true )
  const [data, setData] = useState({})
  
    const dispatch = useDispatch()
  
    const [validation, setValidation] = useState(false)
  
    useEffect(() => {
      const fetchData = async () => {
          const docRef = await doc(db, "quizDetails", quizId);
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            setData(docSnap.data())
            setLoading(false)
            } else {
             toast.error('Error loading quiz, please try again later!!!')
              setLoading(false)
              return
            }
      }
      fetchData()
  }, [quizId])
  // console.log(data)

  if ( loading ) {
    return <Spinner message='Loading...' />
  }
  
  return (
    <div className='instructions'>
      <h2>Quiz Details</h2>

      <div>
        <div className='details'>
          <h5>Quiz Name</h5>
          <hr />
          <p className='name'>{ data?.quizName }</p>
          <small>created by { data?.email }</small>
        </div>

        <div className='details description'>
          <h5>Quiz Description</h5>
          <hr />
          <p>{ data?.quizDescription }</p>
        </div>

        <div className='details'>
          <h5>Quiz Time</h5>
          <hr />
          <p>{ data?.timeLimit } minutes</p>
          <small>The quiz automatically ends when the time reaches zero(0)</small>
        </div>

        <div className='details'>
          <h5>Quiz Grading System</h5>
          <hr />
          <p>Each right answers carries 1 point</p>
        </div>
      </div>

      <Link to={`/quiz/${quizId}`} className='start'>Start Quiz</Link>


      <div className='btns-group'>
         <button
          onClick={(e) => {
           e.stopPropagation();
           navigate(`/edit-quiz/${quizId}`);
          }}
          className='edit'
         >
          <AiFillEdit />
          Edit
         </button>
         <button
          onClick={ ( e ) => {
            e.stopPropagation();
            setValidation(true)
          }}
          className='delete'
         >
          <MdDelete />
          Delete
         </button>
        </div>

          {
            validation && <EmailValidation setValidation={ setValidation } emailValidation={ data?.email } id={ quizId } instructions='instructions' />  
 
            
        }
    </div>
  )
}

export default Instructions