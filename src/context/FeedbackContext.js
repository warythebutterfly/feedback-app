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
    // console.log("here")
    const response = await fetch("https://feedbackui-server.herokuapp.com/api/feedback/getall", {
      method: "GET",
      //mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify(data),
    });

    //console.log(response.json());

    //console.log(response);
    const responseBody = await response.json();

    //console.log(responseBody);

    setFeedback(responseBody.data);
    setIsLoading(false);
  };

  //add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch("https://feedbackui-server.herokuapp.com/api/feedback/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });

    const responseBody = await response.json();
    console.log(responseBody);

    setFeedback([responseBody.data, ...feedback]);
  };

  const deleteFeedback = async (id, subject) => {
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
      text: `Are you sure you want to delete this feedback ${subject}?`,
      icon: "question",
      confirmButtonText: "OK",
      confirmButtonColor: "#202142",
      showCancelButton: true,
    }).then(async (willDelete) => {
      if (willDelete.isConfirmed) {
        try {
          const response = await fetch(`https://feedbackui-server.herokuapp.com/api/feedback/delete?id=${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const responseBody = await response.json();

          console.log(responseBody);

          if(responseBody.statusCode === "00"){
          setFeedback(feedback.filter((item) => item.id !== id));

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
            text: "Feedback deleted successfully",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#202142",
          });
        }
        else if(responseBody.statusCode === "02"){
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
            text: responseBody.message,
            icon: "warning",
            confirmButtonText: "OK",
            confirmButtonColor: "#202142",
          });
        }
        else{
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
            text: "Oops! An error occured. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#202142",
          });
        }
        } catch (error) {
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
            text: "Oops! An error occured",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#202142",
          });
        }
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
    updatedItem.id = id;
    console.log(updatedItem);
    const response = await fetch(`https://feedbackui-server.herokuapp.com/api/feedback/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });

    const responseBody = await response.json();
    console.log(responseBody);
    if(responseBody.statusCode === "00"){

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
        text: "Feedback updated successfully",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#202142",
      });

    setFeedback(
      feedback.map((item) =>
        item.id === id ? { ...item, ...responseBody.data } : item
      )
    );
    }
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
