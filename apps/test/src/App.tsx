import { BrowserClient } from "@monocle/browser";

function App() {
  const client = new BrowserClient({
    app: "test",
    url: "http://localhost:3000",
  });

  client.vitals();

  return (
    <>
      <h1>Test</h1>
      <img src="https://source.unsplash.com/random/400x2000" alt="random" />
      <button>Click me</button>
      <img src="https://source.unsplash.com/random/400x400" alt="random" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptatum, quibusdam, voluptates, quia quae voluptate quos
        exercitationem quod voluptatibus quas quibusdam, voluptates, quia quae
        voluptate quos exercitationem quod voluptatibus quas.
      </p>
      <img src="https://source.unsplash.com/random/400x400" alt="random" />

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptatum, quibusdam, voluptates, quia quae voluptate quos
        exercitationem quod voluptatibus quas quibusdam, voluptates, quia quae
        voluptate quos exercitationem quod voluptatibus quas.
      </p>
      <img src="https://source.unsplash.com/random/400x400" alt="random" />

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptatum, quibusdam, voluptates, quia quae voluptate quos
        exercitationem quod voluptatibus quas quibusdam, voluptates, quia quae
        voluptate quos exercitationem quod voluptatibus quas.
      </p>
      <img src="https://source.unsplash.com/random/400x400" alt="random" />

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptatum, quibusdam, voluptates, quia quae voluptate quos
        exercitationem quod voluptatibus quas quibusdam, voluptates, quia quae
        voluptate quos exercitationem quod voluptatibus quas.
      </p>
    </>
  );
}

export default App;
