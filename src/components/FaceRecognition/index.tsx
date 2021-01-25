import React from 'react';
import { IBox } from '../../containers/App';
import './styles.css';

interface FaceRecognitionProps {
  imageUrl: string;
  box: IBox | null | undefined;
}

const FaceRecognition = ({ imageUrl, box }: FaceRecognitionProps) => {
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
            <div
              className="bounding-box"
              style={{
                top: box?.topRow,
                right: box?.rightCol,
                bottom: box?.bottomRow,
                left: box?.leftCol,
              }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default FaceRecognition;
