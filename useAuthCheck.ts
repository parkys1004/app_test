import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export function useAuthCheck() {
  const [status, setStatus] = useState<'loading' | 'authorized' | 'expired' | 'unauthorized'>('loading');
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      // 1. URL에서 이메일 파라미터 확인 (예: ?email=admin@example.com)
      const urlParams = new URLSearchParams(window.location.search);
      const emailFromUrl = urlParams.get('email');

      // URL에 이메일이 있으면 현재 도메인의 쿠키에 저장
      if (emailFromUrl) {
        Cookies.set('user_email', emailFromUrl, { expires: 7 });
        // URL을 깔끔하게 유지하기 위해 파라미터 숨기기 (선택사항)
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      // 2. 쿠키에서 이메일 읽기 (방금 URL에서 가져와 저장한 값 또는 기존 쿠키 값)
      const email = emailFromUrl || Cookies.get('user_email');

      if (!email) {
        console.warn("이메일 정보가 없습니다. (URL 파라미터나 쿠키에 없음)");
        setStatus('unauthorized');
        return;
      }

      try {
        // 방구석작곡가(Cloudflare) API 호출
        const res = await fetch(`https://bang-guseog.com/api/auth/check?email=${encodeURIComponent(email)}`, {
          cache: 'no-store'
        });
        
        if (!res.ok) {
          throw new Error(`API 응답 에러: ${res.status}`);
        }

        const data = await res.json();

        if (data.canAccess) {
          setUserData(data);
          setStatus('authorized');
        } else {
          setStatus('expired');
        }
      } catch (error) {
        console.error("인증 확인 실패 (CORS 문제이거나 서버 에러일 수 있습니다):", error);
        setStatus('unauthorized');
      }
    };

    checkAuth();
  }, []);

  return { status, userData };
}
