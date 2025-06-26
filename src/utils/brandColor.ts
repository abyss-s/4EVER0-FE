const tailwindColors: { [key: string]: string } = {
  'bg-pink-500': '#ec4899',
  'bg-emerald-500': '#10b981',
  'bg-blue-800': '#1e3a8a',
  'bg-yellow-600': '#f59e0b',
  'bg-green-500': '#15803d',
  'bg-lime-300': '#84cc16',
  'bg-red-700': '#b91c1c',
  'bg-red-500': '#ef4444',
  'bg-gray-500': '#6b7280',
};

export const getBrandBackgroundColor = (brand: string): string => {
  const colorMap: { [key: string]: string } = {
    배스킨라빈스: 'bg-pink-500',
    CU: 'bg-emerald-500',
    파리바게뜨: 'bg-blue-800',
    메가MGC커피: 'bg-yellow-500',
    파파존스: 'bg-green-700',
    올리브영: 'bg-lime-300',
    스파오: 'bg-red-700',
    다이소: 'bg-red-500',
  };

  return colorMap[brand] || 'bg-gray-400';
};

export const getrawBackgroundColor = (brand: string): string => {
  const colorMap: { [key: string]: string } = {
    배스킨라빈스: 'bg-pink-500',
    CU: 'bg-emerald-500',
    파리바게뜨: 'bg-blue-800',
    메가MGC커피: 'bg-yellow-500',
    파파존스: 'bg-green-700',
    올리브영: 'bg-lime-300',
    스파오: 'bg-red-700',
    다이소: 'bg-red-500',
  };

  const tailwindClass = colorMap[brand] || 'bg-gray-400'; // 기본 색상
  return tailwindColors[tailwindClass] || '#000000'; // 색상 코드 반환
};

export const getBrandDotColor = (brand: string): string => {
  const dotColorMap: { [key: string]: string } = {
    배스킨라빈스: 'bg-pink-300',
    CU: 'bg-emerald-300',
    파리바게뜨: 'bg-blue-300',
    메가MGC커피: 'bg-yellow-300',
    파파존스: 'bg-green-300',
    올리브영: 'bg-lime-300',
    스파오: 'bg-red-300',
    다이소: 'bg-red-400',
  };

  return dotColorMap[brand] || 'bg-gray-300';
};
