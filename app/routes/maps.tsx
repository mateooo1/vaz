// src/routes/index.tsx
import React, { Suspense } from 'react';

const Map = React.lazy(() => import('~/components/Map'));

const Index = () => {
  return (
    <div>
      <h1>Map App</h1>
      <Suspense fallback={<div>Loading map...</div>}>
        <Map />
      </Suspense>
    </div>
  );
};

export default Index;
