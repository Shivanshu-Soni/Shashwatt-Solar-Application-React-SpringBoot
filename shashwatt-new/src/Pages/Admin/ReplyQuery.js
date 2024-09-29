import React, { useState, useEffect } from "react";
// import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

function ReplyQuery() {
  const [formErrors, setFormErrors] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [queryReply, setQueryReply] = useState(""); // Add this line
  const navigate = useNavigate();

  // const [id, setId] = useState(1); // Example ID value, change this according to your needs
  const id = localStorage.getItem("id");

  useEffect(() => {
    async function fetchQueryData() {
      try {
        const response = await fetch(`http://localhost:8181/query/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setPhoneNumber(data.phone);
          setEmail(data.email);
          setQuery(data.query);
        } else {
          console.log("Failed to fetch query data");
        }
      } catch (error) {
        console.error("An error occurred while fetching query data", error);
      }
    }

    fetchQueryData();
  }, [id]);

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
          query: query,
          queryReply: queryReply, // Include query reply in the request body
          id:id,

        };
        console.log(requestBody);
        const response = await fetch("http://localhost:8181/query/reply", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          console.log("Form submitted successfully");
          setFormErrors({});
          navigate("/view-queries");
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
    }else if (id === "queryReply") {
      setQueryReply(value);
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
    <>
      <div className="" style={{ padding: "10rem" }}>
        {/* <Navigationbar /> */}
        <div
          style={{
            maxWidth: 1000,
            margin: "auto",
            padding: 5,
            backgroundColor: "aliceblue",
            borderRadius: 5,
            boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.2)",
            // marginTop: 25,
          }}
        >
          <div style={{ position: "relative", overflow: "hidden" }}>
            <div className="p-3">
              <h1>Contact Us</h1>
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
                {/* <input
                  type="submit"
                  value="Submit"
                  className="btn w-100 mb-5"
                  style={{ backgroundColor: "#3198c1" }}
                /> */}
                 <textarea
                  className="form-control mb-2"
                  placeholder="Enter your reply here..."
                  name="queryReply"
                  id="queryReply"
                  cols={30}
                  rows={5}
                  value={queryReply}
                  onChange={handleInputChange}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn w-100 mb-5"
                  style={{ backgroundColor: "#3198c1" }}
                />
              </form>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default ReplyQuery;
