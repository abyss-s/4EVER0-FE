import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { UBTIResultResponse, UBTIResultData } from '@/types/ubti';

export const UBTIResultPage: React.FC = () => {
  const location = useLocation();
  const [result, setResult] = useState<UBTIResultData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const state = location.state as UBTIResultResponse | undefined;
    if (state?.data) {
      setResult(state.data);
    }
    setIsLoading(false);
  }, [location.state]);

  if (isLoading) {
    return <div className="text-center mt-10 text-gray-500">로딩 중입니다...</div>;
  }

  if (!result) {
    return (
      <div className="text-center mt-10 text-gray-600">결과 데이터를 불러오지 못했습니다.</div>
    );
  }

  const { ubti_type, summary, recommendation, matching_type } = result;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* 본인 유형 */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-purple-800">
          나의 유형: {ubti_type.emoji} {ubti_type.name}
        </h2>
        <p className="text-gray-700 mt-2">{ubti_type.description}</p>
      </div>

      {/* 요약 */}
      <div className="bg-white border rounded-xl p-6 shadow">
        <h3 className="text-lg font-semibold text-indigo-700">요약</h3>
        <p className="text-gray-800 mt-2">{summary}</p>
      </div>

      {/* 추천 요금제 */}
      <div className="bg-white border rounded-xl p-6 shadow">
        <h3 className="text-lg font-semibold text-blue-700">추천 요금제</h3>
        <ul className="list-disc list-inside text-gray-800 mt-2 space-y-2">
          {recommendation.plans.map(
            (plan: UBTIResultData['recommendation']['plans'][0], index: number) => (
              <li key={index}>
                <strong>{plan.name}</strong>: {plan.description}
              </li>
            ),
          )}
        </ul>
      </div>

      {/* 추천 구독 서비스 */}
      <div className="bg-white border rounded-xl p-6 shadow">
        <h3 className="text-lg font-semibold text-green-700">추천 구독 서비스</h3>
        <p className="text-gray-800 mt-2">
          <strong>{recommendation.subscription.name}</strong>:{' '}
          {recommendation.subscription.description}
        </p>
      </div>

      {/* 나랑 잘 맞는유형 */}
      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-indigo-800">
          {matching_type.emoji} {matching_type.name}
        </h2>
        <p className="text-gray-700 mt-2">{matching_type.description}</p>
      </div>
    </div>
  );
};

export default UBTIResultPage;
