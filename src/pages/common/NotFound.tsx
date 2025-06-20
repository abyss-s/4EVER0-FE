import React from 'react';
import { Button } from '@/components/Button';
import { useNavigate } from 'react-router-dom';

interface NotFoundProps {
  imageSrc: string;
  altText?: string;
  message: string;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
}

const NotFound: React.FC<NotFoundProps> = ({
  imageSrc,
  altText = '',
  message,
  buttonText,
  buttonLink,
  className = '',
}) => {
  const navigate = useNavigate();

  return (
    <div className={`flex flex-col items-center justify-center mt-10 py-12 ${className}`}>
      <img src={imageSrc} alt={altText} className="w-40 h-auto mb-4" />
      <p className="text-gray-500 text-m text-center mb-4">{message}</p>

      {buttonText && buttonLink && (
        <Button
          variant="outline"
          size="default"
          className="bg-white/50 border-black/50 text-gray-800 hover:bg-gray/80"
          onClick={() => navigate(buttonLink)}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default NotFound;
