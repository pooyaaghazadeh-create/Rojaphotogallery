import './_group.css';

const albums = [
  {
    slug: 'between-the-stops',
    title: 'Between the Stops',
    city: 'Istanbul',
    year: '2025',
    cover: '/__mockup/images/roja-home/istanbul-after-rain.jpg',
  },
  {
    slug: 'long-shadows',
    title: 'Long Shadows',
    city: 'Lisbon',
    year: '2024',
    cover: '/__mockup/images/roja-home/long-shadows.jpg',
  },
];

export function Current() {
  return (
    <main className="site-shell">
      <header className="topbar">
        <a href="#top" className="wordmark">
          Roja
          <small>Photographs &amp; field notes</small>
        </a>
        <a className="nav-link" href="#albums">
          Manage <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero entrance" id="top">
        <div>
          <div className="eyebrow">A living record of elsewhere</div>
          <h1>City<br /><em>as witness.</em></h1>
        </div>
        <p className="hero-note">
          A collection of small moments found in the city&apos;s everyday rhythm.
          <span>Roja — photographer &amp; observer</span>
        </p>
      </section>

      <section className="feature entrance" aria-label="Featured album">
        <a href="#albums" className="feature-frame">
          <img src={albums[0].cover} alt="Rain-darkened Istanbul street at dusk" />
          <div className="feature-caption">
            <span>{albums[0].city} · {albums[0].year}</span>
            <strong>{albums[0].title}</strong>
          </div>
        </a>
      </section>

      <section id="albums">
        <div className="section-head">
          <div>
            <div className="eyebrow">Selected chapters</div>
            <h2>Places, in passing.</h2>
          </div>
          <div className="section-count">{String(albums.length).padStart(2, '0')} albums</div>
        </div>
        <div className="album-grid">
          {albums.map((album, index) => (
            <article className="album-card entrance" key={album.slug}>
              <a href="#albums" className="album-cover">
                <img src={album.cover} alt={`${album.city}, from ${album.title}`} />
                <span className="album-index">VOL. {String(index + 1).padStart(2, '0')}</span>
              </a>
              <div className="album-meta">
                <a href="#albums" className="album-title">{album.title}</a>
                <span className="album-year">{album.year}</span>
              </div>
              <div className="album-city">{album.city}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="intro-band">
        <div className="eyebrow">The way I look</div>
        <div>
          <blockquote>Cities tell their stories in fragments — light on old stone, the rhythm of a crossing, a face in a window.</blockquote>
          <p>A collection of small moments found in the city&apos;s everyday rhythm.</p>
        </div>
      </section>
      <footer className="footer">
        <span>© 2026 Roja · Made while walking</span>
      </footer>
    </main>
  );
}
