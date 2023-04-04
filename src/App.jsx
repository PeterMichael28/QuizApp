

import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import OnBoarding from "./pages/OnBoarding";
import QuizPage from "./pages/QuizPage";
import Result from "./pages/Result";
import CreateQuiz from "./pages/CreateQuiz";
import EditQuiz from "./pages/EditQuiz";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <OnBoarding />
  },
  {
    path: "/quiz-categories",
    element: <Home />
  },
  {
    path: "/quiz/:quizId",
    element: <QuizPage />
  }, 
  {
    path: "/results",
    element: <Result />
  },
  {
    path: "/create-quiz",
    element: <CreateQuiz />
  },
  {
    path: "/edit-quiz/:quizId",
    element: <EditQuiz />
  }
]);