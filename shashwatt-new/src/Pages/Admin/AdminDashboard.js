import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faCalendar,
  faComments ,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const AdminDashboard = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [approvalCount, setApprovalCount] = useState(0);
  const [vendorCount, setVendorCount] = useState(0);
  const [pendingQueryCount, setPendingQueryCount] = useState(0);
  const [queryCount, setQueryCount] = useState(0);

  useEffect(() => {
    fetchAuthenticateCount();
    fetchVendorCount();
    fetchCustomerCount();
    fetchQueryCount();
    fetchPendingQueryCount();
  }, []);

  const fetchAuthenticateCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8181/unauthenticated/count"
      );
      const count = response.data;
      setApprovalCount(count);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchCustomerCount = async () => {
    try {
      const response = await axios.get("http://localhost:8181/customer/count");
      const count = response.data;
      setCustomerCount(count);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  async function fetchVendorCount() {
    try {
      const response = await axios.get("http://localhost:8181/vendor/count/authenticated"); // Adjust the API endpoint as needed
      setVendorCount(response.data);
    } catch (error) {
      console.error("Error fetching vendor count:", error);
    }
  }
  const fetchPendingQueryCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8181/query/count/null"
      );
      const count = response.data;
      setPendingQueryCount(count);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchQueryCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8181/query/count/notnull"
      );
      const count = response.data;
      setQueryCount(count);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <div className="container ">
      <div className="row pt-3">
        <div className="col-md-6 col-lg-6">
          <div className="card bg-light text-dark shadow">
            <div className="card-body">
              <FontAwesomeIcon icon={faCalendar} size="3x" className="mb-3" />
              <h5 className="card-title">Welcome Administrator</h5>
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
              <h5 className="card-title">Pending Vendor Approvals</h5>
              <p className="card-text">{approvalCount}</p>
              <Link
                to="/pending-vendors"
                className="btn bg-light text-dark btn-secondary"
              >
                View
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card bg-success text-white shadow mb-3">
            <div className="card-body">
              <FontAwesomeIcon icon={faUsers} size="3x" className="mb-3" />
              <h5 className="card-title">Total Vendors</h5>
              <p className="card-text">{vendorCount}</p>
              <Link
                to="/view-vendor"
                className="btn bg-light text-dark btn-secondary"
              >
                View
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card bg-warning text-white shadow  mb-3">
            <div className="card-body">
              <FontAwesomeIcon icon={faUserCircle} size="3x" className="mb-3" />
              <h5 className="card-title">Total Customers</h5>
              <p className="card-text">{customerCount}</p>
              <Link
                to="/view-customer"
                className="btn bg-light text-dark btn-secondary"
              >
                View
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card bg-danger text-white shadow mb-3">
            <div className="card-body">
              <FontAwesomeIcon icon={faComments } size="3x" className="mb-3" />
              <h5 className="card-title">Queries Recieved</h5>
              <p className="card-text">{pendingQueryCount}</p>
              <Link
                to="/view-queries"
                className="btn bg-light text-dark btn-secondary"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-lg-3">
          <div className="card bg-info text-white shadow mb-3">
            <div className="card-body">
              <FontAwesomeIcon icon={faComments } size="3x" className="mb-3" />
              <h5 className="card-title">Queries Resolved</h5>
              <p className="card-text">{queryCount}</p>
              <Link
                to="/view-old-queries"
                className="btn bg-light text-dark btn-secondary"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
