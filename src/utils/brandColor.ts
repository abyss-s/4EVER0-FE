/** 브랜드별 배경색 매핑 (배너나 카드에 사용) */
export const getBrandBackgroundColor = (brand: string): string => {
  const colorMap: { [key: string]: string } = {
    MIXXO: 'bg-gray-400',
    CGV: 'bg-red-500',
    LG생활건강: 'bg-pink-400',
    GS25: 'bg-blue-500',
    리디셀렉트: 'bg-blue-400',
    배스킨라빈스: 'bg-pink-500',
    CU: 'bg-green-400',
    교보문고: 'bg-blue-600',
    이디야커피: 'bg-blue-800',
    뚜레쥬르: 'bg-green-800',
    맘스터치: 'bg-yellow-300',
    올리브영: 'bg-green-500',
    무신사: 'bg-slate-400',
    티빙: 'bg-red-500',
  };
  return colorMap[brand] || 'bg-gray-400';
};

/** 브랜드별 점 색상 매핑 (캘린더 dot 표시용) */
export const getBrandDotColor = (brand: string): string => {
  const dotColorMap: { [key: string]: string } = {
    MIXXO: 'bg-gray-500',
    CGV: 'bg-red-500',
    LG생활건강: 'bg-pink-500',
    GS25: 'bg-blue-500',
    리디셀렉트: 'bg-purple-500',
    배스킨라빈스: 'bg-pink-400',
    CU: 'bg-green-500',
    교보문고: 'bg-blue-600',
    이디야커피: 'bg-blue-800',
    뚜레쥬르: 'bg-orange-500',
    맘스터치: 'bg-red-600',
    올리브영: 'bg-emerald-500',
    무신사: 'bg-slate-600',
    티빙: 'bg-indigo-500',
  };
  return dotColorMap[brand] || 'bg-gray-400';
};
