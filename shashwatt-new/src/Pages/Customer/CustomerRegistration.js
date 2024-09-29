import axios from "axios";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router";
import "../Registration.css";
export default function CustomerRegistration() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Name must be at least 2 charecters")
      .max(20, "Name not greater than 20 charecters")
      .required("First Name is required")
      .matches(/^[a-zA-Z\s]*$/, "Name must contain only alphabets"),

    lastName: Yup.string()
      .min(2, "Username must be at least 2 charecters ")
      .max(20, "Username not greater than 20 charecters")
      .required("Last Name is required")
      .matches(/^[a-zA-Z\s]*$/, "Name must contain only alphabets"),

    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format"
      ),

    phone: Yup.string()
      .required("Phone Number is required")
      .min(10, "Phone number must be a 10-digit number ")
      .max(10, "Phone number must be a 10-digit number")
      .matches(/^[789]\d{9}$/, "Phone number must start with 9 or 8 or 7"),

    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password not greater 16 charecters")
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain one special character, one Capital lettter and one small letter."
      ),

    address: Yup.object().shape({
      streetAddress: Yup.string()
        .min(5, "Street Address must be at least 5 charecters")
        .max(50, "Street Address must not be greater than 50 charecters")
        .required("Street Address is required"),

      city: Yup.string()
        .min(1, "Address should have pin code and city")
        .required("City is required"),

      state: Yup.string()
        .min(1, "Address should have pin code and city")
        .required("State is required"),

      postalCode: Yup.string()
        .required("Postal Code is required")
        .min(6, "Postal Code must be a 6-digit number ")
        .max(6, "Postal Code must be a 6-digit number")
        .matches(/\d$/, "Postal Code must contain only numbers"),

      country: Yup.string()
        .min(1, "Address should have pin code and city")
        .required("Country is required"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      //   username: '',
      lastName: "",
      email: "",
      phone: "",
      password: "",
      //   repassword: '',
      //   address: '',
      address: {
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //   const result = await axios.get('http://localhost:8090/getallusers');
      //   const duplicateUser = result.data.find((element) => element.username === values.username);
      //   if (duplicateUser) {
      //     setShow2(true);
      //   } else {
      console.log("HIiiiiiiiii");
      console.log(values);
      setShow1(true);
      await axios.post("http://localhost:8181/customers", values);
      // navigate("/login");
      //   }
    },
  });

  const [show1, setShow1] = React.useState(false);
  const [show2, setShow2] = React.useState(false);

  const [availableStates, setAvailableStates] = React.useState([]);
  const [availableCities, setAvailableCities] = React.useState([]);

  // Replace this with actual data or API calls
  const countryStateMapping = {
    India: {
      states: [
        "Andhra Pradesh",
        "Maharashtra",
        "Gujrat",
        "Madhya Pradesh"
        // ... other states of India
      ],
    },
    // Add more countries and their states here
  };

  const stateCityMapping = {
    "Andhra Pradesh": ["Hyderabad", "Vijayawada", "Visakhapatnam"],
    "Maharashtra":["Mumbai","Navi Mumbai","Pune","Nagpur","Kolhapur","Nashik"],
    "Gujrat":["Ahmedabad","Surat","Vadodara", "Rajkot", "Bharuch"],
    "Madhya Pradesh":["Indore","Bhopal","Gwalior","Jabalpur","Ujjain"]
    // ... other states and cities
  };

  const getStatesForCountry = (country) => {
    const countryData = countryStateMapping[country];
    return countryData ? countryData.states : [];
  };

  const getCitiesForState = (state) => {
    return stateCityMapping[state] || [];
  };

  const handleClose = () => {
    setShow1(false);
    sessionStorage.setItem("login", true);
    sessionStorage.setItem("userRole", "customer");
    // localStorage.setItem("id", id);
    sessionStorage.setItem("userEmail", formik.values.email);
    navigate("/quotation");
    // window.location.reload();
    // navigate('/');
    window.scrollTo(0, 0);
  };

  const handleClose2 = () => {
    setShow2(false);
    // navigate("/signup");
    window.location.reload();
  };

  return (
    <div className="background">
      <div className="cont1">
        <div className="container ">
          <div className="row p-5 d-flex justify-content-center">
            <div
              className="col-md-10 sm-12   rounded  p-4 mt-2 shadow"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
              <h2 className="text-center text-light m-4 heading ">
                {" "}
                <strong>Customer Registration</strong>
              </h2>
              <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <div className="row mt-5">
                  <div className="col-md-3 text-light mb-3 pt-4 pl-5">
                    <h3>Personal Details</h3>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="Name" className="form-label ll h4 ">
                      First Name
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-lg ${
                        formik.errors.firstName ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your name"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.firstName && formik.touched.firstName && (
                      <div className="invalid-feedback">
                        {formik.errors.firstName}
                      </div>
                    )}
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="lastName" className="form-label ll h4">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-lg ${
                        formik.errors.lastName ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your last name"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.lastName && formik.touched.lastName && (
                      <div className="invalid-feedback">
                        {formik.errors.lastName}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-3 mb-3">
                    {/* <h1>Personel Details</h1> */}
                  </div>
                  <div className="col-md-4 mb-3 ">
                    <label htmlFor="Email" className="form-label ll h4">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control form-control-lg ${
                        formik.errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      // autoCapitalize="off"
                       style={{ textTransform: "none" }}
                    />
                    {formik.errors.email && formik.touched.email && (
                      <div className="invalid-feedback">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="phone" className="form-label ll h4">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-lg ${
                        formik.errors.phone ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your phone number"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.phone && formik.touched.phone && (
                      <div className="invalid-feedback">
                        {formik.errors.phone}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3 mb-3">
                    {/* <h1>Personel Details</h1> */}
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="Password" className="form-label ll h4">
                      Password
                    </label>
                    <input
                      type="password"
                      className={`form-control form-control-lg ${
                        formik.errors.password ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.password && formik.touched.password && (
                      <div className="invalid-feedback">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mb-3 text-light pt-4 pl-5">
                    <h3>Address Details</h3>
                  </div>
                  <div className="col-md-8 mb-3">
                    <label htmlFor="streetAddress" className="form-label ll h4">
                      Street Address
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-lg ${
                        formik.errors.address?.streetAddress ? "is-invalid" : ""
                      }`}
                      placeholder="Enter address"
                      name="address.streetAddress"
                      value={formik.values.address.streetAddress}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.address?.streetAddress &&
                      formik.touched.address?.streetAddress && (
                        <div className="invalid-feedback">
                          {formik.errors.address?.streetAddress}
                        </div>
                      )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mb-3">
                    {/* <h1>Personel Details</h1> */}
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="country" className="form-label ll h4">
                      Country
                    </label>
                    <select
                      className={`form-control form-control-lg ${
                        formik.errors.address?.country ? "is-invalid" : ""
                      }`}
                      name="address.country"
                      value={formik.values.address.country}
                      onChange={(e) => {
                        formik.handleChange(e);
                        const selectedCountry = e.target.value;
                        // Logic to set available states based on the selected country
                        const statesForCountry =
                          getStatesForCountry(selectedCountry); // Replace with your actual logic
                        setAvailableStates(statesForCountry);
                        // Clear city when changing country
                        formik.setFieldValue("address.state", "");
                        formik.setFieldValue("address.city", "");
                      }}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Select a country</option>
                      <option value="India">India</option>
                      {/* Add more country options here */}
                    </select>
                    {formik.errors.address?.country &&
                      formik.touched.address?.country && (
                        <div className="invalid-feedback">
                          {formik.errors.address?.country}
                        </div>
                      )}
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="state" className="form-label ll h4">
                      State
                    </label>
                    <select
                      className={`form-control form-control-lg ${
                        formik.errors.address?.state ? "is-invalid" : ""
                      }`}
                      name="address.state"
                      value={formik.values.address.state}
                      onChange={(e) => {
                        formik.handleChange(e);
                        const selectedState = e.target.value;
                        // Logic to set available cities based on the selected state
                        const citiesForState = getCitiesForState(selectedState); // Replace with your actual logic
                        setAvailableCities(citiesForState);
                        // Clear city when changing state
                        formik.setFieldValue("address.city", "");
                      }}
                      onBlur={formik.handleBlur}
                    >
                      <option value="" disabled>
                        Select a state
                      </option>
                      {availableStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {formik.errors.address?.state &&
                      formik.touched.address?.state && (
                        <div className="invalid-feedback">
                          {formik.errors.address?.state}
                        </div>
                      )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mb-3">
                    {/* <h1>Personel Details</h1> */}
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="city" className="form-label ll h4">
                      City
                    </label>
                    <select
                      className={`form-control form-control-lg ${
                        formik.errors.address?.city ? "is-invalid" : ""
                      }`}
                      name="address.city"
                      value={formik.values.address.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="" disabled>
                        Select a city
                      </option>
                      {availableCities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    {formik.errors.address?.city &&
                      formik.touched.address?.city && (
                        <div className="invalid-feedback">
                          {formik.errors.address?.city}
                        </div>
                      )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="postalCode" className="form-label ll h4">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-lg ${
                        formik.errors.address?.postalCode ? "is-invalid" : ""
                      }`}
                      placeholder="Enter postal code"
                      name="address.postalCode"
                      value={formik.values.address.postalCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.address?.postalCode &&
                      formik.touched.address?.postalCode && (
                        <div className="invalid-feedback">
                          {formik.errors.address?.postalCode}
                        </div>
                      )}
                  </div>
                </div>

                <div
                  className="row d-flex my-3  justify-content-end"
                  style={{ gap: "20px" }}
                >
                  {/* <div className="col-md-12  my-3 p-3 d-flex justify-content-end"> */}
                  <Button
                    type="reset"
                    className="btn btn-lg col-md-2 px-2"
                    variant="danger"
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    className="btn btn-lg col-md-2 px-2"
                    variant="primary"
                  >
                    Submit
                  </Button>
                  <div className="col-md-1 "></div>
                  {/* </div> */}
                </div>

                <Modal show={show1}>
                  <Modal.Header closeButton>
                    <Modal.Title>SignUp!</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Woohoo, you have successfully Signed Up!
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Okay!!!!
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Modal show={show2}>
                  <Modal.Header closeButton>
                    <Modal.Title>SignUp!</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    OOPS! Duplicate username! Please try with another username!
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                      Okay!!
                    </Button>
                  </Modal.Footer>
                </Modal>
              </form>
            </div>
          </div>
        </div>
      </div>
         
    </div>
  );
}
