'use client';

import * as S from './SortSelect.styles';

type SortOption = 'recent' | 'popular' | 'rate';

type SortSelectProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

const SortSelect = ({ value, onChange }: SortSelectProps) => {
  return (
    <S.Label>
      정렬
      <S.Select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
      >
        <option value='recent'>최근 등록순</option>
        <option value='popular'>신청자 많은 순</option>
        <option value='rate'>신청률 높은 순</option>
      </S.Select>
    </S.Label>
  );
};

export default SortSelect;
