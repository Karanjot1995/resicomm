import React from 'react';

const FullScreenLoader = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
      <div style={{ border: '16px solid #f3f3f3', borderRadius: '50%', borderTop: '16px solid #3498db', width: '120px', height: '120px', animation: 'spin 2s linear infinite' }}></div>
    </div>
  );
};

export default FullScreenLoader;