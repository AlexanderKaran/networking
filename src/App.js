// useEffect get imported from React just like the useState hook
import { useState, useEffect } from "react";
// We can keep the default CSS that comes with the project to make the image spin round
import "./App.css";

function App() {
  // Declare state for us to store the response from the Github network call in
  const [githubData, setGithubData] = useState();

  // useEffect takes two arguments, the first is the code we want to run, and the second is an array.
  // Putting arguments into the array means the useEffect watches them for changes and re-runs the code.
  // The code will only run once when the array is empty after the first UI render.
  useEffect(() => {
    // Here I create my function like before, but instead of returning the data, I set it to state using setGithubData
    async function getAlexanderGithubEvents() {
      try {
        const res = await fetch(
          "https://api.github.com/users/AlexanderKaran/events",
          {
            method: "GET",
          }
        );
        const body = await res.json();
        setGithubData(body);
      } catch (err) {
        console.log(err);
      }
    }

    getAlexanderGithubEvents();

    // The empty array
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* Finally, I use a turnery to render an image if there is a value in the state or a paragraph with the words loading inside if it is empty. */}
        {githubData ? (
          <img
            // If you see the data example from earlier, it returns an array, so I need to access that before the object values.
            src={githubData[0].actor.avatar_url}
            className="App-logo"
            alt="logo"
          />
        ) : (
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        )}
      </header>
    </div>
  );
}

export default App;
