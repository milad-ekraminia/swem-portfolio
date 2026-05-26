import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  placeholder?: string;
  rows?: number;
  placeholderItems?: string[];
  placeholderItemsHandler?: (item: string) => void;
  textAreaHandler?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea: React.FC<InputProps> = ({
  label,
  error,
  placeholder,
  rows = 6,
  placeholderItems = [],
  placeholderItemsHandler = () => { },
  textAreaHandler = () => { },
  ...props
}) => {
  return (
    <div className="textarea-container">
      {label && <label htmlFor={props.id ?? props.name}>{label}</label>}
      <textarea
        {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        placeholder={placeholder}
        rows={rows}
        className={`textarea ${error ? 'textarea-error' : ''} `}
        onChange={(e) => {
          textAreaHandler(e);
        }}
      />
      {placeholderItems?.length > 0 ? (
        <div className="placeholder-items">
          {placeholderItems.map((item, index) => (
            <button
              className="placeholder-item"
              key={index}
              onClick={() => {
                placeholderItemsHandler(item);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};
