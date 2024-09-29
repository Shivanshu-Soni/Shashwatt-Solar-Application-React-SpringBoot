import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import '../Login.css';
const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6,'Password atleast 6 digit').required('Password is required'),
});

function AdminLogin() {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const { email, password } = values;

    // Replace with your actual admin credentials
    const adminEmail = "admin@shashwatt.com";
    const adminPassword = "admin123";

    if (email === adminEmail && password === adminPassword) {
      // Successful login, you can add your logic here
      console.log("Login successful");
      console.log(values);
      sessionStorage.setItem('login',true);
      sessionStorage.setItem('userRole',"admin");
      sessionStorage.setItem("userEmail", "Administrator");
      navigate("/admin-dashboard")
      // Add further actions after successful login, such as redirection or API calls
    } else {
      // Failed login
      // console.log("Login failed");
      alert("Invalid Credentials!")
    }
  };

  return (
    <div className='background-image'>
      <section className="vh-100 ">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-9">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 pt-4 d-none d-md-block">
                    <img
                      src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887722.jpg?w=2000"
                      alt="login form"
                      className="img-fluid pt-5"
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
                              <span className="h1 fw-bold mb-0">Administrator LogIn</span>
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
  );
}

export default AdminLogin;
