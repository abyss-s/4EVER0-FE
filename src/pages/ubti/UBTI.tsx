import React from 'react';
import { IMAGES } from '@/constant/imagePath';

const UBTI: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start pt-8 p-4">
      <a
        href="/ubti"
        className="block w-[220px] py-3 rounded-lg bg-white text-gray-900 shadow-none hover:shadow-none transition-all flex items-center justify-center gap-2 mb-2 border border-gray-200"
      >
        <span className="text-lg font-semibold leading-tight">당신의 타코 유형은?</span>
      </a>

      <div className="relative w-[300px] h-[300px] overflow-hidden border-none">
        <img
          src={IMAGES.TACO['taco-pan']}
          alt="타코야끼 판"
          className="absolute top-0 left-0 w-full h-full object-contain z-0 block select-none pointer-events-none"
        />
        <div className="absolute top-[14%] left-[16%] w-[68%] h-[68%] grid grid-cols-3 grid-rows-3 place-items-center z-10">
          {[...Array(9)].map((_, i) => (
            <img
              key={i}
              src={IMAGES.TACO['taco-main-front']}
              alt={`타코-${i}`}
              className="w-[66px] h-[66px] object-contain"
            />
          ))}
        </div>
      </div>

      <div className="bg-[#fff8e1] border border-yellow-400 mt-8 px-6 py-4 rounded-md text-center font-semibold text-gray-800">
        당신의 타코(요금제) 유형을
        <br />
        알아보세요!
      </div>
    </div>
  );
};

export default UBTI;
