// ============================================
// PROJECT DATA
// ============================================
const projects = [
    {
        id: 'almas', title: 'As Almas da Floresta',
        description: 'Gameplay Programmer for this Godot-powered game. Implemented core mechanics, spells, AI, UI, and boss battles. Approved under Paulo Gustavo Law.',
        engine: 'Godot', image: 'assets/As_almas_da_floresta.png',
        tags: ['Godot Engine', 'Gameplay', 'AI', 'UI/UX'],
        url: 'https://caduceusj.itch.io/as-almas-da-floresta'
    },
    {
        id: 'picc', title: 'PICC Line Training',
        description: 'Simulation for medical training on PICC line placement in neonates, focusing on accuracy and educational value.',
        engine: 'Unity/Godot', image: 'assets/piccBaby.jpg',
        tags: ['Serious Game', 'Medical', 'Simulation'], url: null
    },
    {
        id: 'separatio', title: 'Separatio',
        description: 'A VR project about Isolation. A study in Godot VR to gain experience.',
        engine: 'Godot', image: 'assets/VRGameGodot.png',
        tags: ['VR', '3D', 'Godot'], url: null
    },
    {
        id: 'awa', title: 'AWA',
        description: '2D Point and Click game - select ingredient combinations to see interesting chemical reactions.',
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
        description: 'Procedurally generated environments with unique chairs, each with their own score, name, and anomaly.',
        engine: 'Unity', image: 'assets/I have no legs.png',
        tags: ['Procedural', 'Walk Simulator'],
        url: 'https://caduceusj.itch.io/i-have-no-legs'
    },
    {
        id: 'fofoca', title: 'Fofoca (Gossip)',
        description: 'GMTK Game Jam 2024 - Sole programmer. Character AI, day/night cycle, UI, and objective generation.',
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
        description: 'Trijam #286 - 4th Place. Dodge enemies as a Viking escaping the enemy base.',
        engine: 'Godot', image: 'assets/DodgeBoy.png',
        tags: ['Game Jam', '4th Place'],
        url: 'https://caduceusj.itch.io/dodge-boy'
    },
    {
        id: 'jamsession', title: 'Jam Session',
        description: 'Trijam #270 - 4th Place. Rhythm game about programmers making a game in 3 hours.',
        engine: 'Godot', image: 'assets/JamSession.png',
        tags: ['Game Jam', 'Rhythm', '4th Place'],
        url: 'https://caduceusj.itch.io/jam-session'
    },
    {
        id: 'cropfi', title: 'Crop-fi',
        description: 'Trijam #248 - 2nd Place. Maintain your hobby garden, water plants, collect and sell fruits.',
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
        description: 'Songs I make for fun. I enjoy music and sometimes creativity sparks!',
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
    { name: 'HTML5', icon: 'fab fa-html5', level: 'Web Development', color: '#e34f26' },
    { name: 'CSS3', icon: 'fab fa-css3-alt', level: 'Web Development', color: '#1572b6' },
    { name: 'JavaScript', icon: 'fab fa-js-square', level: 'Web Development', color: '#f7df1e' },
    { name: 'VR Dev', icon: 'fas fa-vr-cardboard', level: 'VR Experience', color: '#7c4dff' },
    { name: 'AI Programming', icon: 'fas fa-brain', level: 'AI Game Developer', color: '#ff6e40' },
    { name: 'UI/UX Design', icon: 'fas fa-drafting-compass', level: 'UI/UX Designer', color: '#e040fb' },
    { name: 'Level Design', icon: 'fas fa-map-marked-alt', level: 'Level Designer', color: '#00e676' },
    { name: 'Adobe Suite', icon: 'fas fa-palette', level: 'Adobe Experience', color: '#ff0000' },
    { name: 'Git & GitHub', icon: 'fab fa-git-alt', level: 'Gitflow Experience', color: '#f05032' }
];

// ============================================
// DESKTOP APP DEFINITIONS
// ============================================
const desktopApps = [
    { id: 'about', title: 'about_me.txt', icon: 'fas fa-file-lines', iconColor: '#4fc3f7', windowTitle: 'about_me.txt - Notepad', width: 680, height: 520 },
    { id: 'projects', title: 'My Projects', icon: 'fas fa-folder', iconColor: '#ffd54f', windowTitle: 'My Projects', width: 900, height: 620 },
    { id: 'malleus', title: 'Malleus\nMaleficarum', icon: 'fas fa-skull-crossbones', iconColor: '#ef5350', windowTitle: 'Malleus Maleficarum', width: 750, height: 560 },
    { id: 'skills', title: 'Skills', icon: 'fas fa-code', iconColor: '#81c784', windowTitle: 'Skills Manager', width: 780, height: 560 },
    { id: 'experience', title: 'Experience', icon: 'fas fa-briefcase', iconColor: '#ba68c8', windowTitle: 'Work Experience', width: 700, height: 560 },
    { id: 'education', title: 'Education', icon: 'fas fa-graduation-cap', iconColor: '#4db6ac', windowTitle: 'Education & Awards', width: 780, height: 560 },
    { id: 'contact', title: 'Contact', icon: 'fas fa-envelope', iconColor: '#ff8a65', windowTitle: 'Contact Me', width: 520, height: 440 }
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
    return `
    <div class="notepad-menu">
        <span>File</span><span>Edit</span><span>Format</span><span>View</span><span>Help</span>
    </div>
    <div class="notepad-content">==============================================
      ABOUT ME - João Anisio
      Game Programmer & Game Designer
==============================================

Name:     João Anisio Marinho da Nobrega
Role:     Game Programmer & Game Designer
Location: Natal, RN, Brazil
Engines:  Godot Engine | Unity

----------------------------------------------

Hail, traveler! I am João Anisio, a Game
Programmer and Game Designer from the realms
of Natal, Brazil.

My passion lies in forging creative concepts
into captivating digital adventures. My anvils
of choice are the mighty Godot Engine and the
versatile Unity, where I craft both grand solo
sagas and collaborative expeditions.

I am a perpetual apprentice, ever seeking new
scrolls of knowledge and challenging quests
to hone my craft. My skills extend to the
arcane arts of Virtual Reality and Projection
Mapping using Cave Automated Systems in Unity.

Beyond the forge of game development, my
grimoire includes:

  > C#, C++, Python, GDScript
  > HTML5 & CSS3
  > Adobe Suite
  > Git & GitHub

My ultimate quest is to continue evolving,
crafting unique games that etch themselves
into the legends of players.

Should our paths align, let us convene and
weave new tales together!

----------------------------------------------
Contact: joaoanisiomn@hotmail.com
GitHub:  github.com/caduceusj
Itch.io: caduceusj.itch.io
----------------------------------------------</div>`;
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
        + '<div class="timeline-item"><h3>Game Programmer</h3>'
        + '<div class="company">Melted Peanut Studio | Natal, Brazil</div>'
        + '<div class="period">Jan 2024 – Present</div>'
        + '<p>Developer for "Almas da Floresta" with the Godot Engine.</p></div>'
        + '<div class="timeline-item"><h3>Game Lab Monitor</h3>'
        + '<div class="company">Metrópole Digital - IMD/UFRN | Natal, Brazil</div>'
        + '<div class="period">Nov 2023 – Present</div>'
        + '<p>Guiding students in the game lab, maintaining tools, and keeping the workspace in order.</p></div>'
        + '<div class="timeline-item"><h3>Serious Games Developer</h3>'
        + '<div class="company">Universidade Federal do Rio Grande do Norte (UFRN)</div>'
        + '<div class="period">Oct 2023 – Dec 2024</div>'
        + '<p>Crafting a training simulation for PICC line placement in neonates, and Hand Tracking Finger Counting Project.</p></div>'
        + '<div class="timeline-item"><h3>Game Developer For Love</h3>'
        + '<div class="company">Natal, Brazil</div>'
        + '<div class="period">2021 – Present</div>'
        + '<p>Ventured through numerous game jams as lead programmer or game designer. Many projects chronicled on Itch.io.</p></div>'
        + '</div></div>';
}

function getEducationContent() {
    return '<div class="education-content">'
        + '<div class="edu-section-title"><i class="fas fa-scroll" style="margin-right:8px"></i>Academic</div>'
        + '<div class="edu-card"><h4>Master\'s in Bioinformatics</h4><div class="institution">UFRN</div><div class="period">Anticipated Start: Mar 2025</div></div>'
        + '<div class="edu-card"><h4>Bachelor of Information Technology</h4><div class="institution">UFRN</div><div class="period">2020 – 2024</div></div>'
        + '<div class="edu-card"><h4>Specialized Studies in Digital Games</h4><div class="institution">Metrópole Digital - IMD/UFRN</div><div class="period">May 2022 – Dec 2024</div></div>'
        + '<div class="edu-card"><h4>Fast MBA: Leadership & People Management</h4><div class="institution">Fast MBA</div><div class="period">Feb 2025 – Mar 2025</div></div>'
        + '<div class="edu-section-title" style="margin-top:24px"><i class="fas fa-trophy" style="margin-right:8px"></i>Awards & Achievements</div>'
        + '<div class="award-item"><div class="award-badge"><i class="fas fa-star"></i></div><div class="award-text"><span class="award-label">Organizer:</span> GameLab Jam 2024.2</div></div>'
        + '<div class="award-item"><div class="award-badge"><i class="fas fa-trophy"></i></div><div class="award-text"><span class="award-label">Winner:</span> Hallowjam 2023 (Malleus Maleficarum)</div></div>'
        + '<div class="award-item"><div class="award-badge"><i class="fas fa-medal"></i></div><div class="award-text"><span class="award-label">Finalist:</span> Game Jam Plus 2022/2023 – Baroneza</div></div>'
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
        + '<a href="https://www.linkedin.com/in/joão-anisio-marinho-da-nobrega-096358204/" target="_blank" rel="noopener noreferrer" class="contact-social-link"><i class="fab fa-linkedin"></i> LinkedIn</a>'
        + '<a href="https://github.com/caduceusj" target="_blank" rel="noopener noreferrer" class="contact-social-link"><i class="fab fa-github"></i> GitHub</a>'
        + '<a href="https://caduceusj.itch.io/" target="_blank" rel="noopener noreferrer" class="contact-social-link"><i class="fab fa-itch-io"></i> Itch.io</a>'
        + '</div></div>';
}
