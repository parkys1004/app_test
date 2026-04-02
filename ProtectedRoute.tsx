import { Navigate, Outlet } from 'react-router-dom';
import { useAuthCheck } from './useAuthCheck';

export const ProtectedRoute = () => {
  const { status } = useAuthCheck();

  if (status === 'loading') {
    return <div>권한 확인 중... 잠시만 기다려주세요.</div>; // 로딩 화면
  }

  if (status === 'unauthorized') {
    // 로그인이 안 된 경우 본점으로 이동
    window.location.href = 'https://bang-guseog.com/login';
    return null;
  }

  if (status === 'expired') {
    // 기간 만료 시 앱 내 만료 페이지로 이동
    return <Navigate to="/expired" replace />;
  }

  // 권한 확인 완료 시 실제 페이지(자식 컴포넌트) 보여줌
  return <Outlet />;
};
