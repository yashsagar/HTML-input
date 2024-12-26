function App() {
  const handleClick = () => {
    fetch("http://localhost:3000/api", {
      credentials: "include",
    });
  };

  return (
    <div>
      <p className="bg-red-500">test</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default App;
