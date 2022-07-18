import { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import "animate.css";
const FeedbackContext = createContext();

export const FeedbackProvider = ({ children, reverse }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  //Fetch feedback

  const fetchFeedback = async () => {
    const response = await fetch("http://localhost:5000/feedback?_sort=id&_order=desc");
    const data = await response.json();

    setFeedback(data);
    setIsLoading(false);
  };

  //add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch("http://localhost:5000/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();
    //console.log(data);

    setFeedback([data, ...feedback]);
  };

  const deleteFeedback = async (id) => {
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
       
         fetch(`http://localhost:5000/feedback/${id}`, {method: "DELETE" })
        setFeedback(feedback.filter((item) => item.id !== id))

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
      })
          
     
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
  const updateFeedback = async (id, updatedItem) => {

    const response = await fetch(`http://localhost:5000/feedback/${id}`, {
      method : "PUT",
      headers: {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(updatedItem)
    })

    const data =  await response.json()
    setFeedback(
      feedback.map((item) =>
        item.id === id ? { ...item, ...data } : item
      )
    );
  };



  return (
    <FeedbackContext.Provider
      value={{
        feedback: feedback,
        feedbackEdit: feedbackEdit,
        isLoading: isLoading,
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
