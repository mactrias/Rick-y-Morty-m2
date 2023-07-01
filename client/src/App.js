import "./App.css";
import Cards from "./components/Cards/Cards.jsx";
import Nav from "./components/Nav/Nav.jsx";
import About from "./components/About/About";
import Detail from "./components/Detail/Detail";
import Error from "./components/Error/Error";
import Form from "./components/Form/Form";
import Favorites from "./components/Favorites/Favorites";
import { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import styles from "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [access, setAccess] = useState(false);
  const navigate = useNavigate();
  const username = "matias@hotmail.com";
  const password = "prueba123";
  const location = useLocation();

  function login(userData) {
    if (userData.password === password && userData.username === username) {
      setAccess(true);
      navigate("/home");
    } else {
      window.alert("Incorrect username/password");
    }
  }

  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  function logOut() {
    setAccess(false);
    navigate("/");
  }
  function onClose(id) {
    setCharacters(characters.filter((data) => data.id !== id));
  }

  function onSearch(character) {
    fetch(`https://rickandmortyapi.com/api/character/${character}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.name) {
          if (!characters.find((el) => el.id == character))
            setCharacters((oldChars) => [...oldChars, data]);
          else window.alert("Personaje Repetido");
        } else {
          window.alert("No hay personajes con ese ID");
        }
      });
  }

  return (
    <div className={"App"} style={{ padding: "25px" }}>
      {location.pathname !== "/" && <Nav logOut={logOut} onSearch={onSearch} />}
      <Routes>
        <Route path="/" element={<Form login={login} />} />
        <Route
          exact
          path="/home"
          element={<Cards characters={characters} onClose={onClose} />}
        />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/favorites" element={<Favorites />} />
        <Route exact path="/detail/:detailId" element={<Detail />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
