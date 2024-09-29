import React from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import img1 from "../Images/card2-1.png";
import img2 from "../Images/card1-1.png";
import img3 from "../Images/card4.png";
import img4 from "../Images/card5.png";
import "./Cards.css";

export default function Cards() {
  return (
    <MDBCardGroup>
      <MDBCard className="m-2 mt-0 rounded shadow hover-card">
        <MDBCardImage src={img2} alt="..." position="top" />
        <MDBCardBody>
          {/* <MDBCardTitle>Card title</MDBCardTitle> */}
          <MDBCardText className="text-dark text-center">
            Our team of seasoned experts ensures that the entire process is
            smooth and worry-free. From design to installation, we handle every
            step, so you can enjoy the benefits of solar power without any
            inconvenience.
          </MDBCardText>
        </MDBCardBody>
        {/* <MDBCardFooter>
          <small className='text-muted'>Last updated 3 mins ago</small>
        </MDBCardFooter> */}
      </MDBCard>

      <MDBCard className="m-2 mt-0  rounded shadow hover-card">
        <MDBCardImage src={img1} alt="..." position="top" />
        <MDBCardBody>
          {/* <MDBCardTitle>Card title</MDBCardTitle> */}
          <MDBCardText className="text-dark text-center">
            Our dedicated team is committed to addressing any issues within
            minutes, ensuring that your solar installation runs smoothly and
            efficiently. With our swift response, you can enjoy uninterrupted
            energy and peace of mind.
          </MDBCardText>
        </MDBCardBody>
        {/* <MDBCardFooter>
          <small className='text-muted'>Last updated 3 mins ago</small>
        </MDBCardFooter> */}
      </MDBCard>

      <MDBCard className="m-2 mt-0 rounded shadow hover-card">
        <MDBCardImage src={img3} alt="..." position="top" />
        <MDBCardBody>
          {/* <MDBCardTitle>Card title</MDBCardTitle> */}
          <MDBCardText className="text-dark text-center">
            Whether you're looking to power your entire home or specific areas,
            our diverse solutions cater to every need. From rooftop panels to
            integrated solar roofing, we have the perfect fit for you. Our goal
            is to empower your home with renewable energy while enhancing its
            aesthetic appeal.
          </MDBCardText>
        </MDBCardBody>
        {/* <MDBCardFooter>
          <small className='text-muted'>Last updated 3 mins ago</small>
        </MDBCardFooter> */}
      </MDBCard>

      <MDBCard className="m-2 mt-0 rounded shadow hover-card">
        <MDBCardImage src={img4} alt="..." position="top" />
        <MDBCardBody>
          {/* <MDBCardTitle>Card title</MDBCardTitle> */}
          <MDBCardText className="text-dark text-center">
            Our team has expanded its service offerings to include solar panel
            cleaning alongside solar panel installation. This addition enables
            us to provide comprehensive solutions to our customers, enhancing
            the performance and longevity of their solar panels.
          </MDBCardText>
        </MDBCardBody>
        {/* <MDBCardFooter>
          <small className='text-muted'>Last updated 3 mins ago</small>
        </MDBCardFooter> */}
      </MDBCard>
    </MDBCardGroup>
  );
}
