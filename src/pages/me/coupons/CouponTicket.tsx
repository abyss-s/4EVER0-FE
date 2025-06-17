import React from 'react';
import clsx from 'clsx';

type CouponTicketProps = {
  brand: string;
  title: string;
  description: string;
  background: string;
  logoUrl?: string;
};

export const CouponTicket: React.FC<CouponTicketProps> = ({
  brand,
  title,
  description,
  background,
  logoUrl,
}) => {
  return (
    <div
      className={clsx(
        'relative w-full h-[180px] px-8 py-2 rounded-xl text-black bg-no-repeat bg-cover bg-center',
        'font-pretendard',
      )}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="pl-2">
        <div className="title-2 mt-10">{brand}</div>
        <div className="body-1 mt-1">{title}</div>
        <div className="caption-1 text-gray-800">{description}</div>
        {logoUrl && (
          <img
            src={logoUrl}
            alt={`${brand} 로고`}
            className="w-[80px] h-auto mt-2 object-contain"
          />
        )}
      </div>
    </div>
  );
};
