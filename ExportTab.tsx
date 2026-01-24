
import React, { useState, useEffect } from 'react';
import { Project } from './types';
import { Icon } from './SharedComponents';

// --- TAB: Export ---
const MetadataDraftForm = ({ project, onCancel, legibilityMode }: any) => {
    const [artist, setArtist] = useState(project.djName || 'DJ Doberman');
    const [artistSamples, setArtistSamples] = useState<string[]>(['DJ Doberman']);
    const [generatedTags, setGeneratedTags] = useState<string>('');
    const [isCleanMode, setIsCleanMode] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('suno_export_artists');
        if (saved) { setArtistSamples(JSON.parse(saved)); }
    }, []);

    useEffect(() => {
        const baseTags = [project.genre, project.subGenre, project.mood, 'NewMusic', 'SunoAI', 'AI_Music', project.vocalType];
        // Remove empty or undefined values and duplicates
        const uniqueTags = Array.from(new Set(baseTags.filter(t => t)));
        const formattedTags = uniqueTags.map(t => `#${t.replace(/\s+/g, '')}`).join(' ');
        setGeneratedTags(formattedTags);
    }, [project]);

    const saveArtistSamples = (list: string[]) => {
        setArtistSamples(list);
        localStorage.setItem('suno_export_artists', JSON.stringify(list));
    };

    const addArtist = () => {
        if (artist && !artistSamples.includes(artist)) {
            saveArtistSamples([...artistSamples, artist]);
        }
    };

    const removeArtist = (name: string, e: React.MouseEvent) => {
        e.stopPropagation();
        saveArtistSamples(artistSamples.filter(a => a !== name));
    };

    const getCleanedLyrics = (text: string) => {
        if (!text) return '';
        // 1. Remove structure tags [Verse], [Chorus], etc.
        let cleaned = text.replace(/\[.*?\]/g, '');
        // 2. Remove dance counts like (8), (4)
        cleaned = cleaned.replace(/\(\d+\)/g, '');
        // 3. Normalize newlines: remove excessive blank lines
        // Split by lines, trim each line
        const lines = cleaned.split('\n').map(l => l.trim());
        // Filter out lines that were just tags (now empty), but preserve paragraph breaks
        // Strategy: Reduce multiple empty lines to a single empty line
        const result = lines.reduce((acc, line) => {
            if (line === '' && acc[acc.length - 1] === '') {
                return acc; // Skip multiple empty lines
            }
            acc.push(line);
            return acc;
        }, [] as string[]);
        
        // Remove leading/trailing empty lines
        if (result.length > 0 && result[0] === '') result.shift();
        if (result.length > 0 && result[result.length - 1] === '') result.pop();
        
        return result.join('\n');
    };

    const displayLyrics = isCleanMode ? getCleanedLyrics(project.lyrics || '') : (project.lyrics || '');

    const copyAll = () => {
        const text = `Title: ${project.title}\nArtist: ${artist}\n\n[Tags]\n${generatedTags}\n\n[Lyrics]\n${displayLyrics}`.trim();
        navigator.clipboard.writeText(text);
        alert('🎵 메타데이터 초안이 복사되었습니다!');
    };

    const labelColor = legibilityMode ? '#F9FAF8' : '#9ca3af';

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left', backgroundColor: '#1f2937', color: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #374151', width: '100%' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111827' }}>
                <h2 style={{ margin: 0, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: legibilityMode ? 'bold' : 'normal' }}>
                    <span className="material-symbols-outlined" style={{ color: '#fbbf24' }}>description</span>
                    메타데이터 초안 생성
                </h2>
                <button onClick={onCancel} style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
            <div style={{ padding: '30px' }}>
                <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    <div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', color: labelColor, fontSize: '13px', marginBottom: '5px' }}>제목 (Title)</label>
                            <input type="text" value={project.title} readOnly style={{ width: '100%', padding: '10px', backgroundColor: '#374151', border: '1px solid #4b5563', color: 'white', borderRadius: '6px', boxSizing: 'border-box' }} />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', color: labelColor, fontSize: '13px', marginBottom: '5px' }}>아티스트 (Artist)</label>
                            <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                                <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist Name" style={{ flex: 1, padding: '10px', backgroundColor: '#374151', border: '1px solid #4b5563', color: 'white', borderRadius: '6px', boxSizing: 'border-box' }} />
                                <button onClick={addArtist} style={{ padding: '0 12px', backgroundColor: '#374151', border: '1px solid #4b5563', color: '#10b981', borderRadius: '6px', cursor: 'pointer' }}>
                                    <Icon name="add" />
                                </button>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {artistSamples.map((a, i) => (
                                    <div key={i} onClick={() => setArtist(a)} style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '12px', backgroundColor: '#111827', border: '1px solid #4b5563', color: legibilityMode ? '#FFFFFF' : '#d1d5db', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        {a} <span onClick={(e) => removeArtist(a, e)} style={{ fontSize: '14px', color: '#ef4444', fontWeight: 'bold' }}>×</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Tags Section */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', color: labelColor, fontSize: '13px', marginBottom: '5px' }}>태그 (Tags)</label>
                            <textarea 
                                value={generatedTags} 
                                readOnly 
                                style={{ 
                                    width: '100%', padding: '10px', backgroundColor: '#374151', 
                                    border: '1px solid #4b5563', color: '#9ca3af', borderRadius: '6px', 
                                    boxSizing: 'border-box', resize: 'none', height: '80px', fontSize: '12px',
                                    lineHeight: '1.5'
                                }} 
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                            <label style={{ display: 'block', color: labelColor, fontSize: '13px' }}>가사 (Lyrics)</label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#10b981', cursor: 'pointer' }}>
                                <input 
                                    type="checkbox" 
                                    checked={isCleanMode} 
                                    onChange={(e) => setIsCleanMode(e.target.checked)} 
                                    style={{ accentColor: '#10b981' }}
                                />
                                태그 제외 (Pure Text)
                            </label>
                        </div>
                        <textarea value={displayLyrics} readOnly style={{ flex: 1, padding: '10px', backgroundColor: '#374151', border: '1px solid #4b5563', color: '#e5e7eb', borderRadius: '6px', resize: 'none', fontFamily: 'monospace', minHeight: '300px', boxSizing: 'border-box' }} />
                    </div>
                </div>
                <div style={{ marginTop: '30px', textAlign: 'center' }}>
                    <button onClick={copyAll} style={{ padding: '12px 30px', backgroundColor: '#e11d48', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <span className="material-symbols-outlined">content_copy</span> {isCleanMode ? '순수 가사 복사 (Copy Lyrics)' : '전체 복사 (Copy All)'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const ExportTab = ({ project, onExportJSON, legibilityMode }: { project: Project, onExportJSON: () => void, legibilityMode: boolean }) => {
  const [showMetadataForm, setShowMetadataForm] = useState(false);
  if (showMetadataForm) {
      return <MetadataDraftForm project={project} onCancel={() => setShowMetadataForm(false)} legibilityMode={legibilityMode} />;
  }
  const titleColor = legibilityMode ? '#FFFFFF' : '#f3f4f6';
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
      <h2 style={{ borderBottom: '1px solid #374151', paddingBottom: '15px', marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: titleColor, fontWeight: legibilityMode ? 'bold' : 'normal' }}>
        <span className="material-symbols-outlined" style={{ color: '#fbbf24', fontSize: '28px' }}>publish</span>
        배포 및 내보내기 (Export)
      </h2>
      <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div onClick={onExportJSON} style={{ backgroundColor: '#1f2937', padding: '50px 30px', borderRadius: '24px', border: '1px solid #374151', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', transition: 'all 0.2s', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}>
                  <Icon name="download" />
              </div>
              <div>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '20px', color: 'white' }}>프로젝트 백업 (JSON)</h3>
                  <p style={{ margin: 0, fontSize: '14px', color: legibilityMode ? '#E5E7EB' : '#9ca3af', lineHeight: '1.6' }}>프로젝트의 모든 데이터를 JSON으로 저장합니다.</p>
              </div>
          </div>
          <div onClick={() => setShowMetadataForm(true)} style={{ backgroundColor: '#1f2937', padding: '50px 30px', borderRadius: '24px', border: '1px solid #374151', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', transition: 'all 0.2s', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                  <Icon name="description" />
              </div>
              <div>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '20px', color: 'white' }}>메타데이터 초안 생성</h3>
                  <p style={{ margin: 0, fontSize: '14px', color: legibilityMode ? '#E5E7EB' : '#9ca3af', lineHeight: '1.6' }}>Suno 업로드를 위한 제목, 가사, 태그를 생성합니다.</p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ExportTab;
