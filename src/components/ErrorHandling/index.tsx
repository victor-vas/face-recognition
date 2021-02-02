import React, { useEffect } from 'react';

interface ErrorHandlingProps {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const ErrorHandling = ({ error, setError }: ErrorHandlingProps) => {
  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 5000);
  }, [setError, error]);

  return (
    <>
      {error && (
        <div className="white bg-red pa2 ma3 b--solid b--white">
          <span>{error}</span>
        </div>
      )}
    </>
  );
};

export default ErrorHandling;
