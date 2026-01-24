
import React, { useState } from 'react';
import { Project, StudioTab } from './types';
import { NavButton, ManualModal } from './SharedComponents';
import ConceptTab from './ConceptTab';
import StructureTab from './StructureTab';
import LyricsTab from './LyricsTab';
import SoundTab from './SoundTab';
import ArtTab from './ArtTab';
import ExportTab from './ExportTab';

// --- Studio Component ---
const Studio = ({ project, onUpdate, onBack, onExportJSON, legibilityMode }: { project: Project, onUpdate: (u: Partial<Project>) => void, onBack: () => void, onExportJSON: () => void, legibilityMode: boolean }) => {
  const [activeTab, setActiveTab] = useState<StudioTab>('CONCEPT');
  const [showManual, setShowManual] = useState(false);

  const renderContent = () => {
    switch(activeTab) {
      case 'CONCEPT': return <ConceptTab project={project} onUpdate={onUpdate} legibilityMode={legibilityMode} />;
      case 'STRUCTURE': return <StructureTab project={project} onUpdate={onUpdate} legibilityMode={legibilityMode} />;
      case 'LYRICS': return <LyricsTab project={project} onUpdate={onUpdate} legibilityMode={legibilityMode} />;
      case 'SOUND': return <SoundTab project={project} onUpdate={onUpdate} legibilityMode={legibilityMode} />;
      case 'ART': return <ArtTab project={project} onUpdate={onUpdate} legibilityMode={legibilityMode} />;
      case 'EXPORT': return <ExportTab project={project} onExportJSON={onExportJSON} legibilityMode={legibilityMode} />;
      default: return <div>Unknown Tab</div>;
    }
  };

  return (
    <div className="studio-container">
      <nav className="sidebar-nav" style={{ width: '80px', backgroundColor: '#111827', borderRight: '1px solid #374151', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px', gap: '20px' }}>
        <NavButton active={activeTab === 'CONCEPT'} onClick={() => setActiveTab('CONCEPT')} icon="lightbulb" label="기획" legibilityMode={legibilityMode} />
        <NavButton active={activeTab === 'STRUCTURE'} onClick={() => setActiveTab('STRUCTURE')} icon="view_timeline" label="구조" legibilityMode={legibilityMode} />
        <NavButton active={activeTab === 'LYRICS'} onClick={() => setActiveTab('LYRICS')} icon="lyrics" label="가사" legibilityMode={legibilityMode} />
        <NavButton active={activeTab === 'SOUND'} onClick={() => setActiveTab('SOUND')} icon="piano" label="사운드" legibilityMode={legibilityMode} />
        <NavButton active={activeTab === 'ART'} onClick={() => setActiveTab('ART')} icon="image" label="아트" legibilityMode={legibilityMode} />
        <NavButton active={activeTab === 'EXPORT'} onClick={() => setActiveTab('EXPORT')} icon="publish" label="배포" legibilityMode={legibilityMode} />
        <div className="sidebar-divider" style={{ height: '20px', borderBottom: '1px solid #374151', width: '50%', margin: '10px auto' }}></div>
        <NavButton active={showManual} onClick={() => setShowManual(true)} icon="menu_book" label="매뉴얼" legibilityMode={legibilityMode} />
        
        {/* NEW FOOTER */}
        <div className="sidebar-footer" style={{ marginTop: 'auto', marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
             <a href="https://kmong.com/self-marketing/730531/ZQh4nXZpK5" target="_blank" rel="noreferrer" 
                style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                title="크몽에서 전문가 만나기"
             >
                <div style={{ 
                    width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#10b981', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                    fontWeight: 'bold', fontSize: '11px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                    border: '1px solid #059669', transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    크몽
                </div>
             </a>
             <div style={{ textAlign: 'center', fontSize: '9px', color: '#6b7280', lineHeight: '1.4' }}>
                 <span style={{ display: 'block', marginBottom: '2px' }}>Made by</span>
                 <strong style={{ color: '#9ca3af' }}>PARK YONG SU</strong>
                 <span style={{ display: 'block', color: '#6b7280' }}>(5barTV)</span>
             </div>
        </div>
      </nav>
      <div className="studio-main-content">
        {renderContent()}
      </div>
      {showManual && <ManualModal onClose={() => setShowManual(false)} />}
    </div>
  );
};

export default Studio;
