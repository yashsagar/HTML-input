import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:3000/api", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const [data, setData] = useState(null);

  console.log(data);

  const handleClick = () => {
    fetch("http://localhost:3000/api/test", {
      credentials: "include",
    });
  };

  return (
    <>
      <div className="bg-green-400">
        {data ? data.success?.toString() : "Loading..."}
      </div>
      <button onClick={handleClick}>Click me</button>
    </>
  );
}

export default App;
