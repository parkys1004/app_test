

export const GENRES = [
  { label: 'K-Pop', subgenres: ['Girl Crush', 'Refreshing', 'High Teen', 'Dark Concept', 'Jersey Club', 'Easy Listening', 'Afrobeats'] },
  { label: 'Ballad', subgenres: ['Traditional Ballad', 'Rock Ballad', 'R&B Ballad', 'Indie Ballad'] },
  { label: 'Hip-Hop', subgenres: ['Trap', 'Boom Bap', 'Singing Rap', 'K-HipHop', 'Jazz Rap', 'Old School'] },
  { label: 'R&B', subgenres: ['K-R&B', 'Soul', 'Groovy', 'Neo Soul', 'Alternative R&B'] },
  { label: 'Electronic', subgenres: ['House', 'Future Bass', 'Techno', 'Deep House', 'Hyperpop'] }, // 신설
  { label: 'Fusion', subgenres: ['Fusion Gugak', 'Joseon Pop', 'Pansori Hip-Hop', 'Folk Rock Fusion'] },
  { label: 'Trot', subgenres: ['Dance Trot', 'Traditional Trot', 'EDM Trot', 'Semi-Trot'] },
  { label: 'Band/Rock', subgenres: ['Modern Rock', 'Punk Rock', 'Synth Rock', 'Metal', 'Acoustic Rock'] },
  { label: 'Indie/Folk', subgenres: ['Acoustic Folk', 'City Pop', 'Lo-fi', 'Dream Pop'] }, // 드림팝 추가
  { label: 'Jazz/Bossa', subgenres: ['Standard Jazz', 'Bossa Nova', 'Swing', 'Fusion Jazz'] }, // 신설
  { label: 'OST', subgenres: ['Drama OST', 'Cinematic', 'Musical Style', 'Game Music'] }, // 게임 음악 추가
  { label: 'Healing/Meditation', subgenres: ['Piano Solo', 'Ambient', 'Nature Sounds (ASMR)', 'Meditation Guide', 'Deep Sleep Music', 'Singing Bowl'] },
  { label: 'Custom', subgenres: [] }
];

export const MOODS = [
  { id: 'energetic', label: 'Energetic & Powerful', ko: '신나는 / 파워풀한', color: '#FF4500' },
  { id: 'sentimental', label: 'Sentimental & Sad', ko: '아련한 / 슬픈', color: '#4682B4' },
  { id: 'refreshing', label: 'Refreshing & Cool', ko: '청량한 / 시원한', color: '#00CED1' },
  { id: 'dreamy', label: 'Dreamy & Mystical', ko: '몽환적인 / 신비로운', color: '#9370DB' },
  { id: 'hip', label: 'Hip & Swag', ko: '힙한 / 스웨그 넘치는', color: '#FFD700' },
  { id: 'lovely', label: 'Lovely & Sweet', ko: '사랑스러운 / 달콤한', color: '#FF69B4' },
  { id: 'dark', label: 'Dark & Intense', ko: '강렬한 / 어두운', color: '#2F4F4F' },
  { id: 'retro', label: 'Retro & Funky', ko: '레트로 / 펑키한', color: '#FF6347' },
  { id: 'chill', label: 'Chill & Relaxed', ko: '편안한 / 여유로운', color: '#8FBC8F' },
  { id: 'traditional', label: 'Traditional & Han', ko: '한국적 / 한이 서린', color: '#8B4513' },
  
  // --- 추가 추천 무드 ---
  { id: 'grand', label: 'Grand & Epic', ko: '웅장한 / 압도적인', color: '#B8860B' },
  { id: 'urban', label: 'Urban & Sophisticated', ko: '도시적인 / 세련된', color: '#708090' },
  { id: 'warm', label: 'Warm & Comforting', ko: '따스한 / 위로가 되는', color: '#F4A460' },
  { id: 'playful', label: 'Playful & Quirky', ko: '발랄한 / 장난스러운', color: '#ADFF2F' },
  { id: 'tense', label: 'Tense & Thrilling', ko: '긴박한 / 긴장감 넘치는', color: '#8B0000' }
];

export const INSTRUMENTS = [
  'Piano', 'Soft Piano', 'Synthesizer', 'Synth Pads', 'Organ',
  'Guitar', 'Electric Guitar', 'Acoustic Guitar', 'Bass', 'Slap Bass', '808 Bass',
  'Drums', 'Trap Beats', 'Electronic Drums', 'Percussion',
  'Strings', 'Violin', 'Cello', 'Orchestra',
  'Brass', 'Trumpet', 'Saxophone',
  'Gayageum (Zither)', 'Haegeum (Fiddle)', 'Janggu (Drum)', 'Kwaenggwari (Gong)', 'Daeguem (Flute)', 'Piri',
  'Backing Vocals', 'Whistle', 'FX'
];

export const INTRO_STYLES = [
  { id: '1', label: '속삭임 (Whisper)', desc: '아이돌 곡 시그니처. 멤버의 속삭임이나 나레이션으로 시작해 팬들의 이목 집중.', sunoTags: '[Whisper Intro], [Narration], [Member Name Shoutout]' },
  { id: '2', label: '강렬한 비트 (Impact)', desc: '시작하자마자 강한 베이스와 킥으로 때려박는 스타일. 걸크러쉬/다크 컨셉.', sunoTags: '[Heavy 808 Bass], [Explosive Intro], [Trap Beat Start]' },
  { id: '3', label: '감성 피아노 (Emotional)', desc: '잔잔한 피아노 선율로 시작. 발라드나 드라마 OST 도입부 느낌.', sunoTags: '[Melodic Piano Intro], [Soft Atmosphere], [Emotional Start]' },
  { id: '4', label: '국악기 독주 (Fusion)', desc: '가야금이나 해금의 독주로 시작하여 한국적인 미를 강조.', sunoTags: '[Gayageum Solo], [Haegeum Melody], [Traditional Korean Intro]' },
  { id: '5', label: '카운트다운 (Count-in)', desc: 'One, Two, Three! 힘찬 카운트와 함께 밴드 사운드 혹은 댄스 브레이크 시작.', sunoTags: '[Spoken Count-in], [Energetic Start], [Band Hit]' },
  { id: '6', label: '레트로 신스 (City Pop)', desc: '80년대 느낌의 신디사이저와 드럼 머신. 몽환적이고 세련된 도입부.', sunoTags: '[Retro Synth Intro], [City Pop Vibe], [80s Drum Machine]' },
  { id: '7', label: '아카펠라/코러스 (Harmony)', desc: '악기 없이 보컬 화음으로 시작하여 목소리에 집중.', sunoTags: '[Acapella Intro], [Vocal Harmony], [Choir Start]' },
  { id: '8', label: '통화 연결음 (Phone FX)', desc: '따르릉 소리, 부재중 메시지 녹음 등 현실적인 효과음으로 스토리텔링 시작.', sunoTags: '[Phone Ringtone SFX], [Voicemail Intro], [Lo-fi Filter]' },
  { id: '9', label: '뉴스/라디오 (Broadcast)', desc: '뉴스 속보나 라디오 채널을 돌리는 듯한 지직거리는 소리. 컨셉츄얼한 곡.', sunoTags: '[Radio Tuning SFX], [News Breaking Intro], [Static Noise]' },
  { id: '10', label: '기타 솔로 (Guitar Riff)', desc: '매력적인 기타 리프(Riff) 하나로 시작하여 분위기를 장악.', sunoTags: '[Electric Guitar Riff], [Acoustic Guitar Solo], [Funky Guitar Intro]' },
  { id: '11', label: '자연의 소리 (Ambience)', desc: '빗소리, 파도 소리, 도시의 소음 등 공간감을 주는 배경음으로 시작.', sunoTags: '[Rain Sound], [Ocean Waves], [City Ambience Intro]' },
  { id: '12', label: '사이렌/알람 (Tension)', desc: '위급한 사이렌이나 알람 소리로 긴장감을 고조시키며 강렬하게 시작.', sunoTags: '[Siren SFX], [Alarm Sound], [Emergency Intro]' }
];

export const EXCLUDED_KEYWORDS_PRESETS = [
    'Explicit', 'Violence', 'Drugs', 
    'Political', 'Sexual Themes', 'Sadness', 
    'Rap Parts', 'High Notes', 'English Lyrics',
    'Complex Words', 'Slang', 'Repetition'
];

export const ART_STYLES = [
  'Digital Art', 'Photorealistic', '3D Render', 'Oil Painting', 'Anime/Manga',
  'Watercolor', 'Cyberpunk', 'Steampunk', 'Synthwave', 'Vaporwave',
  'Pop Art', 'Minimalist', 'Abstract', 'Surrealism', 'Ukiyo-e',
  'Sketch/Pencil', 'Gothic', 'Renaissance', 'Pixel Art', 'Graffiti/Street Art'
];

export const IMAGE_SIZE_PRESETS = [
    { id: 0, label: 'Square (1:1)', ratio: '1:1', desc: 'Instagram Feed, Profile' },
    { id: 1, label: 'Landscape (16:9)', ratio: '16:9', desc: 'YouTube, Web Banner' },
    { id: 2, label: 'Portrait (9:16)', ratio: '9:16', desc: 'Stories, Reels, TikTok' },
    { id: 3, label: 'Classic TV (4:3)', ratio: '4:3', desc: 'Retro, Tablet View' },
    { id: 4, label: 'Classic Photo (3:4)', ratio: '3:4', desc: 'Standard Print' },
    { id: 5, label: 'Social Post (4:5)', ratio: '3:4', desc: 'IG Portrait (Crop optimized)' },
    { id: 6, label: 'Wide Link (1.9:1)', ratio: '16:9', desc: 'FB/Twitter Link Preview' },
    { id: 7, label: 'Cinematic (21:9)', ratio: '16:9', desc: 'Ultra Widescreen Movie' },
    { id: 8, label: 'Tall Banner (1:2)', ratio: '9:16', desc: 'Vertical Display Ad' },
    { id: 9, label: 'Circular (1:1)', ratio: '1:1', desc: 'Sticker, Badge Style' }
];

export const FONT_OPTIONS = [
    { label: 'Inter (Modern Standard)', value: "'Inter', sans-serif" },
    { label: 'Roboto (Clean)', value: "'Roboto', sans-serif" },
    { label: 'Open Sans (Neutral)', value: "'Open Sans', sans-serif" },
    { label: 'Montserrat (Geometric)', value: "'Montserrat', sans-serif" },
    { label: 'Poppins (Friendly)', value: "'Poppins', sans-serif" },
    { label: 'Lato (Stable)', value: "'Lato', sans-serif" },
    { label: 'Oswald (Tall & Bold)', value: "'Oswald', sans-serif" },
    { label: 'Anton (Impact)', value: "'Anton', sans-serif" },
    { label: 'Bebas Neue (Condensed)', value: "'Bebas Neue', cursive" },
    { label: 'Playfair Display (Elegant)', value: "'Playfair Display', serif" },
    { label: 'Merriweather (Readability)', value: "'Merriweather', serif" },
    { label: 'Abril Fatface (Big Serif)', value: "'Abril Fatface', cursive" },
    { label: 'Lobster (Retro Script)', value: "'Lobster', cursive" },
    { label: 'Pacifico (Fun Script)', value: "'Pacifico', cursive" },
    { label: 'Dancing Script (Handwritten)', value: "'Dancing Script', cursive" },
    { label: 'Permanent Marker (Marker)', value: "'Permanent Marker', cursive" }
];

export const TEXT_EFFECT_OPTIONS = [
    { id: 'none', label: 'None (Clean)', style: {} },
    { id: 'shadow_soft', label: 'Soft Shadow', style: { textShadow: '2px 2px 4px rgba(0,0,0,0.5)' } },
    { id: 'shadow_hard', label: 'Hard Shadow', style: { textShadow: '3px 3px 0px rgba(0,0,0,0.8)' } },
    { id: 'outline_black', label: 'Outline (Black)', style: { WebkitTextStroke: '1px black', textShadow: '1px 1px 2px black' } },
    { id: 'outline_white', label: 'Outline (White)', style: { WebkitTextStroke: '1px white', color: '#000' } },
    { id: 'neon_pink', label: 'Neon Pink', style: { textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 20px #e11d48, 0 0 30px #e11d48, 0 0 40px #e11d48' } },
    { id: 'neon_blue', label: 'Neon Blue', style: { textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 20px #3b82f6, 0 0 30px #3b82f6, 0 0 40px #3b82f6' } },
    { id: 'glow_gold', label: 'Golden Glow', style: { textShadow: '0 0 10px #fbbf24, 0 0 20px #fbbf24' } },
    { id: 'retro_3d', label: 'Retro 3D', style: { textShadow: '2px 2px 0px #e11d48, 4px 4px 0px #3b82f6' } },
    { id: 'fire', label: 'Fire', style: { textShadow: '0 -1px 2px #fff, 2px -2px 5px #fbbf24, -2px -4px 10px #ef4444, 0 -8px 15px #ea580c' } },
    { id: 'ice', label: 'Ice', style: { textShadow: '0 0 2px #fff, 0 0 5px #bae6fd, 0 0 10px #0ea5e9' } },
    { id: 'cyberpunk', label: 'Cyberpunk', style: { textShadow: '2px 0px 0px #ef4444, -2px 0px 0px #3b82f6', fontStyle: 'italic' } },
    { id: 'heavy_metal', label: 'Heavy Metal', style: { textShadow: '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15)' } },
    { id: 'vintage', label: 'Vintage Letterpress', style: { color: 'rgba(255,255,255,0.8)', textShadow: '1px 1px 1px rgba(0,0,0,0.8), -1px -1px 1px rgba(255,255,255,0.3)' } },
    { id: 'emboss', label: 'Embossed', style: { color: '#eee', textShadow: '-1px -1px 1px rgba(255,255,255,0.3), 1px 1px 1px rgba(0,0,0,0.5)' } },
    { id: 'mirror', label: 'Reflection', style: { textShadow: '0px 10px 5px rgba(255,255,255,0.3)' } },
    { id: 'elegant', label: 'Elegant Blur', style: { textShadow: '0 0 4px rgba(255,255,255,0.8)' } },
    { id: 'pop_art', label: 'Pop Art', style: { WebkitTextStroke: '2px black', textShadow: '4px 4px 0px #fbbf24' } },
    { id: 'hollow', label: 'Hollow', style: { WebkitTextStroke: '1px white', color: 'transparent' } },
    { id: 'glitch', label: 'Glitchy', style: { textShadow: '3px 0 #ff00ff, -3px 0 #00ffff' } }
];

export const CHARACTER_SAMPLES = [
  'Idol Group on Stage', 'Solo Singer with Mic', 'Traditional Hanbok Dancer', 'Cyberpunk DJ',
  'Sentimental Pianist', 'Rainy Seoul Street', 'Neon Club Crowd', 'Fantasy Warrior',
  'School Uniform High Teen', 'Blooming Cherry Blossoms', 'Abstract Sound Waves', 'Retro Cassette Tape'
];

export const DEFAULT_ARTISTS = ['DJ Seoul', 'MC Haneul', 'Luna'];

export const GENRE_DEFAULTS: Record<string, string[]> = {
  'K-Pop': ['Synthesizer', 'Bass', 'Electronic Drums', 'Vocals', 'Backing Vocals', 'FX'],
  'Ballad': ['Piano', 'Strings', 'Acoustic Guitar', 'Bass', 'Drums'],
  'Hip-Hop': ['808 Bass', 'Trap Beats', 'Synthesizer', 'Piano'],
  'R&B': ['Electric Piano', 'Bass', 'Snap', 'Soft Synth', 'Electric Guitar'],
  'Fusion': ['Gayageum (Zither)', 'Haegeum (Fiddle)', 'Trap Beats', 'Synthesizer', 'Janggu (Drum)'],
  'Trot': ['Brass', 'Accordion', 'Electronic Drums', 'Synthesizer', 'Bass'],
  'Band/Rock': ['Electric Guitar', 'Bass', 'Drums', 'Synthesizer'],
  'Indie/Folk': ['Acoustic Guitar', 'Piano', 'Shaker', 'Bass'],
  'OST': ['Orchestra', 'Piano', 'Strings', 'Acoustic Guitar'],
  'Custom': ['Drums', 'Bass', 'Piano', 'Synthesizer']
};

export const BLOCK_SAMPLES: Record<string, string[]> = {
  'Intro': [
    'Whisper Narration',
    'Explosive Dance Beat',
    'Emotional Piano Solo',
    'Gugak Melody (Gayageum)',
    'Counting (One, Two, Three!)'
  ],
  'Verse': [
    'Rhythmic Rap',
    'Melodic Singing (Low range)',
    'Storytelling',
    'Building Up',
    'Groovy Bass Line'
  ],
  'Chorus': [
    'Killing Part (Hook)',
    'High Note Explosion',
    'Addictive Repetition',
    'Group Harmony',
    'Drop (EDM Style)'
  ],
  'Bridge': [
    'Mood Change (Slow down)',
    'High Note Ad-lib',
    'Rap Break',
    'Minimal Instrument',
    'Build up to Final Chorus'
  ],
  'Drop': [
    'Dance Break (Choreography Focus)',
    'Heavy Bass Drop',
    'Synth Lead Solo',
    'Traditional Percussion Break'
  ],
  'Instrumental': [
    'Guitar Solo',
    'Haegeum Solo',
    'Piano Interlude',
    'Synth Solo'
  ],
  'Outro': [
    'Ending Fairy Pose (Fade out)',
    'High Note Finish',
    'Whisper Ending',
    'Abrupt Stop',
    'Instrumental Fade'
  ]
};

export const DEFAULT_SAMPLE_PROMPTS = [
  {
    label: "✨ K-Pop Girl Crush",
    text: "[Intro: Heavy Bass], K-Pop Girl Crush, 130 BPM, Key F#m. Powerful 808 bass, trap beats, aggressive synth lead, confident female vocals, catchy hook, English rap verse. Charismatic and Bold style."
  },
  {
    label: "🌊 Refreshing Boy Group",
    text: "[Intro: Bright Synth], K-Pop Boy Group, 118 BPM, Key C. Cheongryang (Refreshing) vibe, funky guitar riff, slap bass, energetic drums, harmonization, high note ad-libs. Summer beach party vibe."
  },
  {
    label: "🇰🇷 Fusion Gugak Trap",
    text: "[Intro: Gayageum riff], Fusion Hip-hop, 95 BPM, Key Am. Traditional Korean instruments (Gayageum, Haegeum) mixed with heavy Trap beats. 808 bass, rap verses, Pansori style vocals in chorus. Unique and energetic."
  },
  {
    label: "🎤 Emotional OST Ballad",
    text: "[Intro: Soft Piano], K-Drama OST, 68 BPM, Key Eb. Emotional ballad, grand piano, orchestral strings, slow build-up, crying female vocals, climactic high note. Sad but beautiful."
  },
  {
    label: "🕺 Neo-Trot",
    text: "[Intro: Brass Hit], EDM Trot, 128 BPM, Key Am. Addictive melody, ppong-jak rhythm mixed with modern EDM beat. Brass section, synthesizer, energetic male vocals. Party atmosphere."
  }
];

export const STRUCTURE_TEMPLATES = {
  // --- K-POP & IDOL (9) ---
  'Custom': [],
  'Standard K-Pop': [
      { type: 'Intro', description: 'Signature Sound & Member Narration', duration: 4 },
      { type: 'Verse', description: 'Verse 1 (Storytelling)', duration: 16 },
      { type: 'Verse', description: 'Pre-Chorus (Build-up)', duration: 8 },
      { type: 'Chorus', description: 'Main Hook (Killing Part)', duration: 16 },
      { type: 'Verse', description: 'Verse 2 (Rap Part)', duration: 16 },
      { type: 'Verse', description: 'Pre-Chorus', duration: 8 },
      { type: 'Chorus', description: 'Main Hook', duration: 16 },
      { type: 'Bridge', description: 'Emotional High Note & Slow down', duration: 8 },
      { type: 'Chorus', description: 'Final Chorus (Explosion)', duration: 16 },
      { type: 'Outro', description: 'Ending Pose Fade', duration: 4 }
  ],
  'Girl Crush (Strong)': [
      { type: 'Intro', description: 'English Narration & Bass', duration: 8 },
      { type: 'Verse', description: 'Low Tone Rap', duration: 16 },
      { type: 'Chorus', description: 'Drop (Minimal Vocals)', duration: 16 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Chorus', description: 'Drop', duration: 16 },
      { type: 'Bridge', description: 'Vocal Build Up', duration: 8 },
      { type: 'Drop', description: 'Final Dance Break', duration: 16 },
      { type: 'Outro', description: 'Signature Pose', duration: 4 }
  ],
  'Boy Group (Performance)': [
      { type: 'Intro', description: 'Dark Sound & Breath', duration: 8 },
      { type: 'Verse', description: 'Intense Rap', duration: 16 },
      { type: 'Verse', description: 'Pre-Chorus (Melodic)', duration: 8 },
      { type: 'Chorus', description: 'Powerful Unison', duration: 16 },
      { type: 'Drop', description: 'Dance Break (Instrumental)', duration: 16 },
      { type: 'Bridge', description: 'High Note Ad-lib', duration: 8 },
      { type: 'Chorus', description: 'Final Chorus', duration: 16 },
      { type: 'Outro', description: 'Heavy Breathing', duration: 4 }
  ],
  'High Teen (School Concept)': [
      { type: 'Intro', description: 'School Bell & Guitar', duration: 8 },
      { type: 'Verse', description: 'Cheerful Vocals', duration: 16 },
      { type: 'Chorus', description: 'Energetic Chorus', duration: 16 },
      { type: 'Verse', description: 'Rap (Playful)', duration: 16 },
      { type: 'Bridge', description: 'Cheerleading Chant', duration: 8 },
      { type: 'Chorus', description: 'Final Chorus', duration: 16 },
      { type: 'Outro', description: 'Laughing & Fade', duration: 4 }
  ],
  'Summer Song (Cool)': [
      { type: 'Intro', description: 'Wave Sound & Tropical House', duration: 8 },
      { type: 'Verse', description: 'Fresh Vocals', duration: 16 },
      { type: 'Chorus', description: 'Cool & High Melody', duration: 16 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Chorus', description: 'Cool & High Melody', duration: 16 },
      { type: 'Bridge', description: 'Slow down', duration: 8 },
      { type: 'Chorus', description: 'Final Chorus with Ad-libs', duration: 16 },
      { type: 'Outro', description: 'Yeah~!', duration: 4 }
  ],
  'Winter Song (Carol)': [
      { type: 'Intro', description: 'Sleigh Bells & Piano', duration: 8 },
      { type: 'Verse', description: 'Warm Vocals', duration: 16 },
      { type: 'Chorus', description: 'Carol Harmony', duration: 16 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Chorus', description: 'Carol Harmony', duration: 16 },
      { type: 'Bridge', description: 'Jazz Piano Solo', duration: 8 },
      { type: 'Chorus', description: 'Final Chorus', duration: 16 },
      { type: 'Outro', description: 'Merry Christmas Whisper', duration: 4 }
  ],
  'Latin-Kpop (Fusion)': [
      { type: 'Intro', description: 'Spanish Guitar Riff', duration: 8 },
      { type: 'Verse', description: 'Seductive K-Pop Vocals', duration: 16 },
      { type: 'Chorus', description: 'Reggaeton Beat Drop', duration: 16 },
      { type: 'Verse', description: 'Rap with Latin Flow', duration: 16 },
      { type: 'Chorus', description: 'Reggaeton Beat Drop', duration: 16 },
      { type: 'Outro', description: 'Adios', duration: 4 }
  ],
  'K-Pop Gen 2 (Retro Hook)': [
      { type: 'Intro', description: 'Dramatic Synth Intro', duration: 8 },
      { type: 'Chorus', description: 'Main Hook (Intro Chorus)', duration: 16 },
      { type: 'Verse', description: 'Verse 1', duration: 16 },
      { type: 'Chorus', description: 'Main Hook (Repetition)', duration: 16 },
      { type: 'Verse', description: 'Rap Bridge', duration: 16 },
      { type: 'Chorus', description: 'Key Change Final Chorus', duration: 16 },
      { type: 'Outro', description: 'Fade Out', duration: 8 }
  ],
  'Solo Idol (Dance)': [
      { type: 'Intro', description: 'Focus on Vocal Ad-lib', duration: 8 },
      { type: 'Verse', description: 'Verse 1', duration: 16 },
      { type: 'Verse', description: 'Pre-Chorus', duration: 8 },
      { type: 'Chorus', description: 'Main Chorus (Performance)', duration: 16 },
      { type: 'Instrumental', description: 'Dance Break', duration: 8 },
      { type: 'Bridge', description: 'High Note', duration: 8 },
      { type: 'Chorus', description: 'Final Chorus', duration: 16 },
      { type: 'Outro', description: 'Ending Pose', duration: 4 }
  ],

  // --- TRENDY & VIBE (6) ---
  'Y2K Style (NewJeans Vibe)': [
      { type: 'Intro', description: 'Retro Synth & Beat', duration: 8 },
      { type: 'Chorus', description: 'Catchy Hook Intro', duration: 16 },
      { type: 'Verse', description: 'Groovy Vocal', duration: 16 },
      { type: 'Chorus', description: 'Main Hook', duration: 16 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Chorus', description: 'Main Hook', duration: 16 },
      { type: 'Outro', description: 'Fade out with Ad-libs', duration: 8 }
  ],
  'Cyberpunk (Aespa Style)': [
      { type: 'Intro', description: 'Glitch Sound & Metallic Beat', duration: 8 },
      { type: 'Verse', description: 'Unique Flow', duration: 16 },
      { type: 'Chorus', description: 'Hyperpop Melody', duration: 16 },
      { type: 'Verse', description: 'Verse 2 (Tempo Change)', duration: 16 },
      { type: 'Chorus', description: 'Hyperpop Melody', duration: 16 },
      { type: 'Bridge', description: 'Distorted Bass', duration: 8 },
      { type: 'Chorus', description: 'Final Chorus', duration: 16 },
      { type: 'Outro', description: 'System Shutdown FX', duration: 4 }
  ],
  'Dreamy / Fairy': [
      { type: 'Intro', description: 'Wind Chimes & Pad', duration: 8 },
      { type: 'Verse', description: 'Soft Vocals', duration: 16 },
      { type: 'Chorus', description: 'Magical Melody', duration: 16 },
      { type: 'Instrumental', description: 'Synth Pluck Solo', duration: 8 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Chorus', description: 'Magical Melody', duration: 16 },
      { type: 'Outro', description: 'Disappearing Sound', duration: 8 }
  ],
  'City Pop (Retro)': [
      { type: 'Intro', description: '80s Drum Fill & Synth', duration: 8 },
      { type: 'Verse', description: 'Dreamy Vocals', duration: 16 },
      { type: 'Chorus', description: 'Nostalgic Melody', duration: 16 },
      { type: 'Instrumental', description: 'Saxophone or Synth Solo', duration: 8 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Chorus', description: 'Nostalgic Melody', duration: 16 },
      { type: 'Outro', description: 'Long Fade Out', duration: 16 }
  ],
  'Jersey Club Remix': [
      { type: 'Intro', description: 'Sample Chop & Fast Beat', duration: 8 },
      { type: 'Chorus', description: 'Repetitive Hook (Fast)', duration: 16 },
      { type: 'Verse', description: 'Short Rap Verse', duration: 16 },
      { type: 'Drop', description: 'Bed Squeak Sample & Kick', duration: 16 },
      { type: 'Chorus', description: 'Repetitive Hook', duration: 16 },
      { type: 'Outro', description: 'Abrupt Cut', duration: 4 }
  ],
  'Hyperpop (Glitch)': [
      { type: 'Intro', description: 'Distorted Noise', duration: 4 },
      { type: 'Chorus', description: 'Autotune Overload', duration: 16 },
      { type: 'Verse', description: 'Fast Paced Singing', duration: 8 },
      { type: 'Bridge', description: 'Complete Silence or Noise', duration: 4 },
      { type: 'Chorus', description: 'Max Volume Chorus', duration: 16 },
      { type: 'Outro', description: 'Glitch Out', duration: 4 }
  ],

  // --- HIP-HOP & R&B (4) ---
  'Hip-Hop (Trap)': [
      { type: 'Intro', description: 'Beat Tag & Mumble', duration: 8 },
      { type: 'Chorus', description: 'Main Theme', duration: 16 },
      { type: 'Verse', description: 'Verse 1 (Tight Flow)', duration: 16 },
      { type: 'Chorus', description: 'Main Theme', duration: 16 },
      { type: 'Verse', description: 'Verse 2 (Different Flow)', duration: 16 },
      { type: 'Chorus', description: 'Main Theme', duration: 16 },
      { type: 'Outro', description: 'Fade out', duration: 8 }
  ],
  'R&B Groove': [
      { type: 'Intro', description: 'Electric Piano Chords', duration: 8 },
      { type: 'Verse', description: 'Groovy Vocals', duration: 16 },
      { type: 'Chorus', description: 'Falsetto Hook', duration: 16 },
      { type: 'Verse', description: 'Singing Rap', duration: 16 },
      { type: 'Chorus', description: 'Falsetto Hook', duration: 16 },
      { type: 'Instrumental', description: 'Bass Solo', duration: 8 },
      { type: 'Outro', description: 'Vocal Runs', duration: 8 }
  ],
  'Rap Cypher (Team)': [
      { type: 'Intro', description: 'Hype Man Intro', duration: 8 },
      { type: 'Verse', description: 'Rapper 1 (Flow A)', duration: 16 },
      { type: 'Verse', description: 'Rapper 2 (Flow B)', duration: 16 },
      { type: 'Verse', description: 'Rapper 3 (Flow C)', duration: 16 },
      { type: 'Verse', description: 'Rapper 4 (Fast)', duration: 16 },
      { type: 'Outro', description: 'Beat Fade', duration: 8 }
  ],
  'UK Garage / 2-Step': [
      { type: 'Intro', description: 'Shuffling Hats', duration: 8 },
      { type: 'Verse', description: 'Soulful Vocals', duration: 16 },
      { type: 'Chorus', description: 'Chopped Vocal Sample', duration: 16 },
      { type: 'Drop', description: 'Heavy Bassline', duration: 16 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Outro', description: 'Drum Fade', duration: 8 }
  ],

  // --- BALLAD & OST (5) ---
  'Emotional Ballad (OST)': [
      { type: 'Intro', description: 'Piano Solo', duration: 8 },
      { type: 'Verse', description: 'Calm Vocals', duration: 16 },
      { type: 'Chorus', description: 'Emotional Melody', duration: 16 },
      { type: 'Verse', description: 'Verse 2 (Strings Enter)', duration: 16 },
      { type: 'Chorus', description: 'Emotional Melody', duration: 16 },
      { type: 'Bridge', description: 'Orchestral Climax', duration: 8 },
      { type: 'Chorus', description: 'Final Chorus (Max Emotion)', duration: 16 },
      { type: 'Outro', description: 'Piano Fade out', duration: 8 }
  ],
  'Rock Ballad (Band)': [
      { type: 'Intro', description: 'Electric Guitar Solo', duration: 8 },
      { type: 'Verse', description: 'Bass & Vocal', duration: 16 },
      { type: 'Chorus', description: 'Full Band Explosion', duration: 16 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Chorus', description: 'Full Band', duration: 16 },
      { type: 'Instrumental', description: 'Guitar Solo', duration: 16 },
      { type: 'Chorus', description: 'Final Chorus', duration: 16 },
      { type: 'Outro', description: 'Band Finish', duration: 8 }
  ],
  'Musical Style': [
      { type: 'Intro', description: 'Orchestra Overture', duration: 8 },
      { type: 'Verse', description: 'Dialogue Style Singing', duration: 16 },
      { type: 'Chorus', description: 'Grand Ensemble', duration: 16 },
      { type: 'Bridge', description: 'Dramatic Key Change', duration: 8 },
      { type: 'Chorus', description: 'Grand Ensemble (Fortissimo)', duration: 16 },
      { type: 'Outro', description: 'Final Chord Hold', duration: 8 }
  ],
  'Grand Epic (Final)': [
      { type: 'Intro', description: 'Marching Drums & Choir', duration: 16 },
      { type: 'Verse', description: 'Low & Serious', duration: 16 },
      { type: 'Chorus', description: 'Epic Harmony', duration: 16 },
      { type: 'Bridge', description: 'Silence then Explosion', duration: 8 },
      { type: 'Chorus', description: 'Maximum Volume & Choir', duration: 16 },
      { type: 'Outro', description: 'Orchestral Hit', duration: 4 }
  ],
  'Movie Trailer (Build-up)': [
      { type: 'Intro', description: 'Low Drone & Ticking', duration: 8 },
      { type: 'Verse', description: 'Slow Piano Notes', duration: 8 },
      { type: 'Bridge', description: 'Rising Tension (Riser)', duration: 8 },
      { type: 'Drop', description: 'Epic Impact Hits', duration: 8 },
      { type: 'Chorus', description: 'Full Orchestra Action', duration: 16 },
      { type: 'Outro', description: 'Sudden Silence', duration: 4 }
  ],

  // --- INDIE & ACOUSTIC (6) - Updated with Piano Solo ---
  'Acoustic Indie': [
      { type: 'Intro', description: 'Guitar Arpeggio', duration: 8 },
      { type: 'Verse', description: 'Soft Whispering', duration: 16 },
      { type: 'Chorus', description: 'Folk Melody', duration: 16 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Bridge', description: 'Humming / Scat', duration: 8 },
      { type: 'Chorus', description: 'Folk Melody', duration: 16 },
      { type: 'Outro', description: 'Guitar Chord', duration: 4 }
  ],
  'Introvert / Lofi': [
      { type: 'Intro', description: 'Vinyl Crackle & Rain', duration: 8 },
      { type: 'Verse', description: 'Mumbled Singing', duration: 16 },
      { type: 'Chorus', description: 'Simple Repetitive Melody', duration: 16 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Chorus', description: 'Simple Repetitive Melody', duration: 16 },
      { type: 'Outro', description: 'Tape Stop', duration: 4 }
  ],
  'Acoustic Cafe': [
      { type: 'Intro', description: 'Guitar Strumming', duration: 4 },
      { type: 'Verse', description: 'Sweet Vocals', duration: 16 },
      { type: 'Chorus', description: 'Comforting Melody', duration: 16 },
      { type: 'Verse', description: 'Whistling', duration: 16 },
      { type: 'Chorus', description: 'Comforting Melody', duration: 16 },
      { type: 'Outro', description: 'Coffee Pouring Sound', duration: 4 }
  ],
  'Shoegaze (Dreamy)': [
      { type: 'Intro', description: 'Wall of Sound Guitar', duration: 16 },
      { type: 'Verse', description: 'Buried Vocals', duration: 16 },
      { type: 'Chorus', description: 'Loud Distorted Wash', duration: 16 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Outro', description: 'Feedback Noise', duration: 16 }
  ],
  'Ambient / Meditation': [
      { type: 'Intro', description: 'Nature Sounds', duration: 16 },
      { type: 'Verse', description: 'Slow Pad Swell', duration: 16 },
      { type: 'Chorus', description: 'No Melody (Atmosphere)', duration: 16 },
      { type: 'Verse', description: 'Chimes & Bells', duration: 16 },
      { type: 'Outro', description: 'Slow Fade to Silence', duration: 16 }
  ],
  'Piano Solo (Calm)': [
      { type: 'Intro', description: 'Gentle Arpeggio', duration: 8 },
      { type: 'Verse', description: 'Main Theme A', duration: 16 },
      { type: 'Chorus', description: 'Variation B', duration: 16 },
      { type: 'Verse', description: 'Main Theme A (Variation)', duration: 16 },
      { type: 'Outro', description: 'Slowing down', duration: 8 }
  ],

  // --- PARTY & EDM (7) - Updated with House & Future Bass ---
  'Festival / EDM': [
      { type: 'Intro', description: 'Build Up Riser', duration: 16 },
      { type: 'Drop', description: 'Big Room Drop (Jump!)', duration: 16 },
      { type: 'Verse', description: 'Hype Vocals', duration: 16 },
      { type: 'Chorus', description: 'Sing-along Anthem', duration: 16 },
      { type: 'Drop', description: 'Second Drop', duration: 16 },
      { type: 'Outro', description: 'Fireworks Sound', duration: 8 }
  ],
  'EDM Trot (Party)': [
      { type: 'Intro', description: 'Brass & Electronic Beat', duration: 8 },
      { type: 'Verse', description: 'Trot Melody', duration: 16 },
      { type: 'Chorus', description: 'Addictive Hook', duration: 16 },
      { type: 'Instrumental', description: 'Dance Break (Synthesizer)', duration: 16 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Chorus', description: 'Addictive Hook', duration: 16 },
      { type: 'Outro', description: 'High Energy Finish', duration: 4 }
  ],
  'Drum & Bass (Liquid)': [
      { type: 'Intro', description: 'Fast Breakbeat & Pad', duration: 8 },
      { type: 'Verse', description: 'Fast Vocal Delivery', duration: 16 },
      { type: 'Drop', description: 'Reese Bass & Rolling Drums', duration: 16 },
      { type: 'Bridge', description: 'Half-time Section', duration: 8 },
      { type: 'Drop', description: 'Full Energy', duration: 16 },
      { type: 'Outro', description: 'Beat Fade', duration: 8 }
  ],
  'House (Club Standard)': [
      { type: 'Intro', description: 'DJ Intro (Beat mix)', duration: 16 },
      { type: 'Verse', description: 'Vocal Build', duration: 16 },
      { type: 'Chorus', description: 'Drop (Main Groove)', duration: 16 },
      { type: 'Verse', description: 'Breakdown', duration: 8 },
      { type: 'Chorus', description: 'Drop', duration: 16 },
      { type: 'Outro', description: 'DJ Outro', duration: 16 }
  ],
  'Future Bass (Emotional)': [
      { type: 'Intro', description: 'Synth Chords', duration: 8 },
      { type: 'Verse', description: 'Soft Vocals', duration: 16 },
      { type: 'Bridge', description: 'Snare Build Up', duration: 8 },
      { type: 'Drop', description: 'Wobbly Chords (Super Saw)', duration: 16 },
      { type: 'Outro', description: 'Fade', duration: 8 }
  ],

  // --- BAND & ROCK (6) - Updated with Modern Rock ---
  'Heavy Metal (Breakdown)': [
      { type: 'Intro', description: 'Guitar Feedback & Scream', duration: 4 },
      { type: 'Verse', description: 'Aggressive Riff', duration: 16 },
      { type: 'Chorus', description: 'Melodic Shout', duration: 16 },
      { type: 'Drop', description: 'Heavy Breakdown (Mosh)', duration: 16 },
      { type: 'Chorus', description: 'Final Chorus', duration: 16 },
      { type: 'Outro', description: 'Double Kick Blast', duration: 4 }
  ],
  'Punk Rock (Fast)': [
      { type: 'Intro', description: '1-2-3-4 Count & Fast Guitar', duration: 4 },
      { type: 'Verse', description: 'Power Chords', duration: 8 },
      { type: 'Chorus', description: 'Anthemic Shout', duration: 8 },
      { type: 'Verse', description: 'Verse 2', duration: 8 },
      { type: 'Chorus', description: 'Anthemic Shout', duration: 8 },
      { type: 'Outro', description: 'Feedback', duration: 4 }
  ],
  'Modern Rock (Anthem)': [
      { type: 'Intro', description: 'Guitar Riff', duration: 8 },
      { type: 'Verse', description: 'Bass & Drums driven', duration: 16 },
      { type: 'Chorus', description: 'Explosive Energy', duration: 16 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Bridge', description: 'Slow down & Build', duration: 8 },
      { type: 'Chorus', description: 'Final Chorus', duration: 16 },
      { type: 'Outro', description: 'Guitar Feedback', duration: 8 }
  ],

  // --- JAZZ & TROT (4) - Updated with Trot and Bossa ---
  'Traditional Trot (Ppong-jak)': [
      { type: 'Intro', description: 'Accordion & Brass', duration: 8 },
      { type: 'Verse', description: 'Verse 1 (Emotional)', duration: 16 },
      { type: 'Chorus', description: 'Main Melody (Ppong-jak Rhythm)', duration: 16 },
      { type: 'Instrumental', description: 'Brass Solo', duration: 16 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Chorus', description: 'Main Melody', duration: 16 },
      { type: 'Outro', description: 'Grand Finale', duration: 8 }
  ],
  'Bossa Nova (Cafe)': [
      { type: 'Intro', description: 'Nylon Guitar & Shaker', duration: 8 },
      { type: 'Verse', description: 'Soft Whisper Vocals', duration: 16 },
      { type: 'Chorus', description: 'Melodic Hook', duration: 16 },
      { type: 'Instrumental', description: 'Flute or Piano Solo', duration: 16 },
      { type: 'Chorus', description: 'Melodic Hook', duration: 16 },
      { type: 'Outro', description: 'Humming Fade', duration: 8 }
  ],
  'Jazz Bar (Solo)': [
      { type: 'Intro', description: 'Double Bass & Brush Drum', duration: 8 },
      { type: 'Verse', description: 'Soulful Vocals', duration: 16 },
      { type: 'Chorus', description: 'Swing Rhythm', duration: 16 },
      { type: 'Instrumental', description: 'Piano Improvisation', duration: 16 },
      { type: 'Chorus', description: 'Swing Rhythm', duration: 16 },
      { type: 'Outro', description: 'Scat Singing', duration: 8 }
  ],

  // --- SHORT FORM (3) ---
  'Viral Hook Song (Short)': [
      { type: 'Intro', description: 'Impact Sound', duration: 4 },
      { type: 'Chorus', description: 'Viral Challenge Part', duration: 16 },
      { type: 'Verse', description: 'Short Rap', duration: 8 },
      { type: 'Chorus', description: 'Viral Challenge Part', duration: 16 },
      { type: 'Outro', description: 'Signature Sound', duration: 4 }
  ],
  'TikTok Challenge (15s)': [
      { type: 'Intro', description: 'Catchy Phrase', duration: 2 },
      { type: 'Chorus', description: 'Main Dance Part', duration: 8 },
      { type: 'Outro', description: 'Funny Sound', duration: 2 }
  ],
  'YouTube Intro (Logo)': [
      { type: 'Intro', description: 'Whoosh Sound', duration: 2 },
      { type: 'Chorus', description: 'Channel Jingle', duration: 4 },
      { type: 'Outro', description: 'Ding!', duration: 2 }
  ],

  // --- FUSION & SPECIAL (2) ---
  'Fusion Gugak (Joseon Pop)': [
      { type: 'Intro', description: 'Gayageum Riff', duration: 8 },
      { type: 'Verse', description: 'Pansori Style Vocals', duration: 16 },
      { type: 'Chorus', description: 'Modern Pop Hook', duration: 16 },
      { type: 'Instrumental', description: 'Traditional & Trap Drop', duration: 8 },
      { type: 'Verse', description: 'Rap Verse', duration: 16 },
      { type: 'Chorus', description: 'Main Hook', duration: 16 },
      { type: 'Outro', description: 'Kwaenggwari Ending', duration: 8 }
  ],
  'Neo-Soul (Groovy)': [
      { type: 'Intro', description: 'Laid back drum beat', duration: 8 },
      { type: 'Verse', description: 'Complex Chords & Vocal', duration: 16 },
      { type: 'Chorus', description: 'Smooth Harmony', duration: 16 },
      { type: 'Instrumental', description: 'Organ Solo', duration: 8 },
      { type: 'Outro', description: 'Vocal Ad-libs fade', duration: 8 }
  ]
};

export const GENRE_PRESETS: Record<string, { label: string, bpm: number, key: string, instruments?: string[] }[]> = {
  'K-Pop': [
    { label: '💖 Girl Crush (Blackpink Style)', bpm: 130, key: 'F#m', instruments: ['Synthesizer', '808 Bass', 'Trap Beats', 'Brass'] },
    { label: '🌊 Refreshing (Seventeen Style)', bpm: 118, key: 'C', instruments: ['Electric Guitar', 'Synthesizer', 'Slap Bass', 'Vocals'] },
    { label: '🏫 High Teen (NewJeans Style)', bpm: 105, key: 'G', instruments: ['Synth Pads', 'Drum Break', 'Bass', 'Soft Vocals'] },
    { label: '😈 Dark Concept (Stray Kids Style)', bpm: 140, key: 'Em', instruments: ['Distorted Synth', 'Heavy Drums', 'Screams', 'Bass'] },
    { label: '🧚 Dreamy (Oh My Girl Style)', bpm: 120, key: 'Eb', instruments: ['Strings', 'Wind Chimes', 'Piano', 'Synth'] }
  ],
  'Ballad': [
    { label: '🎹 Traditional Ballad', bpm: 68, key: 'C', instruments: ['Grand Piano', 'Strings', 'Bass', 'Drums'] },
    { label: '🎸 Rock Ballad', bpm: 75, key: 'D', instruments: ['Electric Guitar', 'Drums', 'Bass', 'Piano'] },
    { label: '🍂 Indie Acoustic', bpm: 80, key: 'G', instruments: ['Acoustic Guitar', 'Shaker', 'Melodica'] },
    { label: '🌙 R&B Ballad', bpm: 85, key: 'Bb', instruments: ['Electric Piano', 'Synth Bass', 'Soft Drums'] },
    { label: '🎬 Cinematic Ballad (OST)', bpm: 65, key: 'F', instruments: ['Full Orchestra', 'Piano', 'Timpani'] }
  ],
  'Hip-Hop': [
    { label: '⛓️ Trap (Club)', bpm: 140, key: 'C#m', instruments: ['808 Bass', 'Hi-hat Rolls', 'Synth', 'Autotune'] },
    { label: '🎤 Singing Rap (Melodic)', bpm: 95, key: 'Am', instruments: ['Piano', 'Lofi Drums', 'Bass', 'Acoustic Guitar'] },
    { label: '🎷 Jazz Rap', bpm: 90, key: 'Bb', instruments: ['Saxophone', 'Double Bass', 'Piano', 'Brush Drums'] },
    { label: '🎧 Boom Bap (Old School)', bpm: 92, key: 'Fm', instruments: ['Breakbeat', 'Sampled Horns', 'Scratch', 'Bass'] },
    { label: '💂 Drill (Grime)', bpm: 142, key: 'Gm', instruments: ['Sliding 808', 'Dark Piano', 'Snare', 'Violin'] }
  ],
  'R&B': [
    { label: '🌙 K-R&B (Trendy)', bpm: 90, key: 'Fm', instruments: ['Electric Piano', 'Synth Bass', 'Finger Snap'] },
    { label: '🍷 Neo Soul (Groovy)', bpm: 80, key: 'Eb', instruments: ['Organ', 'Bass', 'Clean Guitar', 'Rimshot'] },
    { label: '🕯️ Slow Jam (Sexy)', bpm: 70, key: 'Ab', instruments: ['Synth Pads', 'Sub Bass', 'Chimes'] },
    { label: '🌌 Alternative R&B', bpm: 110, key: 'Bm', instruments: ['Distorted Drums', 'Atmospheric Synth', 'Reverb'] },
    { label: '🕺 Funk R&B', bpm: 115, key: 'E', instruments: ['Slap Bass', 'Brass Section', 'Funky Guitar'] }
  ],
  'Electronic': [
    { label: '🏠 House (Club)', bpm: 124, key: 'Am', instruments: ['909 Kick', 'Piano Chords', 'Hi-hats', 'Bass'] },
    { label: '✨ Future Bass', bpm: 150, key: 'F', instruments: ['Super Saw Synth', 'Vocal Chops', '808', 'Arpeggio'] },
    { label: '🍸 Deep House', bpm: 122, key: 'Cm', instruments: ['Sub Bass', 'Soft Pads', 'Shaker', 'Pluck Synth'] },
    { label: '🔧 Techno (Hard)', bpm: 130, key: 'Dm', instruments: ['Industrial Kick', 'Acid Synth', 'Rumble Bass'] },
    { label: '👾 Hyperpop', bpm: 160, key: 'G#m', instruments: ['Glitch FX', 'Distorted Bass', 'Square Wave'] }
  ],
  'Fusion': [
    { label: '🇰🇷 Fusion Gugak (Leenalchi)', bpm: 130, key: 'Am', instruments: ['Bass', 'Drums', 'Pansori Vocals', 'Kwaenggwari'] },
    { label: '🏮 Joseon Pop', bpm: 100, key: 'Dm', instruments: ['Gayageum', 'Synth', 'Trap Beats', 'Daeguem'] },
    { label: '🏯 Historical Epic', bpm: 145, key: 'Cm', instruments: ['Taiko Drums', 'Haegeum', 'Orchestra', 'Choir'] },
    { label: '🎸 Folk Rock Fusion', bpm: 110, key: 'G', instruments: ['Acoustic Guitar', 'Janggu', 'Piano'] },
    { label: '🔮 Shamanic Techno', bpm: 135, key: 'Em', instruments: ['Electronic Beat', 'Piri', 'Jing', 'Throat Singing'] }
  ],
  'Trot': [
    { label: '💃 Dance Trot', bpm: 130, key: 'Am', instruments: ['Brass', 'Synthesizer', 'Electronic Drums', 'Bass'] },
    { label: '😭 Traditional Trot', bpm: 85, key: 'Dm', instruments: ['Accordion', 'Guitar', 'Violin', 'Woodblock'] },
    { label: '⚡ EDM Trot', bpm: 135, key: 'Gm', instruments: ['Heavy Kick', 'Saw Synth', 'Brass', 'Clap'] },
    { label: '🎸 Semi-Trot', bpm: 120, key: 'C', instruments: ['Acoustic Guitar', 'Light Percussion', 'Harmonica'] },
    { label: '📻 Retro Trot', bpm: 125, key: 'Em', instruments: ['Organ', 'Electric Guitar', 'Double Bass'] }
  ],
  'Band/Rock': [
    { label: '🎸 Modern Rock', bpm: 120, key: 'E', instruments: ['Electric Guitar', 'Synth', 'Bass', 'Drums'] },
    { label: '🛹 Punk Rock', bpm: 160, key: 'A', instruments: ['Distorted Guitar', 'Fast Drums', 'Bass', 'Gang Vocals'] },
    { label: '🎹 Synth Rock', bpm: 128, key: 'Bm', instruments: ['Synthesizer', 'Drum Machine', 'Electric Guitar'] },
    { label: '🤘 Heavy Metal', bpm: 150, key: 'Dm', instruments: ['Distortion', 'Double Bass Drum', 'Screams'] },
    { label: '🪵 Acoustic Rock', bpm: 100, key: 'G', instruments: ['Acoustic Guitar', 'Cajon', 'Piano', 'Bass'] }
  ],
  'Indie/Folk': [
    { label: '🌃 City Pop', bpm: 110, key: 'F', instruments: ['Retro Synth', 'Funky Guitar', 'Bass', 'Saxophone'] },
    { label: '☕ Cafe Acoustic', bpm: 80, key: 'D', instruments: ['Acoustic Guitar', 'Piano', 'Shaker'] },
    { label: '📼 Lo-fi Indie', bpm: 85, key: 'Ab', instruments: ['Vinyl Crackle', 'Soft Keys', 'Muted Trumpet'] },
    { label: '☁️ Dream Pop', bpm: 100, key: 'C#m', instruments: ['Reverb Guitar', 'Whisper Vocals', 'Synth Pad'] },
    { label: '📖 Folk Ballad', bpm: 75, key: 'C', instruments: ['Harmonica', 'Acoustic Guitar', 'Accordion'] }
  ],
  'Jazz/Bossa': [
    { label: '🎺 Standard Jazz', bpm: 120, key: 'Bb', instruments: ['Walking Bass', 'Piano', 'Ride Cymbal', 'Trumpet'] },
    { label: '🏖️ Bossa Nova', bpm: 130, key: 'Dmaj7', instruments: ['Nylon Guitar', 'Shaker', 'Piano', 'Flute'] },
    { label: '🕶️ Acid Jazz', bpm: 105, key: 'Am', instruments: ['Funky Drums', 'Rhodes', 'Brass', 'Wah Guitar'] },
    { label: '🎷 Big Band', bpm: 160, key: 'C', instruments: ['Brass Section', 'Upright Bass', 'Drums'] },
    { label: '🧘 Smooth Jazz', bpm: 95, key: 'E', instruments: ['Saxophone', 'Synth Pads', 'Electric Bass'] }
  ],
  'OST': [
    { label: '🎬 Drama Emotional', bpm: 65, key: 'Bb', instruments: ['Piano', 'Orchestra', 'Strings'] },
    { label: '⚔️ Epic Action', bpm: 120, key: 'Gm', instruments: ['Percussion', 'Brass', 'Strings', 'Choir'] },
    { label: '💕 Rom-Com', bpm: 110, key: 'G', instruments: ['Pizzicato Strings', 'Whistle', 'Piano', 'Shaker'] },
    { label: '🔎 Mystery/Thriller', bpm: 90, key: 'Dm', instruments: ['Low Strings', 'FX', 'Piano', 'Sub Bass'] },
    { label: '🎎 Historical (Sageuk)', bpm: 80, key: 'Cm', instruments: ['Daegeum', 'Gayageum', 'Strings', 'Percussion'] }
  ],
  'Healing/Meditation': [
    { label: '🎹 Piano Solo', bpm: 60, key: 'C', instruments: ['Soft Piano', 'Reverb'] },
    { label: '🌌 Ambient', bpm: 0, key: 'E', instruments: ['Synth Pads', 'No Drums', 'Drone'] },
    { label: '🌿 Nature ASMR', bpm: 60, key: 'G', instruments: ['Rain Sound', 'Flute', 'Wind Chimes'] },
    { label: '💤 Deep Sleep', bpm: 50, key: 'Bb', instruments: ['Low Frequencies', 'Soft Synth', 'White Noise'] },
    { label: '🧘 Singing Bowl', bpm: 0, key: 'C', instruments: ['Bell Sounds', 'Soft Chimes', 'Silence'] }
  ],
  'Custom': [
    { label: 'Basic', bpm: 100, key: 'C', instruments: ['Piano', 'Drums', 'Bass'] }
  ]
};

export const responsiveGlobalStyles = `
  @keyframes spin { 100% { transform: rotate(360deg); } }
  body { overflow-x: hidden; width: 100%; position: relative; }
  #root { width: 100%; overflow-x: hidden; }
  
  /* Layout Transitions */
  .studio-container { display: flex; width: 100%; height: 100%; }
  .studio-main-content { flex: 1; overflow-y: auto; padding: 30px; background-color: #1f2937; }
  
  @media (max-width: 768px) {
    .studio-container { flex-direction: column !important; }
    .sidebar-nav { 
      width: 100% !important; 
      height: auto !important; 
      flex-direction: row !important; 
      padding: 0 !important; 
      border-right: none !important; 
      border-top: 1px solid #374151 !important;
      position: fixed !important;
      bottom: 0 !important;
      left: 0 !important;
      z-index: 1000 !important;
      justify-content: space-around !important;
      background-color: #111827 !important;
    }
    .sidebar-nav button { padding: 8px 0 !important; gap: 2px !important; }
    .sidebar-nav span:last-child { font-size: 9px !important; }
    .sidebar-divider { display: none !important; }
    .sidebar-footer { display: none !important; }
    .studio-main-content { padding: 15px !important; padding-bottom: 80px !important; }
    
    /* Responsive Grids */
    .responsive-grid-2 { grid-template-columns: 1fr !important; }
    .responsive-grid-3 { grid-template-columns: 1fr !important; }
    .lyrics-view { grid-template-columns: 1fr !important; height: auto !important; }
    
    /* Dashboard */
    .dashboard-header { flex-direction: column !important; align-items: flex-start !important; gap: 15px !important; }
    .dashboard-projects { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important; }
    
    /* Header */
    .app-header { padding: 0 10px !important; }
    .header-logo span:last-child { display: none !important; }
    .header-actions { gap: 5px !important; }
    .header-actions button { padding: 6px 8px !important; font-size: 11px !important; }
  }
`;