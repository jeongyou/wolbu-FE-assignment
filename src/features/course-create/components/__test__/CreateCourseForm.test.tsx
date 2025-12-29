import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import CreateCourseForm from '../CreateCourseForm';
import { useCreateCourseSubmit } from '../../hooks/useCreateCourseSubmit';

vi.mock('../../hooks/useCreateCourseSubmit');

describe('CreateCourseForm', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const fillValidForm = () => {
    fireEvent.input(screen.getByPlaceholderText('강의명을 입력해주세요'), {
      target: { value: '테스트 강의' },
    });
    fireEvent.input(screen.getByPlaceholderText('가격을 입력해주세요'), {
      target: { value: '10000' },
    });
    fireEvent.input(screen.getByPlaceholderText('수강 인원을 입력해주세요'), {
      target: { value: '20' },
    });
  };

  it('필수값 미입력 시 제출 핸들러가 호출되지 않는다', async () => {
    const handleSubmit = vi.fn();
    vi.mocked(useCreateCourseSubmit).mockReturnValue({
      handleSubmit,
      loading: false,
    } as unknown as ReturnType<typeof useCreateCourseSubmit>);

    render(<CreateCourseForm />);

    fireEvent.click(screen.getByRole('button', { name: '강의 등록하기' }));

    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });

  it('유효 입력 시 제출 핸들러가 호출된다', async () => {
    const handleSubmit = vi.fn();
    vi.mocked(useCreateCourseSubmit).mockReturnValue({
      handleSubmit,
      loading: false,
    } as unknown as ReturnType<typeof useCreateCourseSubmit>);

    render(<CreateCourseForm />);

    fillValidForm();

    const form = document.querySelector('form') as HTMLFormElement;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
