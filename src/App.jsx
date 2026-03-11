const personalityCards = [
  {
    title: 'Gentle by nature',
    text: 'You have a calm kind of softness that never feels forced. It shows up in the way you speak, the way you notice things, and the way you make people feel comfortable without even trying too hard.',
  },
  {
    title: 'Quietly memorable',
    text: 'Some people are loud enough to be noticed. You are different. You stay with people because of the way your presence feels sincere, steady, and easy to miss only until you are gone.',
  },
  {
    title: 'Thoughtful in the details',
    text: 'There is care in the little things you do. Even simple moments feel more complete around you, like you naturally bring warmth and intention into spaces that would otherwise feel ordinary.',
  },
]

const unforgettableThings = [
  'The way your presence can make a moment feel softer and lighter.',
  'How you seem genuine instead of performative, even when you are just being yourself.',
  'The small habits, expressions, and pauses that feel natural but become impossible to forget.',
  'The balance you have of being delicate without ever feeling fragile.',
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
              Some people leave an impression.
              <span> You feel more like a quiet favorite memory.</span>
            </h1>
            <p className="hero-text">
              This is a simple little site for you, Eulyn. Nothing too grand,
              nothing too polished, just something honest that reflects how I
              see you: soft, genuine, and impossible to reduce to one word.
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
            title="The kind of person who makes softness feel real"
            text="Not loud, not overdone, not trying to be anything extra. Just a presence that feels kind, grounded, and naturally lovely."
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
            title="Because some people deserve something made specifically for them"
            text="I made this page because words said casually can disappear too fast. I wanted something more intentional than a message and more personal than a template. Just a small space that says you are appreciated in a way that feels thoughtful, simple, and real."
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
