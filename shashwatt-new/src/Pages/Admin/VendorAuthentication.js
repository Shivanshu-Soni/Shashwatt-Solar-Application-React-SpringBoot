import axios from "axios";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { useNavigate } from 'react-router';

export default function VendorAuthentication() {
    const navigate = useNavigate();

  //   const navigate = useNavigate();
  const id = localStorage.getItem("id");

  const [vendorData, setVendorData] = useState(null); // State to hold fetched vendor data

  // Fetch vendor data by ID
  useEffect(() => {
    async function fetchVendorData() {
      try {
        const response = await axios.get(`http://localhost:8181/vendor/${id}`); // Replace with your API endpoint
        setVendorData(response.data); // Set fetched data to state
        console.log(response.data);
        console.log(vendorData.vendorName);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    }

    fetchVendorData();
  }, []); //
//   const vendorTypes = [
//     "Solar installation services",
//     "Repairing services",
//     "Other",
//   ];

  const validationSchema = Yup.object().shape({
    vendorName: Yup.string()
      .min(3, "Vendor name must be at least 3 characters")
      .max(50, "Vendor name not greater than 50 characters")
      .required("Vendor name is required"),
    shopName: Yup.string()
      .min(3, "Shop name must be at least 3 characters")
      .max(50, "Shop name not greater than 50 characters")
      .required("Shop name is required"),
    licenseNumber: Yup.string()
      .matches(
        /^[a-zA-Z0-9]*$/,
        "License number must contain alphabets and numbers only"
      )
      .required("License number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Contacts are required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(12, "Password not greater than 12 characters")
      .required("Password is required"),
    // streetAddress: Yup.string().min(1, 'Address should have pin code and city').required('Address is required'),
    // city: Yup.string().min(1, 'Address should have pin code and city').required('Address is required'),
    // state: Yup.string().min(1, 'Address should have pin code and city').required('Address is required'),
    // postalCode: Yup.string().min(1, 'Address should have pin code and city').required('Address is required'),
    // country: Yup.string().min(1, 'Address should have pin code and city').required('Address is required'),
    // vendorType: Yup.string().oneOf(vendorTypes, 'Invalid vendor type').required('Vendor type is required'),
    address: Yup.object().shape({
      streetAddress: Yup.string()
        .min(1, "Address should have pin code and city")
        .required("Address is required"),

      city: Yup.string()
        .min(1, "Address should have pin code and city")
        .required("Address is required"),

      state: Yup.string()
        .min(1, "Address should have pin code and city")
        .required("Address is required"),

      postalCode: Yup.string()
        .min(1, "Address should have pin code and city")
        .required("Address is required"),

      country: Yup.string()
        .min(1, "Address should have pin code and city")
        .required("Address is required"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      vendorName: vendorData?.vendorName || "",
      shopName: vendorData?.shopName || "",
      licenseNumber: vendorData?.licenseNumber || "",
      email: vendorData?.email || "",
      password: vendorData?.password || "",
      phone: vendorData?.phone || "",
      isAutheticated: vendorData?.isAutheticated || false, // Make sure to handle boolean values correctly
      address: {
        streetAddress: vendorData?.address?.streetAddress || "",
        city: vendorData?.address?.city || "",
        state: vendorData?.address?.state || "",
        postalCode: vendorData?.address?.postalCode || "",
        country: vendorData?.address?.country || "",
      },
    
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
        axios.put(`http://localhost:8181/${id}/authenticate`)
        .then(response => {
          // Handle successful response
        //   console.log(response.data); // Updated vendor
        // alert("Mail has been sent to the vendor.")
          swal("Success","Mail has been sent to the vendor","success");
        navigate("/pending-vendors");

        })
        .catch(error => {
          // Handle error
          console.error(error);
        });
    },
  });

  const handleRejectClick = (id) => {
    // console.log("HIIIIII");
    axios.put(`http://localhost:8181/${id}/unauthenticate`)
      .then(response => {
        // Handle successful response
        alert("Mail has been sent to the vendor.");
        navigate("/pending-vendors");
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  };
  const [show1, setShow1] = React.useState(false);
  const [show2, setShow2] = React.useState(false);

  const handleClose = () => {
    setShow1(false);
    // navigate('/vendor/login');
  };

  const handleClose2 = () => {
    setShow2(false);
  };

  return (
    <div className="cont1  background-image">
        <div className="container ">
          <div className="row p-5 d-flex justify-content-center">
            <div className="col-md-10 sm-12  rounded p-4 mt-2 shadow " style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
            <h2 className="text-center m-4 heading text-light"><strong>Vendor Authentication</strong></h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="row mt-5">
                <div className="col-md-3 mb-3 pt-5 pl-5 text-light">
                  <h3>Important Details</h3>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="VendorName" className="form-label ll h4">
                    Vendor Name
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${
                      formik.errors.vendorName ? "is-invalid" : ""
                    }`}
                    placeholder="Enter vendor name"
                    name="vendorName"
                    // value={formik.values.vendorName}
                    value={vendorData?.vendorName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.vendorName && formik.touched.vendorName && (
                    <div className="invalid-feedback">
                      {formik.errors.vendorName}
                    </div>
                  )}
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="ShopName" className="form-label ll h4">
                    Shop Name
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${
                      formik.errors.shopName ? "is-invalid" : ""
                    }`}
                    placeholder="Enter shop name"
                    name="shopName"
                    // value={formik.values.shopName}
                    value={vendorData?.shopName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled
                  />
                  {formik.errors.shopName && formik.touched.shopName && (
                    <div className="invalid-feedback">
                      {formik.errors.shopName}
                    </div>
                  )}
                </div>
              </div>
              <div className="row ">
              <div className="col-md-3 mb-3 pt-4 pl-5">
                  {/* <h3>Important Details</h3> */}
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="LicenseNo" className="form-label ll h4">
                    License No
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${
                      formik.errors.licenseNumber ? "is-invalid" : ""
                    }`}
                    placeholder="Enter license number"
                    name="licenseNumber"
                    // value={formik.values.licenseNumber}
                    value={vendorData?.licenseNumber}

                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.licenseNumber &&
                    formik.touched.licenseNumber && (
                      <div className="invalid-feedback">
                        {formik.errors.licenseNumber}
                      </div>
                    )}
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="Email" className="form-label ll h4">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`form-control form-control-lg ${
                      formik.errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="Enter email"
                    name="email"
                    // value={formik.values.email}
                    value={vendorData?.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
              </div>
              <div className="row ">
              <div className="col-md-3 mb-3 pt-4 pl-5">
                  {/* <h3>Important Details</h3> */}
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
                    placeholder="Enter password"
                    name="password"
                    value={vendorData?.password}
                    // value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <div className="invalid-feedback">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="phone" className="form-label ll h4">
                    Contacts
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${
                      formik.errors.phone ? "is-invalid" : ""
                    }`}
                    placeholder=""
                    name="phone"
                    // value={formik.values.phone}
                    value={vendorData?.phone}
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
              <div className="row ">
                <div className="col-md-3 mb-3 text-light pt-5 pl-5">
                  <h3>Address Details</h3>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="streetAddress" className="form-label ll h4">
                    streetAddress
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${
                      formik.errors.address?.streetAddress ? "is-invalid" : ""
                    }`}
                    placeholder="Enter address"
                    name="address.streetAddress"
                    value={vendorData?.address.streetAddress}
                    // value={formik.values.address.streetAddress}
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
                <div className="col-md-4 mb-3">
                  <label htmlFor="city" className="form-label ll h4">
                    city
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${
                      formik.errors.address?.city ? "is-invalid" : ""
                    }`}
                    placeholder="Enter city"
                    name="address.city"
                    value={vendorData?.address.city}
                    // value={formik.values.address.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.address?.city &&
                    formik.touched.address?.city && (
                      <div className="invalid-feedback">
                        {formik.errors.address?.city}
                      </div>
                    )}
                </div>
              </div>
              <div className="row ">
                <div className="col-md-3 mb-3 pt-4 pl-5">
                  {/* <h3>Address Details</h3> */}
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="state" className="form-label ll h4">
                    state
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${
                      formik.errors.address?.state ? "is-invalid" : ""
                    }`}
                    placeholder="Enter address"
                    name="address.state"
                    value={vendorData?.address.state}
                    // value={formik.values.address.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.address?.state &&
                    formik.touched.address?.state && (
                      <div className="invalid-feedback">
                        {formik.errors.address?.state}
                      </div>
                    )}
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="postalCode" className="form-label ll h4">
                    postalCode
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${
                      formik.errors.address?.postalCode ? "is-invalid" : ""
                    }`}
                    placeholder="Enter address"
                    name="address.postalCode"
                    value={vendorData?.address.postalCode}
                    // value={formik.values.address.postalCode}
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
              <div className="row ">
                <div className="col-md-3 mb-3 pt-4 pl-5">
                  {/* <h3>Address Details</h3> */}
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="country" className="form-label ll h4">
                    country
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${
                      formik.errors.address?.country ? "is-invalid" : ""
                    }`}
                    placeholder="Enter address"
                    name="address.country"
                    value={vendorData?.address.country}
                    // value={formik.values.address.country}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.address?.country &&
                    formik.touched.address?.country && (
                      <div className="invalid-feedback">
                        {formik.errors.address?.country}
                      </div>
                    )}
                </div>
              </div>
              {/* <div className="mb-3">
                <label htmlFor="VendorType" className="form-label ll">
                  Vendor Type
                </label>
                <select
                  className={`form-control ${formik.errors.vendorType ? 'is-invalid' : ''}`}
                  name="vendorType"
                  value={formik.values.vendorType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" label="Select a vendor type" />
                  {vendorTypes.map((type, index) => (
                    <option key={index} value={type} label={type} />
                  ))}
                </select>
                {formik.errors.vendorType && formik.touched.vendorType && (
                  <div className="invalid-feedback">{formik.errors.vendorType}</div>
                )}
              </div> */}
              <div className="row d-flex my-3 justify-content-end" style={{gap:'20px'}}>
                {/* <div className="col-md-12  my-3 p-3 d-flex justify-content-end"> */}
                <Button
                  type="button"
                  className="btn btn-lg col-md-2"
                  variant="danger"
                  onClick={() => handleRejectClick(id)}
                >
                  Reject
                </Button>
                <Button
                  type="submit"
                  className="btn btn-lg col-md-2"
                  variant="primary"
                  
                >
                  Accept
                </Button>
                <div className="col-md-1 "></div>
                {/* </div> */}
              </div>
              <Modal show={show1} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Vendor Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body>Vendor registration successful!</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
              <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                  <Modal.Title>Vendor Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Failed to register vendor. Please try again later.
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose2}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
