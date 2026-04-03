import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAp9pnbnU744Dq-UkywRh0hVClZwMenXT8",
  authDomain: "gen-lang-client-0979707528.firebaseapp.com",
  projectId: "gen-lang-client-0979707528",
  storageBucket: "gen-lang-client-0979707528.firebasestorage.app",
  messagingSenderId: "523555104282",
  appId: "1:523555104282:web:e8b727b2d14a549d9e93a3"
};

// 중앙 관리용 앱 초기화
const adminApp = initializeApp(firebaseConfig, "admin-system");

// [핵심] 스크린샷 상단의 긴 DB ID를 정확히 입력합니다.
export const adminDb = getFirestore(adminApp, "ai-studio-dbbbbaa2-1129-4959-b336-f0af63245a60");
export const auth = getAuth(adminApp);