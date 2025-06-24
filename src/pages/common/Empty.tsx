import React from 'react';
import { Button } from '@/components/Button';
import { useNavigate } from 'react-router-dom';

interface EmptyProps {
  imageSrc: string;
  altText?: string;
  message: string;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
  onClickButton?: () => void;
}

const Empty: React.FC<EmptyProps> = ({
  imageSrc,
  altText = '',
  message,
  buttonText,
  buttonLink,
  className = '',
  onClickButton,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center px-4 text-center bg-white ${className}`}
    >
      <img src={imageSrc} alt={altText} className="w-40 h-auto mb-4" />
      <p className="text-gray-500 text-sm text-center mb-4">{message}</p>

      {buttonText && (
        <Button
          variant="outline"
          size="default"
          className="bg-white/50 border-black/50 text-gray-800 hover:bg-white/70"
          onClick={() => {
            if (onClickButton) {
              onClickButton();
            } else if (buttonLink) {
              navigate(buttonLink);
            }
          }}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default Empty;
