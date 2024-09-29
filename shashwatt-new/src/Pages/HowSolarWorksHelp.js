import React from "react";
import "./HowSolarWorksHelp.css";

const data = [
  {
    image:
      "https://www.adanisolar.com/-/media/Project/AdaniSolar/WhySolar/solar-panels-animation/solar-panels-animation.gif?h=361&la=en&w=800&hash=57EB546932F7A73AF7A82D9516B2313B&hash=57EB546932F7A73AF7A82D9516B2313B",
    heading: "ANATOMY OF A SOLAR CELL",
    description: "",
  },
  {
    image:
      "https://www.adanisolar.com/-/media/Project/AdaniSolar/WhySolar/Why-Solar-Images/solar-power-infographics-gross_meter.png?h=380&la=en&w=906&hash=219BC9B1FEDF8EE057E1BBCBB003EC50&hash=219BC9B1FEDF8EE057E1BBCBB003EC50",
    heading:
      "Solar cells generate direct current that run from the solar cells through invertor to run electric appliances",
    description: "",
  },

];

const HowSolarWorksHelp = () => {
  return (
    <div>
      {data.map((item, index) => (
        <div key={index} className="sectionContainer">
          <div className="sectionLeft">
            {index % 2 === 0 ? (
              <img src={item.image} alt={item.heading} />
            ) : (
              <>
                <h3>{item.heading}</h3>
                <p>{item.description}</p>
              </>
            )}
          </div>
          <div className="sectionRight">
            {index % 2 === 0 ? (
              <>
                <h3>{item.heading}</h3>
                <p>{item.description}</p>
              </>
            ) : (
              <img src={item.image} alt={item.heading} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HowSolarWorksHelp;
