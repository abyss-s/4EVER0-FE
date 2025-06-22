import React from 'react';
import BackButton from '@/pages/intro/BackButton';

interface TutorialSlideProps {
  title: string;
  description: string;
  iconList?: { icon: React.ReactNode; text: React.ReactNode }[];
  buttonText: string;
  onButtonClick: () => void;
  onBackClick?: () => void;
}

const TutorialSlide: React.FC<TutorialSlideProps> = ({
  title,
  description,
  iconList,
  buttonText,
  onButtonClick,
  onBackClick,
}) => {
  return (
    <div className="w-full h-full flex flex-col items-center px-6 py-6 bg-white text-center mx-auto max-w-[420px]">
      {onBackClick && (
        <div className="w-full flex items-center">
          <BackButton onClick={onBackClick} />
        </div>
      )}

      <div className="text-center mt-30 w-full">
        <h2 className="title-1 mt-2">{title}</h2>
        <p className="body-2 text-gray-600 whitespace-pre-line mt-3">{description}</p>
      </div>

      {iconList && (
        <div className="flex flex-col items-center gap-6 mt-8 w-full">
          {iconList.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="mb-2">{item.icon}</div>
              <p className="body-2">{item.text}</p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onButtonClick}
        className="mt-auto w-full py-3 bg-[var(--color-brand-yellow)] hover:bg-[var(--color-brand-yellow-hover)] text-black rounded-lg button-text transition-colors"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default TutorialSlide;
