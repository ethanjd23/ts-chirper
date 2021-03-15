import React from 'react';

const Chirp = props => {
    return (
    
        <div className="card m-3 col-12">
            <p className="card-header">{props.user}</p>
            <div className="card-body">
                {/* <p className="card-title">Subject</p> */}
                <h5 className="card-text">{props.message}</h5>
            </div>
        </div>

    )
};



export default Chirp;