import React, { useState, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/Popover';
import { Heart, HeartIcon } from 'lucide-react';
import { changeCouponLike } from '@/apis/coupon/changeCouponlike';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BRAND_META } from './Branddata';

interface BrandSelectorPopoverProps {
  brandIds: number[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
}

const SelectorPopover = ({
  brandIds = [],
  selectedIds = [],
  onChange,
}: BrandSelectorPopoverProps) => {
  const [open, setOpen] = useState(false);
  const [localSelected, setLocalSelected] = useState<number[]>(selectedIds);
  const queryClient = useQueryClient();

  const { mutateAsync: changeLikeMutate } = useMutation({
    mutationFn: async (ids: number[]) => {
      await Promise.all(ids.map((id) => changeCouponLike(id).catch(() => {})));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userLikeCoupons'] });
    },
  });

  useEffect(() => {
    if (open) setLocalSelected(selectedIds);
  }, [open, selectedIds]);

  const handleToggle = (id: number) => {
    setLocalSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id],
    );
  };

  const handleApply = async () => {
    setOpen(false);
    const added = localSelected.filter((id) => !selectedIds.includes(id));
    const removed = selectedIds.filter((id) => !localSelected.includes(id));
    const idsToChange = [...added, ...removed];
    if (idsToChange.length > 0) await changeLikeMutate(idsToChange);
    onChange(localSelected);
  };

  const brandsToShow = BRAND_META.filter((b) => brandIds.includes(b.id));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <span style={{ fontSize: '12px' }}>🏪</span>
          <span className="text-xs font-medium text-gray-700 whitespace-nowrap">브랜드 선택</span>
        </div>
      </PopoverTrigger>

      <PopoverContent
        variant="light"
        sideOffset={8}
        className="w-64 max-h-80 p-2 flex flex-col overflow-hidden"
      >
        {/* 1) 리스트 래퍼: 스크롤+우측 패딩+구분선 */}
        <div className="flex-1 overflow-y-auto pr-2 divide-y divide-gray-100">
          {brandsToShow.map((brand) => (
            <button
              key={brand.id}
              type="button"
              onClick={() => handleToggle(brand.id)}
              className="
                w-full flex items-center gap-3 px-4 py-3
                hover:bg-gray-50 transition-colors
                focus:outline-none focus:ring-0
              "
            >
              <img
                src={brand.logoUrl || '/placeholder.svg'}
                alt={brand.name}
                className="w-8 h-8 rounded-full object-cover bg-gray-100 flex-shrink-0 shadow-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.opacity = '0.2';
                }}
              />
              <span className="flex-1 text-left text-xs font-medium text-gray-900">
                {brand.name}
              </span>
              {localSelected.includes(brand.id) ? (
                <Heart className="w-5 h-5 text-pink-500 fill-pink-500 flex-shrink-0" />
              ) : (
                <HeartIcon className="w-5 h-5 text-gray-300 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>

        {/* 2) 취소/적용 버튼 */}
        <div className="flex border-t border-border">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex-1 py-3 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 transition-colors focus:outline-none"
          >
            취소
          </button>
          <div className="w-px bg-gray-100" />
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 py-3 text-sm font-medium rounded-md text-blue-500 hover:bg-gray-50 transition-colors focus:outline-none"
          >
            적용
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SelectorPopover;
