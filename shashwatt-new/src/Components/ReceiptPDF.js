import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import axios from "axios";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";
import img from "../Images/favicon2.png";

// const ReceiptPDF = ({ customerInfo, paymentInfo, installationInfo }) => {
const ReceiptPDF = () => {
  // const ReceiptPDF = (data) => {

  // const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  // const [customerInfo, setCustomerInfo] = useState({});
  // const [paymentInfo, setPaymentInfo] = useState({});
  const [installationInfo, setInstallationInfo] = useState({});

  //  setInstallationInfo (data) ;

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    fetchDataFromBackend();
  }, []);

  const fetchDataFromBackend = async () => {
    let email = sessionStorage.getItem("userEmail");
    try {
      const response = await axios.get(
        `http://localhost:8181/installation/by-customer-email/${email}`
      ); // Adjust the API endpoint URL
      // const response = await  axios.get(`http://localhost:8181/installation/by-customer-email/dsdss@ssd`); // Adjust the API endpoint URL
      const installationInfo = response.data;

      setInstallationInfo(installationInfo);
      console.log(installationInfo);
    } catch (error) {
      console.error("Error fetching data from the backend:", error);
    }
  };

  const generateRandomPDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]);
    const borderSize = 1;
    const borderDistance = 10;
    const contentWidth = page.getWidth() - 2 * (borderSize + borderDistance);
    const contentHeight = page.getHeight() - 2 * (borderSize + borderDistance);
    // const boldFont = pdfDoc.embedFont('Helvetica-Bold');

    // Draw a border with rounded corners around the content
    page.drawRectangle({
      x: borderSize + borderDistance,
      y: borderSize + borderDistance,
      width: contentWidth,
      height: contentHeight,
      borderColor: rgb(53 / 255, 64 / 255, 220 / 255),
      borderWidth: borderSize,
      borderRadii: { x: 10, y: 10 },
    });

    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const dateX = page.getWidth() - 100;
    const dateY = page.getHeight() - 25;
    page.drawText(currentDate, {
      x: dateX,
      y: dateY,
      size: 10,
      color: rgb(44 / 255, 62 / 255, 80 / 255),
      alignment: "left",
    });

    page.drawText("Shashwatt Solar Panel Installation Receipt", {
      x: page.getWidth() / 4.7,
      y: borderSize + borderDistance + 780,
      size: 18,
      color: rgb(53 / 255, 64 / 255, 220 / 255),
      alignment: "right",
    });

    const textSize = 12;
    const textMargin = 10;
    const textOptions = {
      size: textSize,
      color: rgb(44 / 255, 62 / 255, 80 / 255),
    };

    const numberOfLines = 10;
    const lineHeight = 1;
    const lineSpacing = 20;

    // Loop to add multiple horizontal lines
    for (let i = 0; i < numberOfLines; i++) {
      const lineX = borderSize + borderDistance + 20;
      const lineY = 120 + contentHeight / 2 - i * lineSpacing;
      const lineWidth = contentWidth - 40;

      // Add a rectangle to create a horizontal line effect
      page.drawRectangle({
        x: lineX,
        y: lineY,
        width: lineWidth,
        height: lineHeight,
        color: rgb(166 / 255, 166 / 255, 166 / 255), // Set line color (black)
        borderColor: rgb(0, 0, 0), // Set border color (black)
        borderWidth: 0, // Set border width to zero
      });
    }
    for (let i = 0; i < 3; i++) {
      const lineX = borderSize + borderDistance + 20;
      const lineY = 120 + contentHeight / 2 - i * lineSpacing;
      const lineWidth = contentWidth - 40;

      // Add a rectangle to create a horizontal line effect
      page.drawRectangle({
        x: lineX + 200,
        y: lineY - 204,
        width: lineWidth - 200,
        height: lineHeight,
        color: rgb(166 / 255, 166 / 255, 166 / 255), // Set line color (black)
        borderColor: rgb(0, 0, 0), // Set border color (black)
        borderWidth: 0, // Set border width to zero
      });
    }

    // Customer Details
    page.drawText(
      `Customer Name: ${installationInfo.customer.firstName} ${installationInfo.customer.lastName}`,
      {
        x: textMargin + 25,
        y: 740,
        ...textOptions,
      }
    );
    page.drawText(
      `Address: ${installationInfo.customer.address.streetAddress}, ${installationInfo.customer.address.city}`,
      {
        x: textMargin + 25,
        y: 720,
        ...textOptions,
      }
    );
    page.drawText(
      `${installationInfo.customer.address.state}, ${installationInfo.customer.address.country}, ${installationInfo.customer.address.postalCode}`,
      {
        x: textMargin + 60,
        y: 700,
        ...textOptions,
      }
    );
    page.drawText(`Email: ${installationInfo.customer.email}`, {
      x: textMargin + 25,
      y: 680,
      ...textOptions,
    });
    page.drawText(`Phone: ${installationInfo.customer.phone}`, {
      x: textMargin + 25,
      y: 660,
      ...textOptions,
    });

    page.drawText("Price", {
      x: 505,
      y: 538,
      ...textOptions,
      // font: `boldFont`,
    });
    // Repeat similar code for other sections
    // Customer Details
    page.drawText("Description:", {
      x: textMargin + 25,
      y: 518,
      ...textOptions,
      // font: `boldFont`,
    });

    page.drawText("Sum", {
      x: 505,
      y: 518,
      ...textOptions,
      // font: `boldFont`,
    });

    page.drawText("Cost of Battery:", {
      x: textMargin + 25,
      y: 498,
      ...textOptions,
      // font: `boldFont`,
    });

    page.drawText(`${installationInfo.costOfBattery}`, {
      x: 500,
      y: 498,
      ...textOptions,
    });

    page.drawText("Cost of Panels:", {
      x: textMargin + 25,
      y: 478,
      ...textOptions,
      // font: `boldFont`,
    });

    page.drawText(`${installationInfo.priceOfPanels}`, {
      x: 500,
      y: 478,
      ...textOptions,
    });

    page.drawText("Cost of ACDB:", {
      x: textMargin + 25,
      y: 458,
      ...textOptions,
      // font: `boldFont`,
    });

    page.drawText(`${installationInfo.costOfAcdb}`, {
      x: 500,
      y: 458,
      ...textOptions,
    });

    page.drawText("Cost of DCDB:", {
      x: textMargin + 25,
      y: 438,
      ...textOptions,
      // font: `boldFont`,
    });
    page.drawText(`${installationInfo.costOfDcdb}`, {
      x: 500,
      y: 438,
      ...textOptions,
    });

    page.drawText("Cost of Liscening:", {
      x: textMargin + 25,
      y: 418,
      ...textOptions,
      // font: `boldFont`,
    });
    page.drawText(`${installationInfo.costOfLiaisoning}`, {
      x: 500,
      y: 418,
      ...textOptions,
    });
    page.drawText("Cost of Structure:", {
      x: textMargin + 25,
      y: 398,
      ...textOptions,
      // font: `boldFont`,
    });
    page.drawText(`${installationInfo.costOfStructure}`, {
      x: 500,
      y: 398,
      ...textOptions,
    });
    page.drawText("Cost of Installation:", {
      x: textMargin + 25,
      y: 378,
      ...textOptions,
      // font: `boldFont`,
    });
    page.drawText(`${installationInfo.costOfInstallation}`, {
      x: 500,
      y: 378,
      ...textOptions,
    });
    page.drawText("Cost of Miscellaneous:", {
      x: textMargin + 25,
      y: 358,
      ...textOptions,
      // font: `boldFont`,
    });
    page.drawText(`${installationInfo.costOfMisc}`, {
      x: 500,
      y: 358,
      ...textOptions,
    });
    page.drawText("Sub Total:", {
      x: 250,
      y: 335,
      ...textOptions,
      // font: `boldFont`,
    });
    page.drawText(`${installationInfo.costWithoutGst}`, {
      x: 500,
      y: 335,
      ...textOptions,
    });
    page.drawText("Tax:", {
      x: 250,
      y: 315,
      ...textOptions,
      // font: `boldFont`,
    });
    page.drawText(`${installationInfo.gstCost}`, {
      x: 500,
      y: 315,
      ...textOptions,
    });
    page.drawText("Total:", {
      x: 250,
      y: 295,
      ...textOptions,
      // font: `boldFont`,
    });
    page.drawText(`${installationInfo.costWithGst}`, {
      x: 500,
      y: 295,
      ...textOptions,
    });
    // page.drawText(`Process: ${installationInfo.process}`, {
    //   x: textMargin+10,
    //   y: 620,
    //   ...textOptions,
    // });
    // Total Amount Paid
    // page.drawText(`Total Amount Paid: $${paymentInfo.totalAmount.toFixed(2)}`, {
    //   x: textMargin+10,
    //   y: 590,
    //   size: textSize,
    //   color: rgb(231 / 255, 76 / 255, 60 / 255),
    //   // font: pdfDoc.getFont('Helvetica-Bold'),
    // });

    // Contact Information
    const contactY = 220;
    page.drawText("For any inquiries, please contact:", {
      x: textMargin + 380,
      y: contactY,
      ...textOptions,
    });
    page.drawText("Customer Service: 123-456-7890", {
      x: textMargin + 380,
      y: contactY - 20,
      ...textOptions,
    });
    page.drawText("Email: shashwattsolar@gmail.com", {
      x: textMargin + 380,
      y: contactY - 40,
      ...textOptions,
    });
    page.drawText("Website: www.shashwattsolar.in", {
      x: textMargin + 380,
      y: contactY - 60,
      ...textOptions,
    });

    page.drawText("Thank you for choosing Shashwatt Solar!", {
      x: page.getWidth() / 2 - 80,
      y: 30,
      size: 10,
      color: rgb(44 / 255, 62 / 255, 80 / 255),
      // font: pdfDoc.getFont('Helvetica-Oblique'),
      alignment: "center",
    });

    const pdfBytes = await pdfDoc.save();
    // pdfDoc.pipe(saveAs('output.pdf'));

    // setGeneratedPDF(new Uint8Array(pdfBytes));
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "output.pdf");
    return blob;
  };

  const handleGeneratePDF = async () => {
    const randomPDFBlob = await generateRandomPDF();
    setSelectedFiles([randomPDFBlob]);
    // randomPDFBlob.save('solar_panel_receipt.pdf');
  };

  const handleUpload = () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });
    let email = sessionStorage.getItem("userEmail");
    console.log(email);
    axios
      .post(`http://localhost:8181/uploadAndSendEmail/${email}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Upload successful:", response.data);
        // Do something after successful upload, like updating UI
      })
      .catch((error) => {
        console.error("Upload error:", error);
        // Handle upload error
      });
  };

  return (
    <div className="row justify-content-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
      <div className="col-sm-9 m-5 p-5 text-center  text-success">
        <h2 className="mb-3">
          <strong>Congratuations !!!</strong>
        </h2>
        <h3>
          <strong>
            Thank you for Choosing Solar Power for a Brighter Future!
          </strong>
        </h3>
        <div className="row justify-content-center text-left  ">
          <div className="col-sm-7 fw-bold">
            <p>Dear Customer,</p>
            <p>
              We are thrilled to extend our heartfelt congratulations to you for
              making the inspiring decision to embrace solar power for your
              energy needs! Your commitment to sustainable living and
              environmental consciousness truly sets you apart as a
              forward-thinking individual.
            </p>{" "}
            <p>
              {" "}
              By choosing solar power, you're not only reducing your carbon
              footprint but also contributing to the larger cause of creating a
              cleaner and greener planet. Your dedication to renewable energy is
              a shining example for others to follow, and we couldn't be more
              proud to have you as part of our solar-powered community.
            </p>{" "}
            <p>
              The sun's energy is a powerful resource, and your decision to
              harness it for your daily activities will not only lead to
              significant savings on your energy bills but will also play a
              pivotal role in creating a more sustainable future for generations
              to come.
            </p>
            <p>
              Should you have any questions or need assistance along your solar
              journey, please don't hesitate to reach out. We're here to support
              you every step of the way.
            </p>{" "}
            <p>
              {" "}
              Once again, congratulations on taking this remarkable step towards
              a brighter, cleaner, and more energy-efficient future. Together,
              we are making a meaningful difference!
            </p>
            <p>Warmest regards,</p>
            <img
                  src={img}
                  alt="Logo"
                  className="me-3"
                  style={{ width: "150px", height: "150px" }}
                />
            <p>Shashwatt Solar</p>
          </div>
        </div>
        <button className="btn btn-lg bg-danger text-light" onClick={handleGeneratePDF}>Download Invoice</button>
        {selectedFiles.length > 0 && (
          <div>
            {/* <p>Selected Files:</p> */}
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
            <button className="btn btn-lg bg-primary text-light"  onClick={handleUpload}>
              Invoice on mail
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiptPDF;
