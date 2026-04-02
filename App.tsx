import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import MainService from './pages/MainService'; // 실제 앱 서비스 페이지
import ExpiredPage from './pages/ExpiredPage'; // "이용 기간 만료" 안내 페이지

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 누구나 볼 수 있는 페이지 */}
        <Route path="/expired" element={<ExpiredPage />} />

        {/* 보호된 페이지 (로그인 & 기간 확인 필수) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainService />} />
          <Route path="/feature" element={<div>유료 기능 페이지</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
