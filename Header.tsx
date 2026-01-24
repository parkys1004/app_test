
import React from 'react';
import { Project } from './types';
import { Icon } from './SharedComponents';

const Header = ({ view, project, onBack, onSave, onImport, onRemix, legibilityMode, onToggleLegibility, onOpenKeyManager }: any) => {
    return (
        <div className="app-header" style={{ height: '60px', backgroundColor: '#111827', borderBottom: '1px solid #374151', display: 'flex', alignItems: 'center', padding: '0 20px', justifyContent: 'space-between', boxSizing: 'border-box' }}>
            <div className="header-logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={onBack}>
                    <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#e11d48' }}>piano</span>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: legibilityMode ? '#FFFFFF' : 'white' }}>Suno Studio Pro V1.1</span>
                </div>
                {view === 'STUDIO' && project && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderLeft: '1px solid #374151', paddingLeft: '15px', marginLeft: '5px' }}>
                        <span style={{ color: legibilityMode ? '#FFFFFF' : '#d1d5db', fontSize: '14px', fontWeight: 'bold' }}>{project.title}</span>
                        <span style={{ color: '#6b7280', fontSize: '12px' }}>/</span>
                        <span style={{ color: legibilityMode ? '#FFFFFF' : '#9ca3af', fontSize: '14px' }}>{project.genre}</span>
                    </div>
                )}
            </div>
            <div className="header-actions" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                {/* Key Management Button */}
                <button 
                    onClick={onOpenKeyManager}
                    style={{ 
                        padding: '6px 12px', 
                        backgroundColor: '#374151', 
                        color: '#fbbf24', 
                        border: 'none', borderRadius: '6px', fontSize: '12px', cursor: 'pointer',
                        fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px'
                    }}
                    title="Manage API Key"
                >
                    <Icon name="key" />
                    Key
                </button>

                {/* Legibility Mode Toggle */}
                <button 
                    onClick={onToggleLegibility}
                    style={{ 
                        padding: '6px 12px', 
                        backgroundColor: legibilityMode ? '#fbbf24' : '#374151', 
                        color: legibilityMode ? '#000000' : '#FFFFFF', 
                        border: 'none', borderRadius: '6px', fontSize: '12px', cursor: 'pointer',
                        fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px'
                    }}
                >
                    <Icon name="contrast" />
                    {legibilityMode ? 'ON' : 'OFF'}
                </button>

                {view === 'DASHBOARD' && (
                    <>
                        <input type="file" id="import-json" style={{ display: 'none' }} accept=".json" onChange={onImport} />
                        <label htmlFor="import-json" style={{ padding: '8px 16px', backgroundColor: '#374151', color: '#d1d5db', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Icon name="folder_open" />
                            <span className="sidebar-divider">Import</span>
                        </label>
                    </>
                )}
                {view === 'STUDIO' && (
                    <>
                        <button onClick={onRemix} style={{ padding: '8px 16px', backgroundColor: 'transparent', color: '#818cf8', borderRadius: '6px', fontSize: '13px', border: '1px solid #818cf8', cursor: 'pointer' }}>Remix</button>
                        <button onClick={onSave} style={{ padding: '8px 16px', backgroundColor: '#374151', color: '#d1d5db', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', border: 'none' }}>Save</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
