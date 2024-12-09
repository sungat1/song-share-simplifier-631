import React from 'react';
import Soundboard from '../components/Soundboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Soundboard</h1>
          <p className="mt-2 text-gray-600">Create and share your sound sequences</p>
        </div>
      </header>
      <main>
        <Soundboard />
      </main>
    </div>
  );
};

export default Index;