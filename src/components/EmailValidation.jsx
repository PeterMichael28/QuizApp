import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { toast } from 'react-toastify';
import { deleteDoc, doc } from 'firebase/firestore';
import ThreeDotsLoader from './ThreeDotsLoader';

const EmailValidation = ({emailValidation, setValidation, id, instructions}) => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [ validationError, setValidationError ] = useState( '' )
    const [onDelete, setOnDelete] = useState(false)


    //validating email before giving access to delete or edit
    const onValidate = async () => {
        if ( email !== emailValidation ) {
          setValidationError('Authorization Denied!!! Enter the correct email to continue')
        } else {
            if ( id ) {
                setOnDelete(true)
                await deleteDoc(doc(db, "quizDetails", id));
                toast.success('Quiz deleted successfully!!!')
                setOnDelete(false)
                setValidation(false)
                navigate('/quiz-categories')
            }
            setValidation(false)
        }
      }

    
  return (
      <section className='emailValidation'>
          <div className='con'>

            <p className='note'>Note: Only users that created the quiz are permitted to edit or delete it. 
            Please enter the email you used while creating the quiz to continue</p>
          <div className='input'>
              <label htmlFor="email">Email</label>
              <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='example@example.com' required/>
              {validationError && <small className='error'>{validationError}</small>}
          </div>

          <div className='btns'>
                  <button onClick={ () => {
                    if(instructions === 'instructions'){
                      navigate(`/instructions/${id}`)
                      setValidation(false)
                    } else {
                      navigate( '/quiz-categories' )
                      setValidation(false)
                    }
                     
                      
                  } }>Cancel</button>
            {!onDelete && <button onClick={onValidate}>Submit</button>}
            {onDelete && <ThreeDotsLoader color='#2e3e9d'/>}
          </div>
        </div>
        
         
    </section>
  )
}

export default EmailValidation