export interface PriceCalculation {
  originalPrice: number;
  discountedPrice: number;
  discountAmount: number;
  discountRate: number;
}

/**
 * 할인 가격 계산
 * @param originalPrice 원가
 * @param discountRate 할인율 (0.3 = 30%)
 * @returns 할인 계산 결과
 */
export function calculateDiscountPrice(
  originalPrice: number,
  discountRate: number = 0.3,
): PriceCalculation {
  const discountAmount = Math.floor(originalPrice * discountRate);
  const discountedPrice = originalPrice - discountAmount;

  return {
    originalPrice,
    discountedPrice,
    discountAmount,
    discountRate: discountRate * 100,
  };
}

/**
 * 여러 상품의 총 할인 가격 계산
 * @param prices 가격 배열
 * @param discountRate 할인율
 * @returns 총 할인 계산 결과
 */
export function calculateTotalDiscountPrice(
  prices: number[],
  discountRate: number = 0.3,
): PriceCalculation {
  const originalPrice = prices.reduce((sum, price) => sum + price, 0);
  return calculateDiscountPrice(originalPrice, discountRate);
}

/**
 * 가격을 한국어 형식으로 포맷팅
 * @param price 가격
 * @returns 포맷된 가격 문자열
 */
export function formatPrice(price: number): string {
  return `${price.toLocaleString()}원`;
}

/**
 * 할인율을 퍼센트 문자열로 포맷팅
 * @param rate 할인율 (0.3 = 30%)
 * @returns 포맷된 할인율
 */
export function formatDiscountRate(rate: number): string {
  return `${Math.round(rate * 100)}%`;
}
