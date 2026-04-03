import { useState, useEffect, ReactNode } from 'react';
import { auth, adminDb } from './firebase-admin-config'; // 본점 설정
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function AppGuard({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<'loading' | 'authorized' | 'denied'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // 1. 로그인 상태 자동 감지
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setStatus('denied');
        setErrorMsg("방구석작곡가(본점) 로그인이 필요합니다.");
        return;
      }

      try {
        // 2. 스크린샷의 문서 ID(UID)로 유저 정보 조회
        const userRef = doc(adminDb, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          
          // 3. 사용 기간(subscriptionEndDate) 체크
          const now = new Date();
          const expiryDate = new Date(userData.subscriptionEndDate); 

          if (now > expiryDate && userData.role !== 'admin') {
            setStatus('denied');
            setErrorMsg("이용 기간이 만료되었습니다. (종료일: " + expiryDate.toLocaleDateString() + ")");
          } else {
            // 기간이 남았거나 관리자(admin)라면 통과!
            setStatus('authorized');
          }
        } else {
          setStatus('denied');
          setErrorMsg("등록되지 않은 회원입니다. 본점에서 가입을 확인해주세요.");
        }
      } catch (e) {
        console.error("인증 확인 중 오류:", e);
        setStatus('denied');
        setErrorMsg("보안 서버 연결에 실패했습니다.");
      }
    });

    return () => unsubscribe();
  }, []);

  // --- UI 렌더링 영역 ---

  if (status === 'loading') {
    return <div style={fullPageStyle}>🔒 보안 인증 확인 중...</div>;
  }

  if (status === 'denied') {
    return (
      <div style={fullPageStyle}>
        <div style={cardStyle}>
          <h2 style={{ color: '#ff4d4f' }}>접속 제한</h2>
          <p style={{ color: '#666', margin: '20px 0' }}>{errorMsg}</p>
          <button 
            onClick={() => window.location.href = "https://bang-guseog.com"}
            style={buttonStyle}
          >
            방구석작곡가 본점으로 이동
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// 스타일 정의
const fullPageStyle: React.CSSProperties = {
  display: 'flex', justifyContent: 'center', alignItems: 'center', 
  height: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'sans-serif'
};
const cardStyle: React.CSSProperties = {
  padding: '40px', backgroundColor: '#fff', borderRadius: '12px', 
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center'
};
const buttonStyle = {
  padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', 
  border: 'none', borderRadius: '6px', cursor: 'pointer'
};