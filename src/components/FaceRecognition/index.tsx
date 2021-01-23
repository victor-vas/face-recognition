import React from 'react';
import './styles.css';

interface FaceRecognitionProps {
  imageUrl: string;
}

const FaceRecognition = ({ imageUrl }: FaceRecognitionProps) => {
  return (
    <>
      {imageUrl && (
        <div className="center ma">
          <div className="absolute mt2">
            <img
              id="input-image"
              alt="Foto de reconhecimento"
              src={imageUrl}
              width="500px"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FaceRecognition;
