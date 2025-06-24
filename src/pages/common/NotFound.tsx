import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/Button';
import { IMAGES } from '@/constant/imagePath';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-4 text-center bg-white">
      <img src={IMAGES.MOONER['mooner-sad']} alt="페이지 없음" className="w-40 h-auto mb-6" />
      <h1 className="text-xl font-semibold text-gray-700 mb-2">페이지를 찾을 수 없습니다</h1>
      <p className="text-gray-500 text-sm mb-6">잘못된 경로입니다</p>
      <Button
        variant="outline"
        size="default"
        className="bg-white/50 border-black/50 text-gray-800 hover:bg-white/70"
        onClick={() => navigate('/')}
      >
        홈으로 돌아가기
      </Button>
    </div>
  );
};

export default NotFound;
