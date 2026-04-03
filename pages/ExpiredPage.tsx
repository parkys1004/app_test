import React from 'react';

const ExpiredPage = () => {
  return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center', 
      color: 'white', 
      backgroundColor: '#111827', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>이용 기간이 만료되었습니다.</h1>
      <p style={{ marginBottom: '2rem', color: '#9ca3af' }}>서비스를 계속 이용하시려면 방구석작곡가 본점에서 연장해주세요.</p>
      <a 
        href="https://bang-guseog.com" 
        style={{ 
          padding: '0.75rem 1.5rem', 
          backgroundColor: '#3b82f6', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '0.375rem',
          fontWeight: 'bold'
        }}
      >
        본점으로 이동
      </a>
    </div>
  );
};

export default ExpiredPage;
