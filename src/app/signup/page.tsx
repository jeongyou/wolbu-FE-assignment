import SignUpForm from '@/features/signup/components/SignUpForm';
import Header from '@/shared/components/Header';

const SignUpPage = () => {
  return (
    <>
      <Header title='회원가입' />
      <SignUpForm />
    </>
  );
};

export default SignUpPage;
