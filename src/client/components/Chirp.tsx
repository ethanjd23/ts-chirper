import React from 'react';

type CardProps = {
    user: string;
    message: string;
    id: string;
}

const Chirp: React.FunctionComponent<CardProps> = props => {
    return (
    
        <div key={props.id} className="card m-3 col-12">
            <p className="card-header">{props.user}</p>
            <div className="card-body">
                <p className="card-title">{props.id}</p>
                <h5 className="card-text">{props.message}</h5>
            </div>
        </div>

    )
};



export default Chirp;