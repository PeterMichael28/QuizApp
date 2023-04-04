import { useLocation, useNavigate, useParams } from 'react-router-dom';
import bgImage from '../assets/quiz.jpg'
import timerImage from '../assets/timer.jfif'
import Questions from './Questions';
import {useEffect, useState} from 'react'
import { selectCurrentQuestion, selectQuiz, setQuiz } from '../features/quizSlice';
import { useDispatch, useSelector } from 'react-redux';
import { reShuffle } from '../utils/datas';
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { MdOutlineTimer } from "react-icons/md";


const QuizPage = () => {

 const {quizId} = useParams()
  const navigate = useNavigate()

  const {quizName, time, questions} = useSelector(selectQuiz)

  const [ timer, setTimer ] = useState( {
    seconds: 0,
    minutes: 0
  })

 const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  

  useEffect(() => {
    const fetchData = async () => {
        const docRef = await doc(db, "quizDetails", quizId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
          
          dispatch( setQuiz( {
            quizName: docSnap.data()?.quizName,
            time: docSnap.data()?.timeLimit,
            id: quizId,
            questions: reShuffle( docSnap.data()?.questions?.map( question => ( { ...question, selectedAnswer: '' } ) ) ),
            description: docSnap.data()?.quizDescription
          }))

        //  setTimer({...timer, minutes:Number(docSnap.data()?.timeLimit)})
          setLoading(false)
          } else {
            // doc.data() will be undefined in this case
            // console.log("No such document!");
           toast.error('Error loading quiz, please try again later!!!')
            setLoading(false)
            return
          }
        // console.log(docSnap)
    }
    fetchData()
}, [quizId])


//timer
  useEffect( () => {
        const countDownTime = Date.now() + 1000 * ( 60 * time )
      const int = setInterval( () => {
        if ( time ) {
          const now = new Date()
          const distance = countDownTime - (+now)
    
       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
       const seconds = Math.floor((distance % (1000 * 60)) / 1000)
     
            setTimer( {
              minutes,
              seconds,
            })

            if ( distance && distance < 1000 ) {
              clearInterval(int)
              navigate("/results")
              setTimer( {
                minutes: 0,
                seconds: 0
              })
              return
            }
         
     }
        

   }, 1000 )
    
    
  }, [time])

  
 


  const currentQuestion = useSelector(selectCurrentQuestion)

  if ( loading ) {
  return <Spinner message='Loading Questions' />
}

  return (
    <div className='quiz'>
      <img src={bgImage} alt="bgImage" />

      <div className='quiz-question-con'>
        <h2>{quizName }</h2>
        <div className='quiz-details'>
          <p>Question {currentQuestion + 1} of {questions?.length}</p>
          <div className='timer' style={{color: time.minutes < 5 ? 'crimson' : 'green'}}>
            <MdOutlineTimer fontSize={20}/>
            <p>{ timer.minutes < 9 ? `0${timer.minutes}` : timer.minutes}:{timer.seconds < 9 ? `0${timer.seconds}` : timer.seconds}</p>
          </div>
        </div>
          {questions.length > 0 && <Questions questions={ questions} />}
      </div>
      
    </div>
  )
}

export default QuizPage