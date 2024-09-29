import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { Link } from "react-router-dom";
import axios from "axios";
import '../Login.css';
import { Link, useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function VendorLogin() {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:8181/vendor-login', values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        const isAuthenticated = response.data; // Assuming the response data is a boolean
  
        if (isAuthenticated) {
          // Handle successful login
          console.log('Login successful');
          
          // Assuming the response also contains the vendor's id
          const vendorIdResponse = await axios.get(`http://localhost:8181/vendor/id?email=${values.email}`);
          const id = vendorIdResponse.data;
          sessionStorage.setItem('login',true);
          sessionStorage.setItem('userRole',"vendor");
          sessionStorage.setItem("id", id);
          sessionStorage.setItem("userEmail", values.email);
          navigate("/vendor-dashboard");
        } else {
          // Handle authentication failure, show alert
          alert("You are not yet authorized. Please wait for authorization.");
        }
      } else {
        // Handle login error, display error message to user
        console.error('Login error:', response.data);
      }
    } catch (error) {
      console.error('API request error:', error);
    }
  };

  return (
    <>
      
      <div className="background-image">
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-9">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 p-2 pt-5 d-none d-md-block">
                    <img
                      src="https://mypension.lbbd.gov.uk/static/media/login_page_image.49408c54c26cb82d2d3e2c83d45906a5.svg"
                      alt="login form"
                      className="img-fluid p-5 mt-5 ml-5"
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <Formik
                        initialValues={{
                          email: "",
                          password: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                      >
                        {({ errors, touched }) => (
                          <Form>
                            <div className="d-flex align-items-center mb-3 pb-1">
                              <i
                                className="fas fa-cubes fa-2x me-3"
                                style={{ color: "#ff6219" }}
                              ></i>
                              <span className="h1 fw-bold mb-0">Vendor LogIn</span>
                            </div>

                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
                              Sign into your account
                            </h5>

                            <div className="form-outline mb-4">
                              <label className="form-label" htmlFor="email">
                                Email Id
                              </label>
                              <Field
                                type="text"
                                id="email"
                                name="email"
                                className={`form-control form-control-lg ${
                                  errors.email && touched.email ? "is-invalid" : ""
                                }`}
                                style={{ textTransform: "none" }}
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>

                            <div className="form-outline mb-4">
                              <label className="form-label" htmlFor="password">
                                Password
                              </label>
                              <Field
                                type="password"
                                id="password"
                                name="password"
                                className={`form-control form-control-lg ${
                                  errors.password && touched.password ? "is-invalid" : ""
                                }`}
                                autoComplete="new-password"
                              />
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>

                            <div className="pt-1 mb-4">
                              <button className="btn btn-dark btn-lg btn-block" type="submit">
                                Login
                              </button>
                            </div>

                            <a className="small text-muted" href="#!">
                              Forgot password?
                            </a>
                            <p className="mb-1 pb-lg-2" style={{ color: "#393f81" }}>
                              Don't have an account? <Link to="/userregister" style={{ color: "#393f81" }}>Register here</Link>
                            </p>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

export default VendorLogin;
