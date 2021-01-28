import React, { useState } from 'react';

interface SignInProps {
  setRoute: React.Dispatch<React.SetStateAction<string>>;
}

const SignIn = ({ setRoute }: SignInProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form
          className="measure"
          onSubmit={(event) => {
            event.preventDefault();

            fetch('http://localhost:3333/signin', {
              method: 'post',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email,
                password,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data === 'success') {
                  setRoute('home');
                }
              });
          }}
        >
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0 white">Sign In</legend>
            <div className="mt3">
              <label
                className="db fw6 lh-copy f6 white"
                htmlFor="email-address"
              >
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
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
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
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
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3" onClick={() => setRoute('register')}>
            <p className="f6 link dim white db pointer">Register</p>
          </div>
        </form>
      </main>
    </article>
  );
};

export default SignIn;
