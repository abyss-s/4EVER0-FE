import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAllPlan } from '@/hooks/useAllPlan';
import { usePlanDetail } from '@/hooks/usePlanDetail';
import PlanItem from './PlanItem';
import PlanCard from '@/components/PlanCard/PlanCard';
import { Search, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PlanResponse } from '@/types/plans';

const ITEMS_PER_PAGE = 6;
const PAGINATION_SIZE = 3;

const normalizePlan = (raw: PlanResponse) => ({
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
    isLoading: detailLoading,
    error: detailError,
  } = usePlanDetail(id || '');
  const { data: planList = [], isLoading: listLoading, error: listError } = useAllPlan();

  const filtered = useMemo(
    () =>
      planList.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [planList, searchTerm],
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPlans = filtered.slice(start, start + ITEMS_PER_PAGE);

  const getPageNumbers = () => {
    if (totalPages <= PAGINATION_SIZE) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    // 첫 페이지는 항상 표시
    if (currentPage > 2) {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
    }

    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // 마지막 페이지
    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  if (detailLoading || listLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin w-8 h-8 border-4 border-brand-yellow border-t-transparent rounded-full" />
          <p className="text-gray-600 text-sm">요금제를 불러오는 중...</p>
        </div>
      </div>
    );

  if (detailError || listError)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-red-500 text-lg font-medium mb-2">오류 발생</div>
          <p className="text-gray-600">요금제를 불러올 수 없습니다.</p>
        </div>
      </div>
    );

  // 요금제 상세 페이지 이동
  if (id) {
    if (detailLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin w-8 h-8 border-4 border-brand-yellow border-t-transparent rounded-full" />
            <p className="text-gray-600 text-sm">요금제 상세 정보를 불러오는 중...</p>
          </div>
        </div>
      );
    }

    if (detailError || !planDetail) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-red-500 text-lg font-medium mb-2">요금제를 찾을 수 없습니다</div>
            <p className="text-gray-600 mb-4">요청하신 요금제가 존재하지 않습니다.</p>
            <button
              onClick={() => navigate('/plans')}
              className="px-4 py-2 bg-brand-yellow text-white rounded-lg hover:bg-brand-yellow-hover"
            >
              목록으로 돌아가기
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full">
        <PlanCard plan={normalizePlan(planDetail)} />
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col">
      {/* 헤더 */}
      <div className="flex-shrink-0 mb-6">
        <h1 className="text-xl font-bold text-brand-darkblue mb-4">너겟 요금제</h1>

        {/* 검색 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            className="pl-8 h-12 rounded-xl border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 transition-all"
            placeholder="요금제 검색..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {filtered.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-400 text-2xl mb-3">🔍</div>
              <p className="text-gray-600">검색 결과가 없습니다.</p>
            </div>
          </div>
        ) : (
          <>
            {/* 결과 카운트 */}
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <p className="text-caption-1 text-gray-600 font-medium">
                총 <span className="font-semibold text-brand-red">{filtered.length}</span>개의
                요금제
              </p>
              <p className="text-xs text-gray-500">
                {currentPage} / {totalPages} 페이지
              </p>
            </div>

            {/* 요금제 목록 */}
            <div className="flex-1">
              <div className="space-y-3">
                {currentPlans.map((plan) => (
                  <PlanItem
                    key={plan.id}
                    plan={normalizePlan(plan)}
                    onSelect={() => navigate(`/plans/${plan.id}`)}
                  />
                ))}
              </div>
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="flex-shrink-0 mt-6 pt-4 border-t border-gray-100">
                <nav className="flex items-center justify-center">
                  <div className="flex items-center space-x-1">
                    {/* 이전 버튼 */}
                    <button
                      onClick={() => handlePage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* 페이지 번호 */}
                    <div className="flex items-center space-x-1">
                      {getPageNumbers().map((page, idx) => (
                        <React.Fragment key={idx}>
                          {typeof page === 'string' ? (
                            <span className="px-2 py-1 text-gray-400">
                              <MoreHorizontal className="w-4 h-4" />
                            </span>
                          ) : (
                            <button
                              onClick={() => handlePage(page)}
                              className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                                page === currentPage
                                  ? 'bg-brand-yellow text-white shadow-sm'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              {page}
                            </button>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* 다음 버튼 */}
                    <button
                      onClick={() => handlePage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PlanPage;
