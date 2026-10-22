import { useCallback, useEffect, useState } from 'react';
import { Link, Route, Switch, useParams } from 'wouter';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

type Photo = {
  id?: string;
  image: string;
  title: string;
  caption: string;
  alt?: string;
};

type Album = {
  slug: string;
  title: string;
  city: string;
  year: string | number;
  description: string;
  cover: string;
  photos: Photo[];
};

type Gallery = {
  photographer: string;
  intro: string;
  contactEmail?: string;
  albums: Album[];
};

type GalleryState =
  | { status: 'loading'; gallery: null; error: null }
  | { status: 'ready'; gallery: Gallery; error: null }
  | { status: 'error'; gallery: null; error: string };

function useGallery() {
  const [state, setState] = useState<GalleryState>({
    status: 'loading',
    gallery: null,
    error: null,
  });

  const load = useCallback(async () => {
    setState({ status: 'loading', gallery: null, error: null });
    try {
      const response = await fetch(import.meta.env.BASE_URL + 'content/gallery.json');
      if (!response.ok) throw new Error(`Gallery returned ${response.status}`);
      const gallery = (await response.json()) as Gallery;
      if (!gallery || !Array.isArray(gallery.albums)) {
        throw new Error('The gallery file has an unexpected format.');
      }
      setState({ status: 'ready', gallery, error: null });
    } catch {
      setState({
        status: 'error',
        gallery: null,
        error: 'The archive could not be reached just now. Please try again.',
      });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { ...state, reload: load };
}

function SiteHeader({ name }: { name?: string }) {
  return (
    <header className="topbar">
      <Link href="/" className="wordmark" data-testid="link-home">
        {name || 'Roja'}
        <small>Photographs &amp; field notes</small>
      </Link>
      <span className="demo-note" data-testid="text-demo-imagery">Demo imagery · replace with Roja’s photographs</span>
      <a className="nav-link" href="/admin/" data-testid="link-archive-admin">
        Manage <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}

function LoadingView() {
  return (
    <main className="site-shell" aria-label="Loading photo archive" data-testid="status-gallery-loading">
      <SiteHeader />
      <section className="hero">
        <div>
          <div className="skeleton" style={{ width: 115, height: 10 }} />
          <div className="skeleton" style={{ width: 'min(540px, 78vw)', height: 120, marginTop: 26 }} />
        </div>
        <div className="skeleton" style={{ width: 280, height: 72 }} />
      </section>
      <div className="feature"><div className="skeleton skeleton-card" /></div>
    </main>
  );
}

function ErrorView({ message, retry }: { message: string; retry: () => void }) {
  return (
    <main className="site-shell">
      <SiteHeader />
      <section className="state-panel" role="alert" data-testid="status-gallery-error">
        <span className="eyebrow">A moment in the darkroom</span>
        <h2>Not quite in focus.</h2>
        <p>{message}</p>
        <button className="retry-button" onClick={retry} data-testid="button-retry-gallery">Try again</button>
      </section>
    </main>
  );
}

function EmptyView({ name }: { name?: string }) {
  return (
    <main className="site-shell">
      <SiteHeader name={name} />
      <section className="state-panel" data-testid="status-gallery-empty">
        <span className="eyebrow">The first frame is still coming</span>
        <h2>An archive in progress.</h2>
        <p>There are no photographs here yet. Check back soon; the city keeps moving.</p>
      </section>
    </main>
  );
}

function HomePage({ gallery }: { gallery: Gallery }) {
  useEffect(() => {
    document.title = `${gallery.photographer || 'Roja'} — City Photographer`;
  }, [gallery.photographer]);

  const albums = gallery.albums;
  const firstAlbum = albums.find((album) => album.cover) || albums[0];
  const firstPhoto = firstAlbum?.photos?.[0];
  const featureImage = firstAlbum?.cover || firstPhoto?.image;
  const intro = gallery.intro?.trim();

  return (
    <main className="site-shell">
      <SiteHeader name={gallery.photographer} />
      <section className="hero entrance">
        <div>
          <div className="eyebrow">A living record of elsewhere</div>
          <h1>City<br /><em>as witness.</em></h1>
        </div>
        <p className="hero-note">
          {intro || 'Street corners, passing faces, and the quiet theatre between them.'}
          <span>Roja — photographer &amp; observer</span>
        </p>
      </section>

      {featureImage && firstAlbum ? (
        <section className="feature entrance" aria-label="Featured album">
          <Link href={`/album/${firstAlbum.slug}`} className="feature-frame" data-testid={`link-feature-${firstAlbum.slug}`}>
            <img src={featureImage} alt={firstAlbum.title} />
            <div className="feature-caption">
              <span>{firstAlbum.city} · {firstAlbum.year}</span>
              <strong>{firstAlbum.title}</strong>
            </div>
          </Link>
        </section>
      ) : (
        <section className="feature" aria-label="Featured photograph">
          <div className="feature-frame skeleton" />
        </section>
      )}

      <section id="albums">
        <div className="section-head">
          <div>
            <div className="eyebrow">Selected chapters</div>
            <h2>Places, in passing.</h2>
          </div>
          <div className="section-count">{String(albums.length).padStart(2, '0')} albums</div>
        </div>
        {albums.length ? (
          <div className="album-grid">
            {albums.map((album, index) => (
              <article className="album-card entrance" key={album.slug}>
                <Link href={`/album/${album.slug}`} className="album-cover" data-testid={`link-album-${album.slug}`}>
                  {album.cover ? <img src={album.cover} alt={`${album.city}, from ${album.title}`} loading="lazy" /> : <div className="skeleton skeleton-card" />}
                  <span className="album-index">VOL. {String(index + 1).padStart(2, '0')}</span>
                </Link>
                <div className="album-meta">
                  <Link href={`/album/${album.slug}`} className="album-title">{album.title}</Link>
                  <span className="album-year">{album.year}</span>
                </div>
                <div className="album-city">{album.city}</div>
              </article>
            ))}
          </div>
        ) : (
          <div className="state-panel" data-testid="status-albums-empty">
            <h2>Waiting for the city.</h2>
            <p>New chapters will appear here when the photographs are ready.</p>
          </div>
        )}
      </section>

      <section className="intro-band">
        <div className="eyebrow">The way I look</div>
        <div>
          <blockquote>Cities tell their stories in fragments — light on old stone, the rhythm of a crossing, a face in a window.</blockquote>
          <p>{intro || 'An ongoing practice of looking closely: at light on old stone, the rhythm of a crossing, the people who make a place feel like itself.'}</p>
        </div>
      </section>
      <footer className="footer">
        <span>© {new Date().getFullYear()} {gallery.photographer || 'Roja'} · Made while walking</span>
        {gallery.contactEmail && <a href={`mailto:${gallery.contactEmail}`}>Say hello <span aria-hidden="true">↗</span></a>}
      </footer>
    </main>
  );
}

function PhotoViewer({ photos, index, onClose, onChange }: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onChange: (next: number) => void;
}) {
  const photo = photos[index];
  const previous = useCallback(() => onChange((index - 1 + photos.length) % photos.length), [index, onChange, photos.length]);
  const next = useCallback(() => onChange((index + 1) % photos.length), [index, onChange, photos.length]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [next, onClose, previous]);

  if (!photo) return null;
  return (
    <div className="viewer" role="dialog" aria-modal="true" aria-label={`Photograph ${index + 1} of ${photos.length}`} data-testid="dialog-photo-viewer">
      <div className="viewer-image-wrap">
        <img className="viewer-image" key={photo.id || photo.image} src={photo.image} alt={photo.alt || photo.title} />
        <button className="viewer-close" onClick={onClose} aria-label="Close photograph" data-testid="button-close-viewer"><X size={19} /></button>
        {photos.length > 1 && <>
          <button className="viewer-arrow viewer-prev" onClick={previous} aria-label="Previous photograph" data-testid="button-previous-photo"><ArrowLeft size={18} /></button>
          <button className="viewer-arrow viewer-next" onClick={next} aria-label="Next photograph" data-testid="button-next-photo"><ArrowRight size={18} /></button>
        </>}
      </div>
      <aside className="viewer-side">
        <div className="viewer-top"><span>FIELD NOTE</span><span>{String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span></div>
        <h2 className="viewer-title">{photo.title}</h2>
        <p className="viewer-caption">{photo.caption}</p>
        <div className="viewer-controls">
          <button onClick={previous} aria-label="Previous photograph" data-testid="button-previous-caption">Previous</button>
          <button onClick={next} aria-label="Next photograph" data-testid="button-next-caption">Next frame</button>
        </div>
      </aside>
    </div>
  );
}

function AlbumPage({ gallery }: { gallery: Gallery }) {
  const params = useParams<{ slug: string }>();
  const album = gallery.albums.find((item) => item.slug === params.slug);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeViewer = useCallback(() => setSelectedIndex(null), []);

  useEffect(() => {
    document.title = album
      ? `${album.title} — ${gallery.photographer || 'Roja'}`
      : `City Photography — ${gallery.photographer || 'Roja'}`;
  }, [album, gallery.photographer]);

  if (!album) {
    return (
      <main className="site-shell">
        <SiteHeader name={gallery.photographer} />
        <section className="state-panel" data-testid="status-album-not-found">
          <span className="eyebrow">No such chapter</span>
          <h2>This place is elsewhere.</h2>
          <p>The album may have moved, or perhaps it has not been added to the archive yet.</p>
          <Link href="/" className="back-link">← Return to all albums</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="site-shell">
      <SiteHeader name={gallery.photographer} />
      <header className="album-hero entrance">
        <div>
          <Link href="/" className="back-link" data-testid="link-back-albums"><ArrowLeft size={13} style={{ verticalAlign: 'middle', marginRight: 7 }} />All albums</Link>
          <div className="eyebrow" style={{ marginTop: 35 }}>{album.city} · {album.year}</div>
          <h1>{album.title}</h1>
        </div>
        <div className="album-hero-copy">
          <p>{album.description}</p>
          <div className="section-count" style={{ marginTop: 26 }}>{String(album.photos.length).padStart(2, '0')} photographs · tap to enter</div>
        </div>
      </header>
      {album.photos.length ? (
        <section className="album-gallery" aria-label={`${album.title} photographs`} data-testid="gallery-photo-grid">
          {album.photos.map((photo, index) => (
            <figure className="photo-tile" key={photo.id || `${album.slug}-${index}`}>
              <button type="button" className="photo-image-button" onClick={() => setSelectedIndex(index)} data-testid={`button-open-photo-${photo.id || `${album.slug}-${index}`}`} aria-label={`View ${photo.title}`}>
                <img src={photo.image} alt={photo.alt || photo.title} loading="lazy" />
              </button>
              <figcaption><strong>{photo.title}</strong><span>{String(index + 1).padStart(2, '0')}</span></figcaption>
            </figure>
          ))}
        </section>
      ) : (
        <section className="state-panel" data-testid="status-photos-empty">
          <h2>Frames to come.</h2>
          <p>This chapter is being assembled. There are no photographs to view yet.</p>
        </section>
      )}
      <footer className="footer">
        <Link href="/" className="back-link">← Browse the archive</Link>
        <span>{album.city} · {album.year}</span>
      </footer>
      {selectedIndex !== null && (
        <PhotoViewer photos={album.photos} index={selectedIndex} onClose={closeViewer} onChange={setSelectedIndex} />
      )}
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="site-shell">
      <SiteHeader />
      <section className="state-panel">
        <span className="eyebrow">Outside the frame</span>
        <h2>Nothing to see here.</h2>
        <p>This page is not part of the archive.</p>
        <Link href="/" className="back-link">← Go to the photographs</Link>
      </section>
    </main>
  );
}

function GalleryRoute({ album = false }: { album?: boolean }) {
  const state = useGallery();
  if (state.status === 'loading') return <LoadingView />;
  if (state.status === 'error') return <ErrorView message={state.error} retry={state.reload} />;
  if (!state.gallery.albums.length) return <EmptyView name={state.gallery.photographer} />;
  return album ? <AlbumPage gallery={state.gallery} /> : <HomePage gallery={state.gallery} />;
}

function App() {
  return (
    <Switch>
      <Route path="/" component={() => <GalleryRoute />} />
      <Route path="/album/:slug" component={() => <GalleryRoute album />} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default App;
