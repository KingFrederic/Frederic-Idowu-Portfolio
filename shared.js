/* ════════════════════════════════════════════════════════════════
   FRÉDÉRIC IDOWU OLUWASOLA
   Shared client logic — runs on every page.

   Provides:
   • Lucide icon hydration (with aria-hidden hardening)
   • Navbar scroll state
   • Mobile menu (ARIA + Esc)
   • Scroll-reveal IntersectionObserver
   • 3-D mouse tilt for [data-tilt] elements
   • Magnetic hover for [data-magnet] buttons
   • Counter rollup for [data-count]
   • Respects prefers-reduced-motion
   ════════════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function ready(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    /* ── Lucide hydration ─────────────────────────────────────── */
    function hydrateLucide() {
        document.querySelectorAll('[data-lucide]').forEach(i => {
            if (!i.hasAttribute('aria-hidden')) i.setAttribute('aria-hidden', 'true');
        });
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    }

    /* ── Navbar scroll state ──────────────────────────────────── */
    function bindNavScroll() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        const startsTransparent = navbar.classList.contains('nav-transparent');
        if (!startsTransparent) return; // Sub-pages stay blurred always.
        const onScroll = () => {
            if (window.pageYOffset > 80) {
                navbar.classList.remove('nav-transparent');
                navbar.classList.add('nav-blur');
            } else {
                navbar.classList.add('nav-transparent');
                navbar.classList.remove('nav-blur');
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ── Mobile menu ──────────────────────────────────────────── */
    function bindMobileMenu() {
        const menuBtn = document.getElementById('mobileMenuBtn');
        const closeBtn = document.getElementById('closeMobileMenu');
        const mobileMenu = document.getElementById('mobileMenu');
        if (!menuBtn || !closeBtn || !mobileMenu) return;

        const open = () => {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.setAttribute('aria-hidden', 'false');
            menuBtn.setAttribute('aria-expanded', 'true');
            closeBtn.focus();
        };
        const close = () => {
            mobileMenu.classList.add('translate-x-full');
            mobileMenu.setAttribute('aria-hidden', 'true');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.focus();
        };
        menuBtn.addEventListener('click', open);
        closeBtn.addEventListener('click', close);
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('translate-x-full')) close();
        });
    }

    /* ── Scroll reveal ────────────────────────────────────────── */
    function bindReveals() {
        const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .clip-reveal, .diplomatic-underline');
        if (!targets.length) return;
        if (reduceMotion || !('IntersectionObserver' in window)) {
            targets.forEach(el => el.classList.add('visible'));
            return;
        }
        const io = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        targets.forEach(el => io.observe(el));
    }

    /* ── 3-D mouse tilt ───────────────────────────────────────── */
    function bindTilt() {
        if (reduceMotion) return;
        const cards = document.querySelectorAll('[data-tilt]');
        if (!cards.length) return;

        const max = 9; // degrees
        cards.forEach(card => {
            let rect = null;
            let raf = 0;

            function onEnter() { rect = card.getBoundingClientRect(); }
            function onMove(e) {
                if (!rect) rect = card.getBoundingClientRect();
                cancelAnimationFrame(raf);
                raf = requestAnimationFrame(() => {
                    const x = (e.clientX - rect.left) / rect.width;
                    const y = (e.clientY - rect.top) / rect.height;
                    const rx = (0.5 - y) * max;
                    const ry = (x - 0.5) * max;
                    card.style.transform =
                        `perspective(1100px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(0)`;
                });
            }
            function onLeave() {
                cancelAnimationFrame(raf);
                card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0)';
                rect = null;
            }
            card.addEventListener('mouseenter', onEnter);
            card.addEventListener('mousemove', onMove);
            card.addEventListener('mouseleave', onLeave);
        });
    }

    /* ── Magnetic hover ───────────────────────────────────────── */
    function bindMagnet() {
        if (reduceMotion) return;
        const els = document.querySelectorAll('[data-magnet]');
        if (!els.length) return;

        const strength = 0.25;
        els.forEach(el => {
            let rect = null, raf = 0;
            function move(e) {
                if (!rect) rect = el.getBoundingClientRect();
                cancelAnimationFrame(raf);
                raf = requestAnimationFrame(() => {
                    const cx = rect.left + rect.width / 2;
                    const cy = rect.top + rect.height / 2;
                    const dx = (e.clientX - cx) * strength;
                    const dy = (e.clientY - cy) * strength;
                    el.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`;
                });
            }
            function reset() {
                cancelAnimationFrame(raf);
                el.style.transform = 'translate(0, 0)';
                rect = null;
            }
            el.addEventListener('mouseenter', () => { rect = el.getBoundingClientRect(); });
            el.addEventListener('mousemove', move);
            el.addEventListener('mouseleave', reset);
        });
    }

    /* ── Counter rollup ───────────────────────────────────────── */
    function bindCounters() {
        const els = document.querySelectorAll('[data-count]');
        if (!els.length) return;
        if (reduceMotion || !('IntersectionObserver' in window)) {
            els.forEach(el => { el.textContent = el.getAttribute('data-count'); });
            return;
        }
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = parseFloat(el.getAttribute('data-count'));
                const decimals = (el.getAttribute('data-count').split('.')[1] || '').length;
                const duration = 1400;
                const start = performance.now();
                function tick(now) {
                    const t = Math.min(1, (now - start) / duration);
                    const eased = 1 - Math.pow(1 - t, 3);
                    const val = (target * eased).toFixed(decimals);
                    el.textContent = val;
                    if (t < 1) requestAnimationFrame(tick);
                    else el.textContent = target;
                }
                requestAnimationFrame(tick);
                io.unobserve(el);
            });
        }, { threshold: 0.4 });
        els.forEach(el => io.observe(el));
    }

    /* ── Boot ─────────────────────────────────────────────────── */
    ready(() => {
        hydrateLucide();
        bindNavScroll();
        bindMobileMenu();
        bindReveals();
        bindTilt();
        bindMagnet();
        bindCounters();
    });

    // Re-hydrate icons when lucide finishes loading async (defer)
    window.addEventListener('load', () => {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    });
})();
