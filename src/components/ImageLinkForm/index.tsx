import React from 'react';
import './styles.css';

interface ImageLinkFormProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
}

const ImageLinkForm = ({
  input,
  setInput,
  handleSubmit,
}: ImageLinkFormProps) => {
  return (
    <div>
      <p className="f3 white">
        Adicione a foto de uma pessoa para o reconhecimento facial.
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={handleSubmit}
          >
            Detectar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
