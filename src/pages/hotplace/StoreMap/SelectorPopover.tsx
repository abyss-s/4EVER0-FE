import { useState, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/Popover';
import { Heart, HeartIcon } from 'lucide-react';
import { changeCouponLike } from '@/apis/coupon/changeCouponlike';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const BRAND_META = [
  { id: 1, name: '리디셀렉트', logoUrl: '/logo/ridi.png' },
  { id: 2, name: '배스킨라빈스', logoUrl: '/logo/baskin.png' },
  { id: 3, name: 'CU 실속한끼', logoUrl: '/logo/cu.png' },
  { id: 4, name: '스타벅스', logoUrl: '/logo/starbucks.png' },
  { id: 5, name: '이디야', logoUrl: '/logo/ediya.png' },
  { id: 6, name: 'GS25', logoUrl: '/logo/gs25.png' },
  { id: 7, name: '투썸플레이스', logoUrl: '/logo/twosome.png' },
  { id: 8, name: '이마트24', logoUrl: '/logo/emart24.png' },
];

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
  const [localSelected, setLocalSelected] = useState<number[]>(selectedIds || []);
  const queryClient = useQueryClient();

  // 좋아요 변경 mutation (배열 처리)
  const { mutateAsync: changeLikeMutate } = useMutation({
    mutationFn: async (ids: number[]) => {
      // 추가/삭제 모두 처리 (실패 무시)
      await Promise.all(ids.map((id) => changeCouponLike(id).catch(() => {})));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userLikeCoupons'] });
    },
  });

  useEffect(() => {
    if (open) {
      setLocalSelected(selectedIds || []);
    }
  }, [open, selectedIds]);

  const handleToggle = (id: number) => {
    setLocalSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id],
    );
  };

  const handleApply = async () => {
    setOpen(false);

    // 추가된 brand_id, 제거된 brand_id 구분
    const added = localSelected.filter((id) => !selectedIds.includes(id));
    const removed = selectedIds.filter((id) => !localSelected.includes(id));
    const idsToChange = [...added, ...removed];

    // mutation으로 API와 쿼리 무효화 처리
    if (idsToChange.length > 0) {
      await changeLikeMutate(idsToChange);
    }

    if (onChange) {
      onChange(localSelected);
    }
  };

  if (!brandIds || !Array.isArray(brandIds)) {
    return null;
  }
  const brandsToShow = BRAND_META.filter((b) => brandIds.includes(b.id));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <span style={{ fontSize: '12px' }}>🏪</span>
          <span className="text-xs font-medium text-gray-700 whitespace-nowrap">브랜드 선택</span>
        </div>
      </PopoverTrigger>
      <PopoverContent variant="light" sideOffset={8} className="w-64 max-h-80 p-4 flex flex-col">
        <div className="flex-1 flex flex-col space-y-2 overflow-y-auto pr-1 mb-3">
          {brandsToShow.map((brand) => (
            <button
              key={brand.id}
              type="button"
              className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100 transition"
              onClick={() => handleToggle(brand.id)}
            >
              <img
                src={brand.logoUrl}
                alt={brand.name}
                className="w-7 h-7 rounded-full object-cover bg-gray-100"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.opacity = '0.2';
                }}
              />
              <span className="flex-1 text-left">{brand.name}</span>
              {localSelected.includes(brand.id) ? (
                <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
              ) : (
                <HeartIcon className="w-6 h-6 text-gray-300" />
              )}
            </button>
          ))}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
            onClick={() => setOpen(false)}
            type="button"
          >
            취소
          </button>
          <button
            className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleApply}
            type="button"
          >
            적용
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SelectorPopover;
