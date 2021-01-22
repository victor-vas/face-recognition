import React from 'react';
import Navigation from './components/Navigation';
import Logo from './components/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import './App.css';
import Rank from './components/Rank';
import Particles from 'react-particles-js';

function App() {
  return (
    <main className="App">
      <Particles
        className="particles"
        params={{
          particles: {
            number: {
              value: 50,
              density: {
                enable: true,
                value_area: 800,
              },
            },
          },
        }}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
    </main>
  );
}

export default App;
