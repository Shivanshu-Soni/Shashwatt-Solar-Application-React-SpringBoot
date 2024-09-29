import React from "react";
import { FaGem, FaHome, FaEnvelope, FaPhone, FaPrint } from "react-icons/fa";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import img from "../Images/favicon2.png";
import "./Rainbow.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-light text-muted ">
      {/* Section: Social media */}
      <div className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        {/* Left */}
        <div className="me-5 d-none d-lg-block">
          <span>
            <strong>Get connected with us on social networks :</strong>{" "}
          </span>
        </div>
        {/* Left */}

        {/* Right */}
        <div>
          <a href="" className="me-4 text-reset ">
            <FaFacebookF style={{ color: "blue" }} />
          </a>
          <a href="" className="me-4 text-reset">
            <FaTwitter style={{ color: "blue" }} />
          </a>
          <a href="" className="me-4 text-reset">
            <FaGoogle style={{ color: "green" }} />
          </a>
          <a href="" className="me-4 text-reset">
            <FaInstagram style={{ color: "red" }} />
          </a>
          <a href="" className="me-4 text-reset">
            <FaLinkedin style={{ color: "blue" }} />
          </a>
          <a href="" className="me-4 text-reset">
            <FaGithub style={{ color: "black" }} />
          </a>
        </div>
        {/* Right */}
      </div>
      {/* Section: Social media */}

      {/* Section: Links */}
      <div className="">
        <div className="container text-center text-md-start mt-5">
          {/* Grid row */}
          <div className="row mt-3">
            {/* Grid column */}
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              {/* Content */}

              <h5 className="text-uppercase fw-bold mb-2">
                {/* <FaGem className="me-3" /> */}
                <img
                  src={img}
                  alt="Logo"
                  className="me-3"
                  style={{ width: "150px", height: "150px" }}
                />
              </h5>
              <h2 className="rainbow-text">
                <strong>Shashwatt</strong>
              </h2>
              {/* <p className="text-justify">
              Shashwatt aims to empower both customers and vendors in the solar energy ecosystem. Customers can use the platform to input their location and energy consumption data, which the platform utilizes to calculate potential savings achieved by adopting solar panels. Additionally, the platform estimates the installation costs and subsidy information providing customers with valuable insights into the financial benefits of solar panel adoption</p> */}
            </div>
            {/* Grid column */}

            {/* Grid column */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              {/* Links */}
              <h6 className="text-uppercase fw-bold fs-5 mb-4">Why Solar</h6>
              <p className="text-justify blue">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/why-solar"
                >
                  <strong>Solar Benefits</strong>
                </Link>
              </p>
              <p className="text-justify blue">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/how-solarworks"
                >
                  <strong>How Solar Panels Works?</strong>
                </Link>
              </p>
            </div>
            {/* Grid column */}

            {/* Grid column */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              {/* Links */}
              <h6 className="text-uppercase fw-bold mb-4 fs-5">Useful links</h6>
              <p>
                <Link className="nav-link active blue" aria-current="page" to="">
                  <strong>Rooftop</strong>
                </Link>
              </p>
              <p>
                <Link className="nav-link active blue" aria-current="page" to="">
                  <strong>Project Gallary</strong>
                </Link>
              </p>
              <p>
                <Link
                  className="nav-link active blue"
                  aria-current="page"
                  to="/calculator"
                >
                  <strong>Savings Calculator</strong>
                </Link>
              </p>
              <p>
                <Link className="nav-link active blue" aria-current="page" to="/contact-us">
                  <strong>Help</strong>
                </Link>
              </p>
            </div>
            {/* Grid column */}

            {/* Grid column */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              {/* Links */}
              <h6 className="text-uppercase fw-bold fs-5 mb-4">Contact</h6>
              
              <p>
                <Link className="nav-link active blue" aria-current="page" to="/aboutUs">
                <FaHome className="me-3" style={{ color: "green" }} />

                  <strong>About Shashwatt Solar</strong>
                </Link>
              </p>
              <p>
                <FaEnvelope className="me-3" style={{ color: "blue" }} />
                <strong>shashwattsolar@gmail.com</strong>
                {/* shashwattsolar@gmail.com */}
              </p>
              <p>
                <FaPhone className="me-3" style={{ color: "red" }} />
                <strong>+ 91 8149709975</strong>
              </p>
              <p>
                <FaPrint className="me-3" style={{ color: "black" }} />
                <strong>+ 91 8788986408</strong>
              </p>
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
      </div>
      {/* Section: Links */}

      {/* Copyright */}
      <div
        className="text-center p-4 fw-bold"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2023 Shashwatt Solar
      </div>
      {/* Copyright */}
    </footer>
  );
};

export default Footer;
