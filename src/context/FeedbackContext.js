import { createContext, useState } from "react";
import Swal from "sweetalert2";
import "animate.css";
import { v4 as uuidv4 } from "uuid";
const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      rating: 8,
      subject: "Subject",
      text: "From context Search for the keywords to learn more about each warning. To ignore, add eslint-disable-next-line to the line before.",
    },
    {
      id: 2,
      rating: 7,
      subject: "Subject",
      text: "From context Search for the keywords to learn more about each warning. To ignore, add eslint-disable-next-line to the line before.",
    },
    {
      id: 3,
      rating: 6,
      subject: "Subject",
      text: " From context Search for the keywords to learn more about each warning. To ignore, add eslint-disable-next-line to the line before.",
    },
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  const reverse = false;
  const deleteFeedback = (id) => {
    Swal.fire({
      title: "",
      background: reverse ? "black" : "white",
      color: reverse ? "white" : "black",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      text: "Are you sure you want to delete this review?",
      icon: "question",
      confirmButtonText: "OK",
      confirmButtonColor: "#202142",
      showCancelButton: true,
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        Swal.fire({
          title: "",
          background: reverse ? "black" : "white",
          color: reverse ? "white" : "black",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          text: "Review deleted successfully",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#202142",
        }).then(() => {
          setFeedback(feedback.filter((item) => item.id !== id));
        });
      }
    });
  };

  //this will set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  //update feedback item
  const updateFeedback = (id, updatedItem) => {
    setFeedback(
      feedback.map((item) =>
        (item.id === id ? { ...item, ...updatedItem } : item))
    )
  };
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    console.log(newFeedback);
    setFeedback([newFeedback, ...feedback]);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback: feedback,
        feedbackEdit: feedbackEdit,
        deleteFeedback: deleteFeedback,
        addFeedback: addFeedback,
        editFeedback: editFeedback,
        updateFeedback: updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
