import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  placeholder?: string;
  rows?: number;
  maxHeight?: string;
  placeholderItems?: string[];
  placeholderItemsHandler?: (item: string) => void;
  textAreaHandler?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextAreaScrollable: React.FC<InputProps> = ({
  label,
  error,
  placeholder,
  rows = 6,
  maxHeight = '120px',
  placeholderItems = [],
  placeholderItemsHandler = () => { },
  textAreaHandler = () => { },
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const scrollUp = () => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop -= 40; // adjust step
    }
  };

  const scrollDown = () => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop += 40; // adjust step
    }
  };

  return (
    <div className="textarea-container">
      {label && <label htmlFor={props.id ?? props.name}>{label}</label>}
      <div className="textarea-wrapper">
        <textarea
          ref={textareaRef}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          placeholder={placeholder}
          rows={rows}
          className={`textarea textarea-scrollable ${error ? 'textarea-error' : ''}`}
          style={{ maxHeight }}
          onChange={(e) => {
            textAreaHandler(e);
          }}
        />
        <div className="scroll-buttons">
          <button type="button" onClick={scrollUp}>
            <ChevronUp stroke="#98A2B3" />
          </button>
          <span className="buttons-divider"></span>
          <button type="button" onClick={scrollDown}>
            <ChevronDown stroke="#98A2B3" />
          </button>
        </div>
      </div>

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
