import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto space-y-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Terms of Use</h1>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p className="text-gray-300">
            By accessing and using this soundboard application, you accept and agree
            to be bound by the terms and conditions of this agreement.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Use License</h2>
          <p className="text-gray-300">
            Permission is granted to temporarily use this application for personal,
            non-commercial purposes only.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Disclaimer</h2>
          <p className="text-gray-300">
            The materials on this application are provided on an 'as is' basis.
            We make no warranties, expressed or implied, and hereby disclaim and
            negate all other warranties including, without limitation, implied
            warranties or conditions of merchantability.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;