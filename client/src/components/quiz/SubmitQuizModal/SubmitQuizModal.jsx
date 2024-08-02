import React, { useState } from "react";
import "./SubmitQuizModal.css";
import { auth } from "@/firebase/Firebase";
import { API } from "@/utils/AxiosInstance";
import { v4 as uuidv4 } from "uuid";
import { faCircleCheck, faPlaneCircleCheck } from "@fortawesome/free-solid-svg-icons";


const SubmitQuizModal = ({
  questionSetId,
  totalQuestions,
  selectedOption,
  setSelectedOption,
  totalAnswered,
  totalReviewed,
  skippedQuestion,
  reviewQuestions,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const user = auth.currentUser;
  const userId = user.uid;

  let id = 0;

  const SubmitUserResult = async () => {
    try {
      const data = await API.get("/test-result");
      id = data.data[0].id + 1;
    } catch (error) {
      console.log(error);
    }

    // try {
    //   const userId = 123;
    //   console.log("About to post test result");
    //   const response = await API.post("/api/test-result", {
    //     id,
    //     userId,
    //     questionSetId,
    //     totalQuestions,
    //     totalAnswered,
    //     skippedQuestion,
    //     totalReviewed,
    //   });
    //   console.log("Post response:", response);
    //   console.log('hiii')
    //   setIsSubmitted(true);
    //   // Reset submission status after 3 seconds (for demo purposes)
    //   setTimeout(() => setIsSubmitted(false), 3000);
      
    // } catch (error) {
    //   console.log(error);
    //   console.log("Error posting test result:", error);
    // }

    try {
        console.log("About to post test result");
        const userId = 123;
        const response = await fetch("http://localhost:5000/api/test-result", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            userId,
            questionSetId,
            totalQuestions,
            totalAnswered,
            skippedQuestion,
            totalReviewed,
          }),
        });
        const result = await response.json();
        console.log("Post response:", result);
        console.log('hiii');
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
      } catch (error) {
        console.error("Error posting test result:", error);
      }
    };
    
 

  return (
    <div className="modal-container">
      <h3 className="header">Do you want to finish the quiz?</h3>
      <h5 className="note">
        Note:
        <span className="note-span">
          {" "}
          After submitting the quiz, you will not be able to re-attempt it.
        </span>
      </h5>
      <div>
        <button className="submit-button" onClick={SubmitUserResult}>
          Submit
        </button>
        <div className="checkmark-container">
          {isSubmitted && (
            <div className="checkmark-wrapper">
            <FontAwesomeIcon className="checkmark-icon"  icon={faCircleCheck} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmitQuizModal;
