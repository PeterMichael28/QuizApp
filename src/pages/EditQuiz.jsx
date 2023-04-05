import React, { useEffect, useState } from "react";
import CreateQuestionPage from "../components/CreateQuestionPage";
import { useDispatch, useSelector } from "react-redux";
import {
 isEditMode,
 selectQuestion,
 setEditModeTrue,
} from "../features/editQuizSlice";
import EditQuestionPage from "../components/EditQuestionPage";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
 doc,
 getDoc,
 updateDoc,
 setDoc,
 serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import Spinner from "../components/Spinner";
import { onClickLight } from "../utils/datas";
import EmailValidation from "../components/EmailValidation";
import ThreeDotsLoader from "../components/ThreeDotsLoader";

const EditQuiz = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const editMode = useSelector(isEditMode);
 const { quizId } = useParams();
 const [loading, setLoading] = useState(true);
 const [quizName, setQuizName] = useState("");
 const [quizDescription, setQuizDescription] = useState("");
 const [timeLimit, setTimeLimit] = useState(0);
 const [questions, setQuestions] = useState([]);
 const [email, setEmail] = useState("");
 const [validation, setValidation] = useState(true);
 const [onSave, setOnSave] = useState(false);
 const [pageNav, setPageNav] = useState(false)
  
  //fetching the data
 useEffect(() => {
  const fetchData = async () => {
   const docRef = await doc(db, "quizDetails", quizId);
   const docSnap = await getDoc(docRef);

   if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());

    setQuizName(docSnap.data()?.quizName);
    setTimeLimit(docSnap.data()?.timeLimit);
    setQuestions(docSnap.data()?.questions);
    setQuizDescription(docSnap.data()?.quizDescription);
    setEmail(docSnap.data()?.email);

    setLoading(false);
   } else {
    // doc.data() will be undefined in this case
    // console.log("No such document!");
    toast.error(
     "Error loading quiz, please try again later!!!"
    );
    setLoading(false);
    return;
   }
   // console.log(docSnap)
  };
  fetchData();
 }, [quizId]);

 const handleAddQuestion = (newQuestion, index) => {
  //if edited
  if (index || index === 0) {
   const filteredQuestion = questions.filter(
    (ques, i) => i !== index
   );
   const updatedQues = [...filteredQuestion, newQuestion];
   setQuestions(updatedQues);
  } else {
   //if created
   const filteredQuestion = questions;
   const updatedQues = [...filteredQuestion, newQuestion];
   setQuestions(updatedQues);
  }

  toast.success("Question Added!!!");
 };

 //save quiz handler
 const handleSaveQuiz = async () => {
  //checking if all fields are filled

  if (
   !quizName ||
   !quizDescription ||
   timeLimit < 0 ||
   questions.length === 0
  ) {
   alert("All fields are required");
   return;
  }

  setOnSave(true);
  const quizDetails = {
   quizName,
   quizDescription,
   questions,
   timeLimit,
   email,
  };

  // console.log(quizDetails)

  await setDoc(doc(db, "quizDetails", quizId), {
   ...quizDetails,
   timeStamp: serverTimestamp(),
  });

  setOnSave(false);
  navigate("/quiz-categories");
  // console.log('success')

  //save to database
 };

 //selecting a question to edit
 const handleSetEdit = (questionText, options, index) => {
  dispatch(
   selectQuestion({
    index,
    questionText,
    options,
   })
  );

  dispatch(setEditModeTrue());
 };

 //deleting a question function
 const handleDelete = (index) => {
  const filteredQuestion = questions.filter(
   (ques, i) => i !== index
  );

  setQuestions(filteredQuestion);
  toast.error("Question Deleted!!!");
 };

  
 //while loading show a loader
 if (loading) {
  return <Spinner message="Loading Quiz..." />;
 }

 if (validation) {
  return (
   <EmailValidation
    setValidation={setValidation}
    emailValidation={email}
   />
  );
 }

 const handleCancel = () => {
  //confirm ad tell user that are they sure they want to cancel, as all changes will be lost if they proceed
  navigate("/quiz-categories");
 };

 return (
  <div className="create-quiz">
   <h1 className="h1">Edit Quiz</h1>

   {/* first Page */}
     { !pageNav && (
       <div>
    <div className="input-div">
     <label>Quiz Name:</label>
     <input
      type="text"
      value={quizName}
      onChange={(e) => setQuizName(e.target.value)}
      required
      placeholder='Quiz name...'
     />
    </div>
    <div className="input-div">
     <label>Quiz Description:</label>
     <textarea
      value={quizDescription}
      onChange={(e) => setQuizDescription(e.target.value)}
      required
       placeholder='more about your quiz...'
     />
    </div>

    <div className="input-div">
     <label>
      Time Limit: <small>(In minutes)</small>
     </label>
     <input
      type="telephone"
      value={timeLimit}
      onChange={(e) => setTimeLimit(e.target.value)}
      placeholder='time limit in minutes'
     />
    </div>
    <hr />
       </div>
     ) }


{/* next page */}
     { pageNav && (
       <div>
       {/* show edit question if editmode is true */}
  {!editMode && (
    <CreateQuestionPage onAddQuestion={handleAddQuestion} />
   )}
   {editMode && (
    <EditQuestionPage onAddQuestion={handleAddQuestion} />
   )}
   {questions.length > 0 && (
    <div className="ques-list">
     <h2>Questions</h2>
     {
      <div className="ques-con">
       {questions?.map((question, index) => (
        <div key={index} className="ques-card">
         <h3>Question {index + 1}</h3>
         <p>Question: {question.question}</p>
         <p>Options:</p>
         <ul>
          {question?.options?.map((option, index) => (
           <li key={index}>
            Option {index}: {option}
           </li>
          ))}
         </ul>
         <p>Correct Answer: {question?.correctAnswer}</p>
         <div className="btns-con">
          <button
           onClick={() =>
            handleSetEdit(
             question.question,
             question.options,
             index
            )
           }
           className="edit"
          >
           <AiFillEdit />
          </button>
          <button
           onClick={() => handleDelete(index)}
           className="delete"
          >
           <MdDelete />
          </button>
         </div>
        </div>
       ))}
      </div>
     }
    </div>
   )}
       </div>
     ) }

   

   <hr />

     <div className='action-btns'>
   { <button style={{background : '#01bdd7'}} className='save-btn' onClick={ () => setPageNav( !pageNav )  }>{pageNav ? 'Back' : 'Next' }</button>}
   <button onClick={handleSaveQuiz} className="save-btn">
    {!onSave ? (
     "Save Edit"
    ) : (
     <ThreeDotsLoader color="white" />
    )}
   </button>
   <button
    className="save-btn cancel"
    onClick={() =>
     onClickLight(
      "Cancel Edit",
      "Are you sure you want to cancel and leave this page? All changes will be lost",
      handleCancel,
      null,
      "Yes"
     )
    }
   >
    Cancel
   </button>
       
   </div>
  </div>
 );
};

export default EditQuiz;
