function App() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const fromData = new FormData(event.target);
  };
  return (
    <div className="bg-[linear-gradient(to_right,#ffecd2_0%,#fcb69f70_100%)] p-0.5 min-h-screen">
      <div className="bg-gray-300/80 w-fit mx-auto px-20 pt-10 pb-20 mt-40 rounded-md">
        <p> Login</p>
        <form onSubmit={handleSubmit}>
          <div className="mt-4 flex flex-col space-y-1">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              name="username"
              className="h-8 p-2 outline-none"
            />
          </div>
          <div className="mt-3 flex flex-col space-y-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="h-8 p-2 outline-none"
            />
          </div>
          <button className="mt-4 bg-red-400 w-full py-2 rounded-sm">
            Sing In
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
