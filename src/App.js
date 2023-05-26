import './App.css';
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useState } from "react";
import Alert from './components/Alert';
import Login from './components/Login';
import Notes from './components/Notes';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Notes showAlert={showAlert} />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;