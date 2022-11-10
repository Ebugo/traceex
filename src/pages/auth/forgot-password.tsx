import React from 'react';

import AuthWrapper from '../../common/components/Layouts/AuthWrapper';
import ForgotPasswordForm from '../../common/components/auth/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  return (
    <AuthWrapper>
      <ForgotPasswordForm />
    </AuthWrapper>
  );
};

export default ForgotPasswordPage;
