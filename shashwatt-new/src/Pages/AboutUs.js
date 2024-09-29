import React from "react";
import "./AboutUs.css";

export default function AboutUs() {
  return (
    <>
      <div className="">
        <section id="team" class="team">
          <h4 class="heading">
            <br />
            <strong> Our Team</strong>
          </h4>

          <div class="row">
            <div class="card">
              <div class="image">
                {/* <img src={require("../images/1.png")} alt=""/> */}
                <img
                  src={
                    "https://cdn-icons-png.flaticon.com/512/1320/1320737.png"
                  }
                  alt=""
                />
              </div>
              <div class="info">
                <h4>Rohan Kegade (PL)</h4>
                <h4>Developer</h4>
              </div>
            </div>
            <div class="card">
              <div class="image">
                {/* <img src={require("../images/1.png")}/> */}
                <img
                  src={"https://cdn-icons-png.flaticon.com/512/163/163801.png"}
                />
              </div>
              <div class="info">
                <h4>Shivanshu Soni (TL)</h4>
                <h4>Developer</h4>
              </div>
            </div>

            <div class="card">
              <div class="image">
                {/* <img src={require("../images/1.png")}/> */}
                <img
                  src={"https://cdn-icons-png.flaticon.com/512/163/163805.png"}
                />
              </div>
              <div class="info">
                <h4>Abhishek Vyavahare</h4>
                <h4>Developer</h4>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="card">
              <div class="image">
                {/* <img  src={require("../images/1.png")}/> */}
                <img
                  src={"https://cdn-icons-png.flaticon.com/512/145/145867.png"}
                />
              </div>
              <div class="info">
                <h4>Nitesh Dilip Awati</h4>
                <h4>Developer</h4>
              </div>
            </div>

            <div class="card">
              <div class="image">
                {/* <img src={require("../images/1.png")}/> */}
                <img
                  src={"https://cdn-icons-png.flaticon.com/512/163/163804.png"}
                />
              </div>
              <div class="info">
                <h4>Moucktic Saha</h4>
                <h4>Developer</h4>
              </div>
            </div>
            <div class="card">
              <div class="image">
                {/* <img src={require("../images/1.png")}/> */}
                <img
                  src={"https://cdn-icons-png.flaticon.com/512/163/163803.png"}
                />
              </div>
              <div class="info">
                <h4>Manish Patil</h4>
                <h4>Developer</h4>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
