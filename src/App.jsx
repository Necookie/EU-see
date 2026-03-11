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
    title: 'Cute and creative',
    text: 'You have that naturally creative energy that makes simple things feel more fun, more thoughtful, and more you.',
  },
  {
    title: 'Easy to be around',
    text: 'You come across in a light and genuine way. Nothing forced, nothing too much, just warm company that feels easy to like.',
  },
  {
    title: 'Sweet in the details',
    text: 'The little things stand out with you, from your hobbies to your style to the way you make ordinary moments feel a bit cuter.',
  },
]

const unforgettableThings = [
  'The creative side of you that shows up in reading, crafts, and the little things you enjoy.',
  'How your vibe feels cozy, playful, and genuine instead of trying too hard.',
  'The fact that you can talk about manga, movies, food, and random things and still make it all feel fun.',
  'That soft but memorable kind of charm that sticks with people naturally.',
]

const favoriteThings = [
  'Blue lily flowers',
  'Reading manga',
  'Making artisan crafts',
  'Watching movies late at night',
  'Hanging out on Discord',
  'Good food and comfort snacks',
]

const foodList = [
  'Latiao',
  'French fries',
  'Hawaiian pizza',
  'Vegetarian pizza',
  'Sushi',
  'Kimbap',
  'Buldak',
  'Pasta',
  'Sisig',
  'Chicken burgers',
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
            <p className="eyebrow">Blue lily energy</p>
            <h1>
              Cute, creative,
              <span> and easy to appreciate.</span>
            </h1>
            <p className="hero-text">
              This is a simple little site for you, Eulyn. Nothing too grand,
              just something soft and thoughtful that matches your vibe a bit
              more: creative hobbies, cute energy, good food, and all.
            </p>
            <a className="hero-link" href="#why">
              Read the note
            </a>
          </div>

          <div className="hero-card">
            <p className="hero-card-label">A few things that fit you</p>
            <ul>
              <li>Blue lily kind of pretty</li>
              <li>Creative in a naturally cute way</li>
              <li>The type to make simple things fun</li>
            </ul>
          </div>
        </section>

        <section className="section">
          <SectionHeading
            eyebrow="Presence"
            title="The kind of vibe that feels cute, creative, and real"
            text="Using your README as reference, I leaned into what actually feels like you: sweet energy, creative hobbies, comfort things, and a style that feels soft without trying too hard."
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
            text="All the photos are in here now, with a soft slider so they feel more like a cute little showcase than a stiff gallery."
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

        <section className="section favorites-section">
          <SectionHeading
            eyebrow="Favorites"
            title="The things that make the page feel more like you"
            text="Pulled from your README, because details like favorite flowers, hobbies, and foods make this feel more personal."
          />

          <div className="favorites-layout">
            <article className="favorite-panel lily-panel">
              <p className="favorite-label">Flower</p>
              <h3>Blue lily</h3>
              <p>
                Soft, calm, and a little striking without being loud. It felt
                like the right visual direction for the page.
              </p>
            </article>

            <article className="favorite-panel">
              <p className="favorite-label">Things you like</p>
              <div className="tag-list">
                {favoriteThings.map((item) => (
                  <span className="tag-chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="section alt-section">
          <SectionHeading
            eyebrow="Little Things"
            title="The fun part is how many things already make you memorable"
            text="Not in a dramatic way. More in the cute, specific, easy-to-picture way that comes from hobbies, favorite food, and the overall energy you give off."
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

        <section className="section food-section">
          <SectionHeading
            eyebrow="Comfort Menu"
            title="Also, your food list is elite"
            text="A page based on your README would be incomplete without mentioning the snacks and comfort food lineup."
          />

          <div className="tag-list food-tags">
            {foodList.map((item) => (
              <span className="tag-chip food-chip" key={item}>
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="section message-section" id="why">
          <SectionHeading
            eyebrow="Why I made this"
            title="Because your own little intro already had a cute vibe to build from"
            text="So I used your README as the reference point and turned it into something softer and more personal. Still simple, still light, just a bit more you."
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
