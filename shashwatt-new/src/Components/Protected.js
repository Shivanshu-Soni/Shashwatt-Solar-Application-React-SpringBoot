import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    let login = sessionStorage.getItem("login");
    let userRole = sessionStorage.getItem("userRole");
    if (login) {
      navigate(`/${userRole}-dashboard`);
    }
    
  });
  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
