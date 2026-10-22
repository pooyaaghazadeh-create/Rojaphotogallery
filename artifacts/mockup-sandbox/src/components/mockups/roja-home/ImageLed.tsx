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

export function ImageLed() {
  return (
    <main className="roja-led">
      <header className="roja-led__topbar">
        <a href="#top" className="roja-led__wordmark" aria-label="Roja home">
          Roja
          <small>Photographs &amp; field notes</small>
        </a>
        <span className="roja-led__edition">An ongoing city archive</span>
        <a className="roja-led__manage" href="/admin/">Manage <span aria-hidden="true">↗</span></a>
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
            <div className="roja-led__eyebrow">Selected chapters</div>
            <h2>Places, <em>in passing.</em></h2>
          </div>
          <div className="roja-led__count"><span>02</span> albums in the archive</div>
        </div>

        <article className="roja-led__chapter roja-led__chapter--first">
          <a href={`/album/${albums[0].slug}`} className="roja-led__chapter-image">
            <img src={albums[0].cover} alt={albums[0].alt} loading="lazy" />
            <span className="roja-led__frame-label">I / Istanbul, in the rain</span>
            <span className="roja-led__frame-number">01</span>
          </a>
          <div className="roja-led__chapter-copy">
            <span className="roja-led__chapter-kicker">Chapter 01 <i /> 2025</span>
            <a href={`/album/${albums[0].slug}`} className="roja-led__chapter-title">{albums[0].title}</a>
            <span className="roja-led__chapter-city">{albums[0].city}</span>
            <p>Rain-darkened streets, late windows, and the quiet pause between one place and the next.</p>
            <a href={`/album/${albums[0].slug}`} className="roja-led__open">Enter this chapter <span aria-hidden="true">↗</span></a>
          </div>
        </article>

        <article className="roja-led__chapter roja-led__chapter--second">
          <div className="roja-led__chapter-copy">
            <span className="roja-led__chapter-kicker">Chapter 02 <i /> 2024</span>
            <a href={`/album/${albums[1].slug}`} className="roja-led__chapter-title">{albums[1].title}</a>
            <span className="roja-led__chapter-city">{albums[1].city}</span>
            <p>A study of open space, long afternoon light, and the people who give a city its scale.</p>
            <a href={`/album/${albums[1].slug}`} className="roja-led__open">Enter this chapter <span aria-hidden="true">↗</span></a>
          </div>
          <a href={`/album/${albums[1].slug}`} className="roja-led__chapter-image">
            <img src={albums[1].cover} alt={albums[1].alt} loading="lazy" />
            <span className="roja-led__frame-label">II / Lisbon, late afternoon</span>
            <span className="roja-led__frame-number">02</span>
          </a>
        </article>
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
      </footer>
    </main>
  );
}
