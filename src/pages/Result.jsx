import { useDispatch, useSelector } from "react-redux";
import { resetQues, selectAllQuestions, selectOmittedQuestions, selectQuiz, selectRightAnswers, selectWrongAnswers } from "../features/quizSlice";
import { useNavigate } from "react-router-dom";

const Result = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const rightAnswers = useSelector( selectRightAnswers )
    const wrongAnswers = useSelector( selectWrongAnswers )
    const omitted = useSelector( selectOmittedQuestions )
    const allQuestions = useSelector( selectAllQuestions )
    const quizDetails = useSelector( selectQuiz )

    //the reset function
    const handleReset = async () => {
        dispatch(resetQues()) 
        navigate( `/quiz/${ quizDetails.id }`)
    
    }

    //the go back home function
    const handleHome = () => {
        dispatch(resetQues('option'))
        navigate( `/quiz-categories`)
    }


    //total scores in %
    const totalScoreInPercent = Math.ceil((rightAnswers/allQuestions) * 100)
    return (
        <div className="results">
            <h2>Results</h2>
            <h3>{totalScoreInPercent < 50 ? 'Oooppss!!!' : 'Congratulations!!!' }</h3>
            <p className="total">Total Score: <span style={{color: totalScoreInPercent < 50 ? 'crimson' : 'green'}}>{ totalScoreInPercent }%</span></p>
            <div className="result-text">
                <p>Number of right answers: <span>{rightAnswers }</span></p>
                <p>Number of wrong answers: <span>{wrongAnswers}</span></p>
                <p>Number of omitted questions: <span>{ omitted }</span></p>
                <p>Total Questions: <span>{ allQuestions }</span></p>
            </div>

            <div className="btns-con">
                <button onClick={handleReset}>Restart Quiz</button>
                <button onClick={handleHome}>Go Back Home</button>
            </div>
        </div>
    )
}

export default Result