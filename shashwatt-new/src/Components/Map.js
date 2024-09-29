import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Map = () => {
  const mapRef = useRef(null);
  const [vendors, setVendors] = useState([]);
  const [postalCodeInput, setPostalCodeInput] = useState("");
  const handlePostalCodeChange = (event) => {
    setPostalCodeInput(event.target.value);
  };

  const fetchVendorsByPostalCode = () => {
    if (postalCodeInput.trim() === "") {
      return;
    }

    axios
      .get(
        `http://localhost:8181/vendors-listByPostalCode?postalCode=${postalCodeInput}`
      )
      .then((response) => {
        setVendors(response.data);
        initializeMap(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vendor data:", error);
      });
  };

  useEffect(() => {
    // Fetch vendor data from the API
    axios
      .get("http://localhost:8181/vendors-listByCity?city=Chiplun") // Replace with your actual API endpoint
      // axios.get('http://localhost:8181/vendors-listByPostalCode?postalCode=400060')
      .then((response) => {
        setVendors(response.data);
        // Call function to initialize the map
        initializeMap(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vendor data:", error);
      });
  }, []);

  const initializeMap = (vendorsData) => {
    if (vendorsData.length === 0) {
      return;
    }

    const geocoder = new window.google.maps.Geocoder();

    // Get the initial vendor's address
    const initialVendor = vendorsData[0];
    const initialVendorAddress = `${initialVendor.address.streetAddress}, ${initialVendor.address.city}, ${initialVendor.address.state}, ${initialVendor.address.postalCode}`;

    geocoder.geocode({ address: initialVendorAddress }, (results, status) => {
      if (status === "OK") {
        const mapOptions = {
          center: results[0].geometry.location,
          zoom: 15,
        };

        const map = new window.google.maps.Map(mapRef.current, mapOptions);

        vendorsData.forEach((vendor) => {
          const vendorAddress = `${vendor.address.streetAddress}, ${vendor.address.city}, ${vendor.address.state}, ${vendor.address.postalCode}`;

          geocoder.geocode(
            { address: vendorAddress },
            (vendorResults, vendorStatus) => {
              if (vendorStatus === "OK") {
                const marker = new window.google.maps.Marker({
                  position: vendorResults[0].geometry.location,
                  map,
                  title: vendor.vendorName,
                });

                const infoWindow = new window.google.maps.InfoWindow({
                  content: `<div><strong>${vendor.vendorName}</strong><br>${vendorAddress}</div>`,
                });

                marker.addListener("click", () => {
                  infoWindow.open(map, marker);
                });
              }
            }
          );
        });
      } else {
        console.error(
          "Geocode was not successful for the following reason: ",
          status
        );
      }
    });
  };

  return (
    <div className="row background-image justify-content-center">
      <div className="col-md-9 coml-sm-12 px-4 mt-5">
        <div className=" mb-4">
          {/* <label htmlFor="postalCodeInput"  className="form-label">Enter Postal Code:</label> */}
          <input
            type="text"
            className="form-control"
            id="postalCodeInput"
            value={postalCodeInput}
            placeholder="Enter your pincode"
            onChange={handlePostalCodeChange}
          />
          <button
            className="btn  btn-primary mt-2"
            onClick={fetchVendorsByPostalCode}
          >
            Search
          </button>
        </div>
        <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
        <div className="row mt-4">
          {vendors.map((vendor, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{vendor.vendorName}</h5>
                  <p className="card-text">
                    {vendor.address.streetAddress},{vendor.address.city},{" "}
                    {vendor.address.state}, {vendor.address.postalCode}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Map;
