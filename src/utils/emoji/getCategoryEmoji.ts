export const getCategoryEmoji = (category: string): string => {
  const emojiMap: { [key: string]: string } = {
    '식당/베이커리': '🍽️',
    '편의점/쇼핑': '🏪',
    패션: '👕',
    '디저트/음료': '☕',
    치킨: '🍗',
  };

  return emojiMap[category] || '🎁';
};
