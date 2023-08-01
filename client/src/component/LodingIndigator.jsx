import React from "react";
import ReactLoading from "react-loading";

const LoadingIndicator = ({ type, color }) => (
  <div className="flex flex-col items-center justify-center my-auto ">
    <ReactLoading
      type={"spinningBubbles"}
      color="#F5385D"
      height={"5%"}
      width={"5%"}
    />
    <h1 className="mt-4">Loading...</h1>
  </div>
);

export default LoadingIndicator;
