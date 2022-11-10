import React from 'react';

import AuthWrapper from '../../common/components/Layouts/AuthWrapper';
import LoginForm from '../../common/components/auth/LoginForm';

const SignupPage = () => {
  return (
    <AuthWrapper>
      <LoginForm />
    </AuthWrapper>
  );
};

export default SignupPage;
