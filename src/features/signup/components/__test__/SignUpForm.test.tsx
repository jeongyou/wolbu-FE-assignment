import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import SignUpForm from '../SignUpForm';
import { useSignUpSubmit } from '../../hooks/useSignUpSubmit';

vi.mock('../../hooks/useSignUpSubmit');
vi.mock('@/shared/components/Toast/ToastProvider', () => ({
  useToastContext: () => ({ showToast: vi.fn() }),
  ToastProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('SignUpForm', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const fillValidForm = () => {
    fireEvent.input(screen.getByPlaceholderText('이름을 입력해주세요'), {
      target: { value: '홍길동' },
    });
    fireEvent.input(screen.getByPlaceholderText('example@email.com'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.input(screen.getByPlaceholderText('010-1234-5678'), {
      target: { value: '01012345678' },
    });
    fireEvent.input(screen.getByPlaceholderText('비밀번호를 입력해주세요'), {
      target: { value: 'Abc123' },
    });
    fireEvent.click(screen.getByLabelText('수강생'));
  };

  it('비밀번호 규칙 위반 시 에러 메시지를 표시한다', async () => {
    const handleSubmit = vi.fn();
    vi.mocked(useSignUpSubmit).mockReturnValue({
      handleSubmit,
      signUpLoading: false,
    } as unknown as ReturnType<typeof useSignUpSubmit>);

    render(<SignUpForm />);

    fireEvent.input(screen.getByPlaceholderText('비밀번호를 입력해주세요'), {
      target: { value: 'abc' },
    });

    await waitFor(() =>
      expect(
        screen.getByText('비밀번호는 6~10자여야 합니다')
      ).toBeInTheDocument()
    );
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('필수값을 모두 채우면 제출 핸들러가 호출된다', async () => {
    const handleSubmit = vi.fn();
    vi.mocked(useSignUpSubmit).mockReturnValue({
      handleSubmit,
      signUpLoading: false,
    } as unknown as ReturnType<typeof useSignUpSubmit>);

    render(<SignUpForm />);

    fillValidForm();

    const form = document.querySelector('form') as HTMLFormElement;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  it('휴대폰 번호 자리수가 부족하면 에러를 노출한다', async () => {
    const handleSubmit = vi.fn();
    vi.mocked(useSignUpSubmit).mockReturnValue({
      handleSubmit,
      signUpLoading: false,
    } as unknown as ReturnType<typeof useSignUpSubmit>);

    render(<SignUpForm />);

    fireEvent.input(screen.getByPlaceholderText('010-1234-5678'), {
      target: { value: '0101234' },
    });

    await waitFor(() =>
      expect(
        screen.getByText('휴대폰 번호 11자리를 입력해주세요')
      ).toBeInTheDocument()
    );
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('이름이 비어 있으면 에러 메시지를 표시한다', async () => {
    const handleSubmit = vi.fn();
    vi.mocked(useSignUpSubmit).mockReturnValue({
      handleSubmit,
      signUpLoading: false,
    } as unknown as ReturnType<typeof useSignUpSubmit>);

    render(<SignUpForm />);

    fireEvent.input(screen.getByPlaceholderText('example@email.com'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.input(screen.getByPlaceholderText('010-1234-5678'), {
      target: { value: '01012345678' },
    });
    fireEvent.input(screen.getByPlaceholderText('비밀번호를 입력해주세요'), {
      target: { value: 'Abc123' },
    });

    const form = document.querySelector('form') as HTMLFormElement;
    fireEvent.submit(form);

    await waitFor(() =>
      expect(screen.getByText('이름은 필수 입력입니다')).toBeInTheDocument()
    );
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('잘못된 이메일 형식이면 에러 메시지를 표시한다', async () => {
    const handleSubmit = vi.fn();
    vi.mocked(useSignUpSubmit).mockReturnValue({
      handleSubmit,
      signUpLoading: false,
    } as unknown as ReturnType<typeof useSignUpSubmit>);

    render(<SignUpForm />);

    fireEvent.input(screen.getByPlaceholderText('example@email.com'), {
      target: { value: 'invalid' },
    });

    await waitFor(() =>
      expect(
        screen.getByText('올바른 이메일 형식을 입력해주세요')
      ).toBeInTheDocument()
    );
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('회원 유형 라디오가 기본 수강생 선택이며 강사로 변경할 수 있다', () => {
    const handleSubmit = vi.fn();
    vi.mocked(useSignUpSubmit).mockReturnValue({
      handleSubmit,
      signUpLoading: false,
    } as unknown as ReturnType<typeof useSignUpSubmit>);

    render(<SignUpForm />);

    const student = screen.getByLabelText('수강생') as HTMLInputElement;
    const instructor = screen.getByLabelText('강사') as HTMLInputElement;

    expect(student.checked).toBe(true);
    expect(instructor.checked).toBe(false);

    fireEvent.click(instructor);
    expect(instructor.checked).toBe(true);
    expect(student.checked).toBe(false);
  });

  it('isValid=false일 때 버튼이 비활성화된다', () => {
    const handleSubmit = vi.fn();
    vi.mocked(useSignUpSubmit).mockReturnValue({
      handleSubmit,
      signUpLoading: false,
    } as unknown as ReturnType<typeof useSignUpSubmit>);

    render(<SignUpForm />);

    const button = screen.getByRole('button', { name: '가입하기' });
    expect(button).toBeDisabled();
  });
});
