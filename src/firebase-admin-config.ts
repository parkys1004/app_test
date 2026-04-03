import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// [중요] 방구석작곡가(본점) 파이어베이스 콘솔에서 가져온 설정값입니다.
const firebaseConfig = {
  apiKey: "AIzaSyAp9pnbnU744Dq-UkywRh0hVClZwMenXT8",
  authDomain: "gen-lang-client-0979707528.firebaseapp.com",
  databaseURL: "https://gen-lang-client-0979707528-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gen-lang-client-0979707528",
  storageBucket: "gen-lang-client-0979707528.firebasestorage.app",
  messagingSenderId: "523555104282",
  appId: "1:523555104282:web:e8b727b2d14a549d9e93a3"
};

// 'adminApp'이라는 이름으로 별도 초기화 (기존 앱 설정과 충돌 방지)
const adminApp = initializeApp(firebaseConfig, "admin-system");
// getFirestore의 두 번째 인자로 스크린샷 상단에 보이는 긴 ID를 넣습니다.
export const adminDb = getFirestore(adminApp, "ai-studio-dbbbbaa2-1129-4959-b336-f0af63245a60");