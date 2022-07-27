import React from "react";
import Card from "../components/shared/Card";
import { Link } from "react-router-dom";

function AboutPage({ reverse }) {
  console.log(reverse);
  return (
    <Card reverse={reverse}>
      <div className="about">
        <h1>About This Project</h1>
        <p>This is a React app to leave feedback for a product or service</p>
        <p>Version: 1.0.2</p>
        <p>
          <Link to="/">Back To Home</Link>
        </p>
      </div>
    </Card>
  );
}

export default AboutPage;
