import * as S from './ExcludeClosedCheckbox.styles';

type Props = {
  checked: boolean;
  onChange: (nextChecked: boolean) => void;
};

const ExcludeClosedCheckbox = ({ checked, onChange }: Props) => {
  return (
    <S.Label>
      <S.Text>마감 제외</S.Text>
      <S.Input
        type='checkbox'
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <S.Box aria-hidden='true' $checked={checked} />
    </S.Label>
  );
};

export default ExcludeClosedCheckbox;
