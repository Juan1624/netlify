import { useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(10);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);

  const evaluateStrength = (pass) => {
    let score = 0;

    if (pass.length >= 12) score++;
    if (uppercase) score++;
    if (lowercase) score++;
    if (numbers) score++;
    if (symbols) score++;

    if (score <= 2) return "Débil";
    if (score <= 4) return "Media";
    return "Fuerte";
  };

  const generatePassword = () => {
    let chars = "";

    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+";

    if (chars === "") {
      alert("Selecciona al menos una opción");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    setPassword(newPassword);
    setStrength(evaluateStrength(newPassword));
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    alert("Contraseña copiada");
  };

  return (
    <div className="container">
      <h1>🔐 Generador de Contraseñas</h1>

      <div className="box">
        <label>Longitud: {length}</label>
        <input
          type="range"
          min="5"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />

        <div className="options">
          <label>
            <input type="checkbox" checked={uppercase} onChange={() => setUppercase(!uppercase)} />
            Mayúsculas
          </label>

          <label>
            <input type="checkbox" checked={lowercase} onChange={() => setLowercase(!lowercase)} />
            Minúsculas
          </label>

          <label>
            <input type="checkbox" checked={numbers} onChange={() => setNumbers(!numbers)} />
            Números
          </label>

          <label>
            <input type="checkbox" checked={symbols} onChange={() => setSymbols(!symbols)} />
            Símbolos
          </label>
        </div>

        <button onClick={generatePassword}>Generar</button>

        {password && (
          <div className="result">
            <h2>{password}</h2>

            <p className={`strength ${strength.toLowerCase()}`}>
              Seguridad: {strength}
            </p>

            <button onClick={copyPassword}>Copiar</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;