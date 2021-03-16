import * as React from "react";
import Chirp from "./components/Chirp";
import Header from "./components/Header";

const Home: React.FunctionComponent = (props) => {
  const [chirps, setChirps] = React.useState<Array<any>>([]);
  const [user, setUser] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");

  React.useEffect(() => {
    (async () => {
      getAndRenderChirps();
    })();
  }, [chirps]); // listening for chirps changes

  async function getAndRenderChirps() {
    try {
      let res = await fetch("http://localhost:3000/api/chirps");
      let chirpsJSON = await res.json();
      let ids = Object.keys(chirpsJSON);
      let chirpsArray = ids.map((id) => {
        return {
          id: id,
          user: chirpsJSON[id].user,
          message: chirpsJSON[id].message,
        };
      }); // Creating an array of objects from the JSON
      chirpsArray.pop(); // deleting nextid off each object
      setChirps(chirpsArray);
    } catch (error) {
      console.log(error);
    }
  }

  function handlePostClick() {
    let newChirp = { user: user, message: message };
    $.ajax({
      type: "POST",
      url: "/api/chirps",
      data: JSON.stringify(newChirp),
      contentType: "application/json",
    }).then(() => {
      setUser("");
      setMessage("");
      setChirps([]); // causes useEffect to rerun
    });
  }

  return (
    <>
    <Header />
      <div className="row">
        <div className="container row mx-4">
          <div className="input-group">
            <span className="input-group-text">Username</span>
            <input
              type="text"
              className="form-control"
              aria-label="Subject"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            ></input>
          </div>
          <div className="input-group">
            <span className="input-group-text">Chirp</span>
            <textarea
              className="form-control"
              aria-label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
        </div>
        <button
          className="btn btn-success btn-md h-25"
          onClick={handlePostClick}
        >
          Post chirp fr
        </button>
        <div className="container justify-content-center">
          {chirps
            .slice(0)
            .reverse()
            .map((chirp) => {
              /* Reverses array so chirps display from newest to oldest */
              return (
                <Chirp
                  id={chirp.id}
                  user={chirp.user}
                  message={chirp.message}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
