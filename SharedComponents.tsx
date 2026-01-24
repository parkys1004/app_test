
import React from 'react';

export const Icon = ({ name }: { name: string }) => <span className="material-symbols-outlined" style={{ fontSize: '1.2em', verticalAlign: 'bottom' }}>{name}</span>;

export const NavButton = ({ active, onClick, icon, label, legibilityMode }: any) => (
  <button 
    onClick={onClick}
    style={{ 
      background: 'none', border: 'none', 
      color: active 
        ? (legibilityMode ? '#FDE047' : '#e11d48') 
        : (legibilityMode ? '#E5E7EB' : '#6b7280'), 
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
      cursor: 'pointer', width: '100%', padding: '10px 0'
    }}
  >
    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>{icon}</span>
    <span style={{ fontSize: '11px', fontWeight: active ? 'bold' : 'normal' }}>{label}</span>
  </button>
);

export const ManualModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 5000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(4px)'
    }} onClick={onClose}>
        <div style={{
            backgroundColor: '#1f2937', width: '800px', maxWidth: '90vw', maxHeight: '85vh',
            borderRadius: '16px', border: '1px solid #374151', display: 'flex', flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px', borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0, color: 'white', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px' }}>
                    <span className="material-symbols-outlined" style={{ color: '#fbbf24' }}>menu_book</span>
                    Suno Studio Pro V1.1 사용 매뉴얼
                </h2>
                <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
            <div style={{ padding: '30px', overflowY: 'auto', color: '#e5e7eb', lineHeight: '1.7' }}>
                <section style={{ marginBottom: '30px' }}>
                    <h3 style={{ color: '#e11d48', borderBottom: '1px solid #374151', paddingBottom: '8px', marginBottom: '15px' }}>1. 프로젝트 시작 (Dashboard)</h3>
                    <p>새로운 음악 프로젝트를 생성하고 관리하는 공간입니다.</p>
                    <ul style={{ paddingLeft: '20px', color: '#d1d5db', fontSize: '14px' }}>
                        <li><strong>New Project:</strong> 장르(K-Pop, Ballad 등), 무드, 제목을 설정하여 프로젝트를 생성합니다.</li>
                        <li><strong>프로젝트 관리:</strong> 클릭하여 편집하거나, JSON 파일로 내보내기/삭제가 가능합니다.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h3 style={{ color: '#fbbf24', borderBottom: '1px solid #374151', paddingBottom: '8px', marginBottom: '15px' }}>2. 기획 (Concept Tab)</h3>
                    <p>곡의 주제와 방향성을 설정합니다.</p>
                    <ul style={{ paddingLeft: '20px', color: '#d1d5db', fontSize: '14px' }}>
                        <li><strong>AI 아이디어 팩:</strong> 장르에 어울리는 제목, 주제, 스타일을 AI가 추천해줍니다.</li>
                        <li><strong>참고할 노래 (Reference):</strong> 유튜브나 기존 곡의 정보를 입력하면, 해당 곡의 바이브를 분석하여 가사와 사운드 생성에 반영합니다.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h3 style={{ color: '#3b82f6', borderBottom: '1px solid #374151', paddingBottom: '8px', marginBottom: '15px' }}>3. 구조 설계 (Structure Tab)</h3>
                    <p>곡의 흐름(Intro, Verse, Chorus 등)을 블록 단위로 설계합니다.</p>
                    <ul style={{ paddingLeft: '20px', color: '#d1d5db', fontSize: '14px' }}>
                        <li><strong>블록 편집:</strong> 각 파트의 설명(Description)을 수정하거나 순서를 변경할 수 있습니다.</li>
                        <li><strong>인트로 스타일:</strong> 곡의 시작 분위기를 결정합니다 (예: 속삭임, 강렬한 비트 등).</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h3 style={{ color: '#10b981', borderBottom: '1px solid #374151', paddingBottom: '8px', marginBottom: '15px' }}>4. 가사 작업 (Lyrics Tab)</h3>
                    <p>AI를 활용해 곡의 구조에 맞는 가사를 생성합니다.</p>
                    <ul style={{ paddingLeft: '20px', color: '#d1d5db', fontSize: '14px' }}>
                        <li><strong>Dance Optimization Mode:</strong> 댄서들이 박자를 세기 쉽도록 8-count 구조에 맞춰 가사를 생성합니다.</li>
                        <li><strong>AI 길이 자동 조절:</strong> 설정된 목표 시간(Duration)에 맞춰 가사의 분량을 자동으로 조절합니다.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h3 style={{ color: '#ec4899', borderBottom: '1px solid #374151', paddingBottom: '8px', marginBottom: '15px' }}>5. 사운드 디자인 (Sound Tab)</h3>
                    <p>Suno.ai에서 사용할 프롬프트를 생성합니다.</p>
                    <ul style={{ paddingLeft: '20px', color: '#d1d5db', fontSize: '14px' }}>
                        <li><strong>장르별 프리셋:</strong> 선택한 장르에 최적화된 BPM, Key, 악기 구성을 불러옵니다.</li>
                        <li><strong>Strict Dance Mode:</strong> 춤추기 좋은 정박(Steady Beat)을 유지하도록 프롬프트를 강화합니다.</li>
                        <li><strong>BPM 업로드:</strong> 오디오 파일을 업로드하여 BPM을 분석하고 프로젝트에 적용할 수 있습니다.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h3 style={{ color: '#ec4899', borderBottom: '1px solid #374151', paddingBottom: '8px', marginBottom: '15px' }}>6. 아트 & 배포 (Art & Export)</h3>
                    <ul style={{ paddingLeft: '20px', color: '#d1d5db', fontSize: '14px' }}>
                        <li><strong>Art:</strong> 곡의 분위기에 어울리는 앨범 커버를 생성합니다.</li>
                        <li><strong>Export:</strong> 작업한 프로젝트를 JSON으로 백업하거나, 메타데이터 초안(제목, 가사, 태그 등)을 자동 생성하여 복사할 수 있습니다.</li>
                    </ul>
                </section>
            </div>
            <div style={{ padding: '20px', borderTop: '1px solid #374151', textAlign: 'center' }}>
                <button onClick={onClose} style={{ padding: '10px 30px', backgroundColor: '#374151', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                    닫기
                </button>
            </div>
        </div>
    </div>
  );
};
