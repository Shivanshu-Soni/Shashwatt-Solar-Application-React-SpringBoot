import React from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import img1 from "../Images/carousel1 (1).png";
import img2 from "../Images/carousel2 (1).png";
import img3 from "../Images/carousel3 (1).png";
import img4 from "../Images/carousel4 (1).png";

export default function Carousel() {
  return (
    <MDBCarousel showIndicators showControls fade className="mx-2 mb-4">
      <MDBCarouselItem
        className="w-100 d-block "
        itemId={1}
        src={img1}
        alt="..."
      
      >
        <h5>Clean Energy Solutions</h5>
        <p>
          Discover the future of sustainable living with our top-notch solar
          panel installation services. Harness the power of the sun to reduce
          your carbon footprint and lower your energy bills.
        </p>
      </MDBCarouselItem>

      <MDBCarouselItem
        className="w-100 d-block"
        itemId={2}
        src={img2}
        alt="..."
      >
        <h5>Expert Installation Team</h5>
        <p>Our seasoned experts are dedicated to providing hassle-free solar solutions. From initial design to seamless installation, we handle it all, ensuring you enjoy a smooth transition to solar energy.</p>
      </MDBCarouselItem>

      <MDBCarouselItem
        className="w-100 d-block"
        itemId={3}
        src={img3}
        alt="..."
      >
        <h5>Savings That Matter</h5>
        <p>Embrace the economic benefits of solar energy. Our installations not only contribute to a greener planet but also put money back in your pocket through reduced energy costs.</p>
      </MDBCarouselItem>

      <MDBCarouselItem
        className="w-100 d-block"
        itemId={3}
        src={img4}
        alt="..."
      >
        <h5>Cutting-Edge Technology</h5>
        <p>Experience the latest in solar innovation. Our advanced panels and equipment not only look sleek on your roof but also maximize energy generation for your home.</p>
      </MDBCarouselItem>
    </MDBCarousel>
  );
}
