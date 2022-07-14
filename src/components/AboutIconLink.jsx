import React from "react";
import { FaQuestion } from "react-icons/fa";
import { Link } from "react-router-dom";

function AboutIconLink({ reverse }) {
  console.log(reverse);
  return (
    <div className="about-link">
      <Link to="/about">
        {!reverse && <FaQuestion color="white" size={30} />}
        {reverse && <FaQuestion color="purple" size={30} />}
      </Link>
    </div>
  );
}

export default AboutIconLink;
