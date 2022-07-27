import { FaStar, FaStarHalf, FaTimesCircle, FaEdit } from "react-icons/fa";
import Card from "./shared/Card";
import PropTypes from "prop-types";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackItem({ item, reverse }) {
  console.log(reverse);
  const {deleteFeedback, editFeedback} = useContext(FeedbackContext);
  const fields = [];
  
    for (var index = 0; index < Math.floor((item.rating / 10) * 5); index++) 
      fields.push(<FaStar color="orange" />);
    
    if (item.rating % 2 !== 0) fields.push(<FaStarHalf color="orange" />);
  

  return (
    <Card reverse={reverse}>
      <div className="num-display">{item.rating}</div>
      <button onClick={() => deleteFeedback(item.id, item.subject)} className="close">
        <FaTimesCircle color="purple" />
      </button>
      <button onClick={() => editFeedback(item)} className="edit">
        <FaEdit color="purple" />
      </button>
      <div className="subject-display">{item.subject}</div>
      <div className="text-display">{item.text}</div>
      <br></br>
      <div style={{ display: "inline-block", float: "right" }}>{fields}</div>
    </Card>
  );
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
};
export default FeedbackItem;
