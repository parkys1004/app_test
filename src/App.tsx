import { useState, useEffect, ReactNode } from 'react';
import { auth, adminDb } from './firebase-admin-config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function AppGuard({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<'loading' | 'authorized' | 'denied'>('loading');
  const [errorMsg, setErrorMsg] = useState('');




  useEffect(() => {
    // 1. 로그인 상태 확인 (본점 세션 공유)
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setStatus('denied');
        setErrorMsg("방구석작곡가 본점 로그인이 필요합니다.");
        return;
      }

      try {
        // 2. [핵심] 문서 ID가 UID이므로 doc으로 직접 조회 (가장 빠름)
        const userRef = doc(adminDb, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          
          // 관리자(admin)는 기간 상관없이 무조건 통과
          if (userData.role === 'admin') {
            setStatus('authorized');
            return;
          }

          // 3. 사용 기간(subscriptionEndDate) 체크
          const now = new Date();
          const expiryDate = new Date(userData.subscriptionEndDate);

          if (now > expiryDate) {
            setStatus('denied');
            setErrorMsg(`이용 기간이 종료되었습니다. (~${expiryDate.toLocaleDateString()})`);
          } else {
            // 기간 남았으면 프리패스!
            setStatus('authorized');
          }
        } else {
          setStatus('denied');
          setErrorMsg("등록되지 않은 회원입니다. (본점 가입 이메일: " + user.email + ")");
        }
      } catch (e) {
        console.error("인증 실패:", e);
        setStatus('denied');
        setErrorMsg("보안 서버 연결 실패. 잠시 후 다시 시도해주세요.");
      }
    });

    return () => unsubscribe();
  }, []);

  // --- 화면 렌더링 ---
  if (status === 'loading') return <div style={fullPageStyle}>🔒 보안 인증 확인 중...</div>;

  if (status === 'denied') {
    return (
      <div style={fullPageStyle}>
        <div style={cardStyle}>
          <h2 style={{ color: '#ff4d4f', marginBottom: '10px' }}>접속 제한</h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>{errorMsg}</p>
          <button 
            onClick={() => window.location.href = "https://bang-guseog.com"}
            style={buttonStyle}
          >
            본점으로 가서 로그인/연장하기
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// 스타일 (이전과 동일)
const fullPageStyle: React.CSSProperties = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f7f6' };
const cardStyle: React.CSSProperties = { padding: '40px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '350px' };
const buttonStyle = { padding: '12px 24px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };