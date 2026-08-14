import React, { useState, useEffect, useRef } from 'react'
import photosData from './photosData.json'

const milestoneMoments = [
  {
    date: 'May 15, 2026',
    badge: 'Our Anniversary 💕',
    title: 'The Day It All Began',
    description: 'The start of us — the day we officially became a thing.',
    photo: '/photos/bebi-journey-03.jpg',
    caption: 'May 15, 2026 · Where our story started',
  },
  {
    date: 'July 25, 2026',
    badge: 'Makati Date 🏙️',
    title: 'Our Day in Makati',
    description:
      'Walking around Makati together — good food, cafe stops, and photos at golden hour. Simple, but one of my favorite days.',
    photo: '/photos/makati-golden-01.jpg',
    caption: 'July 25, 2026 · Makati golden hour with you',
  },
  {
    date: 'August 15, 2026',
    badge: '3rd Monthsary 🥂',
    title: 'Three Months of Us',
    description: '3 months down, bebi. Excited for a lot more to come.',
    photo: '/photos/makati-memory-10.jpg',
    caption: 'August 15, 2026 · Happy 3rd Monthsary!',
  },
]

const personalityHighlights = [
  {
    icon: '🌸',
    title: 'Blue Lily Energy',
    text: 'Calm and soft, but still stands out — kinda just like you.',
  },
  {
    icon: '🎨',
    title: 'Cute & Creative',
    text: 'The little crafts, the aesthetic eye, the way you make even small things feel thought out.',
  },
  {
    icon: '📚',
    title: 'Manga & Late Night Movies',
    text: 'Good stories and late night movies, just vibing with whatever we’re into that day.',
  },
  {
    icon: '✨',
    title: 'Easy to Be Around',
    text: 'No pressure, no forcing it — just easy and comfortable, every time.',
  },
  {
    icon: '🍕',
    title: 'Elite Food Taste',
    text: 'Latiao, Buldak, sushi, fries, pizza — your food picks never miss.',
  },
  {
    icon: '💙',
    title: 'Sweet in the Details',
    text: 'It’s always the small stuff with you — your hobbies, your style, just you being you.',
  },
]

const comfortFoods = [
  { name: 'Latiao', emoji: '🌶️' },
  { name: 'French Fries', emoji: '🍟' },
  { name: 'Hawaiian Pizza', emoji: '🍕' },
  { name: 'Vegetarian Pizza', emoji: '🧀' },
  { name: 'Sushi', emoji: '🍣' },
  { name: 'Kimbap', emoji: '🍱' },
  { name: 'Buldak', emoji: '🍜' },
  { name: 'Pasta', emoji: '🍝' },
  { name: 'Sisig', emoji: '🍳' },
  { name: 'Chicken Burgers', emoji: '🍔' },
  { name: 'Kimchi', emoji: '🥬' },
  { name: 'Chicken Poppers', emoji: '🍗' },
]

const categoryLabels = {
  makati: 'Makati Date',
  journey: 'Our Journey',
  sweet: 'Sweet Moment',
  candid: 'Candid Moment',
  featured: 'A Favorite',
}

const albumsMeta = [
  { key: 'makati', label: 'Makati Date', sub: 'July 25 · our day out', emoji: '🏙️' },
  { key: 'journey', label: 'Our Journey', sub: 'how we got here', emoji: '🌸' },
  { key: 'sweet', label: 'Sweet Moments', sub: '', emoji: '💕' },
  { key: 'candid', label: 'Candid', sub: '', emoji: '📸' },
  { key: 'featured', label: 'Favorites', sub: '', emoji: '🌟' },
]

export default function App() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null)
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [likes, setLikes] = useState({})
  const [isPlayingMusic, setIsPlayingMusic] = useState(false)
  const [confettiBurst, setConfettiBurst] = useState([])
  const [foodReactions, setFoodReactions] = useState({})
  const [heartBursts, setHeartBursts] = useState([])
  const [sealJustOpened, setSealJustOpened] = useState(false)
  const audioContextRef = useRef(null)
  const oscillatorRef = useRef(null)

  // Live Timer: Exact live counting from May 15, 2026 00:00:00
  const [liveTimer, setLiveTimer] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const anniversaryDate = new Date('2026-05-15T00:00:00')

    const calculateTime = () => {
      const now = new Date()
      const diffMs = now.getTime() - anniversaryDate.getTime()
      if (diffMs > 0) {
        const totalSeconds = Math.floor(diffMs / 1000)
        const days = Math.floor(totalSeconds / (3600 * 24))
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
        const minutes = Math.floor((totalSeconds % 3600) / 60)
        const seconds = Math.floor(totalSeconds % 60)
        setLiveTimer({ days, hours, minutes, seconds })
      } else {
        setLiveTimer({ days: 92, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Albums shown depend on the active filter — grouped like a real photo album
  const albumsToShow =
    activeFilter === 'all'
      ? albumsMeta
      : albumsMeta.filter((a) => a.key === activeFilter)

  // Flattened list, grouped album by album, used for the lightbox / keyboard nav
  const filteredPhotos = albumsToShow.flatMap((album) =>
    photosData.filter((photo) => photo.category === album.key)
  )

  // Floating petals
  const petals = Array.from({ length: 16 }).map((_, i) => ({
    id: i,
    left: `${(i * 6.2) % 100}%`,
    delay: `${(i * 1.5) % 10}s`,
    duration: `${14 + ((i * 3) % 8)}s`,
    symbol: i % 3 === 0 ? '🌸' : i % 3 === 1 ? '💙' : '✨',
  }))

  // Confetti trigger
  const triggerConfetti = () => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: Date.now() + i,
      x: 20 + Math.random() * 60,
      y: 30 + Math.random() * 40,
      emoji: ['💙', '🌸', '✨', '💖', '🎉'][Math.floor(Math.random() * 5)],
    }))
    setConfettiBurst(newParticles)
    setTimeout(() => setConfettiBurst([]), 3000)
  }

  // Like reaction
  const handleLike = (src, e) => {
    e.stopPropagation()
    setLikes((prev) => ({
      ...prev,
      [src]: (prev[src] || 0) + 1,
    }))

    // Little hearts pop out from wherever the button was tapped
    const rect = e.currentTarget.getBoundingClientRect()
    const originX = rect.left + rect.width / 2
    const originY = rect.top
    const burstId = Date.now()
    const newHearts = Array.from({ length: 6 }).map((_, i) => ({
      id: `${burstId}-${i}`,
      x: originX + (Math.random() * 60 - 30),
      y: originY,
      drift: Math.random() * 40 - 20,
      delay: `${i * 0.05}s`,
    }))
    setHeartBursts((prev) => [...prev, ...newHearts])
    setTimeout(() => {
      setHeartBursts((prev) => prev.filter((h) => !newHearts.some((n) => n.id === h.id)))
    }, 1100)
  }

  // Music toggle using gentle Web Audio sine chords
  const toggleMusic = () => {
    if (isPlayingMusic) {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop()
        } catch (e) {}
      }
      setIsPlayingMusic(false)
    } else {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioContext()
        }
        const ctx = audioContextRef.current
        if (ctx.state === 'suspended') {
          ctx.resume()
        }

        const notes = [261.63, 329.63, 392.0, 523.25, 440.0, 349.23]
        let noteIdx = 0

        const playArp = () => {
          if (!isPlayingMusic && oscillatorRef.current === null) return
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'sine'
          osc.frequency.setValueAtTime(notes[noteIdx % notes.length], ctx.currentTime)
          noteIdx++

          gain.gain.setValueAtTime(0.001, ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.1)
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5)

          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start()
          osc.stop(ctx.currentTime + 1.6)
        }

        playArp()
        const intervalId = setInterval(playArp, 1300)
        oscillatorRef.current = { stop: () => clearInterval(intervalId) }
        setIsPlayingMusic(true)
      } catch (err) {
        setIsPlayingMusic(true)
      }
    }
  }

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return
      if (e.key === 'Escape') setSelectedPhotoIndex(null)
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) => (prev + 1) % filteredPhotos.length)
      }
      if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedPhotoIndex, filteredPhotos])

  const selectedPhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null

  return (
    <div className="page-shell">
      {/* Paper overlay */}
      <div className="paper-overlay" />

      {/* Floating Petals */}
      <div className="ambient-petals">
        {petals.map((p) => (
          <div
            key={p.id}
            className="petal"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          >
            {p.symbol}
          </div>
        ))}
      </div>

      {/* Confetti Explosion */}
      {confettiBurst.length > 0 && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1000 }}>
          {confettiBurst.map((c) => (
            <span
              key={c.id}
              style={{
                position: 'absolute',
                left: `${c.x}%`,
                top: `${c.y}%`,
                fontSize: '1.8rem',
                transform: 'translate(-50%, -50%)',
                animation: 'floatDown 2.5s ease-out forwards',
              }}
            >
              {c.emoji}
            </span>
          ))}
        </div>
      )}

      {/* Little Heart Burst (from Love reactions) */}
      {heartBursts.length > 0 && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1000 }}>
          {heartBursts.map((h) => (
            <span
              key={h.id}
              className="mini-heart-pop"
              style={{
                left: `${h.x}px`,
                top: `${h.y}px`,
                animationDelay: h.delay,
                '--drift': `${h.drift}px`,
              }}
            >
              💙
            </span>
          ))}
        </div>
      )}

      <div className="page-container">
        {/* Navigation Bar */}
        <header className="top-nav">
          <div className="nav-brand">
            🌸 bebi & hubby <span>3rd Monthsary</span>
          </div>
          <nav className="nav-links">
            <a href="#timer" className="nav-link">Live Timer</a>
            <a href="#milestones" className="nav-link">Milestones</a>
            <a href="#gallery" className="nav-link">Scrapbook</a>
            <a href="#letter" className="nav-link">Letter</a>
            <a href="#about" className="nav-link">About You</a>
            <a href="#food" className="nav-link">Comfort Food</a>
          </nav>
          <button className="celebrate-btn" onClick={triggerConfetti}>
            ✨ Celebrate!
          </button>
        </header>

        {/* HERO SECTION */}
        <section className="hero-section" id="timer">
          <div className="hero-content">
            <div className="hero-badge">
              <span>✨</span> Anniversary: May 15, 2026 <span>💙</span>
            </div>
            <h1 className="hero-title">
              Happy <span className="highlight">3rd Monthsary</span>,
              <span className="hand-subtitle">bebi</span>
            </h1>
            <p className="hero-description">
              A little scrapbook made just for you — from our first day on May 15, to our Makati date on July 25, and everything sweet in between.
            </p>

            {/* Live Ticking Anniversary Counter */}
            <div className="counter-box">
              <div className="counter-item">
                <span className="counter-num">{liveTimer.days}</span>
                <span className="counter-label">Days</span>
              </div>
              <div className="counter-item">
                <span className="counter-num">{liveTimer.hours}</span>
                <span className="counter-label">Hours</span>
              </div>
              <div className="counter-item">
                <span className="counter-num">{liveTimer.minutes}</span>
                <span className="counter-label">Minutes</span>
              </div>
              <div className="counter-item">
                <span className="counter-num" style={{ color: 'var(--blush-rose)' }}>
                  {liveTimer.seconds}
                </span>
                <span className="counter-label">Seconds</span>
              </div>
            </div>

            <div className="hero-cta-group">
              <a href="#letter" className="btn-primary">
                💌 Read the Note
              </a>
              <a href="#gallery" className="btn-secondary">
                📸 View Scrapbook ({photosData.length} Photos)
              </a>
            </div>
          </div>

          {/* Hero Polaroids */}
          <div className="hero-scrapbook-showcase">
            <div
              className="scrapbook-polaroid hero-pol-1"
              onClick={() => {
                const idx = photosData.findIndex((p) => p.target.includes('makati-golden-01'))
                setSelectedPhotoIndex(idx !== -1 ? idx : 0)
              }}
            >
              <div className="washi-tape" />
              <img src="/photos/makati-golden-01.jpg" alt="Makati Date" />
              <p className="polaroid-caption">Makati Date · July 25 🌇</p>
            </div>

            <div
              className="scrapbook-polaroid hero-pol-2"
              onClick={() => {
                const idx = photosData.findIndex((p) => p.target.includes('bebi-sweet-07'))
                setSelectedPhotoIndex(idx !== -1 ? idx : 1)
              }}
            >
              <div className="washi-tape" />
              <img src="/photos/bebi-sweet-07.jpg" alt="Sweet Smile" />
              <p className="polaroid-caption">Blue Lily Kind of Pretty 🌸</p>
            </div>

            <div
              className="scrapbook-polaroid hero-pol-3"
              onClick={() => {
                const idx = photosData.findIndex((p) => p.target.includes('makati-portrait-09'))
                setSelectedPhotoIndex(idx !== -1 ? idx : 2)
              }}
            >
              <div className="washi-tape" />
              <img src="/photos/makati-portrait-09.jpg" alt="Sweet Moment" />
              <p className="polaroid-caption">Makati Memories 💕</p>
            </div>
          </div>
        </section>

        {/* MILESTONES SECTION */}
        <section className="section" id="milestones">
          <div className="section-head">
            <span className="section-tag">Key Milestones</span>
            <h2 className="section-title">Moments of Us</h2>
            <p className="section-sub">
              Important dates and favorite memories since we started dating.
            </p>
          </div>

          <div className="timeline-container">
            <div className="timeline-line" />
            {milestoneMoments.map((item, idx) => (
              <div
                key={item.badge}
                className={`timeline-card ${idx % 2 === 0 ? 'left' : 'right'}`}
              >
                <div className="timeline-marker" />
                <span className="timeline-badge">{item.badge}</span>
                <h3>{item.title}</h3>
                <p style={{ fontWeight: 600, color: 'var(--blue-lily-deep)', marginBottom: '6px' }}>
                  {item.date}
                </p>
                <p>{item.description}</p>
                <div
                  className="timeline-img-wrap"
                  onClick={() => {
                    const foundIdx = photosData.findIndex((p) => p.src === item.photo)
                    setSelectedPhotoIndex(foundIdx !== -1 ? foundIdx : 0)
                  }}
                >
                  <img src={item.photo} alt={item.title} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SCRAPBOOK PHOTO GALLERY */}
        <section className="section gallery-section" id="gallery">
          <div className="section-head">
            <span className="section-tag">Photo Collection</span>
            <h2 className="section-title">Our Captured Frames</h2>
            <p className="section-sub">
              Just a bunch of our photos, sorted into little albums. Click any frame to view in full.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="filter-tabs">
            {[
              { key: 'all', label: `✨ All Albums (${photosData.length})` },
              { key: 'makati', label: '🏙️ Makati Date (July 25)' },
              { key: 'journey', label: '🌸 Our Journey' },
              { key: 'sweet', label: '💕 Sweet Moments' },
              { key: 'candid', label: '📸 Candid' },
              { key: 'featured', label: '🌟 Favorites' },
            ].map((tab) => (
              <button
                key={tab.key}
                className={`filter-tab ${activeFilter === tab.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Albums */}
          {albumsToShow.map((album) => {
            const albumPhotos = photosData.filter((p) => p.category === album.key)
            if (albumPhotos.length === 0) return null
            return (
              <div className="album-block" key={album.key}>
                <div className="album-header">
                  <span className="album-emoji">{album.emoji}</span>
                  <div>
                    <h3 className="album-title">{album.label}</h3>
                    <span className="album-count">
                      {albumPhotos.length} photo{albumPhotos.length !== 1 ? 's' : ''}
                      {album.sub ? ` · ${album.sub}` : ''}
                    </span>
                  </div>
                </div>

                <div className="gallery-grid">
                  {albumPhotos.map((photo, i) => {
                    const globalIndex = filteredPhotos.indexOf(photo)
                    const tilt = (i % 5) - 2
                    const likeCount = likes[photo.src] || 0
                    return (
                      <div
                        key={photo.src}
                        className="gallery-card"
                        style={{
                          transform: `rotate(${tilt}deg)`,
                          animationDelay: `${(i % 8) * 0.06}s`,
                        }}
                        onClick={() => setSelectedPhotoIndex(globalIndex)}
                      >
                        <div className="washi-tape" />
                        <div className="gallery-photo-wrapper">
                          <img
                            src={photo.src}
                            alt={photo.caption || categoryLabels[photo.category]}
                            loading="lazy"
                          />
                        </div>
                        {photo.caption && <p className="gallery-caption">{photo.caption}</p>}
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '8px',
                          }}
                        >
                          <button
                            className="heart-reaction-btn"
                            onClick={(e) => handleLike(photo.src, e)}
                          >
                            ❤️ {likeCount > 0 ? likeCount : 'Love'}
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </section>

        {/* SEALED LOVE LETTER SECTION */}
        <section className="section letter-section" id="letter">
          <div className="section-head">
            <span className="section-tag">A Note for You</span>
            <h2 className="section-title">Happy 3rd Monthsary</h2>
            <p className="section-sub">
              Click the wax seal below to open your note.
            </p>
          </div>

          <div className="envelope-wrapper">
            <div className="envelope-seal-bar">
              <div
                className={`wax-seal ${envelopeOpen ? 'is-open' : ''} ${sealJustOpened ? 'just-opened' : ''}`}
                onClick={() => {
                  setEnvelopeOpen(!envelopeOpen)
                  if (!envelopeOpen) {
                    setSealJustOpened(true)
                    setTimeout(() => setSealJustOpened(false), 500)
                  }
                }}
                title="Click to open / close letter"
              >
                <span className="wax-seal-initials">B & H</span>
                <span className="wax-seal-sub">{envelopeOpen ? 'OPEN' : 'SEALED'}</span>
              </div>
              <p className="envelope-hint">
                {envelopeOpen
                  ? '✨ The note is open below ✨'
                  : '💌 Tap the wax seal to read the note 💌'}
              </p>
            </div>

            {envelopeOpen && (
              <div className="letter-content">
                <h3 className="letter-heading">Dearest bebi,</h3>
                <div className="letter-body">
                  <p>
                    Happy 3rd monthsary! 🥺❤️ Grabe, three months na tayo since May 15. Parang ang bilis ng time, pero at the same time, ang dami na rin nating memories together.
                  </p>
                  <p>
                    I just really, really love you. Sobrang love kita, bebi. You're genuinely the cutest person I know, and hindi ko alam kung paano mo nagagawa pero lalo ka lang nagiging cute sa paningin ko habang mas nakikilala kita. I love everything about you, yung sweetness mo, yung little quirks mo, yung way mo magsalita, and even yung mga random things about you na ikaw lang talaga.
                  </p>
                  <p>
                    Honestly, hindi ko na kailangan ng special reason para mahalin ka. I just love you because you're you. Kahit simpleng usap lang tayo or magkasama lang tayo doing nothing, I'm already happy kasi ikaw yung kasama ko.
                  </p>
                  <p>
                    Thank you for being my bebi, my favorite person, and someone who makes my days so much better. I'm really, really grateful na dumating ka sa life ko.
                  </p>
                  <p>
                    I love you so much, bebi. Sobrang sobra. ❤️ I hope you know how much you mean to me, kahit minsan hindi ko maexpress nang maayos.
                  </p>
                  <p>
                    Happy 3rd monthsary, my love. Here's to us and sa marami pang months, dates, memories, and moments together. I love youuuuu so much, bebi. 🥺❤️
                  </p>
                </div>
                <div className="letter-signature">
                  <p className="letter-sign-text">With all my love,</p>
                  <p className="letter-sign-text">hubby 💙</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ABOUT YOU / TRAITS SECTION */}
        <section className="section" id="about">
          <div className="section-head">
            <span className="section-tag">A Few Things That Fit You</span>
            <h2 className="section-title">The Vibe That Feels Like You</h2>
            <p className="section-sub">
              Creative hobbies, sweet energy, comfort things, and a style that feels soft and genuine.
            </p>
          </div>

          <div className="reasons-grid">
            {personalityHighlights.map((item) => (
              <div key={item.title} className="reason-card">
                <span className="reason-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* COMFORT FOOD SECTION */}
        <section className="section" id="food">
          <div className="section-head">
            <span className="section-tag">Comfort Menu</span>
            <h2 className="section-title">The Snack & Food Lineup</h2>
            <p className="section-sub">
              Your favorite comfort foods and snacks. Tap any item to highlight it!
            </p>
          </div>

          <div className="food-chips-wrapper">
            {comfortFoods.map((food) => {
              const isSelected = foodReactions[food.name]
              return (
                <div
                  key={food.name}
                  className={`food-chip ${isSelected ? 'is-selected' : ''}`}
                  style={{
                    backgroundColor: isSelected ? 'var(--blue-lily)' : undefined,
                    color: isSelected ? '#ffffff' : undefined,
                  }}
                  onClick={() => {
                    setFoodReactions((prev) => ({
                      ...prev,
                      [food.name]: !prev[food.name],
                    }))
                    triggerConfetti()
                  }}
                >
                  <span>{food.emoji}</span>
                  <span>{food.name}</span>
                  {isSelected && <span>✨ Craving!</span>}
                </div>
              )
            })}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <p className="footer-hand">Happy 3rd Monthsary, bebi 💙</p>
          <p className="footer-text">
            May 15, 2026 · made with love, memories, and a little too much css.
          </p>
        </footer>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div
          className="lightbox-backdrop"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close-btn"
              onClick={() => setSelectedPhotoIndex(null)}
              title="Close modal (Esc)"
            >
              ✕
            </button>

            {/* Navigation buttons */}
            <button
              className="lightbox-nav-btn lightbox-prev"
              onClick={() =>
                setSelectedPhotoIndex(
                  (selectedPhotoIndex - 1 + filteredPhotos.length) %
                    filteredPhotos.length
                )
              }
              title="Previous photo (Left arrow)"
            >
              ‹
            </button>
            <button
              className="lightbox-nav-btn lightbox-next"
              onClick={() =>
                setSelectedPhotoIndex(
                  (selectedPhotoIndex + 1) % filteredPhotos.length
                )
              }
              title="Next photo (Right arrow)"
            >
              ›
            </button>

            <div className="lightbox-image-wrap">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.caption || categoryLabels[selectedPhoto.category]}
              />
            </div>

            <div className="lightbox-info">
              <div>
                <p className="lightbox-caption">
                  {selectedPhoto.caption || categoryLabels[selectedPhoto.category]}
                </p>
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--ink-muted)',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  Frame {selectedPhotoIndex + 1} of {filteredPhotos.length} · {selectedPhoto.category}
                </span>
              </div>
              <div className="lightbox-actions">
                <button
                  className="heart-reaction-btn"
                  onClick={(e) => handleLike(selectedPhoto.src, e)}
                >
                  ❤️ {likes[selectedPhoto.src] || 0} Loves
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING VINYL MUSIC PLAYER WIDGET */}
      <div
        className="vinyl-widget"
        onClick={toggleMusic}
        title="Toggle soft ambient melody"
      >
        <div className={`vinyl-disc ${isPlayingMusic ? 'spinning' : ''}`}>
          <div className="vinyl-center-dot" />
        </div>
        <div className="vinyl-text">
          <span className="vinyl-title">Our Melodies 🎵</span>
          <span className="vinyl-status">
            {isPlayingMusic ? 'Playing soft chords ♬' : 'Tap to play music'}
          </span>
        </div>
      </div>
    </div>
  )
}
