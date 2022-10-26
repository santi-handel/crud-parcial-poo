import Home from "../containers/Home";
import FirestoreContext from "../context/FirestoreContext";
function App() {
  return (
    <FirestoreContext>
      <Home></Home>
    </FirestoreContext>
    
  );
}

export default App;
