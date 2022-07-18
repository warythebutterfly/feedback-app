import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutPage from "./pages/AboutPage";
import AboutIconLink from "./components/AboutIconLink";
import {FeedbackProvider} from "./context/FeedbackContext";


function App() {
  const [reverse, setReverse] = useState(false);
  const handleToggle = (state) => {
    setReverse(!state);
  };

  return (
    <FeedbackProvider reverse={reverse}>
    <Router>
      <Header reverse={reverse} handleReverse={handleToggle} />
      <div className="container">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <FeedbackForm reverse={reverse} />
                <FeedbackStats  />
                <FeedbackList
                  reverse={reverse}
                  
                />
              </>
            }
          ></Route>
          <Route path="/about" element={<AboutPage reverse={reverse} />} />
        </Routes>

        <AboutIconLink reverse={reverse} />
      </div>
    </Router>
    </FeedbackProvider>
  );
  //return React.createElement('div', {className:"container"}, React.createElement('h1', {}, 'MyAppp'), React.createElement('h1', {}, 'MyApp2'), React.createElement('div', {}, React.createElement('i', {}, "hello world")))
}

export default App;
