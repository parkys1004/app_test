
import React, { useState, useEffect } from 'react';
import { Project, SongBlock } from './types';
import { BLOCK_SAMPLES, STRUCTURE_TEMPLATES, INTRO_STYLES } from './constants';

// Define categories for better organization
const TEMPLATE_CATEGORIES: Record<string, string[]> = {
    "✨ 기본 (Basic)": ["Custom"],
    "🎤 K-Pop & Idol": [
        "Standard K-Pop",
        "Girl Crush (Strong)",
        "Boy Group (Performance)",
        "High Teen (School Concept)",
        "K-Pop Gen 2 (Retro Hook)",
        "Solo Idol (Dance)",
        "Summer Song (Cool)",
        "Winter Song (Carol)",
        "Latin-Kpop (Fusion)"
    ],
    "😎 Trendy & Vibe": [
        "Y2K Style (NewJeans Vibe)",
        "Cyberpunk (Aespa Style)",
        "Dreamy / Fairy",
        "City Pop (Retro)",
        "Jersey Club Remix",
        "Hyperpop (Glitch)"
    ],
    "🎧 Hip-Hop & R&B": [
        "Hip-Hop (Trap)",
        "R&B Groove",
        "Rap Cypher (Team)",
        "UK Garage / 2-Step"
    ],
    "🎹 Ballad & OST": [
        "Emotional Ballad (OST)",
        "Rock Ballad (Band)",
        "Musical Style",
        "Grand Epic (Final)",
        "Movie Trailer (Build-up)"
    ],
    "🎸 Band & Rock": [
        "Modern Rock (Anthem)",
        "Rock Ballad (Band)",
        "Punk Rock (Fast)",
        "Heavy Metal (Breakdown)"
    ],
    "⚡ Electronic & House": [
        "House (Club Standard)",
        "Future Bass (Emotional)",
        "Festival / EDM",
        "Drum & Bass (Liquid)"
    ],
    "🎷 Jazz & Trot": [
        "Traditional Trot (Ppong-jak)",
        "EDM Trot (Party)",
        "Bossa Nova (Cafe)",
        "Jazz Bar (Solo)"
    ],
    "🌿 Healing & Acoustic": [
        "Acoustic Indie",
        "Acoustic Cafe",
        "Introvert / Lofi",
        "Shoegaze (Dreamy)",
        "Ambient / Meditation",
        "Piano Solo (Calm)"
    ],
    "📱 Short Form (TikTok/Shorts)": [
        "Viral Hook Song (Short)",
        "TikTok Challenge (15s)",
        "YouTube Intro (Logo)"
    ],
    "🎉 Party & Club": [
        "Festival / EDM",
        "EDM Trot (Party)",
        "Drum & Bass (Liquid)",
        "Heavy Metal (Breakdown)",
        "Punk Rock (Fast)"
    ],
    "🏮 Fusion & Special": [
        "Fusion Gugak (Joseon Pop)",
        "Neo-Soul (Groovy)"
    ]
};

// --- K-POP Structure Manual Data ---
const STRUCTURE_MANUAL_DATA = [
    {
        title: "1. Intro: 도입부",
        color: "#fbbf24", // Gold
        items: [
            { term: "Whisper Narration (속삭이는 나레이션)", desc: "곡의 시작을 알리는 감각적인 음성" },
            { term: "Explosive Dance Beat (폭발적인 댄스 비트)", desc: "시작부터 에너지를 터뜨리는 강렬한 리듬" },
            { term: "Emotional Piano Solo (감성적인 피아노 솔로)", desc: "서정적이고 차분하게 시작하는 선율" },
            { term: "Gugak Melody (국악 선율/가야금)", desc: "한국적인 색채를 입힌 전통 악기 도입" },
            { term: "Counting (카운팅)", desc: "\"One, Two, Three!\"와 같이 박자를 맞추며 시작" }
        ]
    },
    {
        title: "2. Verse: 절",
        color: "#3b82f6", // Blue
        items: [
            { term: "Rhythmic Rap (리드미컬 랩)", desc: "리듬감을 강조한 랩 파트" },
            { term: "Melodic Singing (낮은 음역대 가창)", desc: "보컬의 매력을 보여주는 중저음 구간" },
            { term: "Storytelling (스토리텔링)", desc: "곡의 서사와 가사 내용을 전달하는 파트" },
            { term: "Building Up (빌드업)", desc: "감정과 에너지를 서서히 끌어올리는 과정" },
            { term: "Groovy Bass Line (그루비한 베이스 라인)", desc: "베이스 악기를 강조해 리듬을 살린 구간" }
        ]
    },
    {
        title: "3. Chorus: 후렴구",
        color: "#e11d48", // Rose (Main)
        items: [
            { term: "Killing Part/Hook (킬링 파트/훅)", desc: "곡에서 가장 강렬하고 기억에 남는 핵심 지점" },
            { term: "High Note Explosion (고음 폭발)", desc: "보컬의 가창력을 극대화하는 하이라이트" },
            { term: "Addictive Repetition (중독적인 반복)", desc: "누구나 따라 부르기 쉬운 반복적인 멜로디와 가사" },
            { term: "Group Harmony (그룹 화음)", desc: "멤버들의 목소리가 합쳐져 풍성함을 주는 구간" },
            { term: "Drop/EDM Style (EDM 스타일 드랍)", desc: "보컬 대신 강렬한 비트가 주인공이 되는 구간" }
        ]
    },
    {
        title: "4. Bridge: 브릿지",
        color: "#a855f7", // Purple
        items: [
            { term: "Mood Change/Slow down (무드 전환)", desc: "곡의 흐름을 잠시 늦추거나 분위기를 바꾸는 구간" },
            { term: "High Note Ad-lib (고음 애드리브)", desc: "화려한 기교로 긴장감을 고조시키는 보컬" },
            { term: "Rap Break (랩 브레이크)", desc: "분위기를 환기시키는 강렬한 랩 구간" },
            { term: "Minimal Instrument (최소화된 악기)", desc: "악기 소리를 줄여 목소리에 집중시키는 기법" },
            { term: "Build up to Final Chorus (마지막 후렴 빌드업)", desc: "최종 클라이맥스로 가기 전 에너지를 응축하는 단계" }
        ]
    },
    {
        title: "5. Drop & Instrumental: 퍼포먼스",
        color: "#10b981", // Green
        items: [
            { term: "Dance Break (댄스 브레이크)", desc: "화려한 퍼포먼스와 안무에 집중하는 구간" },
            { term: "Heavy Bass Drop (헤비 베이스 드랍)", desc: "웅장하고 무거운 저음을 강조한 비트" },
            { term: "Synth Lead Solo (신스 리드 솔로)", desc: "전자음악 사운드가 주도하는 연주 파트" },
            { term: "Traditional Percussion Break", desc: "꽹과리, 장구 등 국악 타악기를 활용한 리듬 구간" },
            { term: "Haegeum Solo (해금 솔로)", desc: "애절하고 독특한 해금 소리를 강조한 간주" }
        ]
    },
    {
        title: "6. Outro: 종결부",
        color: "#9ca3af", // Gray
        items: [
            { term: "Ending Fairy Pose (엔딩 요정 포즈)", desc: "무대 위 화면을 응시하며 여운을 남기는 마무리" },
            { term: "High Note Finish (고음 마무리)", desc: "시원한 고음으로 곡을 끝맺는 방식" },
            { term: "Whisper Ending (속삭이는 엔딩)", desc: "속삭이듯 읊조리며 사라지는 마무리" },
            { term: "Abrupt Stop (갑작스러운 정지)", desc: "긴장감 있게 뚝 끊기며 끝나는 방식" },
            { term: "Instrumental Fade (연주 페이드 아웃)", desc: "악기 소리가 점점 작아지며 자연스럽게 종료" }
        ]
    }
];

const StructureManualModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 5000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(5px)'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: '#1f2937', width: '900px', maxWidth: '95vw', maxHeight: '90vh',
                borderRadius: '16px', border: '1px solid #374151', display: 'flex', flexDirection: 'column',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', overflow: 'hidden'
            }} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div style={{ padding: '20px', borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111827' }}>
                    <h2 style={{ margin: 0, color: 'white', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px' }}>
                        <span className="material-symbols-outlined" style={{ color: '#fbbf24' }}>menu_book</span>
                        K-POP 곡 구성 요소 (Song Structure)
                    </h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', display: 'flex' }}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: '25px', overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px', backgroundColor: '#1f2937' }}>
                    {STRUCTURE_MANUAL_DATA.map((section, idx) => (
                        <div key={idx} style={{ 
                            backgroundColor: '#111827', borderRadius: '12px', padding: '15px', 
                            borderLeft: `4px solid ${section.color}`, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                        }}>
                            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: section.color, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {section.title}
                            </h3>
                            <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none' }}>
                                {section.items.map((item, i) => (
                                    <li key={i} style={{ marginBottom: '8px', fontSize: '13px', lineHeight: '1.5' }}>
                                        <span style={{ color: '#e5e7eb', fontWeight: 'bold' }}>• {item.term}</span>
                                        <div style={{ color: '#9ca3af', paddingLeft: '10px', fontSize: '12px' }}>- {item.desc}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div style={{ padding: '15px', borderTop: '1px solid #374151', textAlign: 'center', backgroundColor: '#111827' }}>
                    <button onClick={onClose} style={{ padding: '10px 30px', backgroundColor: '#e11d48', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                        닫기 (Close)
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- TAB: Structure ---
const StructureTab = ({ project, onUpdate, legibilityMode }: { project: Project, onUpdate: (u: Partial<Project>) => void, legibilityMode: boolean }) => {
  // Use persisted template or default to 'Custom'
  const selectedTemplate = project.selectedStructureTemplate || 'Custom';
  const [savedDjNames, setSavedDjNames] = useState<string[]>([]);
  const [showManual, setShowManual] = useState(false); // Manual Modal State

  useEffect(() => {
    const saved = localStorage.getItem('suno_dj_names');
    if (saved) {
        try {
            setSavedDjNames(JSON.parse(saved));
        } catch(e) { console.error(e); }
    } else {
        setSavedDjNames(['DJ Seoul', 'Brave Brothers', 'JYP']);
    }
  }, []);

  const handleSaveDjName = () => {
    const name = project.djName?.trim();
    if (name && !savedDjNames.includes(name)) {
        const updated = [...savedDjNames, name];
        setSavedDjNames(updated);
        localStorage.setItem('suno_dj_names', JSON.stringify(updated));
    }
  };

  const handleDeleteDjName = (e: React.MouseEvent, name: string) => {
    e.stopPropagation();
    const updated = savedDjNames.filter(n => n !== name);
    setSavedDjNames(updated);
    localStorage.setItem('suno_dj_names', JSON.stringify(updated));
  };

  // Calculate uncategorized templates (safety net)
  const allCategorized = Object.values(TEMPLATE_CATEGORIES).flat();
  const uncategorized = Object.keys(STRUCTURE_TEMPLATES).filter(t => !allCategorized.includes(t));

  const moveBlock = (index: number, direction: -1 | 1) => {
     const newStructure = [...project.structure];
     if (index + direction < 0 || index + direction >= newStructure.length) return;
     const temp = newStructure[index];
     newStructure[index] = newStructure[index + direction];
     newStructure[index + direction] = temp;
     onUpdate({ structure: newStructure });
  };

  const addBlock = (type: string) => {
     const newBlock = { 
         id: Date.now().toString(), 
         type, 
         description: BLOCK_SAMPLES[type]?.[0] || '...',
         duration: type === 'Intro' || type === 'Outro' ? 4 : 8 
     };
     onUpdate({ structure: [...project.structure, newBlock] });
  };

  const removeBlock = (index: number) => {
      const newStructure = [...project.structure];
      newStructure.splice(index, 1);
      onUpdate({ structure: newStructure });
  };

  const updateBlockDescription = (index: number, desc: string) => {
      const newStructure = project.structure.map((block: SongBlock, i: number) => 
        i === index ? { ...block, description: desc } : block
      );
      onUpdate({ structure: newStructure });
  };

  const applyTemplate = (templateName: string) => {
    if (templateName === 'Custom') {
        onUpdate({ selectedStructureTemplate: 'Custom' });
        return;
    }

    // @ts-ignore
    const template = STRUCTURE_TEMPLATES[templateName];
    if (template) {
        const newStructure = template.map((block: any, idx: number) => ({
            ...block,
            id: Date.now().toString() + idx
        }));
        onUpdate({ structure: newStructure, selectedStructureTemplate: templateName });
    }
  };

  const titleColor = legibilityMode ? '#FFFFFF' : 'white';

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ borderBottom: '1px solid #374151', paddingBottom: '15px', marginBottom: '20px', color: titleColor, fontWeight: legibilityMode ? 'bold' : 'normal', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>🎹 곡 구조 설계 (Structure Editor)</span>
            <button 
                onClick={() => setShowManual(true)}
                style={{
                    fontSize: '13px', padding: '6px 12px', backgroundColor: '#1f2937', 
                    border: '1px solid #4b5563', color: '#fbbf24', borderRadius: '6px', 
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                    fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
            >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>menu_book</span>
                구조 매뉴얼
            </button>
        </h2>
        
        {showManual && <StructureManualModal onClose={() => setShowManual(false)} />}
        
        <div style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <span style={{ color: legibilityMode ? '#FFFFFF' : '#d1d5db', fontSize: '14px' }}>구조 템플릿 불러오기:</span>
            <select 
                value={selectedTemplate} 
                onChange={(e) => applyTemplate(e.target.value)}
                style={{ 
                    padding: '8px 12px', borderRadius: '8px', backgroundColor: '#111827', 
                    color: 'white', border: '1px solid #4b5563', minWidth: '250px', cursor: 'pointer'
                }}
            >
                {Object.entries(TEMPLATE_CATEGORIES).map(([category, templates]) => (
                    <optgroup key={category} label={category} style={{ color: '#fbbf24', fontWeight: 'bold', fontStyle: 'normal' }}>
                        {templates.map(t => (
                            // @ts-ignore
                            STRUCTURE_TEMPLATES[t] ? (
                                <option key={t} value={t} style={{ color: 'white', fontWeight: 'normal' }}>{t}</option>
                            ) : null
                        ))}
                    </optgroup>
                ))}
                
                {uncategorized.length > 0 && (
                    <optgroup label="📂 기타 (Others)" style={{ color: '#9ca3af', fontWeight: 'bold' }}>
                        {uncategorized.map(t => (
                            <option key={t} value={t} style={{ color: 'white', fontWeight: 'normal' }}>{t}</option>
                        ))}
                    </optgroup>
                )}
            </select>
            {selectedTemplate !== 'Custom' && (
                <span style={{ 
                    fontSize: '12px', color: '#10b981', fontWeight: 'bold', 
                    padding: '4px 8px', backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                    borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.2)',
                    display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>check_circle</span>
                    현재 템플릿: {selectedTemplate}
                </span>
            )}
            <span style={{ fontSize: '12px', color: legibilityMode ? '#E5E7EB' : '#9ca3af' }}>* 선택 시 현재 구조가 변경됩니다.</span>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
            {['Intro', 'Verse', 'Chorus', 'Bridge', 'Drop', 'Instrumental', 'Outro'].map(type => (
                <button 
                    key={type} 
                    onClick={() => addBlock(type)}
                    style={{ padding: '8px 16px', backgroundColor: '#374151', border: 'none', borderRadius: '20px', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    + {type}
                </button>
            ))}
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '20px', alignItems: 'flex-start' }}>
            {project.structure.map((block: SongBlock, i: number) => (
                <div key={block.id} style={{ 
                    minWidth: '220px', 
                    flex: block.duration,
                    backgroundColor: block.type === 'Chorus' ? '#e11d48' : block.type === 'Verse' ? '#2563eb' : '#4b5563',
                    borderRadius: '8px', padding: '15px', position: 'relative',
                    transition: 'all 0.2s',
                    flexShrink: 0
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ fontWeight: 'bold', color: '#FFFFFF' }}>{block.type}</span>
                        <button onClick={() => removeBlock(i)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>×</button>
                    </div>
                    
                    {/* Sample Selection */}
                    <select 
                       value={block.description} 
                       onChange={(e) => updateBlockDescription(i, e.target.value)}
                       style={{ width: '100%', marginBottom: '5px', backgroundColor: 'rgba(0,0,0,0.3)', border: 'none', color: 'white', fontSize: '12px', padding: '4px', borderRadius: '4px' }}
                    >
                        <option value={block.description}>{block.description} (Custom)</option>
                        {BLOCK_SAMPLES[block.type]?.map((sample, idx) => (
                            <option key={idx} value={sample}>{sample}</option>
                        ))}
                    </select>

                    <input 
                        type="text" 
                        value={block.description}
                        onChange={(e) => updateBlockDescription(i, e.target.value)}
                        placeholder="직접 입력..."
                        style={{ width: '100%', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontSize: '12px', padding: '4px', borderRadius: '4px', boxSizing: 'border-box' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', gap: '5px' }}>
                         <button onClick={() => moveBlock(i, -1)} style={{ fontSize: '10px', background: 'rgba(0,0,0,0.3)', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>◀</button>
                         <button onClick={() => moveBlock(i, 1)} style={{ fontSize: '10px', background: 'rgba(0,0,0,0.3)', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>▶</button>
                    </div>
                </div>
            ))}
        </div>

        {/* Intro Style Selector */}
        <div style={{ marginTop: '30px', borderTop: '1px solid #374151', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                <h3 style={{ fontSize: '18px', color: '#e11d48', margin: 0, fontWeight: legibilityMode ? 'bold' : 'normal' }}>🎧 인트로 스타일 설정 (Intro Vibe)</h3>
                {project.introStyle && (
                    <button 
                        onClick={() => onUpdate({ introStyle: undefined })}
                        style={{ 
                            fontSize: '12px', padding: '6px 12px', backgroundColor: '#374151', 
                            border: '1px solid #4b5563', color: legibilityMode ? '#FFFFFF' : '#d1d5db', borderRadius: '6px', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '5px'
                        }}
                        title="선택된 인트로 스타일을 해제합니다"
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>close</span>
                        선택 해제 (Clear)
                    </button>
                )}
            </div>
            <p style={{ fontSize: '13px', color: legibilityMode ? '#E5E7EB' : '#9ca3af', marginBottom: '20px' }}>
                원하는 인트로 분위기를 선택하면 <strong>가사(Lyrics)</strong>와 <strong>사운드(Prompt)</strong> 생성에 자동으로 반영됩니다.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                {INTRO_STYLES.map(style => {
                    const isSelected = project.introStyle === style.id;
                    return (
                        <div 
                            key={style.id}
                            onClick={() => onUpdate({ introStyle: style.id })}
                            style={{ 
                                padding: '15px', 
                                backgroundColor: isSelected ? 'rgba(225, 29, 72, 0.15)' : '#1f2937', 
                                border: isSelected ? '1px solid #e11d48' : '1px solid #374151',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                position: 'relative'
                            }}
                        >
                            {isSelected && <div style={{ position: 'absolute', top: '10px', right: '10px', color: '#e11d48' }}>✔</div>}
                            <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '6px', color: isSelected ? '#fbbf24' : 'white' }}>
                                {style.label}
                            </div>
                            <div style={{ fontSize: '12px', color: legibilityMode ? '#E5E7EB' : '#9ca3af', lineHeight: '1.4' }}>
                                {style.desc}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* TIP Section */}
        <div className="responsive-grid-2" style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
             <div style={{ padding: '20px', backgroundColor: '#111827', borderRadius: '8px', border: '1px solid #374151' }}>
                <h3 style={{ fontSize: '16px', margin: '0 0 10px 0', color: '#fbbf24' }}>💡 구조 설계 팁 (Structure Tips)</h3>
                <ul style={{ fontSize: '13px', color: legibilityMode ? '#FFFFFF' : '#d1d5db', paddingLeft: '20px', lineHeight: '1.6' }}>
                    <li><strong>3분 이상 곡 만들기:</strong> [Intro] - [Verse] - [Chorus] - [Verse] - [Chorus] - [Bridge] - [Chorus] - [Outro] 구조를 추천합니다.</li>
                    <li><strong>빌드업:</strong> Chorus 전에 Bridge를 배치하면 감정을 고조시킬 수 있습니다.</li>
                    <li><strong>K-Pop 스타일:</strong> 인트로에 'Whisper Narration'을 추가하여 트렌디함을 살려보세요.</li>
                </ul>
             </div>

            <div style={{ padding: '20px', backgroundColor: '#111827', borderRadius: '8px', border: '1px solid #374151' }}>
                <h3 style={{ fontSize: '16px', margin: '0 0 10px 0', color: legibilityMode ? '#FFFFFF' : 'white' }}>🎧 K-Pop 시그니처 & 엔딩 설정</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: legibilityMode ? '#FFFFFF' : 'inherit' }}>
                        <input type="checkbox" checked={project.structure[0]?.type === 'Intro' && project.structure[0]?.description.includes('Signature')} 
                               onChange={(e) => {
                                   if (e.target.checked) {
                                       const desc = project.djName ? `Signature Sound Intro (Producer Tag: ${project.djName})` : 'Signature Sound Intro (Catchy start)';
                                       if (project.structure[0].type !== 'Intro') {
                                           const newStructure = [{ id: Date.now().toString(), type: 'Intro', description: desc, duration: 4 }, ...project.structure];
                                           onUpdate({ structure: newStructure });
                                       } else {
                                            const newStructure = [...project.structure];
                                            newStructure[0] = { ...newStructure[0], description: desc };
                                            onUpdate({ structure: newStructure });
                                       }
                                   }
                               }}
                        /> 
                        Signature Sound Intro (시그니처 사운드)
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: legibilityMode ? '#FFFFFF' : 'inherit' }}>
                        <input type="checkbox" checked={project.structure[project.structure.length-1]?.type === 'Outro' && project.structure[project.structure.length-1]?.description.includes('Ending')} 
                                onChange={(e) => {
                                   if (e.target.checked) {
                                       // Logic to ensure outro exists
                                       const desc = 'Ending Pose & Fade Out';
                                       const last = project.structure[project.structure.length-1];
                                       if (last.type !== 'Outro') {
                                            const newStructure = [...project.structure, { id: Date.now().toString(), type: 'Outro', description: desc, duration: 4 }];
                                            onUpdate({ structure: newStructure });
                                       } else {
                                            const newStructure = [...project.structure];
                                            newStructure[newStructure.length-1] = { ...newStructure[newStructure.length-1], description: desc };
                                            onUpdate({ structure: newStructure });
                                       }
                                   }
                               }}
                        /> 
                        Ending Fairy Outro (엔딩 요정 / 페이드 아웃)
                    </label>
                    
                    <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#1f2937', borderRadius: '6px' }}>
                        <label style={{ display: 'block', fontSize: '12px', color: legibilityMode ? '#FFFFFF' : '#9ca3af', marginBottom: '5px' }}>DJ/Producer Name (시그니처 태그)</label>
                        <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
                            <input 
                                type="text" 
                                value={project.djName || ''}
                                onChange={(e) => onUpdate({ djName: e.target.value })}
                                placeholder="예: DJ Seoul, Brave Sound (입력시 Intro에 반영)"
                                style={{ flex: 1, padding: '8px', backgroundColor: '#374151', border: 'none', color: 'white', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' }}
                            />
                            <button 
                                onClick={handleSaveDjName}
                                title="현재 이름을 리스트에 저장"
                                style={{ padding: '0 10px', backgroundColor: '#374151', border: '1px solid #4b5563', color: '#10b981', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
                            </button>
                        </div>

                        {/* Saved Tags */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {savedDjNames.map((name, idx) => (
                                <div 
                                    key={idx} 
                                    onClick={() => onUpdate({ djName: name })}
                                    style={{ 
                                        fontSize: '11px', padding: '4px 8px', borderRadius: '12px', 
                                        backgroundColor: '#111827', border: '1px solid #4b5563', 
                                        color: legibilityMode ? '#FFFFFF' : '#d1d5db', cursor: 'pointer', 
                                        display: 'flex', alignItems: 'center', gap: '4px' 
                                    }}
                                >
                                    {name} 
                                    <span 
                                        onClick={(e) => handleDeleteDjName(e, name)} 
                                        style={{ fontSize: '14px', color: '#ef4444', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>close</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                        
                        <p style={{ fontSize: '11px', color: '#6b7280', margin: '8px 0 0 0' }}>* 이름을 입력하고 체크박스를 켜면 Intro 블록에 시그니처 사운드 태그가 자동 추가됩니다.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default StructureTab;
