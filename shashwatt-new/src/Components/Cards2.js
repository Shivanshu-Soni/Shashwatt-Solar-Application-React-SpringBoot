import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMedal,
  faCoins,
  faTools,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";

const Cards2 = () => {
  return (
    <div className="container p-2">
      <div className="row  m-2">
        <div className="col-md-6">
          <div className="card  m-2 p-3 h-100 shadow m-2 hover-card">
            <div className="card-img-top d-flex justify-content-center align-items-center">
              <FontAwesomeIcon
                icon={faMedal}
                className="fa-5x"
                style={{ color: "red" }}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title text-info text-center">
                <strong>Premium Hardware</strong>
              </h5>
              <p className="card-text text-secondary text-center">
                Shashwatt provides multiple system options. Choose your final
                design and price.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card  m-2 p-3 h-100 shadow m-2 hover-card">
            <div className="card-img-top d-flex justify-content-center align-items-center">
              <FontAwesomeIcon
                icon={faMoneyBillWave}
                className="fa-5x"
                style={{ color: "green" }}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title text-info text-center">
                <strong>Free Quotation</strong>
              </h5>
              <p className="card-text text-secondary text-center">
                Shashwatt provides a reliable and precise estimation of project
                costs through quotations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row  m-2">
        <div className="col-md-6">
          <div className="card  m-2 p-3 h-100 shadow m-2 hover-card">
            <div className="card-img-top d-flex justify-content-center align-items-center">
              <FontAwesomeIcon
                icon={faTools}
                className="fa-5x"
                style={{ color: "black" }}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title text-info text-center">
                <strong>Hassle Free Installation</strong>
              </h5>
              <p className="card-text text-secondary text-center">
                Single point of contact during design, on-site work, and
                net-metering.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card  m-2 p-3 h-100 shadow m-2 hover-card">
            <div className="card-img-top d-flex justify-content-center align-items-center">
              <FontAwesomeIcon
                icon={faCoins}
                className="fa-5x"
                style={{ color: "orange" }}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title text-info text-center">
                <strong>Savings Calculation</strong>
              </h5>
              {/* <p>₹</p> */}
              <p className="card-text text-secondary text-center">
                Shashwatt offers an exceptional level of precision when it comes
                to calculating savings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards2;
