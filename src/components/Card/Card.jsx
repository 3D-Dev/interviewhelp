import React from "react";
import "./Card.css";
import { getRandomColor } from "../../utils/utils";
import Graph from "./Graph";

function Card({
  name,
  avatar,
  occupation,
  impressions,
  conversions,
  revenue,
  dataForGraph,
  time,
}) {
  return (
    <div className="card">
      <div className="header">
        <div>
          {avatar ? (
            <img src={avatar} alt="Avatar" className="avatar" />
          ) : (
            <div className="avatar-div">
              <span
                className="avatar-text"
                style={{ backgroundColor: getRandomColor() }}
              >
                {name ? name[0].toUpperCase() : ""}
              </span>
            </div>
          )}
        </div>
        <div className="heading-container">
          <h2>{name}</h2>
          <h4 className="sub-heading">{occupation}</h4>
        </div>
      </div>
      <div className="main">
        <div className="graph-container">
          <Graph data={dataForGraph} />
          <p className="graph-subheading">Conversions {time}</p>
        </div>
        <div className="details-container">
          <h4 className="text-orange">{impressions.toLocaleString()}</h4>
          <p className="text-gray">impressions</p>
          <h4 className="text-blue">{conversions.toLocaleString()}</h4>
          <p className="text-gray">conversions</p>

          <h2 className="text-green">${revenue.toLocaleString()}</h2>
        </div>
      </div>
    </div>
  );
}

export default Card;
