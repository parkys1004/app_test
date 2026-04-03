import { useState, useEffect, ReactNode } from 'react';
import { adminDb } from './firebase-admin-config'; // 방구석 전용 DB 불러오기
import { doc, getDoc } from 'firebase/firestore';


export default function AppGuard({ children }: { children: ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputPw, setInputPw] = useState('');
  const [correctPw, setCorrectPw] = useState('');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchGlobalPassword = async () => {
      try {
        const docRef = doc(adminDb, "config", "globalConfig");
        const docSnap = await getDoc(docRef);
       
        if (docSnap.exists()) {
          // 'currentPassword' 필드값을 실시간으로 가져옵니다.
          setCorrectPw(docSnap.data().currentPassword);
        }
      } catch (e) {
        console.error("중앙 비번 로드 실패:", e);
      } finally {
        setLoading(false);
      }
    };


    fetchGlobalPassword();
  }, []);


  const handleLogin = () => {
    // correctPw가 비어있을 때 로그인 시도 방지 (서버 연결 실패 대비)
    if (correctPw && inputPw === correctPw) {
      setIsAuthorized(true);
      // 브라우저를 닫기 전까지는 비번 안 물어보게 세션 저장
      sessionStorage.setItem('is_app_unlocked', 'true');
    } else {
      alert("비밀번호가 틀렸습니다. 방구석작곡가님께 문의하세요.");
    }
  };


  // 1. 세션 체크 (새로고침 대응) - 가장 먼저 실행
  if (sessionStorage.getItem('is_app_unlocked') === 'true') {
    return <>{children}</>;
  }


  // 2. 로딩 중 화면 디자인
  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div className="spinner" style={spinnerStyle}></div>
          <p style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>보안 서버 연결 중...</p>
          {/* 로딩 스피너 애니메이션을 위한 style 태그 */}
          <style>{`
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            .spinner { animation: spin 1s linear infinite; }
          `}</style>
        </div>
      </div>
    );
  }


  // 3. 비번 입력 화면 디자인
  if (!isAuthorized) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          {/* 상단 자물쇠 아이콘 및 타이틀 */}
          <div style={iconHeaderStyle}>🔒</div>
          <h2 style={titleStyle}>MEMBER ACCESS</h2>
          <p style={subtitleStyle}>방구석작곡가 승인 유저 전용 서비스입니다.</p>
         
          {/* 입력 폼 영역 */}
          <div style={formGroupStyle}>
            <input
              type="password"
              value={inputPw}
              onChange={(e) => setInputPw(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              style={inputStyle}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            {/* 인풋 태그 포커스 애니메이션을 위한 style 태그 */}
            <style>{`
              input:focus {
                border-color: #007bff !important;
                box-shadow: 0 0 0 3px rgba(0,123,255,0.1) !important;
                outline: none;
              }
              button:active {
                transform: translateY(1px) scale(0.98);
              }
            `}</style>
          </div>
         
          <button onClick={handleLogin} style={buttonStyle}>
            입장하기
          </button>
        </div>
      </div>
    );
  }


  return <>{children}</>;
}


// ===============================================================
// [4] CSS-in-JS 스타일 정의
// ===============================================================


// 전체 화면 중앙 정렬 컨테이너
const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  backgroundColor: '#f4f7f6', // 연한 그레이 배경
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  position: 'fixed', // 화면 전체 고정
  top: 0, left: 0, zIndex: 9999
};


// 중앙 흰색 카드
const cardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '40px 30px',
  borderRadius: '16px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.05)', // 부드러운 그림자
  width: '90%',
  maxWidth: '380px', // 스마트폰 폭 고려
  textAlign: 'center',
  border: '1px solid #eaeaea',
  boxSizing: 'border-box'
};


// 상단 아이콘
const iconHeaderStyle: React.CSSProperties = {
  fontSize: '48px',
  marginBottom: '15px',
  display: 'block'
};


// 메인 타이틀
const titleStyle: React.CSSProperties = {
  fontSize: '22px',
  fontWeight: 700,
  color: '#333',
  margin: '0 0 8px 0',
  letterSpacing: '1px' // 영문 타이틀 자간 조정
};


// 서브 타이틀
const subtitleStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#777',
  margin: '0 0 30px 0',
  lineHeight: '1.5'
};


const formGroupStyle: React.CSSProperties = {
  width: '100%',
  marginBottom: '15px'
};


// 입력창 스타일
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  fontSize: '16px', // 모바일에서 확대 방지
  border: '2px solid #ddd',
  borderRadius: '10px',
  transition: 'all 0.2s ease', // 포커스 시 부드러운 효과
  boxSizing: 'border-box',
  backgroundColor: '#fafafa'
};


// 입장 버튼 스타일
const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px',
  fontSize: '16px',
  fontWeight: 600,
  color: '#ffffff',
  backgroundColor: '#007bff', // 블루 컬러
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'all 0.1s ease',
  boxShadow: '0 4px 6px rgba(0,123,255,0.15)',
};


// 로딩 스피너 스타일
const spinnerStyle: React.CSSProperties = {
  display: 'inline-block',
  width: '30px',
  height: '30px',
  border: '3px solid rgba(0,123,255,0.2)',
  borderTop: '3px solid #007bff',
  borderRadius: '50%',
  margin: '0 auto'
};
