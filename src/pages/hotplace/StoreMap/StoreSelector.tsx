import React from 'react';

interface StoreSelectorProps {
  brandIds: number[];
  selectedBrandIds: number[];
  onChange: (selected: number[]) => void;
}

export default function StoreSelector({
  brandIds,
  selectedBrandIds,
  onChange,
}: StoreSelectorProps) {
  const toggleBrand = (id: number) => {
    if (selectedBrandIds.includes(id)) {
      onChange(selectedBrandIds.filter((bid) => bid !== id));
    } else {
      onChange([...selectedBrandIds, id]);
    }
  };

  return (
    <div className="p-4 bg-white border rounded shadow max-h-60 overflow-auto">
      <h4 className="font-semibold mb-2">브랜드 선택</h4>
      {brandIds.map((id) => (
        <label key={id} className="flex items-center gap-2 mb-1 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedBrandIds.includes(id)}
            onChange={() => toggleBrand(id)}
          />
          <span>브랜드 {id}</span>
        </label>
      ))}
    </div>
  );
}
