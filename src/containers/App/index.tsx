/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import Navigation from '../../components/Navigation';
import Logo from '../../components/Logo';
import ImageLinkForm from '../../components/ImageLinkForm';
import Rank from '../../components/Rank';
import FaceRecognition from '../../components/FaceRecognition';
import SignIn from '../SignIn';
import Register from '../Register';

import './styles.css';

export interface IBox {
  topRow: number;
  bottomRow: number;
  leftCol: number;
  rightCol: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  entries: number;
  joined: string;
}

const initialUser = {
  id: '',
  name: '',
  email: '',
  entries: 0,
  joined: '',
};

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_CLARIFAI_API_kEY,
});

const App = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState<IBox | null>();
  const [route, setRoute] = useState('signin');
  const [user, setUser] = useState<User>(initialUser);

  const calculateFaceLocation = (data: any) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('input-image') as HTMLImageElement;
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const handleSubmit = () => {
    setImageUrl(input);

    app.models
      .predict('d02b4508df58432fbb84e800597b8959', input)
      .then((response: any) => setBox(calculateFaceLocation(response)))
      .catch((error: any) => console.error(error));
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
      <Navigation route={route} setRoute={setRoute} />
      {route === 'signin' && <SignIn setRoute={setRoute} />}
      {route === 'register' && (
        <Register setRoute={setRoute} setUser={setUser} />
      )}
      {route === 'home' && (
        <>
          <Logo />
          <Rank />
          <ImageLinkForm
            setInput={setInput}
            input={input}
            handleSubmit={handleSubmit}
          />
          <FaceRecognition imageUrl={imageUrl} box={box} />
        </>
      )}
      {console.log(user)}
    </main>
  );
};

export default App;
