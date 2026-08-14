import React, { useState, useEffect, useRef } from 'react'
import photosData from './photosData.json'

const timelineMoments = [
  {
    badge: 'Chapter 1 · April 2026',
    title: 'Where Our Story Began Blooming',
    description:
      'From the very first conversations, late-night Discord calls, and sharing our favorite things. The connection was effortless and sweet from day one.',
    photo: '/photos/bebi-journey-03.jpg',
    caption: 'The beginning of something beautiful 🌸',
  },
  {
    badge: 'Chapter 2 · May & June 2026',
    title: 'Daily Warmth, Late Nights & Endless Laughs',
    description:
      'Talking about anime, manga, food cravings, and life until 2 AM. Every simple moment felt special and naturally comforting.',
    photo: '/photos/bebi-journey-04.jpg',
    caption: 'Cozy late nights & endless laughter 💬',
  },
  {
    badge: 'Chapter 3 · July 25, 2026',
    title: 'The Unforgettable Makati Date',
    description:
      'Walking hand-in-hand through Makati, cafe hopping, enjoying delicious food, candid photos, and watching the city golden hour together.',
    photo: '/photos/makati-golden-01.jpg',
    caption: 'Makati golden hour magic ✨',
  },
  {
    badge: 'Chapter 4 · August 2026 & Beyond',
    title: '3 Months Down, Forever to Go',
    description:
      'Happy 3rd Monthsary, my love! Thank you for 90+ days of happiness, genuine care, and being the sweetest part of my life.',
    photo: '/photos/makati-memory-10.jpg',
    caption: 'To many more months and milestones ahead 🥂',
  },
]

const reasonsILoveYou = [
  {
    icon: '🌸',
    title: 'Your Soft Blue Lily Energy',
    text: 'Calm, gentle, and breathtakingly unique. Just like your favorite blue lily, your presence brings peace and beauty wherever you are.',
  },
  {
    icon: '🎨',
    title: 'Effortlessly Cute & Creative',
    text: 'From your artisan craft hobbies to your taste in aesthetics, everything you make and love has that special, personal touch.',
  },
  {
    icon: '✨',
    title: 'Your Radiant & Sweet Smile',
    text: 'Your warm smile and gentle eyes make even the most ordinary day feel bright, cheerful, and full of comfort.',
  },
  {
    icon: '🌙',
    title: 'Late Night Talks & Shared Vibe',
    text: 'Whether we are discussing movies, manga, memes, or random thoughts, there is never a dull second with you.',
  },
  {
    icon: '🍕',
    title: 'Top-Tier Foodie Companion',
    text: 'Sharing food cravings, planning our next snack runs, and eating comfort meals together is one of our best superpowers.',
  },
  {
    icon: '💙',
    title: 'My Safe & Warm Space',
    text: 'Being with you is easy and honest. You make me feel loved, appreciated, and inspired every single day.',
  },
]

const comfortFoods = [
  { name: 'Latiao', emoji: '🌶️' },
  { name: 'French Fries', emoji: '🍟' },
  { name: 'Hawaiian Pizza', emoji: '🍕' },
  { name: 'Sushi', emoji: '🍣' },
  { name: 'Kimbap', emoji: '🍱' },
  { name: 'Buldak Noodles', emoji: '🍜' },
  { name: 'Pasta & Carbonara', emoji: '🍝' },
  { name: 'Pork Sisig', emoji: '🍳' },
  { name: 'Crispy Chicken Burgers', emoji: '🍔' },
  { name: 'Sweet Desserts', emoji: '🍰' },
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

  // Monthsary countdown / counter calculation
  const [timeTogether, setTimeTogether] = useState({
    months: 3,
    days: 92,
    hours: 14,
    minutes: 30,
  })

  useEffect(() => {
    // Start date approx 3 months ago (mid May 2026)
    const startDate = new Date('2026-05-14T00:00:00')
    const updateTimer = () => {
      const now = new Date()
      const diffMs = now - startDate
      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60)
      setTimeTogether({
        months: 3,
        days: totalDays > 0 ? totalDays : 92,
        hours,
        minutes,
      })
    }
    updateTimer()
    const timer = setInterval(updateTimer, 30000)
    return () => clearInterval(timer)
  }, [])

  // Floating petals generator
  const petals = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    left: `${(i * 5.8) % 100}%`,
    delay: `${(i * 1.4) % 12}s`,
    duration: `${14 + ((i * 3) % 10)}s`,
    symbol: i % 3 === 0 ? '🌸' : i % 3 === 1 ? '💙' : '✨',
  }))

  // Trigger romantic celebration confetti
  const triggerConfetti = () => {
    const newParticles = Array.from({ length: 45 }).map((_, i) => ({
      id: Date.now() + i,
      x: 20 + Math.random() * 60,
      y: 30 + Math.random() * 40,
      color: ['#5474c4', '#f08a9d', '#ffd166', '#a0c4ff', '#ff99c8'][
        Math.floor(Math.random() * 5)
      ],
      emoji: ['💙', '🌸', '✨', '💖', '🎉', '🦋'][Math.floor(Math.random() * 6)],
      speedX: (Math.random() - 0.5) * 12,
      speedY: -Math.random() * 10 - 5,
    }))
    setConfettiBurst(newParticles)
    setTimeout(() => setConfettiBurst([]), 3500)
  }

  // Handle Photo like counter
  const handleLike = (src, e) => {
    e.stopPropagation()
    setLikes((prev) => ({
      ...prev,
      [src]: (prev[src] || 0) + 1,
    }))
  }

  // Web Audio romantic ambient chime toggle
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
        
        // Gentle romantic arpeggio synth notes
        const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23] // C, E, G, C, A, F
        let noteIdx = 0
        
        const playArp = () => {
          if (!isPlayingMusic && oscillatorRef.current === null) return
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'sine'
          osc.frequency.setValueAtTime(notes[noteIdx % notes.length], ctx.currentTime)
          noteIdx++
          
          gain.gain.setValueAtTime(0.001, ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.1)
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.6)
          
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start()
          osc.stop(ctx.currentTime + 1.8)
        }
        
        playArp()
        const intervalId = setInterval(playArp, 1200)
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
      {/* Paper texture overlay */}
      <div className="paper-overlay" />

      {/* Floating Petals / Hearts */}
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

      {/* Confetti Explosion elements */}
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
            <a href="#story" className="nav-link">Our Story</a>
            <a href="#gallery" className="nav-link">Scrapbook</a>
            <a href="#letter" className="nav-link">Love Letter</a>
            <a href="#reasons" className="nav-link">Why You</a>
            <a href="#food" className="nav-link">Comfort Food</a>
          </nav>
          <button className="celebrate-btn" onClick={triggerConfetti}>
            ✨ Celebrate!
          </button>
        </header>

        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              <span>✨</span> Happy 3rd Monthsary, Bebi! <span>💙</span>
            </div>
            <h1 className="hero-title">
              Three Months of <span className="highlight">Endless Smiles</span>
              <span className="hand-subtitle">and loving you more each day</span>
            </h1>
            <p className="hero-description">
              Welcome to our little digital scrapbook, Eulyn. A warm, creative corner celebrating our first 3 months together—from our sweet late-night chats to our unforgettable Makati date and all the beautiful memories in between.
            </p>

            {/* Live Counter Box */}
            <div className="counter-box">
              <div className="counter-item">
                <span className="counter-num">{timeTogether.months}</span>
                <span className="counter-label">Months</span>
              </div>
              <div className="counter-item">
                <span className="counter-num">{timeTogether.days}</span>
                <span className="counter-label">Days of Us</span>
              </div>
              <div className="counter-item">
                <span className="counter-num">1</span>
                <span className="counter-label">Amazing Girl</span>
              </div>
              <div className="counter-item">
                <span className="counter-num">∞</span>
                <span className="counter-label">Love & Care</span>
              </div>
            </div>

            <div className="hero-cta-group">
              <a href="#letter" className="btn-primary">
                💌 Open Monthsary Letter
              </a>
              <a href="#gallery" className="btn-secondary">
                📸 Explore Scrapbook ({photosData.length} Photos)
              </a>
            </div>
          </div>

          {/* Interactive Hero Scrapbook Showcase */}
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
              <p className="polaroid-caption">Golden Hour with You 🌇</p>
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
              <p className="polaroid-caption">Blue Lily Beauty 🌸</p>
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
              <p className="polaroid-caption">Sweetest Moments 💕</p>
            </div>
          </div>
        </section>

        {/* TIMELINE / CHAPTERS SECTION */}
        <section className="section" id="story">
          <div className="section-head">
            <span className="section-tag">Our 3-Month Journey</span>
            <h2 className="section-title">Chapters of Us</h2>
            <p className="section-sub">
              A look back at how every single month brought us closer, sweeter, and happier together.
            </p>
          </div>

          <div className="timeline-container">
            <div className="timeline-line" />
            {timelineMoments.map((item, idx) => (
              <div
                key={item.badge}
                className={`timeline-card ${idx % 2 === 0 ? 'left' : 'right'}`}
              >
                <div className="timeline-marker" />
                <span className="timeline-badge">{item.badge}</span>
                <h3>{item.title}</h3>
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
            <span className="section-tag">Polaroid Memory Wall</span>
            <h2 className="section-title">Our Captured Frames</h2>
            <p className="section-sub">
              Click on any polaroid to view it in high resolution, leave a heart reaction, or flip through our memories.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="filter-tabs">
            {[
              { key: 'all', label: `✨ All Frames (${photosData.length})` },
              { key: 'makati', label: '🏙️ Makati Date' },
              { key: 'journey', label: '🌸 Journey Milestones' },
              { key: 'sweet', label: '💕 Sweet Eulyn' },
              { key: 'candid', label: '📸 Candid & Cute' },
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
            <span className="section-tag">A Special Note</span>
            <h2 className="section-title">From My Heart to Yours</h2>
            <p className="section-sub">
              Click the wax seal below to unseal your 3rd Monthsary letter.
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
                  ? '✨ The letter is unfolded below ✨'
                  : '💌 Tap the wax seal to unseal your letter 💌'}
              </p>
            </div>

            {envelopeOpen && (
              <div className="letter-content">
                <h3 className="letter-heading">Dearest Eulyn (Bebi),</h3>
                <div className="letter-body">
                  <p>
                    Happy 3rd Monthsary! It feels surreal that three months have already passed, but at the same time, every single day with you feels like a blessing I never take for granted.
                  </p>
                  <p>
                    Thank you for being such a radiant, sweet, and genuine person. Your presence brings so much calm and joy into my life. From our late-night chats talking about anime, crafts, and food, to the moments we just laugh over silly things—every second spent with you is my favorite part of the day.
                  </p>
                  <p>
                    Our Makati date was one of the happiest days I have had. Seeing you smile in person, walking around the city, sharing meals, and capturing those sweet candid memories made me realize even more how lucky I am to have you in my corner.
                  </p>
                  <p>
                    You are naturally creative, thoughtful, and pretty in that calm blue lily kind of way. Here is to our 3rd month, and to many more adventures, food dates, and unforgettable memories ahead.
                  </p>
                  <p>I appreciate you, I adore you, and I love you always.</p>
                </div>
                <div className="letter-signature">
                  <p className="letter-sign-text">With all my love,</p>
                  <p className="letter-sign-text">Dheyn 💙</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* REASONS I LOVE YOU SECTION */}
        <section className="section" id="reasons">
          <div className="section-head">
            <span className="section-tag">Why You Are Special</span>
            <h2 className="section-title">The Things I Adore About You</h2>
            <p className="section-sub">
              A few of the countless little reasons why loving you is the easiest thing in the world.
            </p>
          </div>

          <div className="reasons-grid">
            {reasonsILoveYou.map((reason) => (
              <div key={reason.title} className="reason-card">
                <span className="reason-icon">{reason.icon}</span>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* COMFORT FOOD & CRAVINGS MENU */}
        <section className="section" id="food">
          <div className="section-head">
            <span className="section-tag">Our Foodie World</span>
            <h2 className="section-title">The Comfort Menu</h2>
            <p className="section-sub">
              All of Eulyn&apos;s favorite comfort food and snack staples. Tap any item to send a craving!
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
            Handcrafted with love, memories, and code for my favorite person in the world.
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
        title="Toggle romantic ambient melody"
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
