
export type ViewState = 'DASHBOARD' | 'STUDIO';
export type StudioTab = 'CONCEPT' | 'STRUCTURE' | 'LYRICS' | 'SOUND' | 'ART' | 'EXPORT';

export interface ThemePack {
  title: string;
  topic: string;
  style: string;
}

export interface ReferenceSuggestion {
  song: string;
  artist: string;
}

export interface InstrumentPreset {
  name: string;
  instruments: string[];
}

export interface SongBlock {
  id: string;
  type: string;
  description: string;
  duration: number;
}

export interface Project {
  id: string;
  title: string;
  genre: string;
  subGenre: string;
  mood: string;
  styleDescription: string;
  bpm: number;
  key: string;
  createdAt: number;
  
  // Reference Song
  referenceSongTitle?: string;
  referenceArtist?: string;

  // Generated Content
  concept?: string;
  generatedTitles: string[];
  generatedThemePacks?: ThemePack[]; // Persist AI Idea Packs
  themePackGenerationCount?: number;
  structure: SongBlock[];
  lyrics: string;
  excludedThemes?: string;
  sunoPrompt: string;
  coverImage?: string;
  compositionAdvice?: string; // AI Music Composition Suggestions
  
  // Lyric Ideas Persistence
  lyricVariations?: {title: string, lyrics: string, rationale: string}[];
  selectedLyricVariationIndex?: number | null;

  // Lyric Settings Persistence (New)
  lyricLanguage?: string;
  lyricDuration?: number;
  lyricDanceMode?: boolean;
  lyricAutoAdjust?: boolean;

  // Settings
  instruments: string[];
  vocalType: string;
  djName?: string;
  introStyle?: string;
  selectedSoundPreset?: string; // Persist Sound Preset Selection

  // Structure Template Persistence
  selectedStructureTemplate?: string;
}

export interface SamplePrompt {
    label: string;
    text: string;
}

// --- Global Interface for AI Studio ---
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}