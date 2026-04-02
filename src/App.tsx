// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import SunoApp from './SunoApp';

// 박용수님의 현재 로그인 정보 (로그인 시 저장된 상태값이나 쿠키에서 가져옴)
const currentUserEmail = "aimaster1004@gmail.com"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 누구나 볼 수 있는 페이지 (만료 안내 등) */}
        <Route path="/expired" element={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#111827', color: 'white' }}>이용 기간이 만료되었습니다. 방구석작곡가에서 연장해주세요.</div>} />

        {/* [중요] 보호받는 서비스 영역 */}
        <Route element={<ProtectedRoute userEmail={currentUserEmail} />}>
          <Route path="/" element={<SunoApp />} />
          <Route path="/practice" element={<PracticePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function PracticePage() { return <div style={{ padding: '2rem', backgroundColor: '#111827', color: 'white', height: '100vh' }}><h1>연습 페이지</h1></div>; }

export default App;
