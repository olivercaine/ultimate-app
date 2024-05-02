import React from 'react';
import CustomErrorPage from '../components/CustomErrorPage';

interface ErrorPageProps {
  statusCode: number;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ statusCode }) => {
  return <CustomErrorPage statusCode={statusCode} />;
};

// @ts-expect-error - TODO: remove this line and fix
ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;