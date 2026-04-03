import { useState, useEffect } from 'react';
import { adminDb } from './firebase-admin-config'; // 방구석 전용 DB 불러오기
import { doc, getDoc } from 'firebase/firestore';

export default function AppGuard({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputPw, setInputPw] = useState('');
  const [correctPw, setCorrectPw] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchGlobalPassword = async () => {
      try {
        // 용수님이 말씀하신 그 경로 그대로 사용!
        const docRef = doc(adminDb, "config", "globalConfig");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          // 'currentPassword' 필드값을 실시간으로 가져옵니다.
          setCorrectPw(docSnap.data().currentPassword);
        } else {
          setErrorMsg("Firestore에 'config/globalConfig' 문서가 존재하지 않습니다.");
        }
      } catch (e: any) {
        console.error("중앙 비번 로드 실패:", e);
        if (e.message?.includes("offline")) {
          setErrorMsg("파이어베이스 연결 실패: 오프라인 상태이거나 Firestore 데이터베이스가 생성되지 않았습니다. 파이어베이스 콘솔에서 Firestore가 활성화되어 있는지 확인해주세요.");
        } else {
          setErrorMsg("비밀번호 설정 로드 중 오류가 발생했습니다: " + e.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalPassword();
  }, []);

  const handleLogin = () => {
    if (inputPw === correctPw) {
      setIsAuthorized(true);
      // 브라우저를 닫기 전까지는 비번 안 물어보게 세션 저장
      sessionStorage.setItem('is_app_unlocked', 'true');
    } else {
      alert("비밀번호가 틀렸습니다. 방구석작곡가님께 문의하세요.");
    }
  };

  // 세션 체크 (새로고침 대응)
  if (sessionStorage.getItem('is_app_unlocked') === 'true') return <>{children}</>;
  if (loading) return <div style={{ color: 'white', textAlign: 'center', marginTop: '20vh' }}>보안 서버 연결 중...</div>;
  if (errorMsg) return (
    <div style={{ color: '#ef4444', textAlign: 'center', marginTop: '20vh', padding: '20px', background: '#fee2e2', borderRadius: '8px', maxWidth: '600px', margin: '20vh auto' }}>
      <h3>⚠️ 연결 오류</h3>
      <p>{errorMsg}</p>
    </div>
  );

  if (!isAuthorized) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20vh', color: 'white', fontFamily: 'sans-serif' }}>
        <h2>🔒 Member Access</h2>
        <input 
          type="password" 
          value={inputPw}
          onChange={(e) => setInputPw(e.target.value)}
          placeholder="Password"
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '8px', color: 'black' }}
        />
        <button 
          onClick={handleLogin}
          style={{ padding: '8px 16px', fontSize: '16px', borderRadius: '4px', cursor: 'pointer', background: '#3b82f6', color: 'white', border: 'none' }}
        >Enter</button>
      </div>
    );
  }

  return <>{children}</>;
}
