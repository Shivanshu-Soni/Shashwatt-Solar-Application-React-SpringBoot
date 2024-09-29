import React, { useState } from "react";
// import Footer from "../Footer";

function ContactUs() {
  const [formErrors, setFormErrors] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    
    // In the handleSubmit function
if (form.checkValidity()) {
  try {
    const requestBody = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      query: query
    };

    const response = await fetch("http://localhost:8181/query/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody)
    });

    if (response.ok) {
      console.log("Form submitted successfully");
      setFormErrors({});
    } else {
      console.log("Failed to submit form");
    }
  } catch (error) {
    console.error("An error occurred while submitting the form", error);
  }
}

  };
  

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
      general: "",
    }));

    // Update state variables based on input id
    if (id === "name1") {
      setFirstName(value);
    } else if (id === "name2") {
      setLastName(value);
    } else if (id === "phoneNumber") {
      setPhoneNumber(value);
    } else if (id === "email") {
      setEmail(value);
    } else if (id === "query") {
      setQuery(value);
    }
  };

  const getFormErrors = (form) => {
    const errors = {};
    const elements = form.elements;
    for (let i = 0; i < elements.length; i++) {
      if (!elements[i].checkValidity()) {
        errors[elements[i].id] = elements[i].validationMessage;
      }
    }
    return errors;
  };

  return (
    <div className="row background-image p-4  justify-content-center">
      <div className="col-md-6 col-sm-12 mt-5" style={{padding:"2rem"}}>
        {/* <Navigationbar /> */}
        <div
          style={{
            // maxWidth: 1000,
            margin: "auto",
            padding: 5,
            backgroundColor: "aliceblue",
            borderRadius: 5,
            boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.2)",
            // marginTop: 25,
          }}
        >
          <div style={{ position: "relative", overflow: "hidden" }}>
            <div className="p-3 h1 fw-bold">
              {/* <h1>Contact Us</h1> */}
              Contact Us
              {formErrors.general && (
                <p style={{ color: "red" }}>{formErrors.general}</p>
              )}
              <hr />
              <form onSubmit={handleSubmit} noValidate>
                <div className="d-flex">
                  <input
                    type="text"
                    placeholder="First Name..."
                    className="form-control mb-2 me-2"
                    id="name1"
                    required
                    value={firstName}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Last Name..."
                    className="form-control mb-2 ms-2"
                    id="name2"
                    required
                    value={lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="d-flex justify-content-between">
                  {formErrors.firstName && (
                    <p style={{ color: "red" }}>{formErrors.firstName}</p>
                  )}
                  {formErrors.lastName && (
                    <p style={{ color: "red" }}>{formErrors.lastName}</p>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Phone Number..."
                  className="form-control mb-2"
                  id="phoneNumber"
                  value={phone}
                  required
                  onChange={handleInputChange}
                />
                {formErrors.phone && (
                  <p style={{ color: "red" }}>{formErrors.phone}</p>
                )}
                <input
                  type="email"
                  placeholder="Email..."
                  className="form-control mb-2"
                  id="email"
                  required
                  value={email}
                  onChange={handleInputChange}
                />
                {formErrors.email && (
                  <p style={{ color: "red" }}>{formErrors.email}</p>
                )}
                <textarea
                  className="form-control mb-2"
                  placeholder="Enter your queries here..."
                  name="query"
                  id="query"
                  cols={30}
                  rows={5}
                  required
                  value={query}
                  onChange={handleInputChange}
                />
                {formErrors.query && (
                  <p style={{ color: "red" }}>{formErrors.query}</p>
                )}
                <br />
                <input
                  type="submit"
                  value="Submit"
                  className="btn w-100 mb-5 fw-bold btn-lg text-light "
                  style={{ backgroundColor: "#3198c1" }}
                />
              </form>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default ContactUs;
