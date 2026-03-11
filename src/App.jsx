import image0901 from '../images/IMG_0901.jpg'
import image0624 from '../images/IMG_0624.jpg'
import image1896 from '../images/IMG_1896.jpg'
import image2137 from '../images/IMG_2137.jpg'
import image2712 from '../images/IMG_2712.jpg'
import image3383 from '../images/IMG_3383.jpg'
import imageAtt from '../images/att.G-HOeyicwmGxww-L9-Sr7WOb7uOchp8hNTt5LF84E38.jpg'
import imageD2 from '../images/D2AB3CC4-65B8-4023-BCF9-84BA0C16FB4C.jpg'

const personalityCards = [
  {
    title: 'Gentle by nature',
    text: 'You have a calm kind of softness that never feels forced. It shows up in the way you speak, the way you notice things, and the way you make people feel comfortable without trying too hard.',
  },
  {
    title: 'Quietly memorable',
    text: 'Some people are loud enough to be noticed. You are different. People remember you because your presence feels sincere, steady, and easy to be around.',
  },
  {
    title: 'Thoughtful in the details',
    text: 'There is care in the little things you do. Even simple moments feel better around you, like you naturally bring warmth and intention into spaces that might otherwise feel ordinary.',
  },
]

const unforgettableThings = [
  'The way your presence can make a moment feel softer and lighter.',
  'How you seem genuine instead of performative, even when you are just being yourself.',
  'The small habits, expressions, and pauses that feel natural but become impossible to forget.',
  'The balance you have of being delicate without ever feeling fragile.',
]

const collageImages = [
  { src: image0901, alt: 'Eulyn smiling in a mirror selfie' },
  { src: image1896, alt: 'Eulyn in a casual mirror photo' },
  { src: image2137, alt: 'Eulyn in a soft close-up portrait' },
  { src: image3383, alt: 'Eulyn in a cafe portrait' },
  { src: image0624, alt: 'Eulyn in a full-body mirror photo' },
  { src: image2712, alt: 'Eulyn in a candid selfie' },
  { src: imageAtt, alt: 'Eulyn in a bright portrait photo' },
  { src: imageD2, alt: 'Eulyn in a landscape photo' },
]

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  )
}

function App() {
  return (
    <div className="page-shell">
      <div className="page-glow page-glow-left" />
      <div className="page-glow page-glow-right" />

      <main className="page">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">A small page made with intention</p>
            <h1>
              Some people stand out loudly.
              <span> You stand out in a softer way.</span>
            </h1>
            <p className="hero-text">
              This is a simple little site for you, Eulyn. Nothing too grand,
              nothing too polished, just something honest that reflects how I
              see you: kind, pretty, and easy to appreciate.
            </p>
            <a className="hero-link" href="#why">
              Read the note
            </a>
          </div>

          <div className="hero-card">
            <p className="hero-card-label">How you come across</p>
            <ul>
              <li>Warm without trying to impress</li>
              <li>Pretty in a quiet, effortless way</li>
              <li>Easy to remember for the right reasons</li>
            </ul>
          </div>
        </section>

        <section className="section">
          <SectionHeading
            eyebrow="Presence"
            title="The kind of person who leaves a genuinely sweet impression"
            text="Not loud, not overdone, not trying to be anything extra. Just a presence that feels kind, grounded, and naturally easy to like."
          />

          <div className="card-grid">
            {personalityCards.map((card) => (
              <article className="info-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section collage-section">
          <SectionHeading
            eyebrow="Photo Collage"
            title="A few favorite frames"
            text="A cute little collage from the photos in the folder, because the page felt incomplete without putting a few of them together."
          />

          <div className="photo-slider">
            <div className="photo-slider-track">
              {[...collageImages, ...collageImages].map((image, index) => (
                <figure className="slider-card" key={`${image.src}-${index}`}>
                  <img src={image.src} alt={image.alt} />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt-section">
          <SectionHeading
            eyebrow="Little Things"
            title="What makes you unforgettable is rarely the obvious part"
            text="It is not only how you look. It is the feeling attached to the details, the little things that stay longer than they should."
          />

          <div className="details-panel">
            {unforgettableThings.map((item) => (
              <div className="detail-row" key={item}>
                <span className="detail-dot" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section message-section" id="why">
          <SectionHeading
            eyebrow="Why I made this"
            title="Because a normal compliment felt a little too easy"
            text="I made this page because I wanted to say something nice in a way that felt a bit more thoughtful than a passing message. Nothing dramatic, just a small space that says you are appreciated."
          />
        </section>
      </main>

      <footer className="footer">
        <p>Made for Eulyn, with honesty and a bit of code.</p>
      </footer>
    </div>
  )
}

export default App
