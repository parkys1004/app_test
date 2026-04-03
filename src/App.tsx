import { useState, useEffect, ReactNode } from 'react';
import { adminDb } from './firebase-admin-config';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

export default function AppGuard({ children }: { children: ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [detectedEmail, setDetectedEmail] = useState(''); // 자동 인식된 이메일
  const [inputPw, setInputPw] = useState('');
  const [correctPw, setCorrectPw] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initGuard = async () => {
      try {
        // 1. 주소창에서 이메일(?u=email@...) 읽어오기
        const params = new URLSearchParams(window.location.search);
        const emailParam = params.get('u'); // 'u' 파라미터 사용
        if (emailParam) setDetectedEmail(emailParam);

        // 2. 중앙 비번 로드
        const docRef = doc(adminDb, "config", "globalConfig");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCorrectPw(docSnap.data().currentPassword);
        }
      } catch (e) {
        console.error("설정 로드 실패:", e);
      } finally {
        setLoading(false);
      }
    };

    if (sessionStorage.getItem('is_app_unlocked') === 'true') {
      setIsAuthorized(true);
      setLoading(false);
    } else {
      initGuard();
    }
  }, []);

  const handleLogin = async () => {
    if (!detectedEmail) {
      alert("접속 정보(이메일)가 없습니다. 본점을 통해 다시 접속해주세요.");
      return;
    }

    try {
      // 1. 비번 체크
      if (inputPw !== correctPw) {
        alert("비밀번호가 틀렸습니다.");
        return;
      }

      // 2. 인식된 이메일이 DB에 있는지 + 기간 체크
      const usersRef = collection(adminDb, "users");
      const q = query(usersRef, where("email", "==", detectedEmail.trim()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("승인되지 않은 사용자 이메일입니다.");
        return;
      }

      const userData = querySnapshot.docs[0].data();
      const now = new Date();
      if (new Date(userData.subscriptionEndDate) < now && userData.role !== 'admin') {
        alert("이용 기간이 종료되었습니다.");
        return;
      }

      // 최종 통과
      setIsAuthorized(true);
      sessionStorage.setItem('is_app_unlocked', 'true');
    } catch (e) {
      alert("인증 서버 연결 실패");
    }
  };

  if (loading) return <div style={containerStyle}><div className="spinner" style={spinnerStyle}></div></div>;

  if (!isAuthorized) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={{fontSize: '40px', marginBottom: '10px'}}>👤</div>
          <h2 style={titleStyle}>WELCOME</h2>
          <p style={subtitleStyle}>
            {detectedEmail ? <strong>{detectedEmail}</strong> : "로그인이 필요합니다."}
          </p>
          
          {detectedEmail ? (
            <>
              <input 
                type="password" 
                value={inputPw}
                onChange={(e) => setInputPw(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                style={inputStyle}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
              <button onClick={handleLogin} style={buttonStyle}>입장하기</button>
            </>
          ) : (
            <button onClick={() => window.location.href = "https://bang-guseog.com"} style={buttonStyle}>
              본점에서 로그인하기
            </button>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// 스타일 (어두운 테마 유지)
const containerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#121212', color: '#fff' };
const cardStyle: React.CSSProperties = { padding: '40px', backgroundColor: '#1e1e1e', borderRadius: '24px', textAlign: 'center', width: '90%', maxWidth: '380px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' };
const titleStyle: React.CSSProperties = { fontSize: '22px', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '8px' };
const subtitleStyle: React.CSSProperties = { fontSize: '14px', color: '#aaa', marginBottom: '25px' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #333', backgroundColor: '#2a2a2a', color: '#fff', fontSize: '15px', marginBottom: '12px', boxSizing: 'border-box', textAlign: 'center' };
const buttonStyle: React.CSSProperties = { width: '100%', padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#007bff', color: '#fff', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' };
const spinnerStyle: React.CSSProperties = { width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid #007bff', borderRadius: '50%' };