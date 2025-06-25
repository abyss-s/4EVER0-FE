import { Link } from 'react-router-dom';
import { Instagram, ShoppingBag } from 'lucide-react';
import { useLayoutEffect } from 'react';
import { IMAGES } from '@/constant/imagePath';

const links = [
  {
    title: '무너',
    href: 'https://instagram.com//im_moono.41/',
    icon: <Instagram className="w-6 h-6 text-pink-500" />,
  },
  {
    title: '비일상의틈',
    href: 'https://www.instagram.com/daily_teum/',
    icon: <Instagram className="w-6 h-6 text-yellow-500" />,
  },
  {
    title: '무너스토어',
    href: 'https://smartstore.naver.com/moonostore',
    icon: <ShoppingBag className="w-6 h-6 text-green-500" />,
  },
];

const MoonerZone = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen p-6 bg-white">
      <div className="mb-6 px-2">
        <h2 className="text-lg font-bold text-brand-darkblue mb-1">무너존이란?</h2>
        <p className="text-sm text-gray-600">
          무너 인스타그램, 굿즈, 브랜드를 <br /> 한눈에 보는 공간이에요
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        {links.map((link) => (
          <Link
            key={link.title}
            to={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2"
          >
            <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center hover:shadow-md transition">
              {link.icon}
            </div>
            <p className="text-sm text-gray-700">{link.title}</p>
          </Link>
        ))}
      </div>
      <div className="mb-6 px-2 mt-15">
        <h2 className="text-lg font-bold text-brand-darkblue mb-1">무너송은 못 참지</h2>
        <p className="text-sm text-gray-600">무너송 2탄 대공개!</p>
      </div>
      <div className="max-w-md mx-auto mt-5 rounded-lg overflow-hidden shadow">
        <iframe
          width="100%"
          height="235"
          src="https://www.youtube.com/embed/6WU1cVJTf9A"
          title="무너지지마 유튜브 영상"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="px-2 mt-13">
        <h2 className="text-lg font-bold text-brand-darkblue mb-1">
          혹시 무너 덕후세요? 그럼 여기가 본진입니다.
        </h2>

        <p className="text-sm text-gray-600">궁금하면 사진 클릭👇🏻</p>
      </div>
      <div className="mt-4">
        <a
          href="https://www.lguplus.com/benefit/moono"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full max-w-md mx-auto "
        >
          <img
            src={IMAGES.MOONER['mooner-zone']}
            alt="무너존 소개 이미지"
            className="w-full max-w-md mx-auto rounded-xl shadow"
          />
        </a>
      </div>
    </div>
  );
};

export default MoonerZone;
