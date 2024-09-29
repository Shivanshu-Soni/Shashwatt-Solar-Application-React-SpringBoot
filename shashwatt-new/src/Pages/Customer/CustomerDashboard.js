import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faCalendar,
  faComments,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
// import "./Dashboard.css";

const CustomerDashboard = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [approvalCount, setApprovalCount] = useState(0);
  const [vendorCount, setVendorCount] = useState(0);
  const [pendingQueryCount, setPendingQueryCount] = useState(0);
  const [queryCount, setQueryCount] = useState(0);
  const [installationInfo, setInstallationInfo] = useState({});
  // useEffect(() => {
  //   fetchAuthenticateCount();
  //   fetchVendorCount();
  //   fetchCustomerCount();
  //   fetchQueryCount();
  //   fetchPendingQueryCount();
  // }, []);

  useEffect(() => {
    fetchDataFromBackend();
  }, []);

  const fetchDataFromBackend = async  () => {
    let email = sessionStorage.getItem("userEmail");
    try {
      const response = await  axios.get(`http://localhost:8181/installation/by-customer-email/${email}`); // Adjust the API endpoint URL
      // const response = await  axios.get(`http://localhost:8181/installation/by-customer-email/dsdss@ssd`); // Adjust the API endpoint URL
      const  installationInfo = response.data;

      setInstallationInfo(installationInfo);
      console.log(installationInfo);
      sessionStorage.setItem("installationId",installationInfo.id);
      
      console.log(installationInfo.id);
    } catch (error) {
      console.error('Error fetching data from the backend:', error);
    }
  };

  // let fileId = installationInfo.customer.id;
  const accepted = installationInfo.confirmationStatus ? "Accepted" : "Pending";
  const completed = installationInfo.completionStatus ? "Completed" : "Pending";
  // const handleDownload = () => {
  //   if (fileId) {
  //     axios({
  //       url: `http://localhost:8181/downloadFileByCustomerId/${fileId}`,
  //       method: 'GET',
  //       responseType: 'blob', // Important! This tells axios to treat the response as a binary blob
  //     })
  //     .then((response) => {
       
  //       const blob = new Blob([response.data], { type: 'application/pdf' });
  //       const filename = `downloaded-file.pdf`;

  //       const link = document.createElement('a');
  //       link.href = window.URL.createObjectURL(blob);
  //       link.download = filename;
  //       link.click();
  //     })
  //     .catch((error) => {
  //       console.error('Download error:', error);
  //     });
  //   }
  // };
  return (
    <div className="container ">
      <div className="row pt-3">
        <div className="col-md-6 col-lg-6">
          <div className="card bg-light text-dark shadow">
            <div className="card-body">
              <FontAwesomeIcon icon={faCalendar} size="3x" className="mb-3" />
              <h5 className="card-title">Welcome </h5>
              <p>
                {new Date().toLocaleString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div className="card bg-secondary text-white shadow mb-3">
            <div className="card-body">
              <FontAwesomeIcon icon={faQuoteLeft} size="3x" className="mb-3" />
              <h5 className="card-title">Quote</h5>
              <p>
                "The only way to do great work is to love what you do." - Steve
                Jobs
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 ">
          <div className="card bg-primary text-white shadow mb-3">
            <div className="card-body">
              <FontAwesomeIcon icon={faUsers} size="3x" className="mb-3" />
              <h5 className="card-title">Status</h5>
              <p className="card-text">Vendor: {accepted}</p>
              <p className="card-text">Installation  :{completed}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card bg-success text-white shadow mb-3">
            <div className="card-body">
              <FontAwesomeIcon icon={faUsers} size="3x" className="mb-3" />
              <h5 className="card-title">View Invoice</h5>
              <p className="card-text">{}</p>
              <Link to="/customer-invoice" className="btn btn-secondary">View</Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
