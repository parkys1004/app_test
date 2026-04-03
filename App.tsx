// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './src/components/ProtectedRoute';

// 박용수님의 현재 로그인 정보 (로그인 시 저장된 상태값이나 쿠키에서 가져옴)
const currentUserEmail = "aimaster1004@gmail.com"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 누구나 볼 수 있는 페이지 (만료 안내 등) */}
        <Route path="/expired" element={<div>이용 기간이 만료되었습니다. 방구석작곡가에서 연장해주세요.</div>} />

        {/* [중요] 보호받는 서비스 영역 */}
        <Route element={<ProtectedRoute userEmail={currentUserEmail} />}>
          <Route path="/" element={<MainDashboard />} />
          <Route path="/practice" element={<PracticePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function MainDashboard() { return <h1>빌드앱 서비스 메인화면</h1>; }
function PracticePage() { return <h1>연습 페이지</h1>; }

export default App;