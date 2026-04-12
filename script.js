// ============================================
// WINDOW MANAGER STATE
// ============================================
var windowState = {};
var zIndexCounter = 100;
var activeWindowId = null;
var windowOffset = 0;

// ============================================
// OPEN WINDOW
// ============================================
function openWindow(appId) {
    if (windowState[appId]) {
        if (windowState[appId].isMinimized) {
            restoreWindow(appId);
        }
        focusWindow(appId);
        return;
    }

    var app = null;
    for (var i = 0; i < desktopApps.length; i++) {
        if (desktopApps[i].id === appId) { app = desktopApps[i]; break; }
    }
    if (!app) return;

    var windowEl = document.createElement('div');
    windowEl.className = 'window desktop-window';
    windowEl.id = 'window-' + appId;

    var isMobile = window.innerWidth <= 768;
    if (isMobile) {
        windowEl.style.left = '0';
        windowEl.style.top = '0';
        windowEl.style.width = '100%';
        windowEl.style.height = '100%';
    } else {
        windowEl.style.width = app.width + 'px';
        windowEl.style.height = app.height + 'px';
        var desktop = document.getElementById('desktop');
        var x = Math.max(40, (desktop.clientWidth - app.width) / 2 + windowOffset);
        var y = Math.max(20, (desktop.clientHeight - app.height) / 2 + windowOffset - 24);
        windowEl.style.left = x + 'px';
        windowEl.style.top = y + 'px';
    }

    var content = getWindowContent(appId);

    windowEl.innerHTML = '<div class="title-bar">'
        + '<div class="title-bar-text">' + app.windowTitle + '</div>'
        + '<div class="title-bar-controls">'
        + '<button aria-label="Minimize"></button>'
        + '<button aria-label="Maximize"></button>'
        + '<button aria-label="Close"></button>'
        + '</div></div>'
        + '<div class="window-body">' + content + '</div>'
        + (app.statusText ? '<div class="status-bar"><p class="status-bar-field">' + app.statusText + '</p></div>' : '');

    var closeBtn = windowEl.querySelector('button[aria-label="Close"]');
    var minBtn = windowEl.querySelector('button[aria-label="Minimize"]');
    var maxBtn = windowEl.querySelector('button[aria-label="Maximize"]');

    closeBtn.addEventListener('click', function(e) { e.stopPropagation(); closeWindow(appId); });
    minBtn.addEventListener('click', function(e) { e.stopPropagation(); minimizeWindow(appId); });
    maxBtn.addEventListener('click', function(e) { e.stopPropagation(); maximizeWindow(appId); });

    windowEl.addEventListener('mousedown', function() { focusWindow(appId); });

    document.getElementById('windows-container').appendChild(windowEl);

    windowState[appId] = {
        element: windowEl,
        isMinimized: false,
        isMaximized: isMobile,
        prevBounds: null,
        app: app
    };

    focusWindow(appId);
    updateTaskbar();
    initDrag(windowEl, appId);

    windowOffset = (windowOffset + 30) % 150;
    document.getElementById('start-menu').classList.add('hidden');
}

// ============================================
// CLOSE / MINIMIZE / MAXIMIZE / RESTORE
// ============================================
function closeWindow(appId) {
    var state = windowState[appId];
    if (!state) return;
    state.element.remove();
    delete windowState[appId];
    if (activeWindowId === appId) activeWindowId = null;
    updateTaskbar();
}

function minimizeWindow(appId) {
    var state = windowState[appId];
    if (!state) return;
    state.isMinimized = true;
    state.element.classList.add('minimized');
    if (activeWindowId === appId) activeWindowId = null;
    updateTaskbar();
}

function restoreWindow(appId) {
    var state = windowState[appId];
    if (!state) return;
    state.isMinimized = false;
    state.element.classList.remove('minimized');
    focusWindow(appId);
    updateTaskbar();
}

function maximizeWindow(appId) {
    var state = windowState[appId];
    if (!state) return;

    if (state.isMaximized) {
        if (state.prevBounds) {
            state.element.style.left = state.prevBounds.left;
            state.element.style.top = state.prevBounds.top;
            state.element.style.width = state.prevBounds.width;
            state.element.style.height = state.prevBounds.height;
        }
        state.element.classList.remove('maximized');
        state.isMaximized = false;
    } else {
        state.prevBounds = {
            left: state.element.style.left,
            top: state.element.style.top,
            width: state.element.style.width,
            height: state.element.style.height
        };
        state.element.classList.add('maximized');
        state.isMaximized = true;
    }
}

function focusWindow(appId) {
    var ids = Object.keys(windowState);
    for (var i = 0; i < ids.length; i++) {
        windowState[ids[i]].element.classList.remove('focused');
    }
    var state = windowState[appId];
    if (!state) return;
    zIndexCounter++;
    state.element.style.zIndex = zIndexCounter;
    state.element.classList.add('focused');
    activeWindowId = appId;
    updateTaskbar();
}

// ============================================
// DRAG
// ============================================
function initDrag(windowEl, appId) {
    var titlebar = windowEl.querySelector('.title-bar');
    var isDragging = false;
    var startX, startY, startLeft, startTop;

    function onStart(e) {
        if (window.innerWidth <= 768) return;
        var state = windowState[appId];
        if (state && state.isMaximized) return;
        if (e.target.closest('.title-bar-controls')) return;

        isDragging = true;
        var evt = e.touches ? e.touches[0] : e;
        startX = evt.clientX;
        startY = evt.clientY;
        startLeft = windowEl.offsetLeft;
        startTop = windowEl.offsetTop;

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onEnd);
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onEnd);
    }

    function onMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        var evt = e.touches ? e.touches[0] : e;
        windowEl.style.left = (startLeft + evt.clientX - startX) + 'px';
        windowEl.style.top = (startTop + evt.clientY - startY) + 'px';
    }

    function onEnd() {
        isDragging = false;
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onEnd);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onEnd);
    }

    titlebar.addEventListener('mousedown', onStart);
    titlebar.addEventListener('touchstart', onStart, { passive: true });
}

// ============================================
// TASKBAR
// ============================================
function updateTaskbar() {
    var container = document.getElementById('taskbar-apps');
    container.innerHTML = '';

    var ids = Object.keys(windowState);
    for (var i = 0; i < ids.length; i++) {
        var appId = ids[i];
        var state = windowState[appId];
        var btn = document.createElement('button');
        btn.className = 'taskbar-app-btn';
        if (appId === activeWindowId && !state.isMinimized) {
            btn.classList.add('active');
        }
        btn.innerHTML = '<i class="' + state.app.icon + '" style="color:' + state.app.iconColor + '"></i> ' + state.app.windowTitle;
        btn.setAttribute('data-app', appId);
        btn.addEventListener('click', (function(id) {
            return function() {
                var s = windowState[id];
                if (!s) return;
                if (s.isMinimized) { restoreWindow(id); }
                else if (id === activeWindowId) { minimizeWindow(id); }
                else { focusWindow(id); }
            };
        })(appId));
        container.appendChild(btn);
    }
}

// ============================================
// DESKTOP ICONS
// ============================================
function populateDesktop() {
    var container = document.getElementById('desktop-icons');
    for (var i = 0; i < desktopApps.length; i++) {
        var app = desktopApps[i];
        var icon = document.createElement('div');
        icon.className = 'desktop-icon';
        icon.innerHTML = '<div class="desktop-icon-img"><i class="' + app.icon + '" style="color:' + app.iconColor + '"></i></div>'
            + '<div class="desktop-icon-label">' + app.title.replace(/\n/g, '<br>') + '</div>';
        icon.setAttribute('data-app', app.id);
        icon.addEventListener('click', (function(id) {
            return function() { openWindow(id); };
        })(app.id));
        container.appendChild(icon);
    }
}

// ============================================
// START MENU
// ============================================
function populateStartMenu() {
    var container = document.getElementById('start-menu-items');
    for (var i = 0; i < desktopApps.length; i++) {
        var app = desktopApps[i];
        var item = document.createElement('div');
        item.className = 'start-menu-item';
        item.innerHTML = '<i class="' + app.icon + '" style="color:' + app.iconColor + '"></i> ' + app.windowTitle;
        item.addEventListener('click', (function(id) {
            return function() { openWindow(id); };
        })(app.id));
        container.appendChild(item);
    }
}

// ============================================
// CLOCK
// ============================================
function updateClock() {
    var clock = document.getElementById('clock');
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    if (hours === 0) hours = 12;
    var timeStr = hours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + ampm;
    clock.textContent = timeStr;
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    populateDesktop();
    populateStartMenu();
    updateClock();
    setInterval(updateClock, 30000);

    var startBtn = document.getElementById('start-btn');
    var startMenu = document.getElementById('start-menu');

    startBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        startMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', function(e) {
        if (!startMenu.contains(e.target) && e.target !== startBtn && !startBtn.contains(e.target)) {
            startMenu.classList.add('hidden');
        }
    });

    setTimeout(function() {
        var boot = document.getElementById('boot-screen');
        if (boot) boot.remove();
    }, 3500);

    setTimeout(function() {
        openWindow('about');
    }, 3200);
});
