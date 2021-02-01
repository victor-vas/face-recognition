import React, { useState } from 'react';
import api from '../../configs/api';
import { IUser } from '../App';

interface SignInProps {
  setRoute: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const SignIn = ({ setRoute, setUser }: SignInProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form
          className="measure"
          onSubmit={async (event) => {
            event.preventDefault();

            try {
              const response = await fetch(`${api}/signin`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email,
                  password,
                }),
              });

              const user = await response.json();

              if (user) {
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
                setRoute('home');
                localStorage.setItem('route', 'home');
              }
            } catch (error) {
              console.log('Erro no cadastro');
            }
          }}
        >
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0 white">Entrar</legend>
            <div className="mt3">
              <label
                className="db fw6 lh-copy f6 white"
                htmlFor="email-address"
              >
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-white hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6 white" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-white hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white"
              type="submit"
              value="Entrar"
            />
          </div>
          <div
            className="lh-copy mt3"
            onClick={() => {
              setRoute('signup');
              localStorage.setItem('route', 'signup');
            }}
          >
            <p className="f6 link dim white db pointer">Registrar</p>
          </div>
        </form>
      </main>
    </article>
  );
};

export default SignIn;
