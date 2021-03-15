import * as React from "react";
import Chirp from "./Chirp";

const App = (props: AppProps) => {
  const [chirps, setChirps] = React.useState<Array<any>>([]);

  React.useEffect(() => {
    (async () => {
      try {
        let res = await fetch("http://localhost:3000/api/chirps");
        console.log("test");
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
    })();
  }, []);
  return (
    <>
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <h1 className="display-1">hey</h1>
      </div>
      <div className="card-deck d-flex flex-column align-items-center col-8">
        {chirps
          .slice(0)
          .reverse()
          .map((chirp) => {
            /* Reverses array so chirps display from newest to oldest */
            return <Chirp user={chirp.user} message={chirp.message} />;
          })}
      </div>
    </>
  );
};

interface AppProps {}

export default App;
