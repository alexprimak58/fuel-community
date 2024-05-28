import React, { useEffect, useMemo, useState } from "react";
import './App.css';
import Footer from './Components/Header/Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LandingPart from './Components/Landing/LandingPart';
import { Theme, ThemeContext } from './Theme/themeContext'
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadFull } from 'tsparticles';



import { loadSlim } from "@tsparticles/slim";


const colorsMaterial = createTheme({
  palette: {
    primary: {
      main: '#00F58C',
      light: '#B8FBCF',
      dark: '#00854D',
      contrastText: '#1E1E1E'
    },
    secondary: {
      main: '#F5F5F5',
      light: 'rgba(245, 245, 245, 0.5)',
      contrastText: '#1E1E1E'
    }
  },
});


function App() {
  const [theme, setTheme] = useState<Theme>(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#0d47a1",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return (
    <ThemeProvider theme={colorsMaterial}>
      <ThemeContext.Provider value={{ setTheme, theme }}>
        <></>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
