import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export function useAuthCheck() {
  const [status, setStatus] = useState<'loading' | 'authorized' | 'expired' | 'unauthorized'>('loading');
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const email = Cookies.get('user_email'); // 쿠키에서 이메일 읽기

      if (!email) {
        setStatus('unauthorized');
        return;
      }

      try {
        // 방구석작곡가(Cloudflare) API 호출
        // 이전 단계에서 수정하신 도메인으로 맞추어 두었습니다.
        const res = await fetch(`https://bang-guseog.com/api/auth/check?email=${encodeURIComponent(email)}`, {
          cache: 'no-store'
        });
        const data = await res.json();

        if (data.canAccess) {
          setUserData(data);
          setStatus('authorized');
        } else {
          setStatus('expired');
        }
      } catch (error) {
        console.error("인증 확인 실패:", error);
        setStatus('unauthorized');
      }
    };

    checkAuth();
  }, []);

  return { status, userData };
}
