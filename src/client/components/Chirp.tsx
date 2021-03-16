import { response } from "express";
import React from "react";
import { Link } from "react-router-dom";

export type Card = {
  user: string;
  message: string;
  id: string;
};

const Chirp: React.FunctionComponent<Card> = (props) => {
  

  return (
    <>
     

      {/* Card Below */}
      <div
        key={props.id}
        id={props.id}
        className="card col-6 m-3 shadow rounded"
      >
        <p className="card-header">{props.user}</p>
        <div className="card-body">
          <p className="card-title">{props.id}</p>
          <h5 className="card-text">{props.message}</h5>
        </div>
        <div id="button-container" className="row d-flex flex-row-reverse">
          <Link className="btn-info"to={`/${props.id}/details`}>Admin Options</Link>
        </div>
      </div>
    </>
  );
};

export default Chirp;
