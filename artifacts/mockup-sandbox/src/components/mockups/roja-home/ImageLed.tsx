import { useEffect, useState } from 'react';
import './_group.css';
import './ImageLed.css';

const albums = [
  {
    slug: 'between-the-stops',
    title: 'Between the Stops',
    city: 'Istanbul',
    year: '2025',
    cover: '/__mockup/images/roja-home/istanbul-after-rain.jpg',
    alt: 'Rain-darkened Istanbul street at dusk',
  },
  {
    slug: 'long-shadows',
    title: 'Long Shadows',
    city: 'Lisbon',
    year: '2024',
    cover: '/__mockup/images/roja-home/long-shadows.jpg',
    alt: 'Long afternoon shadows crossing a Lisbon street',
  },
];
const stripFrames = [...albums, ...albums];

export function ImageLed() {
  const [stripPaused, setStripPaused] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pauseForReducedMotion = (event: MediaQueryListEvent) => {
      if (event.matches) setStripPaused(true);
    };
    preference.addEventListener('change', pauseForReducedMotion);
    return () => preference.removeEventListener('change', pauseForReducedMotion);
  }, []);

  return (
    <main className="roja-led">
      <header className="roja-led__topbar">
        <a href="#top" className="roja-led__wordmark" aria-label="Roja Gallery home">
          Roja Gallery
        </a>
      </header>

      <section className="roja-led__hero" id="top">
        <div className="roja-led__hero-copy">
          <div className="roja-led__eyebrow"><span /> A living record of elsewhere</div>
          <h1>City<br /><em>as witness.</em></h1>
          <p className="roja-led__intro">
            A collection of small moments found in the city&apos;s everyday rhythm.
          </p>
          <div className="roja-led__byline">Roja — photographer &amp; observer</div>
          <a className="roja-led__discover" href="#albums">
            <span>Explore the archive</span><span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="roja-led__hero-image">
          <img src={albums[0].cover} alt={albums[0].alt} />
          <div className="roja-led__image-note">
            <span>Istanbul · 2025</span>
          </div>
          <div className="roja-led__image-index">01 / 02</div>
        </div>
        <div className="roja-led__margin-note">A living record<br />of elsewhere</div>
      </section>

      <section className="roja-led__chapters" id="albums">
        <div className="roja-led__section-head">
          <div>
            <div className="roja-led__eyebrow">From the archive</div>
            <h2>Details <em>in motion.</em></h2>
          </div>
        </div>
        <div className="roja-led__strip-controls">
          <span>A moving frame of city light</span>
          <button
            type="button"
            className="roja-led__strip-toggle"
            aria-pressed={stripPaused}
            onClick={() => setStripPaused((paused) => !paused)}
          >
            {stripPaused ? 'Resume strip' : 'Pause strip'}
            <span aria-hidden="true">{stripPaused ? '▶' : 'Ⅱ'}</span>
          </button>
        </div>
        <div className="roja-led__strip-viewport" role="region" aria-label="A moving strip of city photographs">
          <div className={`roja-led__strip-track${stripPaused ? ' is-paused' : ''}`}>
            {[0, 1].map((copy) => (
              <div className="roja-led__strip-group" key={copy} aria-hidden={copy === 1}>
                {stripFrames.map((album, index) => (
                  <figure className="roja-led__strip-photo" key={`${album.slug}-${index}`}>
                    <img src={album.cover} alt={copy === 0 ? album.alt : ''} loading="lazy" />
                    <figcaption>
                      <span>0{index + 1}</span>
                      <span>{album.city} · {album.year}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="roja-led__interlude">
        <div className="roja-led__interlude-mark">R.</div>
        <div className="roja-led__interlude-text">
          <div className="roja-led__eyebrow">The way I look</div>
          <blockquote>Cities tell their stories in fragments — light on old stone, the rhythm of a crossing, a face in a window.</blockquote>
          <p>A collection of small moments found in the city&apos;s everyday rhythm.</p>
        </div>
        <div className="roja-led__interlude-aside">Notes from<br />the walk</div>
      </section>

      <footer className="roja-led__footer">
        <a href="#top" className="roja-led__footer-brand">Roja</a>
        <span>© 2026 Roja · Made while walking</span>
        <a href="#top" className="roja-led__back">Back to beginning ↑</a>
        <a className="roja-led__manage" href="/admin/">Manage <span aria-hidden="true">↗</span></a>
      </footer>
    </main>
  );
}
