import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAllPlan } from '@/hooks/useAllPlan';
import { usePlanDetail } from '@/hooks/usePlanDetail';
import { PlanResponse } from '@/types/plans';

const Plan: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // 상세 요금제
  const {
    data: planDetail,
    isLoading: isDetailLoading,
    error: detailError,
  } = usePlanDetail(id ?? '');

  // 전체 요금제
  const { data: planList = [], isLoading: isListLoading, error: listError } = useAllPlan();

  if (isDetailLoading || isListLoading) return <p className="p-4">로딩 중...</p>;

  if (detailError || listError) {
    return <p className="p-4 text-red-500">요금제를 불러오는 중 오류가 발생했습니다.</p>;
  }

  if (id && planDetail) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{planDetail.name}</h2>
        <p>가격: {planDetail.price}원</p>
        <p>데이터: {planDetail.data ?? '-'}</p>
        <p>속도: {planDetail.speed ?? '-'}</p>
        <p>음성: {planDetail.voice ?? '-'}</p>
        <p>SMS: {planDetail.sms ?? '-'}</p>
        <p>쉐어링: {planDetail.share_data ?? '-'}</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">이 요금제로 변경</button>
        <Link to="/plans" className="block mt-6 text-blue-500 underline">
          전체 요금제로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">전체 요금제</h1>
      {planList.map((p: PlanResponse) => (
        <Link
          to={`/plans/${p.id}`}
          key={p.id}
          className="block p-4 border rounded hover:bg-gray-100"
        >
          <h2 className="text-lg font-semibold">{p.name}</h2>
          <p>가격: {p.price}원</p>
        </Link>
      ))}
    </div>
  );
};

export default Plan;
