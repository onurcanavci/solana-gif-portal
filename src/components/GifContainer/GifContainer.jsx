import React from "react";
import "../../App.css";

const GifContainer = ({ gifData }) => {
  return (
    <div className='gif-grid'>
      {gifData.map((gif) => (
        <div className='gif-item' key={gif}>
          <img src={gif} alt={gif} />
        </div>
      ))}
    </div>
  );
};

export default GifContainer;
