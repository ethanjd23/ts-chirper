import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ComponentProps } from 'react';
import { useHistory } from "react-router";
import Modal from "react-bootstrap/Modal";

interface DetailsProps extends RouteComponentProps<{id: string}> {}

interface Card {
    user: string;
    message: string;
}

const Details: React.FunctionComponent<DetailsProps> = (props: DetailsProps) => {
    const [chirp, setChirp] = React.useState<Card>({
        user: null,
        message: null
    });
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [chirpUser, setChirpUser] = React.useState<string>("");
  const [chirpMessage, setChirpMessage] = React.useState<string>("");

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    getChirp();

    setIsOpen(false);
  };

  async function updateChirp() {
    let changedChirp = { user: chirpUser, message: chirpMessage };
    setIsOpen(false);
    $.ajax({
      type: "PUT",
      url: `/api/chirps/${props.match.params.id}`,
      data: JSON.stringify(changedChirp),
      contentType: "application/json",
    }).then(() => {
      getChirp();
    });
  }

  async function deleteChirp() {
    $.ajax({
      type: "DELETE",
      url: `/api/chirps/${props.match.params.id}`,
      success: function (result: string) {
        console.log(result);
        document.getElementById(props.match.params.id).style.display = "none";
        // hiding deleted chirp since I don't know how trigger re-render here
      },
    });
  }


    async function getChirp() {
        try {
          let res = await fetch(`http://localhost:3000/api/chirps/${props.match.params.id}`);
          let chirpJSON = await res.json();
          console.log(chirpJSON);
          setChirp(chirpJSON);
        } catch (error) {
          console.log(error);
        }
      }

      React.useEffect(() => { getChirp();}, [props.match.params.id]);

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


        <div
        className="card col-6 m-3 shadow rounded"
      >
        <p className="card-header">{chirp.user}</p>
        <div className="card-body">
          <p className="card-title"></p>
          <h5 className="card-text">{chirp.message}</h5>
        </div>
        <div id="button-container" className="row d-flex flex-row-reverse">
          <button className="btn-danger btn m-2 col-2" onClick={deleteChirp}>
            Delete
          </button>
          <button className="btn-info btn m-2 col-2" onClick={showModal}>
            Edit
          </button>
          <button className="btn" onClick={() => history.back()}></button>
        </div>
      </div>
      </>
        )
};



export default Details;