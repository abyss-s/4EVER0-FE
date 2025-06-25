/* 브랜드별 대표 배경색 (카드, 배너 등) */
export const getBrandBackgroundColor = (brand: string): string => {
  const colorMap: { [key: string]: string } = {
    MIXXO: 'bg-zinc-700',
    CGV: 'bg-red-600',
    LG생활건강: 'bg-rose-400',
    GS25: 'bg-blue-600',
    리디셀렉트: 'bg-blue-500',
    배스킨라빈스: 'bg-pink-500',
    CU: 'bg-emerald-500',
    교보문고: 'bg-indigo-700',
    이디야커피: 'bg-sky-900',
    뚜레쥬르: 'bg-lime-700',
    맘스터치: 'bg-amber-400',
    올리브영: 'bg-green-600',
    무신사: 'bg-slate-500',
    티빙: 'bg-rose-600',
  };

  return colorMap[brand] || 'bg-gray-400';
};

/* 브랜드별 dot 색상 */
export const getBrandDotColor = (brand: string): string => {
  const dotColorMap: { [key: string]: string } = {
    MIXXO: 'bg-zinc-400',
    CGV: 'bg-red-300',
    LG생활건강: 'bg-rose-200',
    GS25: 'bg-blue-300',
    리디셀렉트: 'bg-blue-200',
    배스킨라빈스: 'bg-pink-300',
    CU: 'bg-emerald-300',
    교보문고: 'bg-indigo-300',
    이디야커피: 'bg-sky-300',
    뚜레쥬르: 'bg-lime-300',
    맘스터치: 'bg-amber-200',
    올리브영: 'bg-green-300',
    무신사: 'bg-slate-300',
    티빙: 'bg-rose-300',
  };

  return dotColorMap[brand] || 'bg-gray-300';
};
