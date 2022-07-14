import React from "react";
import { useState, useContext, useEffect } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm({ reverse }) {
  console.log(reverse);
  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (feedbackEdit.edit) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setSubject(feedbackEdit.item.subject);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);
  const handleTextChange = (e) => {
    if (text === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setBtnDisabled(true);
      setMessage("Text must be at least 10 characters");
    } else {
      setBtnDisabled(false);
      setMessage(null);
    }

    setText(e.target.value);
  };
  const handleSubjectChange = (e) => {
    if (subject === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (subject !== "" && subject.trim().length <= 10) {
      setBtnDisabled(true);
      setMessage("Subject must be at least 10 characters");
    } else {
      setBtnDisabled(false);
      setMessage(null);
    }

    setSubject(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim().length > 10 && subject.trim().length > 10) {
      const newFeedback = {
        subject: subject,
        text: text,
        rating: rating,
      };

      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }

      setText("");
      setSubject("");
      setRating(10);
      setBtnDisabled(true);
    }
  };

  return (
    <Card reverse={reverse}>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        {/* Rating select component */}
        <RatingSelect
          reverse={reverse}
          select={(rating) => setRating(rating)}
        ></RatingSelect>
        <div
          className={`input-group ${reverse && "reverse"}`}
          style={{ marginBottom: "15px" }}
        >
          <input
            className={`input ${reverse && "reverse"}`}
            onChange={handleSubjectChange}
            type="text"
            placeholder="Review Subject"
            value={subject}
          ></input>
        </div>

        <div className={`input-group ${reverse && "reverse"}`}>
          <textarea
            className={`textarea ${reverse && "reverse"}`}
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          ></textarea>
        </div>
        <br></br>
        <Button type="submit" isDisabled={btnDisabled} float="right">
          Send
        </Button>
        <br></br>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
