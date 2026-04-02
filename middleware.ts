import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

export async function middleware(request: NextRequest) {
  // 1. 브라우저 쿠키에서 로그인된 유저의 이메일을 가져옵니다.
  // (로그인 시 'user_email'이라는 이름으로 쿠키를 저장했다고 가정합니다.)
  const userEmail = request.cookies.get('user_email')?.value;

  // 2. 로그인이 안 되어 있다면 중앙 관리소(방구석작곡가) 로그인 페이지로 보냅니다.
  if (!userEmail) {
    // 유저가 로그인을 마치고 다시 이 앱으로 돌아오도록 현재 주소를 전달할 수도 있습니다.
    return NextResponse.redirect('https://bang-guseog.com/login');
  }

  try {
    // 3. 방구석작곡가(Cloudflare) 중앙 인증 API에 접속 권한 확인 요청
    // 이 주소는 용수님의 실제 Cloudflare 배포 주소로 수정하세요.
    const authApiUrl = `https://bang-guseog.com/api/auth/check?email=${encodeURIComponent(userEmail)}`;
    
    const response = await fetch(authApiUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store' // 매번 실시간으로 확인 (중요)
    });

    const auth = await response.json();

    // 4. 권한 체크 결과 처리
    if (!auth.canAccess) {
      // 기간이 만료되었거나 권한이 없는 경우 안내 페이지로 보냅니다.
      // 앱 내부에 /expired 라는 페이지를 미리 만들어두시면 좋습니다.
      return NextResponse.redirect(new URL('/expired', request.url));
    }

    // 5. [선택사항] 등급(Tier)별 추가 제한이 필요하다면 아래 주석을 해제하세요.
    /*
    if (auth.tier === 'silver' && request.nextUrl.pathname.startsWith('/premium-feature')) {
      return NextResponse.redirect(new URL('/upgrade', request.url));
    }
    */

    // 모든 조건 통과 시 실제 페이지 보여주기
    return NextResponse.next();

  } catch (error) {
    console.error('인증 체크 중 오류 발생:', error);
    // API 서버가 점검 중이거나 에러일 경우, 안전을 위해 일단 통과시키거나 
    // 혹은 보수적으로 차단할지 결정할 수 있습니다. (현재는 통과)
    return NextResponse.next();
  }
}

// 6. 미들웨어가 작동할 경로 설정
// 아래 설정은 api, 정적 파일(_next), 이미지 등을 제외한 모든 경로에서 작동합니다.
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|expired|upgrade).*)',
  ],
};
