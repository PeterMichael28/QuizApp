import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

import Spinner from "../components/Spinner";
import { onClickLight } from "../utils/datas";


const Home = () => {
 const navigate = useNavigate();

 const [data, setData] = useState([]);
  const [ loading, setLoading ] = useState( true );
  const [ deleting, setDeleting ] = useState( true );
  const [validation, setValidation] = useState(false)
  
//fetch Data
 useEffect(() => {
  const fetchData = async () => {
   const list = [];
   try {
    const querySnapshot = await getDocs(
     collection(db, "quizDetails")
    );
    querySnapshot.forEach((doc) => {
     list.push({ id: doc.id, ...doc.data() });
    });
    // console.log(list)
    await setData(list);
    setLoading(false);
   } catch (error) {
    console.log(error);
    setLoading(false);
   }
  };
  fetchData();
 }, []);



 //   const sortedActivities = data?.sort((a, b) => b.timeStamp.toDate() - a.timeStamp.toDate())

 if (loading) {
  return <Spinner message='Loading quiz categories'/>;
 }



 return (
  <div className="home">
   <div className="home-con">
    <h2>Select A Quiz to Continue</h2>

    {data.length > 0 ? (
     <div className="quiz-category">
      {data.map((quiz) => (
       <Link to={`/instructions/${quiz.id}`}
        key={quiz.id}
       >
        {quiz.quizName}
       
       </Link>
      ))}
     </div>
    ) : (
     <p className="no-quiz">
      No Quiz available right now, Please try again later or create a quiz to continue
     </p>
    )}

    <Link to="/create-quiz" className="create">
     Create Quiz
    </Link>
   </div>
  </div>
 );
};

export default Home;
