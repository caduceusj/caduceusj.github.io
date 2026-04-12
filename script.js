var windowState = {};
var zIndexCounter = 100;
var activeWindowId = null;
var windowOffset = 0;

function openWindow(appId) {
    if (windowState[appId]) {
        if (windowState[appId].isMinimized) restoreWindow(appId);
        focusWindow(appId);
        return;
    }
    var app = null;
    for (var i = 0; i < desktopApps.length; i++) {
        if (desktopApps[i].id === appId) { app = desktopApps[i]; break; }
    }
    if (!app) return;

    var w = document.createElement('div');
    w.className = 'window desktop-window';
    w.id = 'window-' + appId;

    var mobile = window.innerWidth <= 768;
    if (mobile) {
        w.style.cssText = 'left:0;top:0;width:100%;height:100%';
    } else {
        w.style.width = app.width + 'px';
        w.style.height = app.height + 'px';
        var d = document.getElementById('desktop');
        w.style.left = Math.max(40, (d.clientWidth - app.width) / 2 + windowOffset) + 'px';
        w.style.top = Math.max(20, (d.clientHeight - app.height) / 2 + windowOffset - 24) + 'px';
    }

    var content = getWindowContent(appId);
    w.innerHTML = '<div class="title-bar"><div class="title-bar-text">' + app.windowTitle + '</div><div class="title-bar-controls"><button aria-label="Minimize"></button><button aria-label="Maximize"></button><button aria-label="Close"></button></div></div>'
        + '<div class="window-body">' + content + '</div>'
        + (app.statusText ? '<div class="status-bar"><p class="status-bar-field">' + app.statusText + '</p></div>' : '');

    w.querySelector('button[aria-label="Close"]').addEventListener('click', function(e) { e.stopPropagation(); closeWindow(appId); });
    w.querySelector('button[aria-label="Minimize"]').addEventListener('click', function(e) { e.stopPropagation(); minimizeWindow(appId); });
    w.querySelector('button[aria-label="Maximize"]').addEventListener('click', function(e) { e.stopPropagation(); maximizeWindow(appId); });
    w.addEventListener('mousedown', function() { focusWindow(appId); });

    document.getElementById('windows-container').appendChild(w);
    windowState[appId] = { element: w, isMinimized: false, isMaximized: mobile, prevBounds: null, app: app };
    focusWindow(appId);
    updateTaskbar();
    initDrag(w, appId);
    windowOffset = (windowOffset + 30) % 150;
    document.getElementById('start-menu').classList.add('hidden');
}

function closeWindow(id) { var s = windowState[id]; if (!s) return; s.element.remove(); delete windowState[id]; if (activeWindowId === id) activeWindowId = null; updateTaskbar(); }

function minimizeWindow(id) { var s = windowState[id]; if (!s) return; s.isMinimized = true; s.element.classList.add('minimized'); if (activeWindowId === id) activeWindowId = null; updateTaskbar(); }

function restoreWindow(id) { var s = windowState[id]; if (!s) return; s.isMinimized = false; s.element.classList.remove('minimized'); focusWindow(id); updateTaskbar(); }

function maximizeWindow(id) {
    var s = windowState[id]; if (!s) return;
    if (s.isMaximized) {
        if (s.prevBounds) { s.element.style.left = s.prevBounds.left; s.element.style.top = s.prevBounds.top; s.element.style.width = s.prevBounds.width; s.element.style.height = s.prevBounds.height; }
        s.element.classList.remove('maximized'); s.isMaximized = false;
    } else {
        s.prevBounds = { left: s.element.style.left, top: s.element.style.top, width: s.element.style.width, height: s.element.style.height };
        s.element.classList.add('maximized'); s.isMaximized = true;
    }
}

function focusWindow(id) {
    var ids = Object.keys(windowState);
    for (var i = 0; i < ids.length; i++) windowState[ids[i]].element.classList.remove('focused');
    var s = windowState[id]; if (!s) return;
    zIndexCounter++; s.element.style.zIndex = zIndexCounter; s.element.classList.add('focused'); activeWindowId = id; updateTaskbar();
}

function initDrag(el, appId) {
    var bar = el.querySelector('.title-bar');
    var dragging = false, sx, sy, sl, st;
    function onStart(e) {
        if (window.innerWidth <= 768) return;
        var s = windowState[appId]; if (s && s.isMaximized) return;
        if (e.target.closest('.title-bar-controls')) return;
        dragging = true; var ev = e.touches ? e.touches[0] : e;
        sx = ev.clientX; sy = ev.clientY; sl = el.offsetLeft; st = el.offsetTop;
        document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onEnd);
        document.addEventListener('touchmove', onMove, { passive: false }); document.addEventListener('touchend', onEnd);
    }
    function onMove(e) { if (!dragging) return; e.preventDefault(); var ev = e.touches ? e.touches[0] : e; el.style.left = (sl + ev.clientX - sx) + 'px'; el.style.top = (st + ev.clientY - sy) + 'px'; }
    function onEnd() { dragging = false; document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onEnd); document.removeEventListener('touchmove', onMove); document.removeEventListener('touchend', onEnd); }
    bar.addEventListener('mousedown', onStart);
    bar.addEventListener('touchstart', onStart, { passive: true });
}

function updateTaskbar() {
    var c = document.getElementById('taskbar-apps'); c.innerHTML = '';
    var ids = Object.keys(windowState);
    for (var i = 0; i < ids.length; i++) {
        var id = ids[i], s = windowState[id], b = document.createElement('button');
        b.className = 'taskbar-app-btn'; if (id === activeWindowId && !s.isMinimized) b.classList.add('active');
        b.innerHTML = '<i class="' + s.app.icon + '" style="color:' + s.app.iconColor + '"></i> ' + s.app.windowTitle;
        b.addEventListener('click', (function(d) { return function() { var x = windowState[d]; if (!x) return; if (x.isMinimized) restoreWindow(d); else if (d === activeWindowId) minimizeWindow(d); else focusWindow(d); }; })(id));
        c.appendChild(b);
    }
}

function populateDesktop() {
    var c = document.getElementById('desktop-icons');
    for (var i = 0; i < desktopApps.length; i++) {
        var a = desktopApps[i], ic = document.createElement('div');
        ic.className = 'desktop-icon';
        ic.innerHTML = '<div class="desktop-icon-img"><i class="' + a.icon + '" style="color:' + a.iconColor + '"></i></div><div class="desktop-icon-label">' + a.title.replace(/\n/g, '<br>') + '</div>';
        ic.addEventListener('click', (function(id) { return function() { openWindow(id); }; })(a.id));
        c.appendChild(ic);
    }
}

function populateStartMenu() {
    var c = document.getElementById('start-menu-items');
    for (var i = 0; i < desktopApps.length; i++) {
        var a = desktopApps[i], it = document.createElement('div');
        it.className = 'start-menu-item';
        it.innerHTML = '<i class="' + a.icon + '" style="color:' + a.iconColor + '"></i> ' + a.windowTitle;
        it.addEventListener('click', (function(id) { return function() { openWindow(id); }; })(a.id));
        c.appendChild(it);
    }
}

function updateClock() {
    var n = new Date(), h = n.getHours(), m = n.getMinutes(), ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12; if (h === 0) h = 12;
    document.getElementById('clock').textContent = h + ':' + (m < 10 ? '0' : '') + m + ' ' + ap;
}

document.addEventListener('DOMContentLoaded', function() {
    populateDesktop(); populateStartMenu(); updateClock(); setInterval(updateClock, 30000);
    var sb = document.getElementById('start-btn'), sm = document.getElementById('start-menu');
    sb.addEventListener('click', function(e) { e.stopPropagation(); sm.classList.toggle('hidden'); });
    document.addEventListener('click', function(e) { if (!sm.contains(e.target) && e.target !== sb && !sb.contains(e.target)) sm.classList.add('hidden'); });
    setTimeout(function() { var b = document.getElementById('boot-screen'); if (b) b.remove(); }, 3500);
    setTimeout(function() { openWindow('about'); }, 3200);
});
