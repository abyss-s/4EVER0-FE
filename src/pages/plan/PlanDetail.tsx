import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlanDetail } from '@/hooks/usePlanDetail';
import PlanCard from '@/components/PlanCard/PlanCard';
import { Share2, Heart } from 'lucide-react';
import { Button } from '@/components/Button';

const PlanDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: plan, isLoading, error } = usePlanDetail(id ?? '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-xl shadow-lg">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-red-600 font-medium mb-4">요금제를 불러올 수 없습니다.</p>
          <Button
            onClick={() => navigate('/plans')}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 네비게이션
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/plans')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            전체 요금제로 돌아가기
          </button>
        </div>
      </div> */}
      {/* 상세 내용 */}
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-md mx-auto space-y-6">
          <PlanCard plan={plan} variant="detail" />

          {/* 액션 버튼들 */}
          <div className="flex gap-3">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
              신청하기
            </Button>
            <Button variant="outline" className="p-3 border-gray-300 hover:bg-gray-50 rounded-xl">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button variant="outline" className="p-3 border-gray-300 hover:bg-gray-50 rounded-xl">
              <Heart className="w-5 h-5" />
            </Button>
          </div>

          {/* 추가 정보 */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4">요금제 혜택</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>피싱/해킹 안심서비스 24개월 무료</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>네이버페이 월 할인 혜택</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>유심 추가 데이터 제공</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetail;
