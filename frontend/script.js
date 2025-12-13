
const pill = document.getElementById("pill");
const email = document.getElementById("email");

email.addEventListener("input", () => {
    pill.classList.toggle("expanded", email.value.trim().length > 0);
});

document.addEventListener("mousedown", (e) => {
    if (!pill.contains(e.target) && email.value.trim() === "") {
        pill.classList.remove("expanded");
    }
});
// Background video fallback handling and reduced-motion support
const bgVideo = document.getElementById('bgVideo');
const fallbackEl = document.querySelector('.bg-video-fallback');
const overlayEl = document.querySelector('.bg-overlay');

function useVideo() {
    if (fallbackEl) fallbackEl.style.opacity = '0';
    if (bgVideo) bgVideo.style.opacity = '1';
    if (overlayEl) overlayEl.style.opacity = '1';
}
function showFallback() {
    if (fallbackEl) fallbackEl.style.opacity = '1';
    if (bgVideo) bgVideo.style.opacity = '0';
    if (overlayEl) overlayEl.style.opacity = '1';
}

// Check user preference for reduced motion
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // hide heavy animation and rely on fallback gradient
    showFallback();
} else if (bgVideo) {
    // If the video can play, show it; otherwise show fallback
    bgVideo.addEventListener('canplay', useVideo);
    bgVideo.addEventListener('canplaythrough', useVideo);
    bgVideo.addEventListener('error', showFallback);
    bgVideo.addEventListener('stalled', showFallback);

    // Quick timeout: if still not playing after 2s, use fallback
    setTimeout(() => {
        if (!bgVideo || bgVideo.readyState < 3) showFallback();
    }, 2000);
}