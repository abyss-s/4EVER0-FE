import { useState } from 'react';

interface MouseTooltipProps {
  content: string;
  children: React.ReactNode;
  offsetX?: number;
  offsetY?: number;
  className?: string;
}

export const MouseTooltip = ({
  content,
  children,
  offsetX = 12,
  offsetY = 48,
  className = '',
}: MouseTooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => setVisible(true);
  const handleMouseLeave = () => setVisible(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    const pos = {
      x: e.pageX,
      y: e.pageY,
    };
    console.log('좌표', pos); // ← 여기에!
    setPosition(pos);
  };

  if (visible) console.log('툴팁 보임');

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {children}
      {visible && (
        <div
          className={`fixed z-50 px-2 py-1 text-xs text-white bg-black rounded shadow pointer-events-none transition-opacity duration-150 ${className}`}
          style={{
            left: Math.min(position.x + offsetX, window.innerWidth - 160),
            top: Math.max(position.y - offsetY, 0),
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};
