import { useEffect, useState } from 'react';
import './splash.css';

const savedTheme = localStorage.getItem("theme") || "dark";

const SplashScreen = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Tempo em milissegundos para exibir a tela de splash

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    if (savedTheme === "dark") {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  }, []);

  const themeStyles = isChecked
    ? {
        "--main-bg-color": "#fff",
        "--main-text-color": "#000",
        "--main-secun-color": "#f4f7ff",
      }
    : {
        "--main-bg-color": "#2c2c38",
        "--main-text-color": "#fff",
        "--main-secun-color": "#21212d",
      };

  if (isLoading) {
    return (
      <div className="splash-screen" style={themeStyles}>
        <section className='icon'>        
          <h1 className='titulo'>EsToc</h1>
        </section>

      </div>
    );
  }

  return <div className={`splash-screen ${isLoading ? 'show' : 'hide'}`}>

  </div>;
};

export default SplashScreen;