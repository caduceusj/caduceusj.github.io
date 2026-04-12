// ============================================
// PROJECT DATA (all itch.io games + extras)
// ============================================
const projects = [
    {
        id: 'malleus', title: 'Malleus Maleficarum',
        description: 'Dark metroidvania rebuilt from a 2023 game jam. Lead Programmer.',
        engine: 'Godot 4.4', image: 'assets/malleusmale.png',
        tags: ['Metroidvania', 'Lead Programmer', 'Dark Fantasy'],
        url: 'https://caduceusj.itch.io/malleus-maleficarum'
    },
    {
        id: 'almas', title: 'As Almas da Floresta',
        description: 'Gameplay Programmer. Core mechanics, spells, AI, UI, and boss battles. Approved under Paulo Gustavo Law.',
        engine: 'Godot', image: 'assets/As_almas_da_floresta.png',
        tags: ['Godot Engine', 'Gameplay', 'AI', 'UI/UX'],
        url: 'https://caduceusj.itch.io/as-almas-da-floresta'
    },
    {
        id: 'catcha', title: 'Catcha',
        description: 'A parody critique of gambling. 2D point-and-click arcade desperation simulator — open chests, collect cats, gamble.',
        engine: 'Godot', image: 'assets/catcha.png',
        tags: ['Arcade', 'Parody', 'Solo Dev'],
        url: 'https://caduceusj.itch.io/catcha'
    },
    {
        id: 'picc', title: 'PICC Line Training',
        description: 'Simulation for medical training on PICC line placement in neonates.',
        engine: 'Unity/Godot', image: 'assets/piccBaby.jpg',
        tags: ['Serious Game', 'Medical', 'Simulation'], url: null
    },
    {
        id: 'separatio', title: 'Separatio',
        description: 'A VR project about Isolation. A study in Godot VR.',
        engine: 'Godot', image: 'assets/VRGameGodot.png',
        tags: ['VR', '3D', 'Godot'], url: null
    },
    {
        id: 'awa', title: 'AWA',
        description: '2D Point and Click game — select ingredient combinations for chemical reactions.',
        engine: 'Godot', image: 'assets/AwA Banner.png',
        tags: ['Serious Game', 'Chemistry', 'Point & Click'], url: null
    },
    {
        id: 'handtracking', title: 'Hand Tracking',
        description: 'Hand Tracking game about Finger Counting, using Unity and Ultraleap.',
        engine: 'Unity', image: 'assets/FingerCounting.png',
        tags: ['VR', 'Hand Tracking', 'Unity'], url: null
    },
    {
        id: 'gargantua', title: 'Gargantua',
        description: '3D retro-style horror game. Graphics, item inspection, UI, and antagonist AI.',
        engine: 'Unity', image: 'assets/Gargantua2.png',
        tags: ['3D Horror', 'AI', 'Retro'],
        url: 'https://caduceusj.itch.io/gargantua'
    },
    {
        id: 'nolegs', title: 'I Have No Legs But I Must Sit',
        description: 'Procedurally generated environments with unique chairs, each with their own score and anomaly.',
        engine: 'Unity', image: 'assets/I have no legs.png',
        tags: ['Procedural', 'Walk Simulator'],
        url: 'https://caduceusj.itch.io/i-have-no-legs'
    },
    {
        id: 'fofoca', title: 'Fofoca (Gossip)',
        description: 'GMTK Game Jam 2024 — Sole programmer. Character AI, day/night cycle, UI, objective generation.',
        engine: 'Godot', image: 'assets/fofocaLogo.png',
        tags: ['Game Jam', 'AI', 'Solo Dev'],
        url: 'https://caduceusj.itch.io/fofoca'
    },
    {
        id: 'elph', title: 'E.L.P.H.',
        description: 'Sole programmer. Unique game mechanics and game design, including elevator systems.',
        engine: 'Godot', image: 'assets/elph.png',
        tags: ['Solo Dev', 'Mechanics'],
        url: 'https://caduceusj.itch.io/elph'
    },
    {
        id: 'bastille', title: 'Breaking Bastille',
        description: 'First 3D project. Level Design, Game Design, dynamic UI, and combat mechanics.',
        engine: 'Unity', image: 'assets/Breaking Bastille.png',
        tags: ['3D', 'Combat', 'Level Design'],
        url: 'https://caduceusj.itch.io/breaking-bastille'
    },
    {
        id: 'baroneza', title: 'Baroneza',
        description: 'First major project. Mechanics, cutscenes, enemies, UI. Game Jam Plus Finalist.',
        engine: 'Godot', image: 'assets/Baroneza_arte_grande_01.png',
        tags: ['Game Jam', 'Finalist'],
        url: 'https://caduceusj.itch.io/baroneza'
    },
    {
        id: 'quentura', title: 'Quentura',
        description: 'Keep students cool in this arcade game! Programming and Game Design.',
        engine: 'Godot', image: 'assets/QuenturaMenu2.png',
        tags: ['Arcade', 'Game Jam'],
        url: 'https://caduceusj.itch.io/quentura'
    },
    {
        id: 'conserto', title: 'Conserto ARriscado',
        description: 'Arcade game about fixing Air Conditioners.',
        engine: 'Godot', image: 'assets/Ar condicionado timido.jpg',
        tags: ['Arcade', 'Game Jam'],
        url: 'https://caduceusj.itch.io/conserto-ar-riscado'
    },
    {
        id: 'dodgeboy', title: 'Dodge Boy',
        description: 'Trijam #286 — 4th Place. Dodge enemies as a Viking escaping the enemy base.',
        engine: 'Godot', image: 'assets/DodgeBoy.png',
        tags: ['Game Jam', '4th Place'],
        url: 'https://caduceusj.itch.io/dodge-boy'
    },
    {
        id: 'jamsession', title: 'Jam Session',
        description: 'Trijam #270 — 4th Place. Rhythm game about programmers making a game in 3 hours.',
        engine: 'Godot', image: 'assets/JamSession.png',
        tags: ['Game Jam', 'Rhythm', '4th Place'],
        url: 'https://caduceusj.itch.io/jam-session'
    },
    {
        id: 'cropfi', title: 'Crop-fi',
        description: 'Trijam #248 — 2nd Place. Maintain your hobby garden, water plants, collect and sell fruits.',
        engine: 'Godot', image: 'assets/Cropfi.png',
        tags: ['Game Jam', 'Cozy', '2nd Place'],
        url: 'https://deadpix.itch.io/crop-fi'
    },
    {
        id: 'supervisor', title: 'The Supervisor',
        description: 'Game tester checking for IP infringement. Desktop simulator with time management.',
        engine: 'Unity', image: 'assets/Supervisor2.png',
        tags: ['Desktop Sim', 'UI/UX'],
        url: 'https://bizarre-programming.itch.io/the-supervisor'
    },
    {
        id: 'songs', title: 'My Songs',
        description: 'Songs I make for fun. Music is another creative outlet!',
        engine: 'BeepBox', image: 'assets/MySongs(hobby).png',
        tags: ['Music', 'Hobby'],
        url: 'https://music.youtube.com/browse/VLPLSwvU73KLgNjKyugBiZmka6N2yfk9-JMq'
    }
];

// ============================================
// SKILLS DATA
// ============================================
const skills = [
    { name: 'Godot Engine', icon: 'fas fa-cube', level: 'Game Programmer', color: '#478cbf' },
    { name: 'Unity', icon: 'fab fa-unity', level: 'Game Programmer', color: '#aaaaaa' },
    { name: 'GDScript', icon: 'fas fa-scroll', level: 'Godot Script', color: '#478cbf' },
    { name: 'C#', icon: 'fas fa-hashtag', level: 'C# Programmer', color: '#68217a' },
    { name: 'C++', icon: 'fas fa-microchip', level: 'C++ Programmer', color: '#659bd3' },
    { name: 'Python', icon: 'fab fa-python', level: 'Python Programmer', color: '#ffd43b' },
    { name: 'Game Design', icon: 'fas fa-lightbulb', level: 'Designer', color: '#ff9800' },
    { name: 'Level Design', icon: 'fas fa-map', level: 'Level Designer', color: '#00e676' },
    { name: 'Porting', icon: 'fas fa-right-left', level: 'Cross-Platform', color: '#26c6da' },
    { name: 'VR Dev', icon: 'fas fa-vr-cardboard', level: 'VR Experience', color: '#7c4dff' },
    { name: 'AI Programming', icon: 'fas fa-brain', level: 'Game AI', color: '#ff6e40' },
    { name: 'UI/UX Design', icon: 'fas fa-drafting-compass', level: 'UI/UX Designer', color: '#e040fb' },
    { name: 'HTML/CSS/JS', icon: 'fab fa-html5', level: 'Web Development', color: '#e34f26' },
    { name: 'Adobe Suite', icon: 'fas fa-palette', level: 'Adobe Experience', color: '#ff0000' },
    { name: 'Git & GitHub', icon: 'fab fa-git-alt', level: 'Gitflow', color: '#f05032' }
];

// ============================================
// DESKTOP APP DEFINITIONS
// ============================================
const desktopApps = [
    { id: 'about', title: 'about_me.txt', icon: 'fas fa-file-lines', iconColor: '#4fc3f7', windowTitle: 'about_me.txt - Notepad', width: 660, height: 500, statusText: 'Ln 1, Col 1' },
    { id: 'projects', title: 'My Projects', icon: 'fas fa-folder', iconColor: '#ffd54f', windowTitle: 'My Projects', width: 880, height: 600, statusText: '20 objects' },
    { id: 'malleus', title: 'Malleus\nMaleficarum', icon: 'fas fa-skull-crossbones', iconColor: '#ef5350', windowTitle: 'Malleus Maleficarum', width: 720, height: 540, statusText: 'Featured Project' },
    { id: 'skills', title: 'Skills', icon: 'fas fa-code', iconColor: '#81c784', windowTitle: 'Skills Manager', width: 760, height: 540, statusText: '15 skills' },
    { id: 'experience', title: 'Experience', icon: 'fas fa-briefcase', iconColor: '#ba68c8', windowTitle: 'Work Experience', width: 680, height: 540, statusText: '6 positions' },
    { id: 'education', title: 'Education', icon: 'fas fa-graduation-cap', iconColor: '#4db6ac', windowTitle: 'Education & Awards', width: 760, height: 540, statusText: '4 degrees, 5 awards' },
    { id: 'contact', title: 'Contact', icon: 'fas fa-envelope', iconColor: '#ff8a65', windowTitle: 'Contact Me', width: 500, height: 420, statusText: 'Ready' }
];

// ============================================
// WINDOW CONTENT GENERATORS
// ============================================
function getWindowContent(appId) {
    switch (appId) {
        case 'about': return getAboutContent();
        case 'projects': return getProjectsContent();
        case 'malleus': return getMalleusContent();
        case 'skills': return getSkillsContent();
        case 'experience': return getExperienceContent();
        case 'education': return getEducationContent();
        case 'contact': return getContactContent();
        default: return '<div style="padding:20px">Content not found.</div>';
    }
}

function getAboutContent() {
    return '<div class="notepad-menu">'
        + '<span>File</span><span>Edit</span><span>Format</span><span>View</span><span>Help</span>'
        + '</div>'
        + '<div class="notepad-content">'
        + '==============================================\n'
        + '  ABOUT ME \u2014 Jo\u00e3o Anisio\n'
        + '  Game Programmer & Game Designer\n'
        + '==============================================\n'
        + '\n'
        + 'Name:     Jo\u00e3o Anisio Marinho da Nobrega\n'
        + 'Role:     Game Programmer | Game Designer\n'
        + 'Location: Natal, RN, Brazil\n'
        + 'Engines:  Godot Engine | Unity\n'
        + '\n'
        + '----------------------------------------------\n'
        + '\n'
        + 'Hello! I\'m Jo\u00e3o Anisio, a Game Programmer\n'
        + 'and Game Designer from Natal, Brazil.\n'
        + '\n'
        + 'I\'m passionate about turning creative ideas\n'
        + 'into fun and engaging digital experiences.\n'
        + 'I work primarily with Godot Engine and Unity,\n'
        + 'developing both solo and collaborative\n'
        + 'projects across various genres.\n'
        + '\n'
        + 'Currently, I serve as a Substitute Professor\n'
        + 'of Digital Games at UFRN and as a Researcher\n'
        + 'at AKCIT, while continuing to develop games\n'
        + 'and expand my craft.\n'
        + '\n'
        + 'Lately I\'ve been deepening my studies in:\n'
        + '\n'
        + '  > Porting (cross-platform deployment)\n'
        + '  > Level Design\n'
        + '  > Game Design\n'
        + '\n'
        + 'My technical toolkit includes:\n'
        + '\n'
        + '  > GDScript, C#, C++, Python\n'
        + '  > HTML5, CSS3, JavaScript\n'
        + '  > VR Development & Hand Tracking\n'
        + '  > Projection Mapping (CAVE Systems)\n'
        + '  > Adobe Suite | Git & GitHub\n'
        + '\n'
        + 'My goal is to fully transition into the game\n'
        + 'industry, bringing my creative ideas to life\n'
        + 'and building unique experiences that resonate\n'
        + 'with players worldwide.\n'
        + '\n'
        + 'Let\'s connect and create something great!\n'
        + '\n'
        + '----------------------------------------------\n'
        + 'Contact:  joaoanisiomn@hotmail.com\n'
        + 'LinkedIn: linkedin.com/in/jo\u00e3o-anisio-...\n'
        + 'GitHub:   github.com/caduceusj\n'
        + 'Itch.io:  caduceusj.itch.io\n'
        + '----------------------------------------------'
        + '</div>';
}

function getProjectsContent() {
    var items = '';
    for (var i = 0; i < projects.length; i++) {
        var p = projects[i];
        var action = p.url
            ? 'window.open(\'' + p.url.replace(/'/g, "\\'") + '\', \'_blank\')'
            : 'alert(\'Details available on request\')';
        items += '<div class="explorer-item" onclick="' + action + '">'
            + '<img class="explorer-item-thumb" src="' + p.image + '" alt="' + p.title + '" onerror="this.style.visibility=\'hidden\'">'
            + '<div class="explorer-item-label">' + p.title + '</div>'
            + '<div class="explorer-item-engine">' + p.engine + '</div>'
            + (p.url ? '<div class="explorer-item-badge">Play</div>' : '')
            + '</div>';
    }
    return '<div class="explorer-toolbar">'
        + '<div class="explorer-path"><i class="fas fa-folder-open"></i> C:\\Users\\JoaoAnisio\\Projects</div>'
        + '</div>'
        + '<div class="explorer-grid">' + items + '</div>';
}

function getMalleusContent() {
    return '<div class="featured-content">'
        + '<img class="featured-banner" src="assets/malleusmale.png" alt="Malleus Maleficarum">'
        + '<div class="featured-info">'
        + '<div class="featured-title">Malleus Maleficarum (Rebuild)</div>'
        + '<div class="featured-meta">Engine: Godot 4.4 | Role: Lead Programmer</div>'
        + '<div class="featured-description">A dark metroidvania, born from the embers of a 2023 game jam, now being reforged with greater ambition. As Lead Programmer, channeling 3+ years of knowledge to weave intricate mechanics, summon diverse foes, and ensure smooth gameplay with a unique visual identity.</div>'
        + '<div class="featured-tags">'
        + '<span class="featured-tag">Godot 4.4</span>'
        + '<span class="featured-tag">Metroidvania</span>'
        + '<span class="featured-tag">Lead Programmer</span>'
        + '<span class="featured-tag">2D Platformer</span>'
        + '<span class="featured-tag">Dark Fantasy</span>'
        + '<span class="featured-tag">AI Programming</span>'
        + '</div>'
        + '<div class="featured-team">Team: Marcos Arthur, Luis Eduardo Sales, Gabriel Henrique Bessa, Guilherme Santos Rosas</div>'
        + '<a href="https://caduceusj.itch.io/malleus-maleficarum" target="_blank" rel="noopener noreferrer" class="featured-link"><i class="fas fa-gamepad"></i> View on Itch.io</a>'
        + '</div></div>';
}

function getSkillsContent() {
    var cards = '';
    for (var i = 0; i < skills.length; i++) {
        var s = skills[i];
        cards += '<div class="skill-card">'
            + '<div class="skill-card-icon" style="color:' + s.color + '"><i class="' + s.icon + '"></i></div>'
            + '<div class="skill-card-name">' + s.name + '</div>'
            + '<div class="skill-card-level">' + s.level + '</div>'
            + '</div>';
    }
    return '<div class="skills-grid">' + cards + '</div>';
}

function getExperienceContent() {
    return '<div class="experience-content"><div class="timeline">'
        + '<div class="timeline-item"><h3>Substitute Professor \u2014 Digital Games</h3>'
        + '<div class="company">UFRN | Natal, Brazil</div>'
        + '<div class="period">Current</div>'
        + '<p>Teaching Digital Games courses at the Federal University of Rio Grande do Norte.</p></div>'
        + '<div class="timeline-item"><h3>Researcher \u2014 AKCIT</h3>'
        + '<div class="company">AKCIT Research Group | Natal, Brazil</div>'
        + '<div class="period">Current</div>'
        + '<p>Conducting research in game development technologies and interactive systems.</p></div>'
        + '<div class="timeline-item"><h3>Game Programmer</h3>'
        + '<div class="company">Melted Peanut Studio | Natal, Brazil</div>'
        + '<div class="period">Jan 2024 \u2013 Present</div>'
        + '<p>Developer for "Almas da Floresta" with the Godot Engine.</p></div>'
        + '<div class="timeline-item"><h3>Game Lab Monitor</h3>'
        + '<div class="company">Metr\u00f3pole Digital \u2014 IMD/UFRN | Natal, Brazil</div>'
        + '<div class="period">Nov 2023 \u2013 Present</div>'
        + '<p>Guiding students in the game lab, maintaining tools, and keeping the workspace in order.</p></div>'
        + '<div class="timeline-item"><h3>Serious Games Developer</h3>'
        + '<div class="company">Universidade Federal do Rio Grande do Norte (UFRN)</div>'
        + '<div class="period">Oct 2023 \u2013 Dec 2024</div>'
        + '<p>Built a training simulation for PICC line placement in neonates, and a Hand Tracking Finger Counting project.</p></div>'
        + '<div class="timeline-item"><h3>Game Developer For Love</h3>'
        + '<div class="company">Natal, Brazil</div>'
        + '<div class="period">2021 \u2013 Present</div>'
        + '<p>Ventured through numerous game jams as lead programmer or game designer. Many projects on Itch.io.</p></div>'
        + '</div>'
        + '<div class="linkedin-cta"><a href="https://www.linkedin.com/in/jo%C3%A3o-anisio-marinho-da-nobrega-096358204/" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i> View full profile on LinkedIn</a></div>'
        + '</div>';
}

function getEducationContent() {
    return '<div class="education-content">'
        + '<div class="edu-section-title"><i class="fas fa-scroll" style="margin-right:6px"></i>Academic</div>'
        + '<div class="edu-card"><h4>Master\'s in Bioinformatics</h4><div class="institution">UFRN</div><div class="period">Anticipated Start: Mar 2025</div></div>'
        + '<div class="edu-card"><h4>Bachelor of Information Technology</h4><div class="institution">UFRN</div><div class="period">2020 \u2013 2024</div></div>'
        + '<div class="edu-card"><h4>Specialized Studies in Digital Games</h4><div class="institution">Metr\u00f3pole Digital \u2014 IMD/UFRN</div><div class="period">May 2022 \u2013 Dec 2024</div></div>'
        + '<div class="edu-card"><h4>Fast MBA: Leadership & People Management</h4><div class="institution">Fast MBA</div><div class="period">Feb 2025 \u2013 Mar 2025</div></div>'
        + '<div class="edu-section-title" style="margin-top:16px"><i class="fas fa-trophy" style="margin-right:6px"></i>Awards & Achievements</div>'
        + '<div class="award-item"><div class="award-badge"><i class="fas fa-star"></i></div><div class="award-text"><span class="award-label">Organizer:</span> GameLab Jam 2024.2</div></div>'
        + '<div class="award-item"><div class="award-badge"><i class="fas fa-trophy"></i></div><div class="award-text"><span class="award-label">Winner:</span> Hallowjam 2023 (Malleus Maleficarum)</div></div>'
        + '<div class="award-item"><div class="award-badge"><i class="fas fa-medal"></i></div><div class="award-text"><span class="award-label">Finalist:</span> Game Jam Plus 2022/2023 \u2013 Baroneza</div></div>'
        + '<div class="award-item"><div class="award-badge"><i class="fas fa-certificate"></i></div><div class="award-text"><span class="award-label">Participant:</span> Game Jam IP Challenge 2023</div></div>'
        + '<div class="award-item"><div class="award-badge"><i class="fas fa-certificate"></i></div><div class="award-text"><span class="award-label">Participant:</span> Game Jam+ 2022</div></div>'
        + '</div>';
}

function getContactContent() {
    return '<div class="contact-content">'
        + '<div class="contact-icon"><i class="fas fa-paper-plane"></i></div>'
        + '<div class="contact-title">Get in Touch</div>'
        + '<div class="contact-subtitle">Let\'s discuss new projects, collaborations, or opportunities!</div>'
        + '<a href="mailto:joaoanisiomn@hotmail.com" class="contact-email-btn"><i class="fas fa-envelope"></i> joaoanisiomn@hotmail.com</a>'
        + '<div class="contact-socials">'
        + '<a href="https://www.linkedin.com/in/jo%C3%A3o-anisio-marinho-da-nobrega-096358204/" target="_blank" rel="noopener noreferrer" class="contact-social-link"><i class="fab fa-linkedin"></i> LinkedIn</a>'
        + '<a href="https://github.com/caduceusj" target="_blank" rel="noopener noreferrer" class="contact-social-link"><i class="fab fa-github"></i> GitHub</a>'
        + '<a href="https://caduceusj.itch.io/" target="_blank" rel="noopener noreferrer" class="contact-social-link"><i class="fab fa-itch-io"></i> Itch.io</a>'
        + '</div></div>';
}
