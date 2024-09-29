import React from "react";
import HowSolarWorksHelp from "./HowSolarWorksHelp";
import img from "../Images/solar1.png";

function HowSolarWorks() {
  return (
    <div className="mx-2">
      <div className="">
        <img src={img} className="d-block w-100" alt="..." />
      </div>
      <HowSolarWorksHelp />
    </div>
  );
}

export default HowSolarWorks;
