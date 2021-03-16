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
    setChirpUser(props.user);
    setChirpMessage(props.message); // setting chirp back to original

    setIsOpen(false);
  };

  async function updateChirp() {
    let changedChirp = { user: chirpUser, message: chirpMessage };
    setIsOpen(false);
    $.ajax({
      type: "PUT",
      url: `/api/chirps/${props.id}`,
      data: JSON.stringify(changedChirp),
      contentType: "application/json",
    }).then(() => {
      setChirpUser(chirpUser);
      setChirpMessage(chirpMessage);
    });
  }

  async function deleteChirp() {
    $.ajax({
      type: "DELETE",
      url: `/api/chirps/${props.id}`,
      success: function (result: string) {
        console.log(result);
        document.getElementById(props.id).style.display = "none";
        // hiding deleted chirp since I don't know how trigger re-render here
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
                onChange={(e) => {
                  console.log("It's chirpUser Modal");
                  setChirpUser(e.target.value);
                }}
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
                onChange={(e) => {
                  console.log("It's chirpMessage Modal");
                  setChirpMessage(e.target.value);
                }}
              ></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={hideModal}>
            Cancel
          </button>
          <button className="btn btn-success" onClick={updateChirp}>
            Save
          </button>
        </Modal.Footer>
      </Modal>

      {/* Card Below */}
      <div
        key={props.id}
        id={props.id}
        className="card col-6 m-3 shadow rounded"
      >
        <p className="card-header">{chirpUser}</p>
        <div className="card-body">
          <p className="card-title">{props.id}</p>
          <h5 className="card-text">{chirpMessage}</h5>
        </div>
        <div id="button-container" className="row d-flex flex-row-reverse">
          <button className="btn-danger btn m-2 col-2" onClick={deleteChirp}>
            Delete
          </button>
          <button className="btn-info btn m-2 col-2" onClick={showModal}>
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default Chirp;
