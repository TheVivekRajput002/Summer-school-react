
import Home from "./pages/Home";
import React from "react";
// import { Link, Element } from "react-scroll";
import About from "./pages/About";
import './App.css'
import Student_dashboard from "./pages/Student_dashboard";
import Summer_school_experience from "./pages/Summer_school_experience";
import { Divide } from "lucide-react";

function App() {

  return (
    <>
      <div className="bgg-blackk overflow-y-scroll ">

        <div id="home" className="my-[20vh]">
          <Home />
        </div>
        <div id="about" className="my-[8vh]">
          <About />
        </div>

        <div id="student_dashboard" className="">
          <Student_dashboard />
        </div>

        <div id="summer_school_experience" className="" >
          < Summer_school_experience />
        </div>
      </div >




    </>
  );
}


export default App;
