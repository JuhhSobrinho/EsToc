import { useState, useEffect } from "react";
import luzRoxa from "../assets/luz-roxa.svg";
import luzPreta from "../assets/luz-preta.svg";


const ThemeToggle = () => {
  const [theme, setTheme] = useState("dark");
  const [isChecked, setIsChecked] = useState(true);


  useEffect(() => {
    if (theme === "dark") {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    setIsChecked(!isChecked);
    console.log("Tema alterado para:", newTheme);

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
  }, []);

  return (
        <button id="toggleButton" onClick={toggleTheme} className="btn-luz">
          <img src={isChecked ? luzRoxa : luzPreta} alt="luz" className="luz" />
        </button>
  );
};

export default ThemeToggle;
