function App() {
  (async function () {
    const data = await fetch("http://localhost:8000");
    console.log(data.body);
  })();
  return <div>welcome to frontend</div>;
}

export default App;
