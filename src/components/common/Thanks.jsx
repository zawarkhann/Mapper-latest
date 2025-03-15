import React from 'react';

const VerificationThankYou = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-4">
          Thanks for Your Verification!
        </h1>
        <p className="text-gray-700 text-center">
          Your data is shared with the Agent. He will contact you shortly on the provided email.
        </p>
      </div>
    </div>
  );
};

export default VerificationThankYou;