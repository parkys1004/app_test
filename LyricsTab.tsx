
import React, { useState, useEffect } from 'react';
import { Type } from "@google/genai";
import { getGenAI } from './utils';
import { Project, SongBlock } from './types';
import { INTRO_STYLES, EXCLUDED_KEYWORDS_PRESETS } from './constants';

// --- COMPONENT: Lyric Optimization Modal ---
const LyricOptimizationModal = ({ 
    original, 
    optimized, 
    rationale, 
    onClose, 
    onApply 
}: { 
    original: string, 
    optimized: string, 
    rationale: string, 
    onClose: () => void, 
    onApply: () => void 
}) => {
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 5000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(5px)'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: '#1f2937', width: '90%', maxWidth: '1000px', maxHeight: '85vh',
                borderRadius: '16px', border: '1px solid #374151', display: 'flex', flexDirection: 'column',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', overflow: 'hidden'
            }} onClick={e => e.stopPropagation()}>
                
                {/* Header */}
                <div style={{ padding: '20px', borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111827' }}>
                    <h2 style={{ margin: 0, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px' }}>
                        <span className="material-symbols-outlined">auto_fix_high</span>
                        가사 구조 및 태그 교정 제안
                    </h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', display: 'flex' }}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: '25px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, backgroundColor: '#1f2937' }}>
                    
                    {/* Analysis Report */}
                    <div style={{ backgroundColor: 'rgba(30, 58, 138, 0.3)', border: '1px solid #1d4ed8', borderRadius: '8px', padding: '15px' }}>
                        <h4 style={{ margin: '0 0 8px 0', color: '#60a5fa', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>analytics</span>
                            분석 리포트
                        </h4>
                        <p style={{ margin: 0, fontSize: '13px', color: '#dbeafe', lineHeight: '1.6' }}>
                            {rationale}
                        </p>
                    </div>

                    {/* Comparison Grid */}
                    <div className="comparison-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr', gap: '10px', alignItems: 'center', height: '400px' }}>
                        
                        {/* Original */}
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <label style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '8px', fontWeight: 'bold' }}>원본 (Original)</label>
                            <textarea 
                                readOnly
                                value={original}
                                style={{ 
                                    flex: 1, padding: '15px', backgroundColor: '#111827', 
                                    border: '1px solid #374151', borderRadius: '8px', color: '#9ca3af', 
                                    resize: 'none', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.6'
                                }}
                            />
                        </div>

                        {/* Arrow */}
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                             <span className="material-symbols-outlined" style={{ color: '#fbbf24', fontSize: '24px' }}>arrow_forward</span>
                        </div>

                        {/* Corrected */}
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <label style={{ color: '#10b981', fontSize: '12px', marginBottom: '8px', fontWeight: 'bold' }}>교정 제안 (Corrected)</label>
                            <textarea 
                                readOnly
                                value={optimized}
                                style={{ 
                                    flex: 1, padding: '15px', backgroundColor: 'rgba(6, 78, 59, 0.2)', 
                                    border: '1px solid #10b981', borderRadius: '8px', color: '#d1fae5', 
                                    resize: 'none', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.6'
                                }}
                            />
                        </div>
                    </div>
                    <style dangerouslySetInnerHTML={{__html: `
                        @media (max-width: 768px) {
                            .comparison-grid {
                                grid-template-columns: 1fr !important;
                                grid-template-rows: 1fr 40px 1fr !important;
                                height: auto !important;
                            }
                            .comparison-grid textarea {
                                min-height: 200px;
                            }
                            .comparison-grid .material-symbols-outlined {
                                transform: rotate(90deg);
                            }
                        }
                    `}} />
                </div>

                {/* Footer */}
                <div style={{ padding: '20px', borderTop: '1px solid #374151', display: 'flex', justifyContent: 'flex-end', gap: '10px', backgroundColor: '#111827' }}>
                    <button onClick={onClose} style={{ padding: '10px 20px', backgroundColor: '#374151', color: '#d1d5db', border: '1px solid #4b5563', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
                        취소
                    </button>
                    <button onClick={onApply} style={{ padding: '10px 24px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check</span>
                        교정 사항 적용하기
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- TAB: Lyrics ---
const LyricsTab = ({ project, onUpdate, legibilityMode }: { project: Project, onUpdate: (u: Partial<Project>) => void, legibilityMode: boolean }) => {
  const [loading, setLoading] = useState(false);
  const [showProAlert, setShowProAlert] = useState(false);
  
  // State is now derived from project prop for persistence
  const language = project.lyricLanguage ?? 'Korean & English Mix';
  const lyricDurationSeconds = project.lyricDuration ?? 180;
  const isDanceMode = project.lyricDanceMode ?? false;
  const autoAdjustLength = project.lyricAutoAdjust ?? false;
  
  // Use persistent project data for variations instead of local state
  const variations = project.lyricVariations || [];
  const selectedVariationIndex = project.selectedLyricVariationIndex ?? null;

  const [loadingVariations, setLoadingVariations] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<{ original: string, optimized: string, rationale: string } | null>(null);
  
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);

  // NEW: Model Selection State (Default: Gemini 3 Pro)
  const [selectedModel, setSelectedModel] = useState<'gemini-3-pro-preview' | 'gemini-2.0-flash'>('gemini-3-pro-preview');

  // Negative Keyword Custom Input State
  const [customKeyword, setCustomKeyword] = useState('');
  // Custom Presets State
  const [customPresets, setCustomPresets] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('suno_lyric_custom_negative_presets');
    if (saved) {
        try {
            setCustomPresets(JSON.parse(saved));
        } catch (e) {
            console.error("Failed to load custom presets", e);
        }
    }
  }, []);

  const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentExcluded = project.excludedThemes 
    ? project.excludedThemes.split(',').map(s => s.trim()).filter(s => s !== '') 
    : [];

  const addExcludedKeyword = (keyword: string) => {
      const trimmed = keyword.trim();
      if (!trimmed || currentExcluded.includes(trimmed)) return;
      const newList = [...currentExcluded, trimmed];
      onUpdate({ excludedThemes: newList.join(', ') });
      setCustomKeyword('');
  };

  const removeExcludedKeyword = (keyword: string) => {
      const newList = currentExcluded.filter(k => k !== keyword);
      onUpdate({ excludedThemes: newList.join(', ') });
  };

  const handleSaveCustomPreset = () => {
      const trimmed = customKeyword.trim();
      if (!trimmed) return;
      
      if (EXCLUDED_KEYWORDS_PRESETS.includes(trimmed) || customPresets.includes(trimmed)) {
          alert('이미 존재하는 프리셋입니다.');
          return;
      }
      
      const updated = [...customPresets, trimmed];
      setCustomPresets(updated);
      localStorage.setItem('suno_lyric_custom_negative_presets', JSON.stringify(updated));
      setCustomKeyword(''); // Clear input after saving
  };

  const handleDeleteCustomPreset = (e: React.MouseEvent, keyword: string) => {
      e.stopPropagation();
      e.preventDefault();
      
      const updated = customPresets.filter(k => k !== keyword);
      setCustomPresets(updated);
      localStorage.setItem('suno_lyric_custom_negative_presets', JSON.stringify(updated));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
          e.preventDefault();
          addExcludedKeyword(customKeyword);
      }
  };

  const generateLyrics = async () => {
    setLoading(true);
    try {
        const structureText = project.structure.map((s: SongBlock) => `[${s.type}]: ${s.description}`).join('\n');
        const formattedDuration = formatTime(lyricDurationSeconds);

        let introInstruction = '';
        if (project.introStyle) {
            const style = INTRO_STYLES.find(s => s.id === project.introStyle);
            if (style) {
                introInstruction = `
                SPECIAL INTRO INSTRUCTION:
                The user has selected the intro vibe: "${style.label}".
                ${style.desc}
                Please indicate this vibe in the [Intro] section of the lyrics (e.g., [Intro: Whisper Narration] or [Intro: Gayageum Solo]).
                `;
            }
        }

        let danceModeInstruction = '';
        if (isDanceMode) {
            danceModeInstruction = `
            
            *** STRICT DANCE LYRIC MODE ACTIVATED ***
            OBJECTIVE: Generate lyrics strictly optimized for choreography and dancers (8-count structure).

            1. SYLLABLE COUNT & DISPLAY:
               - You MUST display the syllable count at the end of EVERY line in parentheses. 
                 Format: "Lyric text here (count)"
               - DANCE PRESET: Target consistent 8 syllables per line for choreo synchronization.
               - Maintain consistent syllable counts within each 4-line block.

            2. 8-COUNT STRUCTURE (VISUAL):
               - Group lyrics strictly into 4-line blocks (representing one 8-count phrase).
               - Add an empty line between every 4-line block.
               - This is critical for dancers to count the beat.

            3. CONTENT & RHYTHM:
               - Use [Strict Rhythm] (Jeong-bak).
               - Add [Breath] or pause implied at the end of lines.
               - Avoid complex sentences or rubato.
               - Simple, clear words that hit the beat.
            `;
        }

        const referenceInfo = project.referenceSongTitle
            ? `Reference Vibe/Flow: Make the lyrics and rhythm reminiscent of the song "${project.referenceSongTitle}" by ${project.referenceArtist || 'Unknown Artist'}. Capture its emotional tone and rhythmic delivery.`
            : '';

        const prompt = `
          Write lyrics for a ${project.genre} song titled "${project.title}".
          Mood: ${project.mood}.
          Style Description: ${project.styleDescription || 'Standard style'}.
          BPM: ${project.bpm || 95}
          Language Preference: ${language}.
          Target Duration: Approximately ${formattedDuration}.
          
          CRITICAL: Follow this Structure strictly in this exact order:
          ${structureText}

          Negative Constraints (DO NOT INCLUDE): ${project.excludedThemes || 'None'}.
          
          ${danceModeInstruction}
          
          ${introInstruction}
          ${referenceInfo}

          Instructions:
          - Reflect the "Style Description" in the choice of words and emotional tone.
          ${autoAdjustLength ? `- Target Duration is ${formattedDuration}. STRICTLY Adjust the number of lines and stanza length accordingly to match the duration.` : `- Target Duration is ${formattedDuration}.`}
          - Output MUST strictly match the defined structure blocks. Generate lyrics for EVERY block in the list.
          - Output format: Include the structure tags (e.g., [Verse 1]) before the lyrics for each block.
          - Do NOT include metadata headers (Title, BPM, Mood, etc.) in the output. Start directly with the first section tag.
          
          CRITICAL: DANCEABILITY & RHYTHM (Jeong-bak / 정박):
          - The song must have a comfortable, unchanging, steady beat suitable for social dancing.
          - Lyrics must match this steady rhythm perfectly (On-Beat). 
          - avoid complex syncopation, rubato, or wordy poetic lines that disrupt the groove.
          
          ${project.djName ? `- IMPORTANT: Include a shoutout to "${project.djName}" in EITHER the [Intro] OR the [Outro]. Choose ONE location only. Do NOT repeat it.` : ''}
        `;

        // NEW: Conditional Config based on selected model
        const modelConfig: any = {};
        // Apply thinking config only for Pro model as Flash doesn't support it or doesn't need it
        if (selectedModel === 'gemini-3-pro-preview') {
            modelConfig.thinkingConfig = { thinkingBudget: 2048 };
        }

        const response: any = await getGenAI().models.generateContent({
            model: selectedModel, // NEW: Use selected model variable
            contents: prompt,
            config: modelConfig // NEW: Apply config
        });
        
        onUpdate({ lyrics: response.text });
    } catch (e) {
        alert('Failed to generate lyrics');
    }
    setLoading(false);
  };

  // --- UPDATED: Lyric Optimization Logic with Modal ---
  const optimizeLyrics = async () => {
    if (!project.lyrics) return;
    setIsOptimizing(true);
    try {
        const prompt = `
            Act as a professional Lyrics Editor for AI Music Generation (Suno.ai).
            Analyze the following lyrics and provide an optimized version with corrected structure tags and formatting.

            Input Lyrics:
            """
            ${project.lyrics}
            """

            Tasks:
            1. Analyze the current structure and identify issues (e.g., missing tags, repetitive lines, unclear sections, bracket errors).
            2. Create a "Rationale" (in Korean language) explaining what was fixed and why (e.g., "Standardized tags", "Removed non-lyrical metadata", "Added structure clear markers").
            3. Generate the "Optimized Lyrics" with:
               - Clear section tags on their own lines (e.g., [Verse 1], [Chorus], [Bridge]).
               - Exactly 1 empty line between sections.
               - No metadata headers (Title, BPM, etc.) at the top.
               - Ad-libs wrapped in parentheses.
            
            Return ONLY a JSON object.
        `;

        const response: any = await getGenAI().models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        rationale: { type: Type.STRING, description: "Analysis report in Korean" },
                        optimizedLyrics: { type: Type.STRING, description: "The full corrected lyrics text" }
                    },
                    required: ['rationale', 'optimizedLyrics']
                }
            }
        });

        const data = JSON.parse(response.text);
        
        if (data.optimizedLyrics) {
             setOptimizationResult({
                 original: project.lyrics,
                 optimized: data.optimizedLyrics,
                 rationale: data.rationale || "자동 교정이 완료되었습니다."
             });
        }
    } catch (e) {
        alert('Optimization failed. Please check your connection.');
        console.error(e);
    }
    setIsOptimizing(false);
  };

  const handleApplyOptimization = () => {
      if (optimizationResult) {
          onUpdate({ lyrics: optimizationResult.optimized });
          setOptimizationResult(null);
      }
  };

  const generateVariations = async () => {
      setLoadingVariations(true);
      try {
          const structureText = project.structure.map((s: SongBlock) => `[${s.type}]: ${s.description}`).join('\n');
          const prompt = `
            Generate 5 distinct and creative lyric concepts for a ${project.genre} song.
            Topic: ${project.concept || 'Freestyle'}
            Mood: ${project.mood}
            Style: ${project.styleDescription || 'Standard'}
            
            CRITICAL: Follow this Structure strictly in this exact order for all 5 variations:
            ${structureText}
            
            Requirements:
            1. Create 5 different versions (e.g., Emotional, Rhythmic, Story-telling, Minimal, Energetic).
            2. For each version, provide:
               - "title": A catchy title.
               - "rationale": A brief description (in Korean) of the style/vibe.
               - "lyrics": The full lyrics structured with tags like [Verse], [Chorus]. Do NOT include BPM or Metadata headers.
            3. Ensure lyrics are suitable for Suno.ai (musical generation).
            4. CRITICAL: Every version MUST include lyrics for EACH block defined in the structure in the exact order provided. Do not skip blocks or change their order.
            
            Return ONLY a JSON array of 5 objects.
            Schema: [{ title: string, rationale: string, lyrics: string }]
          `;

          const response: any = await getGenAI().models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING },
                            rationale: { type: Type.STRING },
                            lyrics: { type: Type.STRING }
                        },
                        required: ['title', 'rationale', 'lyrics']
                    }
                }
            }
        });
        
        const data = JSON.parse(response.text || '[]');
        // Save variations to project
        onUpdate({ lyricVariations: data, selectedLyricVariationIndex: null });
        setFocusedCardIndex(null); // Reset focus
      } catch (e) {
          console.error(e);
          alert('Failed to generate variations.');
      }
      setLoadingVariations(false);
  };

  const copyToClipboard = () => {
    if (!project.lyrics) return;
    navigator.clipboard.writeText(project.lyrics);
    alert('Lyrics Copied!');
  };

  const applyVariation = (v: any, index: number) => {
      if (confirm('이 가사를 에디터에 적용하시겠습니까? (기존 내용은 덮어씌워집니다)')) {
          onUpdate({ lyrics: v.lyrics, selectedLyricVariationIndex: index });
      }
  };

  const titleColor = legibilityMode ? '#FFFFFF' : 'white';
  const labelColor = legibilityMode ? '#F9FAF8' : '#9ca3af';

  return (
    <div className="lyrics-view" style={{ width: '100%', height: 'calc(100vh - 150px)', display: 'grid', gridTemplateColumns: '320px 360px 1fr', gap: '20px', minHeight: '600px' }}>
      
      {/* Optimization Modal */}
      {optimizationResult && (
          <LyricOptimizationModal 
            original={optimizationResult.original}
            optimized={optimizationResult.optimized}
            rationale={optimizationResult.rationale}
            onClose={() => setOptimizationResult(null)}
            onApply={handleApplyOptimization}
          />
      )}

      {/* PRO Alert Modal (Generate Variations) */}
      {showProAlert && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }} onClick={() => setShowProAlert(false)}>
            <div style={{ backgroundColor: '#1f2937', padding: '40px', borderRadius: '20px', border: '1px solid #374151', width: '360px', textAlign: 'center', maxWidth: '90vw', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }} onClick={e => e.stopPropagation()}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(251, 191, 36, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#fbbf24' }}>lock</span>
                </div>
                <h3 style={{ margin: '0 0 10px 0', color: 'white', fontSize: '20px', fontWeight: 'bold' }}>PRO 버전 기능</h3>
                <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '25px', lineHeight: '1.6' }}>
                    가사 아이디어 5가지 버전 생성은<br/>
                    <strong style={{color: '#fbbf24'}}>PRO 버전</strong>에서만 가능합니다.<br/>
                    (This feature is available in PRO version)
                </p>
                <button onClick={() => setShowProAlert(false)} style={{ width: '100%', padding: '12px 0', backgroundColor: '#e11d48', color: 'white', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                    확인 (OK)
                </button>
            </div>
        </div>
      )}

      {/* Column 1: Settings */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', paddingRight: '10px' }}>
         <h2 style={{ fontSize: '20px', borderBottom: '1px solid #374151', paddingBottom: '15px', margin: 0, display:'flex', alignItems:'center', gap:'10px', color: titleColor, fontWeight: legibilityMode ? 'bold' : 'normal' }}>
            <span className="material-symbols-outlined" style={{ color: '#fbbf24' }}>tune</span> 설정 (Settings)
         </h2>

         {/* Info Box */}
         <div style={{ backgroundColor: '#111827', padding: '15px', borderRadius: '8px', border: '1px solid #374151' }}>
             <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: labelColor }}>현재 스타일</p>
             <p style={{ margin: 0, fontWeight: 'bold', color: '#e11d48', fontSize: '13px', lineHeight: '1.4' }}>
                {project.styleDescription || '설정된 스타일 없음'}
             </p>
             {project.introStyle && (
                    <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#fbbf24' }}>
                        + Intro: {INTRO_STYLES.find(s => s.id === project.introStyle)?.label}
                    </p>
            )}
            {project.referenceSongTitle && (
                <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#818cf8' }}>
                    + Reference: {project.referenceSongTitle} ({project.referenceArtist})
                </p>
            )}
         </div>

         {/* Controls */}
         <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
             <div>
                <label style={{ display: 'block', fontSize: '13px', color: labelColor, marginBottom: '5px' }}>언어 (Language)</label>
                <select 
                    value={language} 
                    onChange={e => onUpdate({ lyricLanguage: e.target.value })}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#374151', color: 'white', border: 'none', borderRadius: '6px', fontSize: '13px' }}
                >
                    <option>Korean & English Mix</option>
                    <option>Korean Only</option>
                    <option>English Only</option>
                    <option>Japanese & English Mix</option>
                    <option>Japanese Only</option>
                    <option>Spanish & English (Latin)</option>
                </select>
            </div>
            
            {/* Range Slider for Duration */}
            <div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label style={{ fontSize: '13px', color: labelColor }}>길이 (Duration)</label>
                    <span style={{ fontSize: '13px', color: '#fbbf24', fontWeight: 'bold', backgroundColor: 'rgba(251, 191, 36, 0.1)', padding: '2px 8px', borderRadius: '12px' }}>
                        {formatTime(lyricDurationSeconds)}
                    </span>
                 </div>
                 <div style={{ padding: '10px', backgroundColor: '#374151', borderRadius: '6px' }}>
                    <input 
                        type="range" 
                        min="120" 
                        max="300" 
                        step="30" 
                        value={lyricDurationSeconds}
                        onChange={(e) => onUpdate({ lyricDuration: parseInt(e.target.value) })}
                        style={{ width: '100%', cursor: 'pointer', accentColor: '#e11d48', height: '6px' }} 
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#9ca3af', marginTop: '5px' }}>
                        <span>2:00</span>
                        <span>3:00</span>
                        <span>4:00</span>
                        <span>5:00</span>
                    </div>
                 </div>
            </div>
            
            {/* Toggles */}
            <div 
                onClick={() => onUpdate({ lyricDanceMode: !isDanceMode })}
                style={{ padding: '12px', backgroundColor: '#1f2937', borderRadius: '8px', border: isDanceMode ? '1px solid #10b981' : '1px solid #374151', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: isDanceMode ? '#10b981' : (legibilityMode ? '#FFFFFF' : '#f9fafb') }}>Dance Mode (8-count)</div>
                <div style={{ width: '36px', height: '20px', backgroundColor: isDanceMode ? '#10b981' : '#4b5563', borderRadius: '10px', position: 'relative' }}>
                    <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: isDanceMode ? '18px' : '2px', transition: 'left 0.2s' }} />
                </div>
            </div>

            <div 
                onClick={() => onUpdate({ lyricAutoAdjust: !autoAdjustLength })}
                style={{ padding: '12px', backgroundColor: '#1f2937', borderRadius: '8px', border: autoAdjustLength ? '1px solid #fbbf24' : '1px solid #374151', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: autoAdjustLength ? '#fbbf24' : (legibilityMode ? '#FFFFFF' : '#f9fafb') }}>Auto-Length Adjust</div>
                 <div style={{ width: '36px', height: '20px', backgroundColor: autoAdjustLength ? '#fbbf24' : '#4b5563', borderRadius: '10px', position: 'relative' }}>
                    <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: autoAdjustLength ? '18px' : '2px', transition: 'left 0.2s' }} />
                </div>
            </div>

             <div>
                <label style={{ display: 'block', fontSize: '13px', color: labelColor, marginBottom: '5px' }}>제외 키워드 (Negative Constraints)</label>
                
                {/* Active Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px', padding: '8px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '6px', minHeight: '32px' }}>
                    {currentExcluded.length === 0 && <span style={{ fontSize: '12px', color: '#6b7280', padding: '4px' }}>제외할 키워드가 없습니다.</span>}
                    {currentExcluded.map((kw, idx) => (
                        <span key={idx} style={{ 
                            fontSize: '12px', padding: '4px 8px', borderRadius: '12px', 
                            backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.4)',
                            display: 'flex', alignItems: 'center', gap: '4px'
                        }}>
                            {kw}
                            <button 
                                onClick={() => removeExcludedKeyword(kw)}
                                style={{ background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer', padding: 0, fontSize: '14px', lineHeight: 1, display: 'flex', alignItems: 'center' }}
                            >×</button>
                        </span>
                    ))}
                </div>

                {/* Input */}
                <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                    <input 
                        type="text" 
                        value={customKeyword}
                        onChange={e => setCustomKeyword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="키워드 입력 (예: drums)..."
                        style={{ flex: 1, padding: '8px', backgroundColor: '#374151', border: '1px solid #4b5563', borderRadius: '6px', color: 'white', fontSize: '13px' }}
                    />
                    <button 
                        onClick={() => addExcludedKeyword(customKeyword)}
                        style={{ padding: '8px 12px', backgroundColor: '#374151', color: legibilityMode ? '#FFFFFF' : '#d1d5db', border: '1px solid #4b5563', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
                    >
                        추가
                    </button>
                    <button 
                        onClick={handleSaveCustomPreset}
                        title="입력한 단어를 나만의 프리셋으로 저장"
                        style={{ padding: '8px 12px', backgroundColor: '#1f2937', color: '#10b981', border: '1px solid #10b981', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                        💾 Save
                    </button>
                </div>

                {/* Presets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {/* Default Presets */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {EXCLUDED_KEYWORDS_PRESETS.map((preset, idx) => (
                            <button 
                                key={idx}
                                onClick={() => currentExcluded.includes(preset) ? removeExcludedKeyword(preset) : addExcludedKeyword(preset)}
                                style={{ 
                                    fontSize: '11px', padding: '3px 8px', borderRadius: '10px', 
                                    border: currentExcluded.includes(preset) ? '1px solid #ef4444' : '1px solid #4b5563', 
                                    backgroundColor: currentExcluded.includes(preset) ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                                    color: currentExcluded.includes(preset) ? '#ef4444' : (legibilityMode ? '#9ca3af' : '#6b7280'),
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {currentExcluded.includes(preset) ? '-' : '+'} {preset}
                            </button>
                        ))}
                    </div>

                    {/* Custom Presets */}
                    {customPresets.length > 0 && (
                        <div style={{ borderTop: '1px dashed #4b5563', paddingTop: '8px', marginTop: '4px' }}>
                            <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '5px' }}>나의 프리셋 (My Presets)</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                {customPresets.map((preset, idx) => (
                                    <div key={preset} style={{ display: 'inline-flex', alignItems: 'center' }}>
                                        <button 
                                            onClick={() => currentExcluded.includes(preset) ? removeExcludedKeyword(preset) : addExcludedKeyword(preset)}
                                            style={{ 
                                                fontSize: '11px', padding: '3px 6px 3px 8px', borderRadius: '10px 0 0 10px', 
                                                border: currentExcluded.includes(preset) ? '1px solid #ef4444' : '1px solid #10b981', 
                                                backgroundColor: currentExcluded.includes(preset) ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                                color: currentExcluded.includes(preset) ? '#ef4444' : '#10b981',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                borderRight: 'none'
                                            }}
                                        >
                                            {currentExcluded.includes(preset) ? '-' : '+'} {preset}
                                        </button>
                                        <button
                                            onClick={(e) => handleDeleteCustomPreset(e, preset)}
                                            style={{
                                                fontSize: '11px', padding: '3px 6px', borderRadius: '0 10px 10px 0',
                                                border: currentExcluded.includes(preset) ? '1px solid #ef4444' : '1px solid #10b981',
                                                borderLeft: '1px solid rgba(255,255,255,0.1)',
                                                backgroundColor: currentExcluded.includes(preset) ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                                color: currentExcluded.includes(preset) ? '#ef4444' : '#10b981',
                                                cursor: 'pointer'
                                            }}
                                            title="프리셋 삭제"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div style={{ marginTop: '10px', paddingTop: '10px', fontSize: '13px', color: labelColor, borderTop: '1px solid #374151' }}>
                <span>BPM: {project.bpm} ({project.bpm >= 105 ? 'Fast' : 'Slow'})</span>
            </div>
         </div>

         {/* NEW: Model Selection UI */}
         <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: labelColor, marginBottom: '8px' }}>모델 선택 (AI Model)</label>
            <div style={{ display: 'flex', gap: '8px' }}>
                <button
                    onClick={() => setSelectedModel('gemini-3-pro-preview')}
                    style={{
                        flex: 1, padding: '10px', borderRadius: '6px',
                        border: selectedModel === 'gemini-3-pro-preview' ? '1px solid #e11d48' : '1px solid #4b5563',
                        backgroundColor: selectedModel === 'gemini-3-pro-preview' ? 'rgba(225, 29, 72, 0.15)' : '#1f2937',
                        color: selectedModel === 'gemini-3-pro-preview' ? '#e11d48' : '#9ca3af',
                        fontSize: '12px', cursor: 'pointer', fontWeight: 'bold',
                        transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px'
                    }}
                >
                    Gemini 3 Pro
                    <span style={{ fontSize: '10px', fontWeight: 'normal', opacity: 0.8 }}>Reasoning (High Quality)</span>
                </button>
                <button
                    onClick={() => setSelectedModel('gemini-2.0-flash')}
                    style={{
                        flex: 1, padding: '10px', borderRadius: '6px',
                        border: selectedModel === 'gemini-2.0-flash' ? '1px solid #fbbf24' : '1px solid #4b5563',
                        backgroundColor: selectedModel === 'gemini-2.0-flash' ? 'rgba(251, 191, 36, 0.15)' : '#1f2937',
                        color: selectedModel === 'gemini-2.0-flash' ? '#fbbf24' : '#9ca3af',
                        fontSize: '12px', cursor: 'pointer', fontWeight: 'bold',
                        transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px'
                    }}
                >
                    Gemini 2.0 Flash
                    <span style={{ fontSize: '10px', fontWeight: 'normal', opacity: 0.8 }}>Fast (Stable)</span>
                </button>
            </div>
         </div>

         <button 
            onClick={generateLyrics}
            disabled={loading}
            style={{ 
                width: '100%', padding: '15px', backgroundColor: loading ? '#4b5563' : '#e11d48', 
                color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: loading ? 'wait' : 'pointer',
                marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}
         >
            {loading ? 'Thinking...' : <><span className="material-symbols-outlined">auto_awesome</span> 현재 설정으로 생성</>}
         </button>
      </div>

      {/* Column 2: Variations */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', borderLeft: '1px solid #374151', borderRight: '1px solid #374151', padding: '0 20px', overflowY: 'auto' }}>
         <h2 style={{ fontSize: '20px', borderBottom: '1px solid #374151', paddingBottom: '15px', margin: 0, color: '#3b82f6', display:'flex', alignItems:'center', gap:'10px', fontWeight: legibilityMode ? 'bold' : 'normal' }}>
             <span className="material-symbols-outlined">lightbulb</span> 아이디어 (5 Variations)
         </h2>
         
         <div style={{ backgroundColor: '#1e3a8a', borderRadius: '8px', padding: '15px' }}>
             <p style={{ fontSize: '12px', color: '#bfdbfe', margin: '0 0 10px 0' }}>
                 주제와 무드에 맞는 5가지 다른 스타일의 가사를 제안받아보세요. (설정한 구조가 반영됩니다)
             </p>
             <button 
                onClick={() => setShowProAlert(true)}
                style={{ 
                    width: '100%', padding: '10px', backgroundColor: '#3b82f6', color: 'white', 
                    border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                    opacity: 0.9
                }}
             >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>lock</span>
                ✨ 5가지 버전 생성하기 (PRO)
             </button>
         </div>

         <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
             {variations.length > 0 ? variations.map((v: any, i: number) => {
                 const isApplied = selectedVariationIndex === i;
                 const isSelected = focusedCardIndex === i;

                 let borderColor = '#4b5563';
                 let bgColor = '#1f2937';
                 let boxShadow = 'none';
                 let transform = 'scale(1)';

                 if (isApplied) {
                    borderColor = '#34d399';
                    bgColor = 'rgba(6, 78, 59, 0.4)';
                    boxShadow = '0 0 20px rgba(16, 185, 129, 0.2)';
                    transform = 'scale(1.02)';
                 }
                 
                 if (isSelected) {
                     borderColor = '#3b82f6';
                     if (!isApplied) {
                        bgColor = 'rgba(59, 130, 246, 0.15)';
                        transform = 'scale(1.02)';
                     }
                 }

                 return (
                     <div key={i} 
                         onClick={() => setFocusedCardIndex(i)}
                         style={{ 
                         backgroundColor: bgColor, 
                         borderRadius: '8px', 
                         border: `2px solid ${borderColor}`,
                         padding: '15px', 
                         display: 'flex', 
                         flexDirection: 'column', 
                         gap: '8px',
                         transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                         boxShadow: boxShadow,
                         transform: transform,
                         cursor: 'pointer'
                     }}>
                         <div style={{ fontWeight: 'bold', color: isApplied ? '#34d399' : (isSelected ? '#60a5fa' : '#fbbf24'), fontSize: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>{i+1}. {v.title}</span>
                            {isApplied && <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#34d399' }}>check_circle</span>}
                         </div>
                         <div style={{ fontSize: '12px', color: isApplied ? '#d1fae5' : (legibilityMode ? '#E5E7EB' : '#9ca3af'), lineHeight: '1.4' }}>{v.rationale}</div>
                         <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                applyVariation(v, i);
                            }}
                            style={{ 
                                marginTop: '5px', 
                                padding: '10px', 
                                backgroundColor: isApplied ? '#10b981' : '#374151', 
                                border: 'none', 
                                borderRadius: '6px', 
                                color: 'white', 
                                fontSize: '13px', 
                                cursor: 'pointer', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                gap: '8px',
                                fontWeight: isApplied ? 'bold' : '500',
                                transition: 'all 0.2s',
                                boxShadow: isApplied ? '0 4px 6px rgba(0,0,0,0.2)' : 'none'
                            }}
                         >
                            {isApplied ? (
                                <><span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check</span> 적용됨 (Applied)</>
                            ) : (
                                <><span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span> 에디터로 적용</>
                            )}
                         </button>
                     </div>
                 );
             }) : (
                 <div style={{ textAlign: 'center', padding: '30px', color: '#4b5563' }}>
                     <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>library_music</span>
                     <p style={{ fontSize: '13px' }}>생성된 아이디어가 없습니다.</p>
                 </div>
             )}
         </div>
      </div>

      {/* Column 3: Editor */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #374151', paddingBottom: '15px', height: '41px' }}>
             <h2 style={{ fontSize: '20px', margin: 0, color: '#e11d48', display:'flex', alignItems:'center', gap:'10px', fontWeight: legibilityMode ? 'bold' : 'normal' }}>
                <span className="material-symbols-outlined">edit_note</span> 에디터 (Editor)
             </h2>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                 <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>
                    {(project.lyrics || '').length}자
                 </span>
                 {/* NEW: Optimize Button */}
                 <button
                    onClick={optimizeLyrics}
                    disabled={!project.lyrics || isOptimizing}
                    style={{
                       padding: '6px 12px', backgroundColor: '#3b82f6',
                       color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer',
                       fontWeight: 'bold', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px'
                    }}
                    title="가사 구조 및 태그 최적화"
                 >
                   {isOptimizing ? <span className="material-symbols-outlined" style={{animation: 'spin 1s linear infinite'}}>sync</span> : <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>build</span>}
                   최적화
                 </button>
                 <button
                     onClick={copyToClipboard}
                     disabled={!project.lyrics}
                     style={{
                        padding: '6px 12px', backgroundColor: '#374151',
                        color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer',
                        fontWeight: 'bold', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px'
                     }}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>content_copy</span> 복사
                </button>
            </div>
         </div>
         
         <textarea 
            value={project.lyrics || ''}
            onChange={e => onUpdate({ lyrics: e.target.value })}
            placeholder="AI가 생성한 가사가 이곳에 표시됩니다. 직접 수정할 수도 있습니다."
            style={{ 
                flex: 1, padding: '20px', borderRadius: '8px', backgroundColor: '#111827', 
                border: '1px solid #374151', color: '#e5e7eb', resize: 'none', lineHeight: '1.6', fontFamily: 'monospace',
                fontSize: '14px'
            }}
        />
      </div>
    </div>
  );
};

export default LyricsTab;
