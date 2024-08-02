import React from 'react';
import './ExamInstructions.css';
import { useNavigate } from 'react-router-dom';

const ExamInstructions = ({id,time,questionSet}) => {
  const navigate = useNavigate()
  const handleStartQuiz = () => {
    navigate('/quiz/questions',{state:{questionSetId:id,questionSet:questionSet,time:time,}})
  }
  return (
    <div className="exam-instructions-container">
      
      <h2>Exam Instructions</h2>
      <ul>
        <li>This exam comprises of {questionSet.length} questions and you have {time} minutes to complete the exam, including the review.</li>
        <li>You need to score at least 75% to pass the exam.</li>
        <li>The exam comprises of the following types of questions:
          <ol>
            <li>Multiple Choice Single Response (MCSR)</li>
            <li>Multiple Choice Multiple Response (MCMR)</li>
          </ol>
        </li>
        <li>There is no negative marking.</li>
        <li>There is a timer at the upper-right corner of the exam screen that indicates the time remaining for the completion of the exam.</li>
        <li>Pause Quiz - You can pause the ongoing quiz anytime by clicking on 'Pause Quiz' button next to timer on the upper right corner. The timer/quiz will pause and resume only after you click on 'Continue the last attempt' button.</li>
        <li>You can go to any question in random by clicking on the question number displayed on the left hand side.</li>
        <li>Mark for Review - The question box will be marked as RED and is used for revisiting the question, if required, later during the exam.</li>
        <li>At any point of time during the exam, you can go back to any question and modify your choice(s) by clicking on the Previous and the Next buttons or Select the question number from the left side.</li>
        <li>You can stop the Quiz by clicking on the 'Finish Attempt' button.</li>
        <li>Click the Attempt Quiz Now to start the exam.</li>
      </ul>
      <div className="previous-attempts">
        <h3>Your Previous Attempts</h3>
        <table>
          <thead>
            <tr>
              <th>Attempt(s)</th>
              <th>Completed on</th>
              <th>Status</th>
              <th>Marks Obtained</th>
              <th>Percentage(%)</th>
              <th>Time Taken</th>
              <th>Mode</th>
              <th>Result</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Friday, 14 Feb 2020</td>
              <td>Completed</td>
              <td>8 / 15</td>
              <td>53.33 %</td>
              <td>00 H 26 M 12 S</td>
              <td>Exam</td>
              <td>Fail</td>
              <td><a href="#report">Report</a></td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="start-quiz-button" onClick={handleStartQuiz}>Start quiz</button>
    </div>
  );
}

export default ExamInstructions;
