
import React, { useState } from 'react';
import { Project } from './types';
import { GENRES, MOODS } from './constants';
import { Icon } from './SharedComponents';

// --- GENRE GUIDE DATA ---
const GENRE_GUIDE_DATA = [
    {
        title: "1. K-Pop (케이팝)",
        color: "#e11d48", // Rose
        items: [
            { term: "Girl Crush (걸크러쉬)", desc: "당당하고 강렬한 여성미를 강조하는 파워풀한 스타일입니다." },
            { term: "Refreshing (청량)", desc: "시원하고 맑은 느낌의 멜로디와 밝은 에너지가 특징입니다." },
            { term: "High Teen (하이틴)", desc: "하이틴 영화처럼 발랄하고 키치하며 트렌디한 감성을 담습니다." },
            { term: "Dark Concept (다크 컨셉)", desc: "웅장하고 무거우며, 신비롭거나 카리스마 넘치는 분위기입니다." },
            { term: "Jersey Club (저지 클럽)", desc: "독특한 킥 드럼 패턴과 빠른 템포가 결합된 트렌디한 비트입니다." },
            { term: "Easy Listening (이지리스닝)", desc: "편안하게 귀에 들어와 일상에서 반복해 듣기 좋은 곡들입니다." },
            { term: "Afrobeats (아프로비츠)", desc: "아프리카 특유의 리듬감을 K-Pop에 접목한 그루비한 스타일입니다." }
        ]
    },
    {
        title: "2. Ballad (발라드)",
        color: "#3b82f6", // Blue
        items: [
            { term: "Traditional Ballad (전통 발라드)", desc: "정석적인 기승전결과 호소력 짙은 보컬 중심의 곡입니다." },
            { term: "Rock Ballad (락 발라드)", desc: "밴드 사운드의 강렬함과 발라드의 감성이 합쳐진 스타일입니다." },
            { term: "R&B Ballad (R&B 발라드)", desc: "알앤비 특유의 세련된 리듬과 기교가 섞인 감성적인 곡입니다." },
            { term: "Indie Ballad (인디 발라드)", desc: "아티스트만의 독창적이고 소박한 감성이 돋보이는 발라드입니다." }
        ]
    },
    {
        title: "3. Hip-Hop (힙합)",
        color: "#f59e0b", // Amber
        items: [
            { term: "Trap (트랩)", desc: "묵직한 베이스와 화려한 하이햇 컨트롤이 특징인 현대 힙합의 주류입니다." },
            { term: "Boom Bap (붐뱁)", desc: "묵직한 드럼 비트와 샘플링을 기반으로 한 고전적인힙합 스타일입니다." },
            { term: "Singing Rap (싱잉랩)", desc: "랩에 멜로디를 얹어 노래하듯 전달하는 부드러운 스타일입니다." },
            { term: "K-HipHop (국힙)", desc: "한국적인 정서와 메시지가 담긴 한국 힙합 장르입니다." },
            { term: "Jazz Rap (재즈랩)", desc: "재즈 선율을 샘플링하여 지적이고 편안한 분위기를 풍기는 힙합입니다." },
            { term: "Old School (올드스쿨)", desc: "힙합 초기의 리듬과 정통 스타일을 지향하는 사운드입니다." }
        ]
    },
    {
        title: "4. R&B (알앤비)",
        color: "#8b5cf6", // Violet
        items: [
            { term: "K-R&B (K-알앤비)", desc: "한국 특유의 감각적인 보컬과 세련된 편곡이 결합된 장르입니다." },
            { term: "Soul (소울)", desc: "감정의 깊은 울림과 보컬의 힘이 강조된 흑인 음악 기반 장르입니다." },
            { term: "Groovy (그루비)", desc: "리듬감이 살아있어 자연스럽게 몸이 움직여지는 경쾌한 곡들입니다." },
            { term: "Neo Soul (네오 소울)", desc: "고전 소울에 재즈, 힙합 등을 섞은 몽환적이고 현대적인 스타일입니다." },
            { term: "Alternative R&B (얼터너티브 R&B)", desc: "기존 알앤비의 틀을 벗어나 실험적이고 신비로운 사운드를 추구합니다." }
        ]
    },
    {
        title: "5. Electronic (일렉트로닉)",
        color: "#10b981", // Emerald
        items: [
            { term: "House (하우스)", desc: "4/4 박자의 일정한 비트가 반복되는 전자 음악의 대표 장르입니다." },
            { term: "Future Bass (퓨처 베이스)", desc: "밝고 화려한 신디사이저 사운드와 팝적인 멜로디가 강조된 음악입니다." },
            { term: "Techno (테크노)", desc: "기계적이고 반복적인 리듬을 통해 몰입감을 주는 전자 음악입니다." },
            { term: "Deep House (딥 하우스)", desc: "하우스보다 느릿하고 몽환적이며 재즈적인 느낌이 가미된 음악입니다." },
            { term: "Hyperpop (하이퍼팝)", desc: "과장된 변조와 고속 비트를 사용하는 미래지향적이고 실험적인 팝입니다." }
        ]
    },
    {
        title: "6. Fusion (퓨전)",
        color: "#db2777", // Pink
        items: [
            { term: "Fusion Gugak (퓨전 국악)", desc: "전통 국악기와 현대적인 밴드/전자 사운드를 결합한 형태입니다." },
            { term: "Joseon Pop (조선팝)", desc: "민요나 판소리를 팝적인 리듬으로 풀어낸 대중적인 퓨전 음악입니다." },
            { term: "Pansori Hip-Hop (판소리 힙합)", desc: "판소리의 서사와 창법을 힙합 비트에 얹은 독특한 스타일입니다." },
            { term: "Folk Rock Fusion (포크 락 퓨전)", desc: "서정적인 포크 음악과 강렬한 락 음악을 조화시킨 장르입니다." }
        ]
    },
    {
        title: "7. Trot (트로트)",
        color: "#f97316", // Orange
        items: [
            { term: "Dance Trot (댄스 트로트)", desc: "빠른 댄스 비트와 트로트가 만나 흥을 돋우는 신나는 스타일입니다." },
            { term: "Traditional Trot (전통 트로트)", desc: "정통 창법과 꺾기가 살아있는 고유의 성인가요 스타일입니다." },
            { term: "EDM Trot (EDM 트로트)", desc: "강렬한 전자 음악 비트에 트로트 멜로디를 얹은 현대적인 장르입니다." },
            { term: "Semi-Trot (세미 트로트)", desc: "팝과 트로트의 중간 느낌으로 전 세대가 부담 없이 즐기는 스타일입니다." }
        ]
    },
    {
        title: "8. Band/Rock (밴드/락)",
        color: "#ef4444", // Red
        items: [
            { term: "Modern Rock (모던 락)", desc: "대중적이고 세련된 멜로디를 강조한 현대적인 락 사운드입니다." },
            { term: "Punk Rock (펑크 락)", desc: "빠르고 단순하며 저항적이고 에너지가 넘치는 사운드입니다." },
            { term: "Synth Rock (신스 락)", desc: "전자 음악의 신디사이저와 락의 기타 사운드가 조화를 이루는 장르입니다." },
            { term: "Metal (메탈)", desc: "아주 강렬한 기타 리프와 드럼, 파워풀한 보컬이 특징인 장르입니다." },
            { term: "Acoustic Rock (어쿠스틱 락)", desc: "통기타를 중심으로 부드럽고 자연스러운 사운드를 내는 락입니다." }
        ]
    },
    {
        title: "9. Indie/Folk (인디/포크)",
        color: "#14b8a6", // Teal
        items: [
            { term: "Acoustic Folk (어쿠스틱 포크)", desc: "소박한 악기 구성과 가사를 중시하는 서정적인 장르입니다." },
            { term: "City Pop (시티팝)", desc: "80년대 도회적인 분위기와 세련된 청량감을 주는 팝 사운드입니다." },
            { term: "Lo-fi (로파이)", desc: "일부러 잡음을 섞거나 음질을 낮춰 편안하고 빈티지한 분위기를 줍니다." },
            { term: "Dream Pop (드림팝)", desc: "마치 꿈속을 헤매는 듯 몽환적이고 잔잔한 공간감이 돋보이는 음악입니다." }
        ]
    },
    {
        title: "10. Jazz/Bossa (재즈/보사노바)",
        color: "#a855f7", // Purple
        items: [
            { term: "Standard Jazz (스탠다드 재즈)", desc: "재즈 역사에서 오랫동안 사랑받아온 정통 명곡 스타일입니다." },
            { term: "Bossa Nova (보사노바)", desc: "브라질 리듬에 재즈 화성이 섞인 부드럽고 감미로운 음악입니다." },
            { term: "Swing (스윙)", desc: "춤추기에 적합한 경쾌하고 리드미컬한 재즈 스타일입니다." },
            { term: "Fusion Jazz (퓨전 재즈)", desc: "재즈에 락이나 전자 음악 요소가 결합된 세련된 현대 재즈입니다." }
        ]
    },
    {
        title: "11. OST (사운드트랙)",
        color: "#ec4899", // Pink-500
        items: [
            { term: "Drama OST (드라마 OST)", desc: "드라마의 명장면을 떠올리게 하는 서사 중심의 곡들입니다." },
            { term: "Cinematic (시네마틱)", desc: "영화처럼 웅장하고 공간감이 느껴지는 배경 음악 스타일입니다." },
            { term: "Musical Style (뮤지컬 스타일)", desc: "가창력이 돋보이며 연극적인 요소가 강한 곡입니다." },
            { term: "Game Music (게임 음악)", desc: "게임의 세계관과 몰입도를 높여주는 배경 음악 및 테마곡입니다." }
        ]
    },
    {
        title: "12. Healing/Meditation (힐링/명상)",
        color: "#6366f1", // Indigo
        items: [
            { term: "Piano Solo (피아노 솔로)", desc: "맑고 잔잔한 피아노 연주로 마음의 안정을 주는 곡입니다." },
            { term: "Ambient (앰비언트)", desc: "뚜렷한 리듬보다 분위기를 감싸주는 몽환적인 배경 사운드입니다." },
            { term: "Nature Sounds (ASMR)", desc: "빗소리, 파도 소리 등 자연의 소리로 심리적 안정을 줍니다." },
            { term: "Meditation Guide (명상 가이드)", desc: "명상을 돕는 잔잔한 음악과 안내가 포함된 형태입니다." },
            { term: "Deep Sleep Music (수면 음악)", desc: "깊은 잠을 유도하기 위해 극도로 잔잔하고 부드러운 곡들입니다." },
            { term: "Singing Bowl (싱잉볼)", desc: "명상 도구인 싱잉볼의 고유한 진동음을 담아 이완을 돕습니다." }
        ]
    }
];

const ConfigManualModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 5000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(5px)'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: '#1f2937', width: '1000px', maxWidth: '95vw', maxHeight: '90vh',
                borderRadius: '16px', border: '1px solid #374151', display: 'flex', flexDirection: 'column',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', overflow: 'hidden'
            }} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div style={{ padding: '20px', borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111827' }}>
                    <h2 style={{ margin: 0, color: 'white', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px' }}>
                        <span className="material-symbols-outlined" style={{ color: '#fbbf24' }}>library_music</span>
                        프로젝트 구성 가이드 (Genre & Style Guide)
                    </h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', display: 'flex' }}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: '25px', overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', backgroundColor: '#1f2937' }}>
                    {GENRE_GUIDE_DATA.map((section, idx) => (
                        <div key={idx} style={{ 
                            backgroundColor: '#111827', borderRadius: '12px', padding: '15px', 
                            borderLeft: `4px solid ${section.color}`, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                        }}>
                            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: section.color, display: 'flex', alignItems: 'center', gap: '8px', borderBottom: `1px dashed ${section.color}40`, paddingBottom: '8px' }}>
                                {section.title}
                            </h3>
                            <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none' }}>
                                {section.items.map((item, i) => (
                                    <li key={i} style={{ marginBottom: '10px', fontSize: '13px', lineHeight: '1.5' }}>
                                        <div style={{ color: '#e5e7eb', fontWeight: 'bold', marginBottom: '2px' }}>• {item.term}</div>
                                        <div style={{ color: '#9ca3af', paddingLeft: '10px', fontSize: '12px' }}>{item.desc}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div style={{ padding: '15px', borderTop: '1px solid #374151', textAlign: 'center', backgroundColor: '#111827' }}>
                    <button onClick={onClose} style={{ padding: '10px 30px', backgroundColor: '#374151', color: 'white', border: '1px solid #4b5563', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                        닫기 (Close)
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Dashboard Component ---
const Dashboard = ({ projects, onCreate, onOpen, onDelete, onExport, legibilityMode }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfigManual, setShowConfigManual] = useState(false);
  const [newProjectForm, setNewProjectForm] = useState({ genre: 'K-Pop', subGenre: 'Girl Crush', mood: 'Energetic & Powerful', title: '' });
  const [showProAlert, setShowProAlert] = useState(false);
  const [showLimitAlert, setShowLimitAlert] = useState(false); // NEW: Limit Alert

  const handleNewProjectClick = () => {
      if (projects.length >= 3) {
          setShowLimitAlert(true);
      } else {
          setIsModalOpen(true);
      }
  };

  const handleCreate = () => {
    if (!newProjectForm.title.trim()) return alert('제목을 입력하세요');
    onCreate(newProjectForm);
    setIsModalOpen(false);
    setNewProjectForm({ genre: 'K-Pop', subGenre: 'Girl Crush', mood: 'Energetic & Powerful', title: '' });
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (selected === 'Custom') {
      setNewProjectForm({ ...newProjectForm, genre: selected, subGenre: '' });
    } else {
      const genreObj = GENRES.find(g => g.label === selected);
      setNewProjectForm({ 
        ...newProjectForm, 
        genre: selected, 
        subGenre: genreObj && genreObj.subgenres.length > 0 ? genreObj.subgenres[0] : '' 
      });
    }
  };

  const titleColor = legibilityMode ? '#FFFFFF' : '#f3f4f6';
  const labelColor = legibilityMode ? '#E5E7EB' : '#9ca3af';

  const selectedGenreObj = GENRES.find(g => g.label === newProjectForm.genre);

  return (
    <div style={{ padding: '40px', width: '100%', height: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
      {showConfigManual && <ConfigManualModal onClose={() => setShowConfigManual(false)} />}
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: titleColor }}>Projects</h2>
                <button 
                    onClick={() => setShowConfigManual(true)}
                    style={{ 
                        fontSize: '13px', padding: '6px 12px', backgroundColor: '#1f2937', 
                        border: '1px solid #4b5563', color: '#fbbf24', borderRadius: '6px', 
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                        fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>menu_book</span>
                    프로젝트 구성
                </button>
            </div>
            <p style={{ color: labelColor, margin: '10px 0 0 0' }}>Manage your music productions and ideas</p>
          </div>
          <button onClick={handleNewProjectClick} style={{ backgroundColor: '#e11d48', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 6px -1px rgba(225, 29, 72, 0.2)' }}>
            <Icon name="add" /> New Project
          </button>
        </div>
        <div className="dashboard-projects" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          <div onClick={handleNewProjectClick} style={{ backgroundColor: 'rgba(31, 41, 55, 0.4)', borderRadius: '16px', border: '2px dashed #4b5563', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', minHeight: '320px', transition: 'all 0.2s' }}>
             <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#e11d48' }}>
                <Icon name="add" />
             </div>
             <span style={{ fontSize: '16px', fontWeight: 'bold', color: labelColor }}>Create New Project</span>
          </div>
          {projects.map((p: Project) => (
            <div key={p.id} onClick={() => onOpen(p.id)} style={{ backgroundColor: '#1f2937', borderRadius: '16px', border: '1px solid #374151', display: 'flex', flexDirection: 'column', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', position: 'relative', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ height: '180px', width: '100%', position: 'relative', backgroundColor: '#111827' }}>
                    {p.coverImage ? <img src={p.coverImage} alt="cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)' }}><span style={{ fontSize: '48px', opacity: 0.2 }}>🎵</span></div>}
                     <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px', zIndex: 10 }}>
                         <button onClick={(e) => { e.stopPropagation(); onExport(p); }} style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', border: 'none', color: '#fff', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="download" /></button>
                         {/* Modified Delete Button Action */}
                         <button onClick={(e) => { e.stopPropagation(); setShowProAlert(true); }} style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', border: 'none', color: '#fff', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="close" /></button>
                    </div>
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 12px 0', color: 'white' }}>{p.title || 'Untitled Project'}</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '12px', backgroundColor: '#374151', color: legibilityMode ? '#FFFFFF' : '#9ca3af', fontWeight: '500' }}>{p.genre}</span>
                        {p.subGenre && <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '12px', backgroundColor: 'rgba(225, 29, 72, 0.1)', color: '#e11d48', border: '1px solid rgba(225, 29, 72, 0.2)', fontWeight: '500' }}>{p.subGenre}</span>}
                    </div>
                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #374151', paddingTop: '15px' }}>
                        <span style={{ fontSize: '12px', color: '#6b7280' }}>{new Date(p.createdAt).toLocaleDateString()}</span>
                        <span style={{ fontSize: '13px', color: '#818cf8', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>Open Studio <Icon name="arrow_forward" /></span>
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* PRO Alert Modal (Delete) */}
      {showProAlert && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }} onClick={() => setShowProAlert(false)}>
            <div style={{ backgroundColor: '#1f2937', padding: '40px', borderRadius: '20px', border: '1px solid #374151', width: '360px', textAlign: 'center', maxWidth: '90vw', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }} onClick={e => e.stopPropagation()}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(251, 191, 36, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#fbbf24' }}>lock</span>
                </div>
                <h3 style={{ margin: '0 0 10px 0', color: 'white', fontSize: '20px', fontWeight: 'bold' }}>PRO 버전 기능</h3>
                <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '25px', lineHeight: '1.6' }}>
                    프로젝트 삭제는 <strong style={{color: '#fbbf24'}}>PRO 버전</strong>에서만 가능합니다.<br/>
                    (Project deletion is a PRO feature)
                </p>
                <button onClick={() => setShowProAlert(false)} style={{ width: '100%', padding: '12px 0', backgroundColor: '#e11d48', color: 'white', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                    확인 (OK)
                </button>
            </div>
        </div>
      )}

      {/* Limit Alert Modal (Creation) */}
      {showLimitAlert && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }} onClick={() => setShowLimitAlert(false)}>
            <div style={{ backgroundColor: '#1f2937', padding: '40px', borderRadius: '20px', border: '1px solid #374151', width: '360px', textAlign: 'center', maxWidth: '90vw', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }} onClick={e => e.stopPropagation()}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#ef4444' }}>block</span>
                </div>
                <h3 style={{ margin: '0 0 10px 0', color: 'white', fontSize: '20px', fontWeight: 'bold' }}>생성 한도 초과</h3>
                <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '25px', lineHeight: '1.6' }}>
                    무료 버전에서는 프로젝트를<br/>
                    <strong style={{color: '#fbbf24'}}>최대 3개</strong>까지만 생성할 수 있습니다.<br/>
                    (Free version limit: 3 projects)
                </p>
                <button onClick={() => setShowLimitAlert(false)} style={{ width: '100%', padding: '12px 0', backgroundColor: '#374151', color: 'white', borderRadius: '10px', border: '1px solid #4b5563', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                    확인 (OK)
                </button>
            </div>
        </div>
      )}

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: '#1f2937', padding: '30px', borderRadius: '16px', width: '500px', maxWidth: '90vw' }}>
                <h3 style={{ marginTop: 0, color: 'white' }}>Start New Project</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', margin: '20px 0' }}>
                    <div>
                        <label style={{ display: 'block', color: labelColor, fontSize: '13px', marginBottom: '5px' }}>Project Name</label>
                        <input type="text" value={newProjectForm.title} onChange={e => setNewProjectForm({...newProjectForm, title: e.target.value})} placeholder="Enter project name..." style={{ width: '100%', padding: '12px', backgroundColor: '#111827', border: '1px solid #374151', color: 'white', borderRadius: '8px', boxSizing: 'border-box' }} />
                    </div>
                    
                    <div className="responsive-grid-2" style={{ gridTemplateColumns: '1fr 1fr', display: 'grid', gap: '15px' }}>
                        <div>
                            <label style={{ display: 'block', color: labelColor, fontSize: '13px', marginBottom: '5px' }}>Genre</label>
                            <select value={newProjectForm.genre} onChange={handleGenreChange} style={{ width: '100%', padding: '12px', backgroundColor: '#111827', color: 'white', border: '1px solid #374151', borderRadius: '8px' }}>
                                {GENRES.map(g => <option key={g.label} value={g.label}>{g.label}</option>)}
                            </select>
                        </div>
                        {selectedGenreObj && selectedGenreObj.subgenres.length > 0 && (
                            <div>
                                <label style={{ display: 'block', color: labelColor, fontSize: '13px', marginBottom: '5px' }}>Sub-Genre</label>
                                <select value={newProjectForm.subGenre} onChange={e => setNewProjectForm({...newProjectForm, subGenre: e.target.value})} style={{ width: '100%', padding: '12px', backgroundColor: '#111827', color: 'white', border: '1px solid #374151', borderRadius: '8px' }}>
                                    {selectedGenreObj.subgenres.map(sg => <option key={sg} value={sg}>{sg}</option>)}
                                </select>
                            </div>
                        )}
                    </div>

                    <div>
                        <label style={{ display: 'block', color: labelColor, fontSize: '13px', marginBottom: '5px' }}>Mood</label>
                        <select value={newProjectForm.mood} onChange={e => setNewProjectForm({...newProjectForm, mood: e.target.value})} style={{ width: '100%', padding: '12px', backgroundColor: '#111827', color: 'white', border: '1px solid #374151', borderRadius: '8px' }}>
                            {MOODS.map(m => <option key={m.id} value={m.label}>{m.label} ({m.ko})</option>)}
                        </select>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                    <button onClick={() => setIsModalOpen(false)} style={{ padding: '10px 20px', background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={handleCreate} style={{ padding: '10px 24px', backgroundColor: '#e11d48', color: 'white', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Create Project</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
