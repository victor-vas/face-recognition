/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import Navigation from '../../components/Navigation';
import Logo from '../../components/Logo';
import ImageLinkForm from '../../components/ImageLinkForm';
import Rank from '../../components/Rank';
import FaceRecognition from '../../components/FaceRecognition';

import './styles.css';

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_CLARIFAI_API_kEY,
});

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = () => {
    setImageUrl(input);

    app.models.predict('d02b4508df58432fbb84e800597b8959', input).then(
      function (response: any) {
        console.log(
          response.outputs[0].data.regions[0].region_info.bounding_box,
        );
      },

      function (error: any) {
        console.log(error);
      },
    );
  };

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
      <ImageLinkForm
        setInput={setInput}
        input={input}
        handleSubmit={handleSubmit}
      />
      <FaceRecognition imageUrl={imageUrl} />
    </main>
  );
}

export default App;
