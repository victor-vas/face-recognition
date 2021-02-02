/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Particles from 'react-particles-js';

import Navigation from '../../components/Navigation';
import Logo from '../../components/Logo';
import ImageLinkForm from '../../components/ImageLinkForm';
import Rank from '../../components/Rank';
import FaceRecognition from '../../components/FaceRecognition';
import SignIn from '../SignIn';
import SignUp from '../SignUp';

import './styles.css';
import api from '../../configs/api';

export interface IBox {
  topRow: number;
  bottomRow: number;
  leftCol: number;
  rightCol: number;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  entries: number;
  joined: string;
}

const App = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState<IBox | null>();
  const [route, setRoute] = useState(
    (localStorage.getItem('route') as string) || 'signin',
  );
  const [user, setUser] = useState<IUser | null>(
    JSON.parse(localStorage.getItem('user') as string),
  );

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

    if (!user) return;

    fetch(`${api}/imageurl`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input,
      }),
    })
      .then((response) => response.json())
      .then((response: any) => {
        if (response) {
          fetch(`${api}/image`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => setUser({ ...user, entries: count }));
        }
        setBox(calculateFaceLocation(response));
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((error: any) =>
        console.log('A API não está funcionando no momento.'),
      );
  };

  return (
    <main className="App">
      <Particles
        className="particles"
        params={{
          particles: {
            number: {
              value: 70,
              density: {
                enable: true,
                value_area: 500,
              },
            },
          },
        }}
      />
      <Navigation
        user={user}
        setRoute={setRoute}
        setUser={setUser}
        setImageUrl={setImageUrl}
        setInput={setInput}
      />
      {route === 'signin' && !user?.id && (
        <SignIn setRoute={setRoute} setUser={setUser} />
      )}
      {route === 'signup' && !user?.id && (
        <SignUp setRoute={setRoute} setUser={setUser} />
      )}
      {route === 'home' && user?.id && (
        <>
          <Logo />
          <Rank user={user} />
          <ImageLinkForm
            setInput={setInput}
            input={input}
            handleSubmit={handleSubmit}
          />
          <FaceRecognition imageUrl={imageUrl} box={box} />
        </>
      )}
    </main>
  );
};

export default App;
