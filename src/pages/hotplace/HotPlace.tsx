import PopupMap from './PopupMap/PopupMap';

const HotPlace: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center pb-4">
        <div className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
          ⭐ 요즘 핫한 MZ들의 PICK은?!
        </div>
      </div>

      <PopupMap />

      {/* BEST 혜택 섹션 */}
    </div>
  );
};

export default HotPlace;
