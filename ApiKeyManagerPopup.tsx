
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { encryptKey } from './utils';

// --- API Key Management Popup Component ---
const ApiKeyManagerPopup = ({ onOpenApp }: { onOpenApp: () => void }) => {
  const [keyInput, setKeyInput] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'TESTING' | 'SUCCESS' | 'PARTIAL_SUCCESS' | 'ERROR'>('IDLE');
  const [caps, setCaps] = useState({
      text: 'IDLE',
      image: 'IDLE',
      pro: 'IDLE'
  });
  const [savedKeyExists, setSavedKeyExists] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem('suno_pro_api_key');
    if (key) setSavedKeyExists(true);
  }, []);

  const testConnection = async (targetKey: string) => {
    setStatus('TESTING');
    setCaps({ text: 'CHECKING', image: 'IDLE', pro: 'IDLE' });
    
    try {
      const tempAi = new GoogleGenAI({ apiKey: targetKey });
      
      // --- Step 1: Check Basic Text (Robust Fallback Strategy) ---
      // Try multiple models in order. If *any* work, we consider text capability active.
      // This solves issues where specific models (like 1.5-flash) might be restricted on some keys.
      const textModelsToTry = [
          'gemini-3-flash-preview', 
          'gemini-2.0-flash', 
          'gemini-1.5-flash-latest',
          'gemini-1.5-flash'
      ];
      
      let textRes: 'SUCCESS' | 'ERROR' = 'ERROR';
      
      for (const modelName of textModelsToTry) {
          try {
              await tempAi.models.generateContent({
                  model: modelName,
                  contents: 'hi',
              });
              textRes = 'SUCCESS';
              console.log(`Text connection successful with: ${modelName}`);
              break; // Stop testing if one works
          } catch (e) {
              console.warn(`Text check failed for ${modelName}`, e);
              // Continue to next model
          }
      }
      
      setCaps(prev => ({ ...prev, text: textRes as any }));

      if (textRes === 'SUCCESS') {
          // At least text works, save key immediately
          localStorage.setItem('suno_pro_api_key', encryptKey(targetKey));
          setSavedKeyExists(true);
          
          // --- Step 2: Check Image Generation ---
          setCaps(prev => ({ ...prev, image: 'CHECKING' }));
          let imageRes: 'SUCCESS' | 'ERROR' = 'ERROR';
          try {
              await tempAi.models.generateContent({
                  model: 'gemini-2.5-flash-image',
                  contents: 'dot',
              });
              imageRes = 'SUCCESS';
          } catch (e) {
              console.error("Image Check Failed:", e);
          }
          setCaps(prev => ({ ...prev, image: imageRes as any }));

          // --- Step 3: Check Pro Vision ---
          setCaps(prev => ({ ...prev, pro: 'CHECKING' }));
          let proRes: 'SUCCESS' | 'ERROR' = 'ERROR';
          try {
              await tempAi.models.generateContent({
                  model: 'gemini-3-pro-image-preview',
                  contents: 'dot',
              });
              proRes = 'SUCCESS';
          } catch (e) {
              console.error("Pro Check Failed:", e);
          }
          setCaps(prev => ({ ...prev, pro: proRes as any }));

          // Final Status Decision
          if (imageRes === 'SUCCESS' && proRes === 'SUCCESS') {
              setStatus('SUCCESS');
              setTimeout(() => onOpenApp(), 1200);
          } else {
              setStatus('PARTIAL_SUCCESS');
          }
      } else {
          setStatus('ERROR');
          setCaps({ text: 'ERROR', image: 'ERROR', pro: 'ERROR' });
      }
    } catch (e) {
      console.error("Connection Critical Error:", e);
      setStatus('ERROR');
      setCaps({ text: 'ERROR', image: 'ERROR', pro: 'ERROR' });
    }
  };

  const handleDelete = () => {
    localStorage.removeItem('suno_pro_api_key');
    setSavedKeyExists(false);
    setKeyInput('');
    setStatus('IDLE');
    setCaps({ text: 'IDLE', image: 'IDLE', pro: 'IDLE' });
  };

  const StatusRow = ({ label, status }: { label: string, status: string }) => (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#374151', borderRadius: '8px', marginBottom: '8px', border: '1px solid #4b5563' }}>
          <span style={{ fontSize: '13px', color: '#e5e7eb', fontWeight: '500' }}>{label}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {status === 'CHECKING' && <span className="material-symbols-outlined" style={{ fontSize: '18px', animation: 'spin 1s linear infinite' }}>sync</span>}
              {status === 'SUCCESS' && <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#10b981' }}>check_circle</span>}
              {status === 'ERROR' && <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#ef4444' }}>cancel</span>}
              {status === 'IDLE' && <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#6b7280' }}>radio_button_unchecked</span>}
              
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: status === 'SUCCESS' ? '#10b981' : (status === 'ERROR' ? '#ef4444' : '#9ca3af') }}>
                  {status === 'CHECKING' ? '확인 중...' : (status === 'SUCCESS' ? '활성화됨' : (status === 'ERROR' ? '권한 없음' : '대기'))}
              </span>
          </div>
      </div>
  );

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        backgroundColor: '#1f2937', padding: '40px', borderRadius: '24px',
        width: '500px', border: '1px solid #374151', textAlign: 'center',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔐</div>
        <h2 style={{ color: 'white', marginBottom: '10px' }}>API Key Management</h2>
        <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '25px' }}>
          Gemini API 키를 입력하세요. 핵심 기능에 대한 접근 권한을 자동으로 테스트합니다.
        </p>

        {savedKeyExists && status === 'IDLE' ? (
          <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', border: '1px solid #10b981' }}>
            <p style={{ color: '#10b981', margin: 0, fontWeight: 'bold' }}>✅ API 키가 저장되어 있습니다.</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button onClick={onOpenApp} style={{ flex: 1, padding: '12px', backgroundColor: '#e11d48', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>앱 시작하기</button>
              <button onClick={handleDelete} style={{ padding: '12px', backgroundColor: '#374151', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '8px', cursor: 'pointer' }}>삭제</button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="Enter your Gemini API Key"
              disabled={status === 'TESTING'}
              style={{ padding: '15px', backgroundColor: '#111827', border: '1px solid #4b5563', color: 'white', borderRadius: '10px' }}
            />
            
            {(status === 'TESTING' || status === 'SUCCESS' || status === 'PARTIAL_SUCCESS' || status === 'ERROR') && (
                <div style={{ marginTop: '5px', marginBottom: '5px' }}>
                    <StatusRow label="기본 텍스트/추론 (Text & Reasoning)" status={caps.text} />
                    <StatusRow label="일반 이미지 생성 (Image Gen)" status={caps.image} />
                    <StatusRow label="Pro 고해상도 이미지 (Pro Image)" status={caps.pro} />
                </div>
            )}

            <button
              onClick={() => testConnection(keyInput)}
              disabled={status === 'TESTING' || !keyInput}
              style={{
                padding: '15px', backgroundColor: status === 'SUCCESS' ? '#10b981' : (status === 'PARTIAL_SUCCESS' ? '#f59e0b' : '#e11d48'),
                color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer',
                opacity: status === 'TESTING' ? 0.7 : 1
              }}
            >
              {status === 'TESTING' ? '기능 테스트 중...' : 
               status === 'SUCCESS' ? '모든 기능 연결 성공!' : 
               status === 'PARTIAL_SUCCESS' ? '일부 기능 제한됨 (앱 시작)' : 
               '연결 및 저장'}
            </button>
            
            {status === 'PARTIAL_SUCCESS' && (
                <button onClick={onOpenApp} style={{ padding: '12px', backgroundColor: '#374151', color: 'white', border: '1px solid #6b7280', borderRadius: '8px', cursor: 'pointer' }}>
                    제한된 기능으로 시작하기
                </button>
            )}

            {status === 'ERROR' && <p style={{ color: '#ef4444', fontSize: '12px' }}>API 키가 유효하지 않거나 연결에 실패했습니다.</p>}
          </div>
        )}
        <p style={{ marginTop: '20px', fontSize: '11px', color: '#6b7280' }}>
          * 저장된 키는 브라우저의 LocalStorage에 암호화된 상태로 보관됩니다.
        </p>
      </div>
    </div>
  );
};

export default ApiKeyManagerPopup;
