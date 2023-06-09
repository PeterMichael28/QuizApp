import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
 nextquestion,
 prevQuestion,
 resetQues,
 selectCurrentQuestion,
 setSelectedAnswer,
} from "../features/quizSlice";
import { useNavigate } from "react-router-dom";
import { onClickLight } from "../utils/datas";

const Questions = ({ questions }) => {
 const navigate = useNavigate();

 const currentQuestion = useSelector(selectCurrentQuestion);

 const dispatch = useDispatch();
 const [selected, setSelected] = useState(false);

 const currentQues = questions[currentQuestion];
 const showPrevButton = currentQuestion > 0;
 const showNextButton =
  currentQuestion < questions.length - 1;
 // console.log(questions)

 //handle quit button
 const handleHome = () => {
  dispatch(resetQues("option"));
  navigate(`/quiz-categories`);
 };

 const formattedQuestionText = currentQues.question.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;").replace(/\n/g, '<br>');

   
 return (
  <main className="questions-con">
   <p className="question" dangerouslySetInnerHTML={{ __html: formattedQuestionText }} />

   {/* Options */}

   <div className="options-con">
    {currentQues.options?.map((option) => (
     <button
      key={option}
      style={{
       backgroundColor:
        option == questions[currentQuestion].selectedAnswer
         ? "green"
         : "",
      }}
      className={`option`}
      id="btns"
      onClick={() => dispatch(setSelectedAnswer(option))}
     >
      {option}
     </button>
    ))}
   </div>

   {/* Navigation Buttons */}
   <div className="btns-con">
    {showPrevButton && <button
     onClick={() => dispatch(prevQuestion())}
     disabled={!showPrevButton && true}
     className="previous"
    >
     Prev
    </button>}
  {showNextButton &&  <button
     onClick={() => dispatch(nextquestion())}
     disabled={!showNextButton && true}
     className="next"
    >
     Next
    </button>}
    {!showNextButton ? (
     <button onClick={() => navigate("/results")}  className="submit">
      Submit
     </button>
    ) : (
     <button 
        onClick={() =>  onClickLight('Cancel Quiz', 'Are you sure you want to quit', handleHome, null, 'Yes')}
        className="quit"
     >Quit</button>
    )}
   </div>
  </main>
 );
};
export default Questions;
