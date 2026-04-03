import { useState, useEffect, ReactNode } from 'react';
import { adminDb } from './firebase-admin-config';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

export default function AppGuard({ children }: { children: ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputEmail, setInputEmail] = useState(''); // 이메일 입력 추가
  const [inputPw, setInputPw] = useState(''); // 비번 입력
  const [correctPw, setCorrectPw] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const docRef = doc(adminDb, "config", "globalConfig");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCorrectPw(docSnap.data().currentPassword);
        }
      } catch (e) {
        console.error("보안 설정 로드 실패:", e);
      } finally {
        setLoading(false);
      }
    };

    if (sessionStorage.getItem('is_app_unlocked') === 'true') {
      setIsAuthorized(true);
      setLoading(false);
    } else {
      fetchConfig();
    }
  }, []);

  const handleLogin = async () => {
    if (!inputEmail || !inputPw) {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      // 1. 비번 먼저 체크 (가장 빠름)
      if (inputPw !== correctPw) {
        alert("비밀번호가 틀렸습니다.");
        return;
      }

      // 2. 이메일이 등록된 회원인지 + 기간이 남았는지 체크
      const usersRef = collection(adminDb, "users");
      const q = query(usersRef, where("email", "==", inputEmail.trim()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("등록되지 않은 이메일입니다. 방구석작곡가님께 등록 요청을 해주세요.");
        return;
      }

      const userData = querySnapshot.docs[0].data();
      const now = new Date();
      const expiryDate = new Date(userData.subscriptionEndDate);

      if (now > expiryDate && userData.role !== 'admin') {
        alert(`이용 기간이 만료되었습니다. (~${expiryDate.toLocaleDateString()})`);
        return;
      }

      // 모든 조건 통과!
      setIsAuthorized(true);
      sessionStorage.setItem('is_app_unlocked', 'true');
      sessionStorage.setItem('user_email', inputEmail); // 접속자 기록용
    } catch (e) {
      alert("인증 서버 연결에 실패했습니다.");
    }
  };

  if (loading) return <div style={containerStyle}><div className="spinner" style={spinnerStyle}></div></div>;

  if (!isAuthorized) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={{fontSize: '40px', marginBottom: '10px'}}>🔐</div>
          <h2 style={titleStyle}>PREMIUM ACCESS</h2>
          <p style={subtitleStyle}>등록된 이메일과 비밀번호를 입력하세요.</p>
          
          <input 
            type="email" 
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            placeholder="이메일 주소 (ex: gandi11@nate.com)"
            style={inputStyle}
          />
          
          <input 
            type="password" 
            value={inputPw}
            onChange={(e) => setInputPw(e.target.value)}
            placeholder="비밀번호 입력"
            style={inputStyle}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          
          <button onClick={handleLogin} style={buttonStyle}>인증 및 입장</button>
        </div>
        <style>{`
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          .spinner { animation: spin 1s linear infinite; }
          input:focus { border-color: #007bff !important; outline: none; background-color: #3b3b3b !important; }
        `}</style>
      </div>
    );
  }

  return <>{children}</>;
}

// 스타일 (어두운 테마 유지)
const containerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#121212', color: '#fff' };
const cardStyle: React.CSSProperties = { padding: '40px', backgroundColor: '#1e1e1e', borderRadius: '24px', textAlign: 'center', width: '90%', maxWidth: '380px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' };
const titleStyle: React.CSSProperties = { fontSize: '22px', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '8px' };
const subtitleStyle: React.CSSProperties = { fontSize: '13px', color: '#aaa', marginBottom: '25px' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #333', backgroundColor: '#2a2a2a', color: '#fff', fontSize: '15px', marginBottom: '12px', boxSizing: 'border-box' };
const buttonStyle: React.CSSProperties = { width: '100%', padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#007bff', color: '#fff', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' };
const spinnerStyle: React.CSSProperties = { width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid #007bff', borderRadius: '50%' };