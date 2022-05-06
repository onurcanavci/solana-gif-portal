import React from "react";
import "../../App.css";

const GifContainer = ({ gifData }) => {
  return (
    <div className='gif-grid'>
      {gifData.map((gif, index) => (
        <div className='gif-item' key={index}>
          <img src={gif.gifLink} alt={gif} />
        </div>
      ))}
    </div>
  );
};

export default GifContainer;
