import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAllPlan } from '@/hooks/useAllPlan';
import { usePlanDetail } from '@/hooks/usePlanDetail';
import { PlanResponse } from '@/types/plans';
import PlanCard from '@/components/PlanCard/PlanCard';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Plan } from '@/types/plan';

const ITEMS_PER_PAGE = 3;

const normalizePlan = (raw: PlanResponse): Plan => ({
  id: raw.id,
  name: raw.name,
  description: raw.description,
  price: typeof raw.price === 'string' ? Number(raw.price) : raw.price,
  data: raw.data ?? '',
  voice: raw.voice ?? '',
  speed: raw.speed ?? '',
  sms: raw.sms ?? '',
});

const PlanPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: planDetail,
    isLoading: isDetailLoading,
    error: detailError,
  } = usePlanDetail(id ?? '');

  const { data: planList = [], isLoading: isListLoading, error: listError } = useAllPlan();

  const filteredPlans = useMemo(() => {
    return planList.filter(
      (plan: PlanResponse) =>
        plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.description?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [planList, searchTerm]);

  const totalPages = Math.ceil(filteredPlans.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPlans = filteredPlans.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const visiblePages = 4;

    const startPage = Math.floor((currentPage - 1) / visiblePages) * visiblePages + 1;
    const endPage = Math.min(startPage + visiblePages - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

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

  if (!id && planList.length > 0) {
    return (
      <div className="min-h-full bg-white">
        <div className="container mx-auto py-4">
          <div className="bg-white rounded-xl shadow-sm mb-6 border border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="요금제 검색..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {currentPlans.map((plan: PlanResponse, index) => (
              <div
                key={plan.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PlanCard
                  plan={normalizePlan(plan)}
                  onSelect={() => navigate(`/plans/${plan.id}`)}
                />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col items-center space-y-3 py-4">
              <div className="flex items-center space-x-1">
                {currentPage > 1 && (
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="flex items-center justify-center w-10 h-10 text-[#25394B] hover:bg-yellow-50 rounded-full transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}

                <div className="flex items-center space-x-1">
                  {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-[#F4DE75] text-white'
                            : 'text-[#25394B] hover:bg-yellow-50'
                        }`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  ))}
                </div>

                {currentPage < totalPages && (
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="flex items-center justify-center w-10 h-10 text-[#25394B] hover:bg-yellow-50 rounded-full transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

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

  if (id && planDetail) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <PlanCard plan={normalizePlan(planDetail)} />
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

export default PlanPage;
