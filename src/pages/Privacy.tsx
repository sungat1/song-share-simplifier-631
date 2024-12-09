import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto space-y-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
          <p className="text-gray-300">
            We collect information that you provide directly to us when using our soundboard application.
            This may include your preferences and saved sound patterns.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
          <p className="text-gray-300">
            We use the information we collect to provide and improve our services,
            and to enhance your experience with our soundboard application.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Information Sharing</h2>
          <p className="text-gray-300">
            We do not share your personal information with third parties except as
            described in this privacy policy.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;