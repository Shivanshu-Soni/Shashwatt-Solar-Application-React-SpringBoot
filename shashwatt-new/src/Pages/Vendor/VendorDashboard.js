import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendar, faBed } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const VendorDashboard = () => {
  const [installationRequests, setInstallationRequests] = useState(0);
  const [installationRequestsAccepted, setInstallationRequestsAccepted] = useState(0);
  const [installationCompleted, setInstallationCompleted] = useState(0);
  const id = sessionStorage.getItem("id");
  
  useEffect(() => {
    fetchInstallationRequestCount();
    fetchInstallationRequestAcceptedCount();
    fetchInstallationCompletedCount();
  }, []);
 
  const fetchInstallationRequestCount = async () => {   
    try {
      const response = await axios.get(`http://localhost:8181/${id}/installation-count`);
      const installationCount = response.data;
      setInstallationRequests(installationCount);
    } catch (error) {
      console.error('API request error:', error);
    }
  };
  const fetchInstallationRequestAcceptedCount = async () => {   
    try {
      const response = await axios.get(`http://localhost:8181/${id}/installation-count/accepted`);
      const installationCount = response.data;
      setInstallationRequestsAccepted(installationCount);
    } catch (error) {
      console.error('API request error:', error);
    }
  };

  const fetchInstallationCompletedCount = async () => {   
    try {
      const response = await axios.get(`http://localhost:8181/${id}/installation-count/completed`);
      const installationCount = response.data;
      setInstallationCompleted(installationCount);
    } catch (error) {
      console.error('API request error:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-lg-4">
          <div className="card bg-primary text-white shadow mb-3">
            <div className="card-body">
              <FontAwesomeIcon icon={faCalendar} size="3x" className="mb-3" />
              <h5 className="card-title">Welcome</h5>
              <p>{new Date().toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="card bg-success text-light shadow mb-3">
            <div className="card-body">
              <FontAwesomeIcon icon={faBed} size="3x" className="mb-3" />
              <h5 className="card-title">Installation Requests</h5>
              <p>{installationRequests}</p>
              <Link to="/view-installation-requests" className="btn btn-secondary">View</Link>

            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="card bg-warning text-sucess shadow mb-3">
            <div className="card-body">
              <FontAwesomeIcon
                icon={faUserCircle}
                size="3x"
                className="mb-3"
              />
              <h5 className="card-title">Installations Request Accepted</h5>
              <p>{installationRequestsAccepted}</p>
              <Link to="/installation-accepted-request" className="btn btn-secondary">View</Link>

            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-lg-4">
          <div className="card bg-secondary shadow text-light mb-3">
            <div className="card-body">
              <FontAwesomeIcon icon={faUser} size="3x" className="mb-3" />
              <h5 className="card-title">Quotes</h5>
              <p>"The only way to do great work is to love what you do." - Steve Jobs</p>

            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="card bg-danger text-light shadow mb-3">
            <div className="card-body">
              <FontAwesomeIcon
                icon={faUserCircle}
                size="3x"
                className="mb-3"
              />
              <h5 className="card-title">Installations Completed</h5>
              <p>{installationCompleted}</p>
              <Link to="/completed-requests" className="btn btn-secondary">View</Link>

            </div>
          </div>
        </div>
        {/* <div className="col-md-6 col-lg-4">
          <div className="card bg-warning text-sucess shadow mb-3">
            <div className="card-body">
              <FontAwesomeIcon
                icon={faUserCircle}
                size="3x"
                className="mb-3"
              />
              <h5 className="card-title">Installations Completed</h5>
              <p>{30}</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default VendorDashboard;
