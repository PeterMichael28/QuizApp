import React from 'react'
import { Link } from 'react-router-dom';
import bgImage from '../assets/quiz.jpg'

const OnBoarding = () => {
  
  return (
    <div className='onBoarding'>
    <img src={bgImage} alt="bgImage" />
    <Link to='/quiz-categories'>Proceed to the Quiz Page</Link>
  </div>
  )
}

export default OnBoarding