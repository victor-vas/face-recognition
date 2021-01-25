import React from 'react';
import './styles.css';

interface NavigationProps {
  route: string;
  setRoute: React.Dispatch<React.SetStateAction<string>>;
}

const Navigation = ({ route, setRoute }: NavigationProps) => {
  return (
    <>
      {route === 'home' ? (
        <nav>
          <p
            className="f3 link dim white underline pa3 pointer"
            onClick={() => setRoute('signin')}
          >
            Sign Out
          </p>
        </nav>
      ) : (
        <nav>
          <p
            className="f3 link dim white underline pa3 pointer"
            onClick={() => setRoute('signin')}
          >
            Sign In
          </p>
          <p
            className="f3 link dim white underline pa3 pointer"
            onClick={() => setRoute('register')}
          >
            Register
          </p>
        </nav>
      )}
    </>
  );
};

export default Navigation;
