# Quiz App
This is a quiz application built with React JS as the front-end and Firebase as the backend.

## Features
The application has the following features:

Users can create a quiz by providing the quiz name, description, points/grading system, and time limit.

Users can edit the quiz by adding or deleting questions and adding or deleting multiple choice answer options.

Users can take the quiz and receive immediate feedback on their score.

Users can create questions for their quiz with 4 options and paginate through them.

Users can answer one question at a time while taking the quiz with next and previous pagination.

Timer function to end quiz when time is up.

Only the user that created the quiz can edit the questions by using their email as verification.
Installation

### To run the application, follow these steps:

Clone the repository by running the following command in your terminal:

git clone https://github.com/your_username/quiz-app.git

Navigate to the project directory and install the dependencies:

cd quiz-app

npm install

Create a Firebase project and add the Firebase configuration to a .env file at the root of the project. The .env file should look like this:

REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_DATABASE_URL=your_database_url
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

## Start the development server:

npm start

The application should now be running on http://localhost:5173.

## Usage
To create a new quiz, click on the "Create Quiz" button on the home page and fill in the required fields.

To edit a quiz, click on the "Edit" button on the quiz instructions page and provide your email for verification.

To take a quiz, click on the quiz card on the home page and click the "Start Quiz" button.

While taking a quiz, you can navigate through the questions with the next and previous buttons.

When the time is up, the quiz will automatically end and your score will be displayed.

## Contributing
If you would like to contribute to this project, please open an issue or submit a pull request.

