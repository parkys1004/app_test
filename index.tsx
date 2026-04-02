
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ViewState, Project } from './types';
import { responsiveGlobalStyles, GENRE_DEFAULTS } from './constants';
import ApiKeyManagerPopup from './ApiKeyManagerPopup';
import Dashboard from './Dashboard';
import Studio from './Studio';
import Header from './Header';

const App = () => {
    const [view, setView] = useState<ViewState>('DASHBOARD');
    const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [showKeyManager, setShowKeyManager] = useState(true); // Start with key manager to check key
    const [legibilityMode, setLegibilityMode] = useState(() => {
        const saved = localStorage.getItem('suno_legibility_mode');
        return saved === 'true';
    });

    const toggleLegibility = () => {
        const newVal = !legibilityMode;
        setLegibilityMode(newVal);
        localStorage.setItem('suno_legibility_mode', String(newVal));
    };

    const handleCreateProject = (form: any) => {
        const newProject: Project = {
            id: Date.now().toString(),
            title: form.title,
            genre: form.genre,
            subGenre: form.subGenre,
            mood: form.mood,
            styleDescription: '',
            bpm: 0,
            key: '',
            createdAt: Date.now(),
            generatedTitles: [],
            structure: [],
            lyrics: '',
            sunoPrompt: '',
            instruments: GENRE_DEFAULTS[form.genre] || [],
            vocalType: 'Male',
            // Default Lyric Settings
            lyricLanguage: 'Korean & English Mix',
            lyricDuration: 180,
            lyricDanceMode: false,
            lyricAutoAdjust: false,
            selectedSoundPreset: '' // Default empty preset
        };
        const updated = [newProject, ...projects];
        setProjects(updated);
        localStorage.setItem('suno_projects', JSON.stringify(updated));
        setCurrentProjectId(newProject.id);
        setView('STUDIO');
    };

    const handleUpdateProject = (updates: Partial<Project>) => {
        if (!currentProjectId) return;
        const updated = projects.map(p => p.id === currentProjectId ? { ...p, ...updates } : p);
        setProjects(updated);
        localStorage.setItem('suno_projects', JSON.stringify(updated));
    };

    const handleDeleteProject = (id: string) => {
        const updated = projects.filter(p => p.id !== id);
        setProjects(updated);
        localStorage.setItem('suno_projects', JSON.stringify(updated));
    };

    const handleOpenProject = (id: string) => {
        setCurrentProjectId(id);
        setView('STUDIO');
    };

    const handleImportProject = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const imported = JSON.parse(event.target?.result as string);
                if (imported.id && imported.title) {
                    const newId = Date.now().toString();
                    const newProject = { ...imported, id: newId };
                    const updated = [newProject, ...projects];
                    setProjects(updated);
                    localStorage.setItem('suno_projects', JSON.stringify(updated));
                    alert('Project Imported Successfully!');
                }
            } catch (err) {
                alert('Invalid JSON file');
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    const handleExportProject = (p: Project) => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(p));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${p.title || 'project'}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const handleRemix = () => {
        if (!currentProjectId) return;
        const current = projects.find(p => p.id === currentProjectId);
        if (!current) return;
        const remix: Project = {
            ...current,
            id: Date.now().toString(),
            title: `${current.title} (Remix)`,
            createdAt: Date.now()
        };
        const updated = [remix, ...projects];
        setProjects(updated);
        localStorage.setItem('suno_projects', JSON.stringify(updated));
        setCurrentProjectId(remix.id);
        alert('Remix created!');
    };

    useEffect(() => {
        const saved = localStorage.getItem('suno_projects');
        if (saved) setProjects(JSON.parse(saved));
        
        // If API Key already exists and is tested, we can hide the manager
        const key = localStorage.getItem('suno_pro_api_key');
        if (key) setShowKeyManager(false);
    }, []);

    const activeProject = projects.find(p => p.id === currentProjectId);

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: legibilityMode ? "'Inter', sans-serif" : "'Inter', sans-serif", backgroundColor: '#111827', color: 'white' }}>
            <style dangerouslySetInnerHTML={{ __html: responsiveGlobalStyles }} />
            
            {showKeyManager && <ApiKeyManagerPopup onOpenApp={() => setShowKeyManager(false)} />}
            
            <Header 
                view={view} 
                project={activeProject} 
                onBack={() => setView('DASHBOARD')} 
                onSave={() => activeProject && handleExportProject(activeProject)}
                onImport={handleImportProject}
                onRemix={handleRemix}
                legibilityMode={legibilityMode}
                onToggleLegibility={toggleLegibility}
                onOpenKeyManager={() => setShowKeyManager(true)}
            />
            <div style={{ flex: 1, overflow: 'hidden' }}>
                {view === 'DASHBOARD' && (
                    <Dashboard 
                        projects={projects} 
                        onCreate={handleCreateProject} 
                        onOpen={handleOpenProject} 
                        onDelete={handleDeleteProject}
                        onExport={handleExportProject}
                        legibilityMode={legibilityMode}
                    />
                )}
                {view === 'STUDIO' && activeProject && (
                    <Studio 
                        project={activeProject} 
                        onUpdate={handleUpdateProject} 
                        onBack={() => setView('DASHBOARD')} 
                        onExportJSON={() => handleExportProject(activeProject)}
                        legibilityMode={legibilityMode}
                    />
                )}
            </div>
        </div>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
