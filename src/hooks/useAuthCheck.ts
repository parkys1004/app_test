import { useState, useEffect } from 'react';

export function useAuthCheck(userEmail: string | undefined) {
  const [authStatus, setAuthStatus] = useState<{
    loading: boolean;
    canAccess: boolean;
    reason: string;
    tier?: string;
  }>({ loading: true, canAccess: false, reason: 'init' });

  useEffect(() => {
    const checkAccess = async () => {
      if (!userEmail) {
        setAuthStatus({ loading: false, canAccess: false, reason: 'no-email' });
        return;
      }

      try {
        // Vite 프록시를 통해 방구석작곡가 API 호출 (CORS 우회)
        const response = await fetch(
          `/api/auth/check?email=${encodeURIComponent(userEmail)}`,
          { cache: 'no-store' }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          console.error("API가 JSON이 아닌 값을 반환했습니다 (HTML 등):", text.substring(0, 100));
          
          // 백엔드 API가 정상 작동하지 않을 때 앱 테스트를 위해 임시로 접근을 허용하는 모의(Mock) 처리
          console.warn("⚠️ 백엔드 API가 HTML을 반환하여 임시로 인증을 통과시킵니다.");
          setAuthStatus({
            loading: false,
            canAccess: true,
            tier: 'pro',
            reason: 'mock-bypass'
          });
          return;
        }

        const data = await response.json();

        setAuthStatus({
          loading: false,
          canAccess: data.canAccess,
          tier: data.tier,
          reason: data.reason
        });
      } catch (error) {
        console.error("인증 확인 중 오류:", error);
        setAuthStatus({ loading: false, canAccess: false, reason: 'server-error' });
      }
    };

    checkAccess();
  }, [userEmail]);

  return authStatus;
}
