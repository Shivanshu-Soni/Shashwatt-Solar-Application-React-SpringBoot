import img from "../Images/favicon2.png";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./Rainbow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const location = useLocation();

  useEffect(() => {
    let isLoggedIn = sessionStorage.getItem("login");
    setIsLoggedIn(isLoggedIn);
    let email = sessionStorage.getItem("userEmail");
    setUserEmail(email);
  });
  // Define an array of paths where you want to show the navbar
  const showNavbarPaths = [
    "/",
    "/customer-registration",
    "/vendor-registration",
    "/vendor-map",
    "/pdf",
    "/calculator",
    "/customer-login",
    "/vendor-login",
    "/admin-login",
    "/how-solarworks",
    "/why-solar",
    "/calci",
    "/aboutUs",
    "/upload",
    "/download",
    "/generator",
  ];

  const shouldShowNavbar = showNavbarPaths.includes(location.pathname);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const navigate = useNavigate();

  const goToSavingsCalculator = () => {
    navigate("/calculator");
  };

  const handleLogout = () => {
    // Clear all data in localStorage
    sessionStorage.clear();
    localStorage.clear();
    // Redirect to the login or home page after logout
    navigate("/"); // Adjust the route as needed
  };

  const navigateToHomePage = () => {
    // let login = localStorage.getItem("login");
    let userRole = sessionStorage.getItem("userRole");

    navigate(`/${userRole}-dashboard`);
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary ">
        {/* {shouldShowNavbar && ( */}
        <div class="container-fluid">
          <img src={img} width="55px" alt="" />
          <a class="navbar-brand mx-3 fs-2 rainbow-text" href="#">
            <strong>Shashwatt</strong>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link
                  className="nav-link fs-5 active"
                  aria-current="page"
                  to="/"
                >
                  <strong>Home</strong>
                </Link>
              </li>
              <li class="nav-item fs-5">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/why-solar"
                >
                  <strong>Why Solar?</strong>
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/how-solarworks"
                >
                  <strong>How Solar Works?</strong>
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/aboutUs"
                >
                  <strong>About Us</strong>
                </Link>
              </li>
              <li class="nav-item fs-5">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/vendor-map"
                >
                  <strong>Map</strong>
                  {/* <h6 className="badge bg-primary me-1 mb-4 mt-0">New</h6> */}
                </Link>
                
              </li>
              {/* <li class="nav-item fs-5">
                <a class="nav-link active" aria-current="page" href="pdf">
                  Pdf
                </a>
              </li> */}
              <li class="nav-item fs-5">
                {!isLoggedIn && (
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/contact-us"
                  >
                    <strong>Contact Us</strong>
                  </Link>
                )}
              </li>

              <li class="nav-item dropdown">
                {!isLoggedIn && (
                  <a
                    class="nav-link dropdown-toggle fs-5"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <strong>Login</strong>
                  </a>
                )}
                <ul class="dropdown-menu">
                  <li>
                    <Link
                      to="/vendor-login"
                      onClick={scrollToTop}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <a className="dropdown-item shadow" href="#">
                        Vendor Login
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/customer-login"
                      onClick={scrollToTop}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <a className="dropdown-item shadow" href="#">
                        Customer Login
                      </a>
                    </Link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      to="/admin-login"
                      onClick={scrollToTop}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <a className="dropdown-item shadow" href="#">
                        Administrator Login
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown fs-5">
                {!isLoggedIn && (
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <strong>Register</strong>
                  </a>
                )}
                <ul class="dropdown-menu">
                  <li>
                    <Link
                      to="/vendor-registration"
                      onClick={scrollToTop}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <a className="dropdown-item shadow" href="#">
                        Vendor Registration
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/customer-registration"
                      onClick={scrollToTop}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <a className="dropdown-item shadow" href="#">
                        Customer Registration
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            {/* <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
            {!isLoggedIn && (
              <button
                className="btn btn-primary m-2"
                onClick={goToSavingsCalculator}
              >
                <strong>Savings Calculator</strong>
              </button>
            )}
            <ul className="navbar-nav  mx-1">
              {isLoggedIn && (
                <li
                  className=""
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <button onClick={navigateToHomePage} className="btn ">
                    <FontAwesomeIcon
                      icon={faUser}
                      size=""
                      className=""
                      style={{ color: "blue" }}
                    />
                  </button>

                  <button
                    onClick={navigateToHomePage}
                    className="btn btn-link  "
                    style={{ textDecoration: "none" }}
                  >
                    <a
                      className="nav-link active rainbow-text"
                      aria-current="page"
                      href="#"
                    >
                      {userEmail}
                    </a>
                  </button>
                  <button onClick={handleLogout} className="nav-link btn">
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      style={{ color: "red" }}
                    />
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
        {/* )}; */}
      </nav>
    </div>
  );
};

export default Navbar;
