import React from 'react';
import SignupForm from '../../common/components/auth/SignupForm';
import AuthWrapper from '../../common/components/Layouts/AuthWrapper';

const SignupPage = () => {
  return (
    <AuthWrapper>
      <SignupForm />
    </AuthWrapper>
  );
};

export default SignupPage;
