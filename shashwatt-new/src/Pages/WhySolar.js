import "./WhySolar.css";
function WhySolar() {
  return (
    <div className="row m-2  justify-content-center" >
      <div className="col-md-9 text-center">
        <section id="aboutus" className="aboutus ">
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-ride="carousel"
          ></div>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              <div className="carousel-caption d-none d-md-block text-about"></div>
            </div>
          </div>
          <div className="row justify-content-center text-center my-4">
            <div className="col ">
              <h2 className="">
                <strong>Why should you invest in Solar Power?</strong>
              </h2>
            </div>
          </div>

          <div>
            <div className="boxContainer">
              <div className="box my-4 ">
                <h3>
                  <strong>
                    Wallet friendly one time investment for 25 years
                  </strong>
                </h3>

                <p>
                  All these advantages come without leaving a hole in your
                  pocket. Installation of the solar power system is a one-time
                  investment.The investment reaps huge dividends in form of
                  lower electricity bills for several years.
                </p>
              </div>
              <div className="box my-4">
                <h3>
                  <strong>Reduce your carbon footfrint</strong>
                </h3>

                <p>
                  Sustainable carbon-free energy solutions such as solar are
                  crucial in achieving our climate goals and the sustainable
                  development agenda
                </p>
              </div>
              <div className="box my-4">
                <h3>
                  <strong>Evasion from the greenhouse effect</strong>{" "}
                </h3>
                <p>
                  Solar Power means producing energy through photovoltaic
                  process. The environmental impact of solar power is
                  significantly smaller than other power generation method. No
                  harmful emissions are released into the air when electricity
                  is produced by solar panels This means your small measure can
                  contribute significantly to save the environment.
                </p>
              </div>
              <div className="box my-4">
                <h3>
                  <strong>Better Grid Security</strong>{" "}
                </h3>
                <p>
                  Increasing usage of solar energy would lighten the load on the
                  power grid and therefore ensure better grid security. This
                  implies fewer power cuts and more protection from disasters.
                </p>
              </div>
              <div className="box my-4">
                <h3>
                  <strong>Limitless and eternal solar energy </strong>
                </h3>
                <p>
                  The sun provides more than enough energy to meet the whole
                  world’s energy needs. The photovoltaic process that transforms
                  the eternal sunlight into electricity doesn’t require any fuel
                  and has no variable costs. It produces electricity in an
                  efficient and cost-effective way.
                </p>
              </div>
              <div className="box my-4">
                <h3>
                  <strong>Save on electricity</strong>
                </h3>
                <p>
                  Installing solar panels significantly reduces monthly
                  electricity bills and dependence on the power grid. According
                  to long-term forecast solar remains a cost-effective solution
                  and long-term investment in the future.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default WhySolar;
