import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAllPlan } from '@/hooks/useAllPlan';
import { usePlanDetail } from '@/hooks/usePlanDetail';
import { PlanResponse } from '@/types/plans';
import PlanCard from '@/components/PlanCard/PlanCard';
import { Search, Filter, ArrowLeft } from 'lucide-react';

const Plan: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: planDetail,
    isLoading: isDetailLoading,
    error: detailError,
  } = usePlanDetail(id ?? '');

  const { data: planList = [], isLoading: isListLoading, error: listError } = useAllPlan();

  // 검색 필터링
  const filteredPlans = planList.filter(
    (plan: PlanResponse) =>
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isDetailLoading || isListLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (detailError || listError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-xl shadow-lg">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-red-600 font-medium">요금제를 불러오는 중 오류가 발생했습니다.</p>
        </div>
      </div>
    );
  }

  // 전체 목록
  if (!id && planList.length > 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* 검색 영역 */}
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="요금제 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>
          </div>

          {/* 요금제 카드 목록 */}
          <div className="space-y-4">
            {filteredPlans.map((plan: PlanResponse, index) => (
              <div
                key={plan.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PlanCard
                  plan={plan}
                  onSelect={() => navigate(`/plans/${plan.id}`)}
                  variant="list"
                />
              </div>
            ))}
          </div>

          {filteredPlans.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-500">다른 검색어로 시도해보세요.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 상세 페이지
  if (id && planDetail) {
    return (
      <div className="min-h-screen bg-white">
        {/* 네비게이션 */}
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
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <PlanCard plan={planDetail} variant="detail" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center p-6 bg-white rounded-xl shadow-lg">
        <p className="text-gray-600">요금제를 불러오지 못했습니다.</p>
      </div>
    </div>
  );
};

export default Plan;
