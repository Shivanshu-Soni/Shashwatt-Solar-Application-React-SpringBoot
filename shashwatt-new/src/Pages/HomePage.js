import Carousel from "./../Components/Carousel";
import Cards from "../Components/Cards";
// import Cards2 from "../Components/Cards2";
import Card from "../Components/Card";
import Cards2 from "../Components/Cards2";

const HomePage = () => {
  return (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
      <Carousel />

      <Cards />
      <Card />
      <Cards2 />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100px" }}
      >
        <button type="button" className="btn btn-lg btn-primary btn-rounded">
          Calculate Savings
        </button>
      </div>
    </div>
  );
};

export default HomePage;
