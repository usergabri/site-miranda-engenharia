import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;

/* ---------- Vídeos ---------- */
function bindToggle(video: HTMLVideoElement, toggle: HTMLButtonElement | null, onUserPause: (paused: boolean) => void) {
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
      onUserPause(false);
      video.play().catch(() => {});
    } else {
      onUserPause(true);
      video.pause();
    }
  });
}

function setupVideos() {
  // Vídeo de fundo do topo: botão de pausa; não toca com economia de dados ou movimento reduzido
  const hero = document.querySelector<HTMLVideoElement>('[data-hero-video]');
  if (hero) {
    if (reduceMotion || saveData) {
      hero.removeAttribute('autoplay');
      hero.pause();
    }
    bindToggle(hero, document.querySelector('[data-hero-pause]'), () => {});
  }

  // Demais vídeos: tocam só quando visíveis
  document.querySelectorAll<HTMLVideoElement>('[data-autoplay-visible]').forEach((video) => {
    let userPaused = reduceMotion || saveData;
    bindToggle(video, video.parentElement?.querySelector('[data-video-toggle]') ?? null, (p) => (userPaused = p));

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

/* ---------- Movimento ---------- */
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
      if (id === '#') return;
      const target = id === '#inicio' ? 0 : document.querySelector<HTMLElement>(id);
      if (target === null) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: target === 0 ? 0 : -80, duration: 1.4 });
      history.replaceState(null, '', id);
    });
  });

  /* Momento principal: abertura do topo */
  const heroWords = gsap.utils.toArray<HTMLElement>('[data-hero-word]');
  const heroVideo = document.querySelector('[data-hero-video]');
  const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
  if (heroVideo) intro.fromTo(heroVideo, { scale: 1.18 }, { scale: 1, duration: 2.4 }, 0);
  intro.fromTo(heroWords, { yPercent: 105 }, { yPercent: 0, duration: 1.4, stagger: 0.12, immediateRender: true }, 0.15);
  // Se a animação não andar (aba em segundo plano, máquina lenta), mostra o título
  setTimeout(() => {
    if (intro.progress() < 0.5) intro.progress(1);
  }, 2500);

  const heroFrame = document.querySelector('[data-hero-frame]');
  if (heroFrame && heroVideo) {
    gsap.to(heroVideo, {
      yPercent: 12,
      scale: 1.08,
      ease: 'none',
      scrollTrigger: { trigger: heroFrame, start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  /* Títulos com máscara por linha (só os que começam abaixo da dobra) */
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit(self) {
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

  /* Blocos: só são escondidos pelo JS, então sem JS tudo aparece */
  const reveals = gsap.utils
    .toArray<HTMLElement>('[data-reveal]')
    .filter((el) => el.getBoundingClientRect().top > window.innerHeight);
  gsap.set(reveals, { opacity: 0, y: 32 });
  ScrollTrigger.batch(reveals, {
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
    gsap.fromTo(
      fill,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: '[data-steps]', start: 'top 75%', end: 'bottom 60%', scrub: 0.6 },
      },
    );
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
