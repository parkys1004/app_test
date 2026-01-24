
import React, { useState, useEffect } from 'react';
import { getGenAI, getApiAspectRatio } from './utils';
import { Project } from './types';
import { ART_STYLES, IMAGE_SIZE_PRESETS, FONT_OPTIONS, TEXT_EFFECT_OPTIONS, CHARACTER_SAMPLES, DEFAULT_ARTISTS } from './constants';

// --- TAB: Art ---
const ArtTab = ({ project, onUpdate, legibilityMode }: { project: Project, onUpdate: (u: Partial<Project>) => void, legibilityMode: boolean }) => {
    const [loading, setLoading] = useState(false);
    const [size, setSize] = useState<'1K'|'2K'|'4K'>('1K');
    const [modelType, setModelType] = useState<'flash' | 'pro'>('flash');
    const [selectedSizePreset, setSelectedSizePreset] = useState(0);
    
    // 1. 노래 정보
    const [artTitle, setArtTitle] = useState(project.title || '');
    const [artistName, setArtistName] = useState(project.djName || '');
    const [artistSamples, setArtistSamples] = useState<string[]>([]);

    // 2. 비주얼 컨셉
    const [visualMood, setVisualMood] = useState(project.mood || 'Atmospheric');
    const [visualStyle, setVisualStyle] = useState('Digital Art');
    const [characters, setCharacters] = useState('');
    const [artDescription, setArtDescription] = useState('');

    // 3. 텍스트 디자인 (고급)
    const [fontType, setFontType] = useState(FONT_OPTIONS[0].value);
    const [textEffect, setTextEffect] = useState(TEXT_EFFECT_OPTIONS[0].id);
    const [textColor, setTextColor] = useState('#ffffff');
    const [textOverlay, setTextOverlay] = useState({ x: 50, y: 90, size: 40, opacity: 100 });

    // Generation Mode
    const [generationMode, setGenerationMode] = useState<'AI' | 'PROMPT_ONLY' | 'MOCK'>('AI');
    const [generatedPrompt, setGeneratedPrompt] = useState('');

    // Init Sample Artists
    useEffect(() => {
        const saved = localStorage.getItem('suno_art_artists');
        setArtistSamples(saved ? JSON.parse(saved) : DEFAULT_ARTISTS);
    }, []);

    const saveArtists = (list: string[]) => {
        setArtistSamples(list);
        localStorage.setItem('suno_art_artists', JSON.stringify(list));
    };

    const addArtistSample = () => {
        if (artistName && !artistSamples.includes(artistName)) {
            saveArtists([...artistSamples, artistName]);
        }
    };

    const removeArtistSample = (name: string, e: React.MouseEvent) => {
        e.stopPropagation();
        saveArtists(artistSamples.filter(a => a !== name));
    };

    // Sync title initially if empty, but allow divergence
    useEffect(() => {
        if (!artTitle && project.title) setArtTitle(project.title);
    }, [project.title]);

    const handleDownload = () => {
        if (!project.coverImage) return;

        // --- Synthetic Rendering for Download (Canvas Based) ---
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // 1. Draw Background
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // 2. Configure Text Styles
            const currentEffect = TEXT_EFFECT_OPTIONS.find(e => e.id === textEffect);
            const style = currentEffect?.style || {};
            
            // Text Color
            ctx.fillStyle = (style as any).color || textColor;
            
            // Position calc (relative to canvas size)
            const posX = (textOverlay.x / 100) * canvas.width;
            const posY = (textOverlay.y / 100) * canvas.height;
            
            // Adjust Font Size (scale based on canvas vs preview UI)
            // Assuming UI preview max width is roughly 600px
            const scaleFactor = canvas.width / 600; 
            const scaledSize = textOverlay.size * scaleFactor;
            
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Apply Shadow Effect if present
            if ((style as any).textShadow) {
                const shadow = (style as any).textShadow as string;
                // Parse "2px 2px 4px rgba(0,0,0,0.5)"
                const parts = shadow.split(',')[0].trim().split(' ');
                ctx.shadowBlur = parseFloat(parts[2] || '0');
                ctx.shadowOffsetX = parseFloat(parts[0] || '0');
                ctx.shadowOffsetY = parseFloat(parts[1] || '0');
                ctx.shadowColor = shadow.includes('rgba') ? shadow.substring(shadow.indexOf('rgba')) : 'rgba(0,0,0,0.5)';
            }

            // Apply Outline Effect if present
            if ((style as any).WebkitTextStroke) {
                const stroke = (style as any).WebkitTextStroke as string;
                const parts = stroke.split(' ');
                ctx.strokeStyle = parts[1] || 'black';
                ctx.lineWidth = (parseFloat(parts[0]) || 1) * scaleFactor * 2;
            }

            // A. Draw Title
            ctx.font = `bold ${scaledSize}px ${fontType}`;
            if ((style as any).WebkitTextStroke) ctx.strokeText(artTitle, posX, posY);
            ctx.fillText(artTitle, posX, posY);

            // B. Draw Artist (below title)
            const artistSize = scaledSize * 0.5;
            ctx.font = `${artistSize}px ${fontType}`;
            ctx.shadowBlur = 0; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0; // Clear shadow for subtext unless desired
            ctx.fillText(artistName, posX, posY + (scaledSize * 0.7));

            // 3. Finalize Download
            const dataUrl = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `${project.title.replace(/\s+/g, '_') || 'album_cover'}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        img.src = project.coverImage;
    };

    const generateCoverArt = async () => {
        setLoading(true);
        setGeneratedPrompt('');

        const sizePreset = IMAGE_SIZE_PRESETS[selectedSizePreset];
        let promptAddon = '';
        if (sizePreset.id === 5) promptAddon = 'Composition framed for 4:5 aspect ratio.';
        if (sizePreset.id === 6) promptAddon = 'Wide composition suitable for 1.91:1 link preview.';
        if (sizePreset.id === 7) promptAddon = 'Cinematic 21:9 aspect ratio composition.';
        if (sizePreset.id === 8) promptAddon = 'Tall 1:2 aspect ratio vertical composition.';
        if (sizePreset.id === 9) promptAddon = 'Circular vignette composition centered.';

        const prompt = `
        Album cover art for a song.
        
        [Song Info]
        Genre: ${project.genre}
        
        [Visual Concept]
        Mood: ${visualMood}
        Style: ${visualStyle}
        Subject/Characters: ${characters}
        Detailed Description: ${artDescription || 'A creative and atmospheric composition representing the music.'}
        
        Instructions:
        - High quality, creative composition.
        - Target Ratio: ${sizePreset.label} (${sizePreset.ratio})
        ${promptAddon}
        - Do NOT add text if possible, as it will be added as an overlay.
        `.trim();

        try {
            if (generationMode === 'AI') {
                const modelName = modelType === 'pro' ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';
                const imageConfig: any = { aspectRatio: getApiAspectRatio(sizePreset.ratio) };
                if (modelType === 'pro') {
                    imageConfig.imageSize = size;
                }

                const response: any = await getGenAI().models.generateContent({
                    model: modelName,
                    contents: {
                       parts: [{ text: prompt }]
                    },
                    config: {
                        imageConfig: imageConfig
                    }
                });

                let imageUrl = '';
                if (response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
                    for (const part of response.candidates[0].content.parts) {
                        if (part.inlineData) {
                            const base64EncodeString = part.inlineData.data;
                            imageUrl = `data:image/png;base64,${base64EncodeString}`;
                            break;
                        }
                    }
                }
                
                if (imageUrl) {
                    onUpdate({ coverImage: imageUrl });
                } else {
                    alert('No image generated.');
                }

            } else if (generationMode === 'PROMPT_ONLY') {
                setGeneratedPrompt(prompt);
            } else if (generationMode === 'MOCK') {
                // Mock Generation using Canvas
                const canvas = document.createElement('canvas');
                let width = 1024;
                let height = 1024;
                if (sizePreset.ratio === '16:9') { height = 576; }
                else if (sizePreset.ratio === '9:16') { width = 576; }
                else if (sizePreset.ratio === '4:3') { height = 768; }
                else if (sizePreset.ratio === '3:4') { width = 768; }
                
                canvas.width = width;
                canvas.height = height;
                
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    const gradient = ctx.createLinearGradient(0, 0, width, height);
                    gradient.addColorStop(0, '#1f2937');
                    gradient.addColorStop(1, '#111827');
                    if (visualMood.includes('Happy') || visualMood.includes('Party')) {
                        gradient.addColorStop(0.5, '#f59e0b');
                    } else if (visualMood.includes('Romantic') || visualMood.includes('Sexy')) {
                        gradient.addColorStop(0.5, '#e11d48');
                    } else if (visualMood.includes('Sad') || visualMood.includes('Chill')) {
                        gradient.addColorStop(0.5, '#3b82f6');
                    }
                    ctx.fillStyle = gradient;
                    ctx.fillRect(0, 0, width, height);
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
                    ctx.beginPath();
                    ctx.arc(width/2, height/2, width/3, 0, 2 * Math.PI);
                    ctx.fill();
                    onUpdate({ coverImage: canvas.toDataURL() });
                }
            }
        } catch (e) {
            console.error(e);
            alert('Image generation failed.');
        }
        setLoading(false);
    };

    const currentRatioConfig = IMAGE_SIZE_PRESETS[selectedSizePreset];
    const previewAspectRatio = currentRatioConfig.ratio.replace(':', '/');
    const currentEffectStyle = TEXT_EFFECT_OPTIONS.find(e => e.id === textEffect)?.style || {};
    const titleColor = legibilityMode ? '#FFFFFF' : '#fbbf24';
    const labelColor = legibilityMode ? '#F9FAF8' : '#9ca3af';

    return (
        <div className="responsive-grid-3" style={{ width: '100%', height: 'calc(100vh - 150px)', display: 'grid', gridTemplateColumns: '320px 320px 1fr', gap: '20px', minHeight: '600px' }}>
            
            {/* Column 1: Concept */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', paddingRight: '10px', borderRight: '1px solid #374151' }}>
                 <h2 style={{ fontSize: '18px', borderBottom: '1px solid #374151', paddingBottom: '15px', margin: 0, color: titleColor, display: 'flex', alignItems: 'center', gap: '10px', fontWeight: legibilityMode ? 'bold' : 'normal' }}>
                    <span className="material-symbols-outlined">palette</span> 컨셉 (Concept)
                 </h2>
                
                <div style={{ backgroundColor: '#1f2937', padding: '15px', borderRadius: '8px', border: '1px solid #374151' }}>
                    <h3 style={{ margin: '0 0 15px 0', fontSize: '15px', color: legibilityMode ? '#FFFFFF' : '#fbbf24', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: legibilityMode ? 'bold' : 'normal' }}>
                        1. 노래 정보 (Song Info)
                    </h3>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontSize: '13px', color: labelColor, marginBottom: '5px' }}>앨범 제목 (Title)</label>
                        <input 
                            type="text" 
                            value={artTitle} 
                            onChange={(e) => setArtTitle(e.target.value)}
                            placeholder="Title"
                            style={{ width: '100%', padding: '10px', backgroundColor: '#111827', border: '1px solid #4b5563', color: 'white', borderRadius: '6px', boxSizing: 'border-box' }} 
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', color: labelColor, marginBottom: '5px' }}>아티스트 (Artist)</label>
                        <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
                            <input 
                                type="text" 
                                value={artistName} 
                                onChange={(e) => setArtistName(e.target.value)}
                                placeholder="Artist Name"
                                style={{ flex: 1, padding: '10px', backgroundColor: '#111827', border: '1px solid #4b5563', color: 'white', borderRadius: '6px', boxSizing: 'border-box' }} 
                            />
                            <button onClick={addArtistSample} style={{ padding: '0 12px', backgroundColor: '#374151', border: '1px solid #4b5563', color: '#10b981', borderRadius: '6px', cursor: 'pointer' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                            </button>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {artistSamples.map((a, i) => (
                                <div key={i} onClick={() => setArtistName(a)} 
                                    style={{ 
                                        fontSize: '11px', padding: '4px 8px', borderRadius: '12px', 
                                        backgroundColor: '#111827', border: '1px solid #4b5563', color: legibilityMode ? '#FFFFFF' : '#d1d5db', 
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
                                    }}
                                >
                                    {a}
                                    <span onClick={(e) => removeArtistSample(a, e)} style={{ fontSize: '14px', color: '#ef4444', fontWeight: 'bold' }}>×</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: '#1f2937', padding: '15px', borderRadius: '8px', border: '1px solid #374151' }}>
                    <h3 style={{ margin: '0 0 15px 0', fontSize: '15px', color: legibilityMode ? '#FFFFFF' : '#e11d48', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: legibilityMode ? 'bold' : 'normal' }}>
                        2. 비주얼 컨셉 (Visual Concept)
                    </h3>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontSize: '13px', color: labelColor, marginBottom: '5px' }}>스타일 (Style)</label>
                        <select value={visualStyle} onChange={(e) => setVisualStyle(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#111827', color: 'white', border: '1px solid #4b5563', borderRadius: '6px' }}>
                            {ART_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontSize: '13px', color: labelColor, marginBottom: '5px' }}>등장인물 (Characters)</label>
                        <select onChange={(e) => setCharacters(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#111827', color: 'white', border: '1px solid #4b5563', borderRadius: '6px', marginBottom: '8px' }}>
                            <option value="">-- 샘플 선택 --</option>
                            {CHARACTER_SAMPLES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <input 
                            type="text" 
                            value={characters} 
                            onChange={(e) => setCharacters(e.target.value)}
                            placeholder="직접 입력..."
                            style={{ width: '100%', padding: '10px', backgroundColor: '#111827', border: '1px solid #4b5563', color: 'white', borderRadius: '6px', boxSizing: 'border-box' }} 
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', color: labelColor, marginBottom: '5px' }}>상세 설명 (Description)</label>
                        <textarea 
                            value={artDescription}
                            onChange={(e) => setArtDescription(e.target.value)}
                            placeholder="구체적인 장면 묘사..."
                            style={{ width: '100%', height: '60px', padding: '10px', backgroundColor: '#111827', border: '1px solid #4b5563', color: 'white', borderRadius: '6px', resize: 'none', boxSizing: 'border-box' }}
                        />
                    </div>
                </div>
            </div>

            {/* Column 2: Design */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', paddingRight: '10px', borderRight: '1px solid #374151' }}>
                <h2 style={{ fontSize: '18px', borderBottom: '1px solid #374151', paddingBottom: '15px', margin: 0, color: '#818cf8', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: legibilityMode ? 'bold' : 'normal' }}>
                    <span className="material-symbols-outlined">brush</span> 디자인 (Design)
                 </h2>

                <div style={{ backgroundColor: '#1f2937', padding: '15px', borderRadius: '8px', border: '1px solid #374151' }}>
                    <h3 style={{ margin: '0 0 15px 0', fontSize: '15px', color: legibilityMode ? '#FFFFFF' : '#818cf8', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: legibilityMode ? 'bold' : 'normal' }}>
                        3. 텍스트 디자인 (Overlay)
                    </h3>
                    <p style={{ fontSize: '11px', color: labelColor, marginTop: '-10px', marginBottom: '15px' }}>* 이미지 생성 후 적용되는 오버레이 텍스트입니다.</p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '15px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', color: labelColor, marginBottom: '5px' }}>폰트 (Font)</label>
                            <select value={fontType} onChange={(e) => setFontType(e.target.value)} style={{ width: '100%', padding: '8px', backgroundColor: '#111827', color: 'white', border: '1px solid #4b5563', borderRadius: '6px', fontSize: '12px' }}>
                                {FONT_OPTIONS.map((font, idx) => (
                                    <option key={idx} value={font.value} style={{ fontFamily: font.value }}>{font.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                             <label style={{ display: 'block', fontSize: '13px', color: labelColor, marginBottom: '5px' }}>텍스트 효과 (Effect)</label>
                             <select value={textEffect} onChange={(e) => setTextEffect(e.target.value)} style={{ width: '100%', padding: '8px', backgroundColor: '#111827', color: 'white', border: '1px solid #4b5563', borderRadius: '6px', fontSize: '12px' }}>
                                {TEXT_EFFECT_OPTIONS.map((effect, idx) => (
                                    <option key={idx} value={effect.id}>{effect.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', color: labelColor, marginBottom: '5px' }}>기본 색상 (Color)</label>
                            <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} style={{ width: '100%', height: '34px', padding: '0', border: 'none', cursor: 'pointer', borderRadius: '4px' }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: labelColor, marginBottom: '4px' }}>
                                <span>가로 위치 (X Position)</span> <span>{textOverlay.x}%</span>
                            </label>
                            <input type="range" min="0" max="100" value={textOverlay.x} onChange={e => setTextOverlay({...textOverlay, x: parseInt(e.target.value)})} style={{ width: '100%', cursor: 'pointer' }} />
                        </div>
                        <div>
                            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: labelColor, marginBottom: '4px' }}>
                                <span>세로 위치 (Y Position)</span> <span>{textOverlay.y}%</span>
                            </label>
                            <input type="range" min="0" max="100" value={textOverlay.y} onChange={e => setTextOverlay({...textOverlay, y: parseInt(e.target.value)})} style={{ width: '100%', cursor: 'pointer' }} />
                        </div>
                        <div>
                            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: labelColor, marginBottom: '4px' }}>
                                <span>텍스트 크기 (Size)</span> <span>{textOverlay.size}px</span>
                            </label>
                            <input type="range" min="10" max="150" value={textOverlay.size} onChange={e => setTextOverlay({...textOverlay, size: parseInt(e.target.value)})} style={{ width: '100%', cursor: 'pointer' }} />
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: '#1f2937', padding: '15px', borderRadius: '8px', border: '1px solid #374151' }}>
                    <h3 style={{ margin: '0 0 15px 0', fontSize: '15px', color: legibilityMode ? '#FFFFFF' : 'white', fontWeight: legibilityMode ? 'bold' : 'normal' }}>생성 옵션 (Generation)</h3>
                    
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontSize: '13px', color: labelColor, marginBottom: '8px' }}>모델 선택 (Model)</label>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <label style={{ flex: '1 1 100px', padding: '10px', borderRadius: '8px', border: modelType === 'flash' ? '1px solid #fbbf24' : '1px solid #4b5563', backgroundColor: modelType === 'flash' ? 'rgba(251, 191, 36, 0.1)' : 'transparent', cursor: 'pointer', fontSize: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <input type="radio" checked={modelType === 'flash'} onChange={() => setModelType('flash')} style={{ display: 'none' }} />
                                <span style={{ fontWeight: 'bold', color: modelType === 'flash' ? '#fbbf24' : labelColor }}>Na Banana</span>
                                <span style={{ fontSize: '10px', color: '#6b7280' }}>(Fast)</span>
                            </label>
                            <label style={{ flex: '1 1 100px', padding: '10px', borderRadius: '8px', border: modelType === 'pro' ? '1px solid #e11d48' : '1px solid #4b5563', backgroundColor: modelType === 'pro' ? 'rgba(225, 29, 72, 0.1)' : 'transparent', cursor: 'pointer', fontSize: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <input type="radio" checked={modelType === 'pro'} onChange={() => setModelType('pro')} style={{ display: 'none' }} />
                                <span style={{ fontWeight: 'bold', color: modelType === 'pro' ? '#e11d48' : labelColor }}>Na Banana Pro</span>
                                <span style={{ fontSize: '10px', color: '#6b7280' }}>(HD)</span>
                            </label>
                        </div>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontSize: '13px', color: labelColor, marginBottom: '5px' }}>이미지 크기 (Ratio)</label>
                        <select 
                            value={selectedSizePreset} 
                            onChange={(e) => setSelectedSizePreset(Number(e.target.value))} 
                            style={{ width: '100%', padding: '10px', backgroundColor: '#111827', color: 'white', border: '1px solid #4b5563', borderRadius: '6px', fontSize: '13px' }}
                        >
                            {IMAGE_SIZE_PRESETS.map((preset) => (
                                <option key={preset.id} value={preset.id}>
                                    {preset.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button 
                        onClick={generateCoverArt}
                        disabled={loading}
                        style={{ 
                            width: '100%', padding: '15px', backgroundColor: '#10b981', color: 'white', border: 'none', 
                            borderRadius: '8px', fontWeight: 'bold', cursor: loading ? 'wait' : 'pointer', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            marginTop: '10px'
                        }}
                    >
                        {loading ? 'Generating...' : <><span className="material-symbols-outlined">auto_awesome</span> 앨범 커버 생성</>}
                    </button>
                </div>
            </div>

            {/* Column 3: Preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
                 <h2 style={{ fontSize: '18px', borderBottom: '1px solid #374151', paddingBottom: '15px', margin: 0, color: '#10b981', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: legibilityMode ? 'bold' : 'normal' }}>
                    <span className="material-symbols-outlined">image</span> 미리보기 (Preview)
                 </h2>
                
                 <div style={{ 
                    width: '100%', 
                    aspectRatio: previewAspectRatio, 
                    backgroundColor: '#111827', 
                    borderRadius: '12px', border: '1px solid #374151', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    overflow: 'hidden', marginBottom: '10px', position: 'relative',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                    transition: 'aspect-ratio 0.3s ease',
                    maxHeight: 'calc(100vh - 300px)'
                }}>
                    {project.coverImage ? (
                        <>
                            <img src={project.coverImage} alt="Album Cover" style={{ width: '100%', height: '100%', objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }} />
                            <div style={{
                                position: 'absolute',
                                top: `${textOverlay.y}%`,
                                left: `${textOverlay.x}%`,
                                transform: 'translate(-50%, -50%)',
                                textAlign: 'center',
                                color: currentEffectStyle.color || textColor,
                                pointerEvents: 'none',
                                width: '100%',
                                ...currentEffectStyle
                            }}>
                                <div style={{ 
                                    fontFamily: fontType, 
                                    fontSize: `${textOverlay.size}px`, 
                                    fontWeight: 'bold',
                                    marginBottom: `${textOverlay.size * 0.2}px`
                                }}>
                                    {artTitle}
                                </div>
                                <div style={{ 
                                    fontFamily: fontType, 
                                    fontSize: `${textOverlay.size * 0.5}px`, 
                                    opacity: 0.9 
                                }}>
                                    {artistName}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div style={{ color: '#4b5563', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '64px' }}>image</span>
                            <span>No Image Generated</span>
                        </div>
                    )}
                </div>

                {project.coverImage && (
                    <button 
                        onClick={handleDownload}
                        style={{ 
                            width: '100%', padding: '12px', backgroundColor: '#374151', 
                            color: legibilityMode ? '#FFFFFF' : '#d1d5db', 
                            border: '1px solid #4b5563', borderRadius: '8px', 
                            cursor: 'pointer', fontWeight: 'bold', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            fontSize: '13px'
                        }}
                    >
                        <span className="material-symbols-outlined">download</span> 이미지 다운로드
                    </button>
                )}
            </div>
        </div>
    );
};

export default ArtTab;
