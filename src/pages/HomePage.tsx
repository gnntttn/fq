import React from 'react';
import { Greeting } from '../components/home/Greeting';
import { RandomVerse } from '../components/home/RandomVerse';
import { TasbeehCarousel } from '../components/home/TasbeehCarousel';
import { QuranicInsights } from '../components/home/QuranicInsights';

export function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <Greeting />
        <RandomVerse />
        <TasbeehCarousel />
        <QuranicInsights />
      </div>
    </div>
  );
}
