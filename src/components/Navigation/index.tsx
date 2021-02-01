import React from 'react';
import { IUser } from '../../containers/App';
import './styles.css';

interface NavigationProps {
  setRoute: React.Dispatch<React.SetStateAction<string>>;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  user: IUser | null;
}

const Navigation = ({
  setRoute,
  setUser,
  setImageUrl,
  setInput,
  user,
}: NavigationProps) => {
  return (
    <>
      {!user?.id ? (
        <nav>
          <p
            className="f3 link dim white underline pa3 pointer"
            onClick={() => {
              setRoute('signin');
              localStorage.setItem('route', 'signin');
            }}
          >
            Entrar
          </p>
          <p
            className="f3 link dim white underline pa3 pointer"
            onClick={() => {
              setRoute('signup');
              localStorage.setItem('route', 'signup');
            }}
          >
            Registrar
          </p>
        </nav>
      ) : (
        <nav>
          <p
            className="f3 link dim white underline pa3 pointer"
            onClick={() => {
              localStorage.clear();
              setUser(null);
              setImageUrl('');
              setInput('');
              setRoute('signin');
              localStorage.setItem('route', 'signin');
            }}
          >
            Sair
          </p>
        </nav>
      )}
    </>
  );
};

export default Navigation;
