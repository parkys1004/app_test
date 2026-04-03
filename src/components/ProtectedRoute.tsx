// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthCheck } from '../hooks/useAuthCheck';

interface Props {
  userEmail: string | undefined;
}

export const ProtectedRoute = ({ userEmail }: Props) => {
  const { loading, canAccess, reason } = useAuthCheck(userEmail);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h3>권한 확인 중...</h3>
      </div>
    );
  }

  // 1. 로그인이 안 된 경우 (이메일 없음)
  if (reason === 'no-email') {
    window.location.href = 'https://bang-guseog.com/login'; // 본점 로그인으로 이동
    return null;
  }

  // 2. 만료되었거나 유저를 찾을 수 없는 경우
  if (!canAccess) {
    return <Navigate to="/expired" replace />;
  }

  // 3. 모든 조건 통과 시 실제 서비스 화면(Outlet) 보여줌
  return <Outlet />;
};
