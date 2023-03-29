

import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import QuizPage from "./pages/QuizPage";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "quizzes",
    element: <QuizPage />
  },
]);