import React from "react";

const HotPlace = () => {
  return (
    <div className="bg-white min-h-screen px-4 pt-4 pb-20">
      {/* 지도 영역 */}
      <div className="relative bg-yellow-200 rounded-3xl h-[400px] mx-auto w-[260px]">
        {/* 지역 마커들 */}
        <div className="absolute top-[30px] left-[70px] bg-white border border-gray-400 rounded-full px-2 py-1 text-sm">
          서울
        </div>
        <div className="absolute top-[70px] left-[110px] bg-white border border-gray-400 rounded-full px-2 py-1 text-sm">
          경기
        </div>
        <div className="absolute top-[110px] left-[160px] bg-white border border-gray-400 rounded-full px-2 py-1 text-sm">
          경남
        </div>
        <div className="absolute top-[140px] left-[50px] bg-white border border-gray-400 rounded-full px-2 py-1 text-sm">
          제주
        </div>
        <div className="absolute top-[170px] left-[180px] bg-white border border-gray-400 rounded-full px-2 py-1 text-sm">
          3
        </div>
        {/* 마스코트 위치 */}
        <div className="absolute bottom-[20px] left-[100px]">
          <img
            src="/images/character-icon.png"
            alt="character"
            className="w-12 h-12 rounded-full border-2 border-black"
          />
        </div>
      </div>

      {/* BEST 혜택 카드 리스트 */}
      <div className="mt-6">
        <div className="flex justify-center items-center gap-4">
          {/* 1위 */}
          <div className="w-24 text-center">
            <div className="bg-red-500 text-white text-sm rounded-full px-3 py-1 mb-1">1위</div>
            <img src="/images/item1.png" alt="item1" className="rounded-lg shadow-md" />
          </div>
          {/* 2위 */}
          <div className="w-24 text-center">
            <div className="bg-yellow-300 text-white text-sm rounded-full px-3 py-1 mb-1">2위</div>
            <img src="/images/item2.png" alt="item2" className="rounded-lg shadow-md" />
          </div>
          {/* 3위 */}
          <div className="w-24 text-center">
            <div className="bg-blue-900 text-white text-sm rounded-full px-3 py-1 mb-1">3위</div>
            <img src="/images/item3.png" alt="item3" className="rounded-lg shadow-md" />
          </div>
        </div>
      </div>

      {/* 하단 탭 */}
      <div className="fixed bottom-0 left-0 right-0 bg-pink-100 border-t border-gray-300 flex justify-around items-center py-2">
        <div className="flex flex-col items-center text-xs">
          <span>📅</span>
          <span>미션</span>
        </div>
        <div className="flex flex-col items-center text-xs">
          <span>💬</span>
          <span>무너톡</span>
        </div>
        <div className="flex flex-col items-center text-xs">
          <span>🏠</span>
          <span>홈</span>
        </div>
        <div className="flex flex-col items-center text-xs">
          <span>📍</span>
          <span>핫플</span>
        </div>
        <div className="flex flex-col items-center text-xs">
          <span>👤</span>
          <span>MY</span>
        </div>
      </div>
    </div>
  );
};

export default HotPlace;
