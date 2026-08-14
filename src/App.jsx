import React, { useState, useEffect, useRef } from 'react'
import photosData from './photosData.json'

const milestoneMoments = [
  {
    date: 'May 15, 2026',
    badge: 'Our Anniversary 💕',
    title: 'The Day It All Began',
    description:
      'The start of our relationship and the day we officially became us.',
    photo: '/photos/bebi-journey-03.jpg',
    caption: 'May 15, 2026 · Where our story started',
  },
  {
    date: 'July 25, 2026',
    badge: 'Makati Date 🏙️',
    title: 'Our Day in Makati',
    description:
      'Spending the day together in Makati—walking around, good food, cafe stops, and taking photos together during golden hour.',
    photo: '/photos/makati-golden-01.jpg',
    caption: 'July 25, 2026 · Makati golden hour with you',
  },
  {
    date: 'August 15, 2026',
    badge: '3rd Monthsary 🥂',
    title: 'Three Months of Us',
    description:
      'Celebrating our 3rd monthsary! Three months down and excited for more memories to come.',
    photo: '/photos/makati-memory-10.jpg',
    caption: 'August 15, 2026 · Happy 3rd Monthsary!',
  },
]

const personalityHighlights = [
  {
    icon: '🌸',
    title: 'Blue Lily Energy',
    text: 'Calm, soft, and naturally striking without being loud. It matches your vibe completely.',
  },
  {
    icon: '🎨',
    title: 'Cute & Creative',
    text: 'Your artisan crafts, aesthetic eye, and natural creativity that makes small things thoughtful and fun.',
  },
  {
    icon: '📚',
    title: 'Manga & Late Night Movies',
    text: 'Enjoying good stories, cozy late nights, and just sharing whatever we are into.',
  },
  {
    icon: '✨',
    title: 'Easy to Be Around',
    text: 'Warm, cozy, and genuine company. Nothing forced—just sweet and comfortable.',
  },
  {
    icon: '🍕',
    title: 'Elite Food Taste',
    text: 'From Latiao and Buldak to sushi, fries, and pizza—our food cravings always hit the spot.',
  },
  {
    icon: '💙',
    title: 'Sweet in the Details',
    text: 'The little things stand out with you—your hobbies, your style, and your gentle charm.',
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
]

export default function App() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null)
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [likes, setLikes] = useState({})
  const [isPlayingMusic, setIsPlayingMusic] = useState(false)
  const [confettiBurst, setConfettiBurst] = useState([])
  const [foodReactions, setFoodReactions] = useState({})
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

  // Filtered photos
  const filteredPhotos = photosData.filter((photo) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'makati') return photo.category === 'makati'
    if (activeFilter === 'journey') return photo.category === 'journey'
    if (activeFilter === 'sweet') return photo.category === 'sweet'
    if (activeFilter === 'candid') return photo.category === 'candid'
    if (activeFilter === 'featured') return photo.category === 'featured'
    return true
  })

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

      <div className="page-container">
        {/* Navigation Bar */}
        <header className="top-nav">
          <div className="nav-brand">
            🌸 Eulyn & Dheyn <span>3rd Monthsary</span>
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
              <span className="hand-subtitle">Eulyn</span>
            </h1>
            <p className="hero-description">
              A little digital scrapbook for you, celebrating 3 months together. From our anniversary on May 15 to our Makati date on July 25 and all the sweet moments along the way.
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
              Photos from our Makati date, milestones, and favorite candid moments. Click any frame to view in full.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="filter-tabs">
            {[
              { key: 'all', label: `✨ All Photos (${photosData.length})` },
              { key: 'makati', label: '🏙️ Makati Date (July 25)' },
              { key: 'journey', label: '🌸 Milestones' },
              { key: 'sweet', label: '💕 Sweet Moments' },
              { key: 'candid', label: '📸 Candid' },
              { key: 'featured', label: '🌟 Featured' },
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

          {/* Gallery Grid */}
          <div className="gallery-grid">
            {filteredPhotos.map((photo, index) => {
              const tilt = (index % 5) - 2
              const likeCount = likes[photo.src] || 0
              return (
                <div
                  key={`${photo.src}-${index}`}
                  className="gallery-card"
                  style={{ transform: `rotate(${tilt}deg)` }}
                  onClick={() => setSelectedPhotoIndex(index)}
                >
                  <div className="washi-tape" />
                  <span className="gallery-category-badge">{photo.category}</span>
                  <div className="gallery-photo-wrapper">
                    <img src={photo.src} alt={photo.caption} loading="lazy" />
                  </div>
                  <p className="gallery-caption">{photo.caption}</p>
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
                className="wax-seal"
                onClick={() => setEnvelopeOpen(!envelopeOpen)}
                title="Click to open / close letter"
              >
                <span className="wax-seal-initials">E & D</span>
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
                <h3 className="letter-heading">Dearest Eulyn,</h3>
                <div className="letter-body">
                  <p>
                    Happy 3rd Monthsary! It is crazy to think three months have already passed since May 15, 2026.
                  </p>
                  <p>
                    I appreciate the person you are—creative, naturally sweet, thoughtful, and easy to be around. Whether we are talking about manga, movies, food cravings, or random everyday things, spending time with you is always my favorite part of the day.
                  </p>
                  <p>
                    Our Makati date on July 25 was really special to me. Walking around, trying good food, and having you right beside me made for such a memorable day.
                  </p>
                  <p>
                    Thank you for three wonderful months, Eulyn. Here is to celebrating today and looking forward to many more months and dates ahead.
                  </p>
                </div>
                <div className="letter-signature">
                  <p className="letter-sign-text">With all my love,</p>
                  <p className="letter-sign-text">Dheyn 💙</p>
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
                  className="food-chip"
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
          <p className="footer-hand">Happy 3rd Monthsary, Eulyn 💙</p>
          <p className="footer-text">
            May 15, 2026 · Handcrafted with care, memories, and code.
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
              <img src={selectedPhoto.src} alt={selectedPhoto.caption} />
            </div>

            <div className="lightbox-info">
              <div>
                <p className="lightbox-caption">{selectedPhoto.caption}</p>
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
