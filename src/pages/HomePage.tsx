import React from 'react';
import { Greeting } from '../components/home/Greeting';
import { RandomVerse } from '../components/home/RandomVerse';
import { TasbeehCarousel } from '../components/home/TasbeehCarousel';

export function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6">
          <Greeting />
          <RandomVerse />
          <TasbeehCarousel />
        </div>
      </div>
    </div>
  );
}
