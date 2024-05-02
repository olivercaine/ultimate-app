import React from 'react';

interface CustomErrorPageProps {
  statusCode: number;
}

const CustomErrorPage: React.FC<CustomErrorPageProps> = ({ statusCode }) => {
  return (
    <div>
      <h1>Error {statusCode}</h1>
      <p>Sorry, something went wrong.</p>
    </div>
  );
};

export default CustomErrorPage;