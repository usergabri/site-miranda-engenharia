import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Vídeos: tocam só quando visíveis ---------- */
function setupVideos() {
  const hero = document.querySelector<HTMLVideoElement>('[data-hero-video]');
  if (hero && reduceMotion) {
    hero.removeAttribute('autoplay');
    hero.pause();
  }

  document.querySelectorAll<HTMLVideoElement>('[data-autoplay-visible]').forEach((video) => {
    const toggle = video.parentElement?.querySelector<HTMLButtonElement>('[data-video-toggle]');
    let userPaused = reduceMotion;

    const sync = () => {
      const paused = video.paused;
      toggle?.classList.toggle('is-paused', paused);
      toggle?.setAttribute('aria-label', paused ? 'Reproduzir vídeo' : 'Pausar vídeo');
    };
    video.addEventListener('play', sync);
    video.addEventListener('pause', sync);
    sync();

    toggle?.addEventListener('click', () => {
      if (video.paused) {
        userPaused = false;
        video.play().catch(() => {});
      } else {
        userPaused = true;
        video.pause();
      }
    });

    new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused) {
          video.preload = 'auto';
          video.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          video.pause();
        }
      },
      { threshold: 0.35 },
    ).observe(video);
  });
}

/* ---------- Contadores ---------- */
function formatNumber(n: number) {
  return Math.round(n).toLocaleString('pt-BR');
}

function setupMotion() {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Rolagem suave
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  window.addEventListener('menu:open', () => lenis.stop());
  window.addEventListener('menu:close', () => lenis.start());

  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href')!;
      const target = id === '#inicio' ? 0 : document.querySelector<HTMLElement>(id);
      if (target === null) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: target === 0 ? 0 : -80, duration: 1.4 });
      history.replaceState(null, '', id);
    });
  });

  /* Hero */
  const heroWords = gsap.utils.toArray<HTMLElement>('[data-hero-word]');
  const heroVideo = document.querySelector('[data-hero-video]');
  const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
  if (heroVideo) intro.fromTo(heroVideo, { scale: 1.18 }, { scale: 1, duration: 2.4 }, 0);
  intro.fromTo(heroWords, { yPercent: 105 }, { yPercent: 0, duration: 1.4, stagger: 0.12, immediateRender: true }, 0.15);

  const heroFrame = document.querySelector('[data-hero-frame]');
  if (heroFrame && heroVideo) {
    gsap.to(heroVideo, {
      yPercent: 12,
      scale: 1.08,
      ease: 'none',
      scrollTrigger: { trigger: heroFrame, start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  /* Títulos com máscara por linha */
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'split-line-inner',
      autoSplit: true,
      onSplit(self) {
        gsap.set(el, { visibility: 'visible' });
        return gsap.from(self.lines, {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.09,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      },
    });
  });

  /* Revelação genérica, em lote */
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'expo.out',
        // limita o atraso total quando muitos elementos entram juntos (ex.: salto por âncora)
        stagger: Math.min(0.08, 0.4 / batch.length),
        overwrite: true,
      }),
  });
  // Fontes e imagens mudam a altura da página: recalcula as posições dos gatilhos
  ScrollTrigger.refresh();
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
  document.querySelectorAll('img[loading="lazy"]').forEach((img) =>
    img.addEventListener('load', () => ScrollTrigger.refresh(), { once: true }),
  );

  /* Contadores */
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const obj = { v: 0 };
    el.textContent = '0';
    gsap.to(obj, {
      v: end,
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => (el.textContent = formatNumber(obj.v)),
    });
  });

  /* Parallax de imagens */
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: -12 },
      {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });

  /* Linha do processo */
  const fill = document.querySelector('[data-steps-fill]');
  if (fill) {
    gsap.to(fill, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: '[data-steps]', start: 'top 75%', end: 'bottom 60%', scrub: 0.6 },
    });
  }

  /* Rotas do mapa */
  const routes = gsap.utils.toArray<SVGPathElement>('[data-route]');
  if (routes.length) {
    gsap.set(routes, { strokeDasharray: '1 1', strokeDashoffset: 1 });
    gsap.to(routes, {
      strokeDashoffset: 0,
      duration: 1.6,
      ease: 'power2.inOut',
      stagger: 0.15,
      scrollTrigger: { trigger: '[data-map]', start: 'top 75%', once: true },
      onComplete: () => gsap.set(routes, { clearProps: 'strokeDasharray,strokeDashoffset' }),
    });
  }
}

function showEverything() {
  document.documentElement.classList.remove('js');
}

setupVideos();

if (reduceMotion) {
  showEverything();
} else {
  try {
    setupMotion();
  } catch (err) {
    console.error(err);
    showEverything();
  }
}
