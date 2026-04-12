// ============================================
// ALL ITCH.IO GAMES + EXTRAS
// ============================================
var projects = [
    { id: 'almas', title: 'As Almas da Floresta', desc: 'Explore the forest and collect magical spells!', engine: 'Godot', img: 'assets/As_almas_da_floresta.png', url: 'https://caduceusj.itch.io/as-almas-da-floresta' },
    { id: 'gargantua', title: 'Gargantua', desc: 'Consegue ouvir ele te chamando?', engine: 'Unity', img: 'assets/Gargantua2.png', url: 'https://caduceusj.itch.io/gargantua' },
    { id: 'dodgeboy', title: 'Dodge Boy', desc: 'Earn your freedom!', engine: 'Godot', img: 'assets/DodgeBoy.png', url: 'https://caduceusj.itch.io/dodge-boy' },
    { id: 'fofoca', title: 'Fofoca', desc: 'Gossip around using the best of your abilities.', engine: 'Godot', img: 'assets/fofocaLogo.png', url: 'https://caduceusj.itch.io/fofoca' },
    { id: 'elph', title: 'E.L.P.H', desc: 'Unique game mechanics including elevator systems.', engine: 'Godot', img: 'assets/elph.png', url: 'https://caduceusj.itch.io/elph' },
    { id: 'malleusgame', title: 'Malleus Maleficarum', desc: 'Let the Witch Hunt Begin!', engine: 'Godot', img: 'assets/malleusmale.png', url: 'https://caduceusj.itch.io/malleus-maleficarum' },
    { id: 'baroneza', title: 'Baroneza', desc: 'First major project. Game Jam Plus Finalist.', engine: 'Godot', img: 'assets/Baroneza_arte_grande_01.png', url: 'https://caduceusj.itch.io/baroneza' },
    { id: 'bastille', title: 'Breaking Bastille', desc: 'A story of Justice.', engine: 'Unity', img: 'assets/Breaking Bastille.png', url: 'https://caduceusj.itch.io/breaking-bastille' },
    { id: 'cropfi', title: 'Crop-fi', desc: 'A chill game about gardening.', engine: 'Godot', img: 'assets/Cropfi.png', url: 'https://deadpix.itch.io/crop-fi' },
    { id: 'jamsession', title: 'Jam Session', desc: 'Enter the Zone in this Rhythm Game.', engine: 'Godot', img: 'assets/JamSession.png', url: 'https://caduceusj.itch.io/jam-session' },
    { id: 'awa', title: 'AWA', desc: 'Quimicas Malucas — chemical reaction point & click.', engine: 'Godot', img: 'assets/AwA Banner.png', url: 'https://caduceusj.itch.io/awa' },
    { id: 'tacalafoga', title: 'Taca-La-Foga', desc: 'Agiotagem Flamejante.', engine: 'Godot', img: 'assets/tacalafoga.png', url: 'https://caduceusj.itch.io/taca-la-foga' },
    { id: 'trendmancer', title: 'Trendmancer', desc: 'Simulation game.', engine: 'Godot', img: 'assets/trendmancer.png', url: 'https://caduceusj.itch.io/trendmancer' },
    { id: 'dinamina', title: 'Dinamina', desc: 'DINOSSAURO DNA.', engine: 'Godot', img: 'assets/dinamina.png', url: 'https://caduceusj.itch.io/dinamina' },
    { id: 'catcha', title: 'Catcha', desc: 'Feel the thrill! Because financial stability is overrated.', engine: 'Godot', img: 'assets/catcha.png', url: 'https://caduceusj.itch.io/catcha' },
    { id: 'conserto', title: 'Conserto AR-riscado', desc: 'Ventile seus amigos nesse calor.', engine: 'Godot', img: 'assets/Ar condicionado timido.jpg', url: 'https://caduceusj.itch.io/conserto-ar-riscado' },
    { id: 'quentura', title: 'Quentura', desc: 'Ventile seus amigos nesse calor da bexiga.', engine: 'Godot', img: 'assets/QuenturaMenu2.png', url: 'https://caduceusj.itch.io/quentura' },
    { id: 'nolegs', title: 'I Have No Legs But I Must Sit', desc: 'Enter the Chairrooms — procedural environments.', engine: 'Unity', img: 'assets/I have no legs.png', url: 'https://caduceusj.itch.io/i-have-no-legs' },
    { id: 'choose', title: 'Choose', desc: 'Qual lado voc\u00ea escolhe?', engine: 'Godot', img: 'assets/choose.png', url: 'https://caduceusj.itch.io/choose' },
    { id: 'supervisor', title: 'The Supervisor', desc: 'Your time is limited to conduct the tests. Good luck!', engine: 'Unity', img: 'assets/Supervisor2.png', url: 'https://bizarre-programming.itch.io/the-supervisor' },
    { id: '4tardes', title: '4 Tardes no GameLab', desc: 'Sobreviva com o controle do ar condicionado.', engine: 'Godot', img: 'assets/4tardes.png', url: 'https://caduceusj.itch.io/4-tardes-no-gamelab' },
    { id: 'germinarium', title: 'Germinarium', desc: 'Bloom a new hope.', engine: 'Godot', img: 'assets/germinarium.png', url: 'https://caduceusj.itch.io/germinarium' },
    { id: 'homesick', title: 'Home Sick', desc: 'Jogo desenvolvido em 48h para a PONG game jam.', engine: 'Godot', img: 'assets/homesick.png', url: 'https://caduceusj.itch.io/home-sick' },
    { id: 'picc', title: 'PICC Line Training', desc: 'Medical training simulation for PICC line in neonates.', engine: 'Unity/Godot', img: 'assets/piccBaby.jpg', url: null },
    { id: 'separatio', title: 'Separatio', desc: 'A VR project about Isolation.', engine: 'Godot', img: 'assets/VRGameGodot.png', url: null },
    { id: 'handtracking', title: 'Hand Tracking', desc: 'Finger Counting with Unity and Ultraleap.', engine: 'Unity', img: 'assets/FingerCounting.png', url: null },
    { id: 'songs', title: 'My Songs', desc: 'Songs I make for fun!', engine: 'BeepBox', img: 'assets/MySongs(hobby).png', url: 'https://music.youtube.com/browse/VLPLSwvU73KLgNjKyugBiZmka6N2yfk9-JMq' }
];

// ============================================
// SKILLS
// ============================================
var skills = [
    { name: 'Godot Engine', icon: 'fas fa-cube', level: 'Game Programmer', color: '#478cbf' },
    { name: 'Unity', icon: 'fab fa-unity', level: 'Game Programmer', color: '#aaaaaa' },
    { name: 'GDScript', icon: 'fas fa-scroll', level: 'Godot Script', color: '#478cbf' },
    { name: 'C#', icon: 'fas fa-hashtag', level: 'C# Programmer', color: '#68217a' },
    { name: 'C++', icon: 'fas fa-microchip', level: 'C++ Programmer', color: '#659bd3' },
    { name: 'Python', icon: 'fab fa-python', level: 'Python Programmer', color: '#ffd43b' },
    { name: 'Game Design', icon: 'fas fa-lightbulb', level: 'Designer', color: '#ff9800' },
    { name: 'Level Design', icon: 'fas fa-map', level: 'Level Designer', color: '#00e676' },
    { name: 'Porting', icon: 'fas fa-right-left', level: 'Cross-Platform', color: '#26c6da' },
    { name: 'VR/AR/MR', icon: 'fas fa-vr-cardboard', level: 'Immersive Tech', color: '#7c4dff' },
    { name: 'AI Programming', icon: 'fas fa-brain', level: 'Game AI', color: '#ff6e40' },
    { name: 'UI/UX Design', icon: 'fas fa-drafting-compass', level: 'UI/UX Designer', color: '#e040fb' },
    { name: 'Projection Mapping', icon: 'fas fa-display', level: 'CAVE Systems', color: '#00bcd4' },
    { name: 'HTML/CSS/JS', icon: 'fab fa-html5', level: 'Web Development', color: '#e34f26' },
    { name: 'Scrum/Jira', icon: 'fas fa-list-check', level: 'Project Management', color: '#0052cc' },
    { name: 'Adobe Suite', icon: 'fas fa-palette', level: 'Creative Tools', color: '#ff0000' },
    { name: 'Git & GitHub', icon: 'fab fa-git-alt', level: 'Version Control', color: '#f05032' }
];

// ============================================
// DESKTOP APPS
// ============================================
var desktopApps = [
    { id: 'about', title: 'about_me.txt', icon: 'fas fa-file-lines', iconColor: '#4fc3f7', windowTitle: 'about_me.txt - Notepad', width: 660, height: 500, statusText: 'Ln 1, Col 1' },
    { id: 'projects', title: 'My Projects', icon: 'fas fa-folder', iconColor: '#ffd54f', windowTitle: 'My Projects', width: 880, height: 600, statusText: projects.length + ' objects' },
    { id: 'malleus', title: 'Malleus\nMaleficarum', icon: 'fas fa-skull-crossbones', iconColor: '#ef5350', windowTitle: 'Malleus Maleficarum', width: 720, height: 560, statusText: 'Now on Steam!' },
    { id: 'skills', title: 'Skills', icon: 'fas fa-code', iconColor: '#81c784', windowTitle: 'Skills Manager', width: 760, height: 540, statusText: skills.length + ' skills' },
    { id: 'experience', title: 'Experience', icon: 'fas fa-briefcase', iconColor: '#ba68c8', windowTitle: 'Work Experience', width: 700, height: 560, statusText: '8 positions' },
    { id: 'education', title: 'Education', icon: 'fas fa-graduation-cap', iconColor: '#4db6ac', windowTitle: 'Education & Research', width: 760, height: 580, statusText: '5 degrees, 4 papers' },
    { id: 'linkedin', title: 'LinkedIn', icon: 'fab fa-linkedin', iconColor: '#0077b5', windowTitle: 'LinkedIn Profile', width: 600, height: 500, statusText: 'linkedin.com' },
    { id: 'contact', title: 'Contact', icon: 'fas fa-envelope', iconColor: '#ff8a65', windowTitle: 'Contact Me', width: 520, height: 460, statusText: 'Ready' }
];

// ============================================
// WINDOW CONTENT
// ============================================
function getWindowContent(appId) {
    switch (appId) {
        case 'about': return getAboutContent();
        case 'projects': return getProjectsContent();
        case 'malleus': return getMalleusContent();
        case 'skills': return getSkillsContent();
        case 'experience': return getExperienceContent();
        case 'education': return getEducationContent();
        case 'linkedin': return getLinkedInContent();
        case 'contact': return getContactContent();
        default: return '<div style="padding:20px">Content not found.</div>';
    }
}

function getAboutContent() {
    return '<div class="notepad-menu"><span>File</span><span>Edit</span><span>Format</span><span>View</span><span>Help</span></div>'
        + '<div class="notepad-content">'
        + '==============================================\n'
        + '  ABOUT ME \u2014 Jo\u00e3o Anisio\n'
        + '  Game Programmer & Designer\n'
        + '==============================================\n\n'
        + 'Name:     Jo\u00e3o Anisio Marinho da Nobrega\n'
        + 'Role:     Professor | Team Lead | Game Dev\n'
        + 'Location: Natal, RN, Brazil\n'
        + 'Engines:  Godot Engine | Unity\n'
        + 'Languages: PT (Native) | EN (Bilingual)\n\n'
        + '----------------------------------------------\n\n'
        + 'Hello! I\'m Jo\u00e3o Anisio, a Game Designer and\n'
        + 'Game Programmer passionate about turning\n'
        + 'creative ideas into fun and engaging experiences.\n\n'
        + 'I work primarily with Godot and Unity,\n'
        + 'developing both solo and collaborative projects.\n'
        + 'I love learning new things and I\'m always open\n'
        + 'to challenges that help me grow.\n\n'
        + 'Currently I\'m:\n\n'
        + '  > Substitute Professor of Digital Games (UFRN)\n'
        + '  > Team Lead at AKCIT (EMBRAPII Immersive Tech)\n'
        + '  > Game Programmer at Melted Peanut Studio\n'
        + '  > Solo Programmer on Malleus Maleficarum (Steam)\n\n'
        + 'I have experience with VR, Projection Mapping\n'
        + 'using CAVE systems in Unity, and published\n'
        + 'research at IEEE VR 2026.\n\n'
        + 'Lately I\'ve been deepening my studies in:\n\n'
        + '  > Porting (cross-platform deployment)\n'
        + '  > Level Design\n'
        + '  > Game Design\n'
        + '  > Scrum / Project Management (Jira, Taiga)\n\n'
        + 'Technical toolkit:\n\n'
        + '  > GDScript, C#, C++, Python\n'
        + '  > HTML5, CSS3, JavaScript\n'
        + '  > VR/AR/MR Development\n'
        + '  > Adobe Suite | Git & GitHub\n\n'
        + 'My goal is to transition fully into the game\n'
        + 'industry, bringing my creative ideas to life\n'
        + 'and building unique experiences that resonate\n'
        + 'with players worldwide.\n\n'
        + 'Let\'s connect and create something great!\n\n'
        + '----------------------------------------------\n'
        + 'Email:    joaoanisiomn@hotmail.com\n'
        + '          joaoanisiomn@gmail.com\n'
        + 'Phone:    +55 84 99708-1625\n'
        + 'LinkedIn: linkedin.com/in/jo\u00e3o-anisio-...\n'
        + 'GitHub:   github.com/caduceusj\n'
        + 'Itch.io:  caduceusj.itch.io\n'
        + 'Steam:    Malleus Maleficarum\n'
        + '----------------------------------------------</div>';
}

function getProjectsContent() {
    var items = '';
    for (var i = 0; i < projects.length; i++) {
        var p = projects[i];
        var action = p.url ? 'window.open(\'' + p.url.replace(/'/g, "\\'") + '\', \'_blank\')' : 'alert(\'Details available on request\')';
        items += '<div class="explorer-item" onclick="' + action + '">'
            + '<img class="explorer-item-thumb" src="' + p.img + '" alt="' + p.title + '" onerror="this.style.visibility=\'hidden\'">'
            + '<div class="explorer-item-label">' + p.title + '</div>'
            + '<div class="explorer-item-engine">' + p.engine + '</div>'
            + (p.url ? '<div class="explorer-item-badge">' + (p.url.includes('steam') ? 'Steam' : 'Play') + '</div>' : '')
            + '</div>';
    }
    return '<div class="explorer-toolbar"><div class="explorer-path"><i class="fas fa-folder-open"></i> C:\\Users\\JoaoAnisio\\Projects</div></div>'
        + '<div class="explorer-grid">' + items + '</div>';
}

function getMalleusContent() {
    return '<div class="featured-content">'
        + '<img class="featured-banner" src="assets/malleusmale.png" alt="Malleus Maleficarum">'
        + '<div class="featured-info">'
        + '<div class="featured-title">Malleus Maleficarum</div>'
        + '<div class="featured-meta">Engine: Godot 4.4 | Role: Solo Programmer | Now on Steam!</div>'
        + '<div class="featured-description">A dark metroidvania, born from the embers of a 2023 game jam (Hallowjam Winner), now rebuilt with greater ambition. As the Solo Programmer, channeling 3+ years of knowledge into intricate mechanics, diverse foes, and smooth gameplay with a unique visual identity.</div>'
        + '<div class="featured-tags"><span class="featured-tag">Godot 4.4</span><span class="featured-tag">Metroidvania</span><span class="featured-tag">Solo Programmer</span><span class="featured-tag">2D Platformer</span><span class="featured-tag">Dark Fantasy</span><span class="featured-tag">Steam Release</span></div>'
        + '<div class="featured-team">Team: Marcos Arthur, Luis Eduardo Sales, Gabriel Henrique Bessa, Guilherme Santos Rosas</div>'
        + '<a href="https://store.steampowered.com/app/3964560/Malleus_Maleficarum/" target="_blank" rel="noopener noreferrer" class="featured-link steam-link"><i class="fab fa-steam"></i> View on Steam</a>'
        + '<a href="https://caduceusj.itch.io/malleus-maleficarum" target="_blank" rel="noopener noreferrer" class="featured-link"><i class="fab fa-itch-io"></i> Itch.io</a>'
        + '</div></div>';
}

function getSkillsContent() {
    var c = '';
    for (var i = 0; i < skills.length; i++) {
        var s = skills[i];
        c += '<div class="skill-card"><div class="skill-card-icon" style="color:' + s.color + '"><i class="' + s.icon + '"></i></div><div class="skill-card-name">' + s.name + '</div><div class="skill-card-level">' + s.level + '</div></div>';
    }
    return '<div class="skills-grid">' + c + '</div>';
}

function getExperienceContent() {
    var jobs = [
        ['Substitute Professor \u2014 Digital Games', 'UFRN | Natal, Brazil', 'Aug 2025 \u2013 Present', 'Teaching Digital Games courses at the Federal University of Rio Grande do Norte.'],
        ['Team Lead R&D \u2014 AKCIT', 'Centro de Compet\u00eancia EMBRAPII em Tecnologias Imersivas | Natal', 'May 2025 \u2013 Present', 'Leading the AKCIT team focused on VR/MR applications for Art & Music. Managing a large team to deliver cutting-edge immersive experiences. Projection Mapping and Unity development. Scientific paper writing. Using Taiga/Jira with Scrum.'],
        ['Game Programmer', 'Melted Peanut Studio | Natal, Brazil', 'Jan 2024 \u2013 Present', 'Gameplay Programmer for "Almas da Floresta" with Godot Engine.'],
        ['Game Lab Monitor', 'Metr\u00f3pole Digital \u2014 IMD/UFRN | Natal', 'Nov 2023 \u2013 May 2025', 'Supervised the game lab, assisted students, maintained equipment, troubleshot technical problems.'],
        ['Serious Games Developer', 'UFRN | Natal, Brazil', 'Oct 2023 \u2013 May 2025', 'PICC line training simulation for neonates and Hand Tracking Finger Counting project.'],
        ['IT Technical Assistant', 'SEMURB | Natal, Brazil', 'Sep 2022 \u2013 Nov 2023', 'Printer configuration, electronic file formatting, software maintenance support.'],
        ['IT Support Technician', 'BTN Solu\u00e7\u00f5es | Natal, Brazil', 'Mar 2022 \u2013 Jun 2022', 'Network deployment, user support, PC & server troubleshooting. Gained broad software and organizational knowledge.'],
        ['Game Developer For Love', 'Natal, Brazil', '2021 \u2013 Present', 'Numerous game jams as lead programmer or designer. 23+ projects on Itch.io. Solo programmer on Malleus Maleficarum (Steam).']
    ];
    var h = '<div class="experience-content"><div class="timeline">';
    for (var i = 0; i < jobs.length; i++) {
        h += '<div class="timeline-item"><h3>' + jobs[i][0] + '</h3><div class="company">' + jobs[i][1] + '</div><div class="period">' + jobs[i][2] + '</div><p>' + jobs[i][3] + '</p></div>';
    }
    h += '</div><div class="linkedin-cta"><a href="https://www.linkedin.com/in/jo%C3%A3o-anisio-marinho-da-nobrega-096358204/" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i> View full profile on LinkedIn</a></div></div>';
    return h;
}

function getEducationContent() {
    return '<div class="education-content">'
        // Academic
        + '<div class="edu-section-title"><i class="fas fa-scroll" style="margin-right:6px"></i>Academic</div>'
        + '<div class="edu-card"><h4>Master\'s \u2014 Product & Process Development</h4><div class="institution">UFRN</div><div class="period">Mar 2025 \u2013 Jun 2027</div></div>'
        + '<div class="edu-card"><h4>Bachelor of Information Technology</h4><div class="institution">UFRN</div><div class="period">2020 \u2013 2024</div></div>'
        + '<div class="edu-card"><h4>Specialized Studies in Digital Games</h4><div class="institution">Metr\u00f3pole Digital \u2014 IMD/UFRN</div><div class="period">May 2022 \u2013 Dec 2024</div></div>'
        + '<div class="edu-card"><h4>Fast MBA: Leadership & People Management</h4><div class="institution">Fast MBA</div><div class="period">Feb 2025 \u2013 Mar 2025</div></div>'
        + '<div class="edu-card"><h4>Customer Service Certificate</h4><div class="institution">SEBRAE</div><div class="period">Mar 2022</div></div>'
        // Research
        + '<div class="edu-section-title" style="margin-top:12px"><i class="fas fa-flask" style="margin-right:6px"></i>Research & Publications (IEEE VR 2026)</div>'
        + '<div class="research-item"><span class="research-venue">[Paper]</span> "Eliciting Care in VR: A Multi-Modal Pseudo-Haptic Approach to Virtual Object Fragility" \u2014 Nobrega, Freitas, Melo, Lucena, Souza (N=31 study)</div>'
        + '<div class="research-item"><span class="research-venue">[Demo]</span> "Hands-on Fragility: A Multi-Modal Pseudo-Haptic System for Delicate Interaction in VR" \u2014 AKCIT-IMD/UFRN</div>'
        + '<div class="research-item"><span class="research-venue">[Full Paper]</span> "Draught, Fish, and Presence: Teaching Semi-Arid Ecology with a CAVE" \u2014 4-wall CAVE installation, Unity HDRP (N=38 survey)</div>'
        + '<div class="research-item"><span class="research-venue">[Tutorial]</span> "Rapid VR Prototyping for Academia and Industry: Building Interactive Experiences with Godot and XR Tools" \u2014 3-hour tutorial</div>'
        // Awards
        + '<div class="edu-section-title" style="margin-top:12px"><i class="fas fa-trophy" style="margin-right:6px"></i>Awards & Certifications</div>'
        + '<div class="award-item"><div class="award-badge"><i class="fas fa-star"></i></div><div class="award-text"><span class="award-label">IEEE VR 2026:</span> Paper + Demo + Full Paper + Tutorial</div></div>'
        + '<div class="award-item"><div class="award-badge"><i class="fas fa-star"></i></div><div class="award-text"><span class="award-label">SBGAMES/SIBGRAPI/SVR 2025:</span> Conference Participation</div></div>'
        + '<div class="award-item"><div class="award-badge"><i class="fas fa-star"></i></div><div class="award-text"><span class="award-label">Organizer:</span> GameLab Jam 2024.2</div></div>'
        + '<div class="award-item"><div class="award-badge"><i class="fas fa-trophy"></i></div><div class="award-text"><span class="award-label">Winner:</span> Hallowjam 2023 (Malleus Maleficarum)</div></div>'
        + '<div class="award-item"><div class="award-badge"><i class="fas fa-medal"></i></div><div class="award-text"><span class="award-label">Finalist:</span> Game Jam Plus 2022/2023 \u2013 Baroneza</div></div>'
        + '<div class="award-item"><div class="award-badge"><i class="fas fa-certificate"></i></div><div class="award-text"><span class="award-label">Participant:</span> Game Jam IP Challenge 2023</div></div>'
        + '<div class="award-item"><div class="award-badge"><i class="fas fa-certificate"></i></div><div class="award-text"><span class="award-label">Participant:</span> Game Jam+ 2022</div></div>'
        + '</div>';
}

function getLinkedInContent() {
    return '<div class="linkedin-content">'
        + '<div class="linkedin-header">'
        + '<i class="fab fa-linkedin" style="font-size:48px;color:#0077b5;margin-bottom:8px"></i>'
        + '<h2>Jo\u00e3o Anisio Marinho da Nobrega</h2>'
        + '<p>Professor de Jogos Digitais | Team Lead - AKCIT | Desenvolvedor Godot & Unity</p>'
        + '<p style="font-size:10px;color:#888;margin-top:2px">Natal, Rio Grande do Norte, Brasil</p>'
        + '</div>'
        + '<div class="linkedin-summary">'
        + 'Ol\u00e1! Sou Game Designer e Programador de Jogos, apaixonado por transformar ideias criativas em experi\u00eancias divertidas e envolventes. Trabalho principalmente com Godot e Unity. Tenho experi\u00eancia com Realidade Virtual e Proje\u00e7\u00e3o Mapeada usando CAVE Systems em Unity. L\u00edder da equipe AKCIT focada em aplica\u00e7\u00f5es de VR/MR para Arte e M\u00fasica.'
        + '</div>'
        + '<div class="linkedin-langs"><b>Languages:</b> Portugu\u00eas (Native) | English (Bilingual)</div>'
        + '<div style="margin-top:6px;font-size:10px;color:#666"><b>Key Skills:</b> VR \u00b7 AR \u00b7 Mixed Reality \u00b7 Godot \u00b7 Unity \u00b7 C# \u00b7 Scrum</div>'
        + '<a href="https://www.linkedin.com/in/jo%C3%A3o-anisio-marinho-da-nobrega-096358204/" target="_blank" rel="noopener noreferrer" class="linkedin-open-btn"><i class="fab fa-linkedin"></i> Open Full LinkedIn Profile & Posts</a>'
        + '</div>';
}

function getContactContent() {
    return '<div class="contact-content">'
        + '<div class="contact-icon"><i class="fas fa-paper-plane"></i></div>'
        + '<div class="contact-title">Get in Touch</div>'
        + '<div class="contact-subtitle">Let\'s discuss projects, collaborations, or opportunities!</div>'
        + '<a href="mailto:joaoanisiomn@hotmail.com" class="contact-email-btn"><i class="fas fa-envelope"></i> joaoanisiomn@hotmail.com</a>'
        + '<a href="mailto:joaoanisiomn@gmail.com" class="contact-email-btn"><i class="fas fa-envelope"></i> joaoanisiomn@gmail.com</a>'
        + '<div class="contact-info-row"><i class="fas fa-phone"></i> +55 84 99708-1625</div>'
        + '<div class="contact-socials">'
        + '<a href="https://www.linkedin.com/in/jo%C3%A3o-anisio-marinho-da-nobrega-096358204/" target="_blank" rel="noopener noreferrer" class="contact-social-link"><i class="fab fa-linkedin"></i> LinkedIn</a>'
        + '<a href="https://github.com/caduceusj" target="_blank" rel="noopener noreferrer" class="contact-social-link"><i class="fab fa-github"></i> GitHub</a>'
        + '<a href="https://caduceusj.itch.io/" target="_blank" rel="noopener noreferrer" class="contact-social-link"><i class="fab fa-itch-io"></i> Itch.io</a>'
        + '<a href="https://store.steampowered.com/app/3964560/Malleus_Maleficarum/" target="_blank" rel="noopener noreferrer" class="contact-social-link"><i class="fab fa-steam"></i> Steam</a>'
        + '</div></div>';
}
