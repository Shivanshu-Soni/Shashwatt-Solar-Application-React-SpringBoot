import img from "../Images/bird.webp";

const Card = () => {
  return (
    <div className="row justify-content-center align-items-center p-2 m-2">
      <div className="col-md-6">
        <div className="card p-2 shadow hover-card">
          <img src={img} className="card-img-top" alt="Fissure in Sandstone" />
          <div className="card-body">
            <h5 className="card-title text-center">
              <strong>
                "Balancing Progress and Conservation: Solar Panel Initiatives
                Incorporating Bird-Friendly Features. A Testament to Sustainable
                Development and Avian Wellbeing."
              </strong>
            </h5>
            <p className="card-text text-center text-secodary">
              In India,in many small towns we see nest of cables carrying
              electricity.To see birds sitting on the cables is very beautiful
              scene in the evening.But have you noticed many a time birds die
              due to electric current !!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
