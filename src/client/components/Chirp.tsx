import { response } from "express";
import React from "react";
import Modal from "react-bootstrap/Modal";

type CardProps = {
  user: string;
  message: string;
  id: string;
};

const Chirp: React.FunctionComponent<CardProps> = (props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [chirpUser, setChirpUser] = React.useState<string>(props.user);
  const [chirpMessage, setChirpMessage] = React.useState<string>(props.message);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  async function deleteChirp() {
    $.ajax({
      type: "DELETE",
      url: `/api/chirps/${props.id}`,
      success: function (result: string) {
        console.log(result);
      },
    });
  }

  return (
    <>
      {/* Modal Below */}

      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Edit Chirp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="recipient-name" className="col-form-label">
                Username:
              </label>
              <input
                type="text"
                className="form-control"
                id="recipient-name"
                value={chirpUser}
                onChange={(e) => {setChirpUser(e.target.value);}}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="message-text" className="col-form-label">
                Message:
              </label>
              <textarea
                className="form-control"
                id="message-text"
                value={chirpMessage}
                onChange={(e) => {setChirpMessage(e.target.value);}}
              ></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={hideModal}>Cancel</button>
          <button>Save</button>
        </Modal.Footer>
      </Modal>

      {/* Card Below */}
      <div key={props.id} className="card col-6 m-3">
        <p className="card-header">{props.user}</p>
        <div className="card-body">
          <p className="card-title">{props.id}</p>
          <h5 className="card-text">{props.message}</h5>
        </div>
        <button className="btn-danger btn" onClick={deleteChirp}>
          Delete
        </button>
        <button onClick={showModal}>Display Modal</button>
      </div>
    </>
  );
};

export default Chirp;
