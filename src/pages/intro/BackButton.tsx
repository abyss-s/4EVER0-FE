import { ChevronLeftIcon } from '@radix-ui/react-icons';

interface BackButtonProps {
  onClick: () => void;
  className?: string;
  color?: 'gray' | 'white';
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, className = '', color = 'gray' }) => {
  const textColor = color === 'white' ? 'text-white' : 'text-gray-600';

  return (
    <button onClick={onClick} className={`flex items-center gap-1 ${textColor} ${className}`}>
      <ChevronLeftIcon className="w-4 h-4 cursor-pointer" />
    </button>
  );
};

export default BackButton;
