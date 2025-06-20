import { Popover, PopoverTrigger, PopoverContent } from '@/components/Popover';
import { FocusableButton } from '@/components/Popover/FocusableButton';

interface BrandSelectorPopoverProps {
  brandIds: number[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
}

const SelectorPopover = ({ brandIds, selectedIds, onChange }: BrandSelectorPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FocusableButton>브랜드 선택</FocusableButton>
      </PopoverTrigger>

      <PopoverContent variant="light" sideOffset={8} className="w-60 max-h-72 overflow-auto">
        <div className="flex flex-col space-y-2">
          {brandIds.map((id) => (
            <label key={id} className="inline-flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedIds.includes(id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onChange([...selectedIds, id]);
                  } else {
                    onChange(selectedIds.filter((sid) => sid !== id));
                  }
                }}
                className="cursor-pointer"
              />
              <span>브랜드 {id}</span>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SelectorPopover;
