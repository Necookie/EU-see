import { useRef } from 'react'
import { useReducedMotion, useScroll, useTransform, motion } from 'framer-motion'

const TILT_PATTERN = [-1.25, 0.85, -0.65, 1.35, -0.9]

function StackCard({ card, index, total, container, reduceMotion }) {
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })
  const start = total > 1 ? index / (total + 1) : 0
  const restingScale = Math.max(0.56, 1 - (total - index - 1) * 0.095)
  const scale = useTransform(
    scrollYProgress,
    [start, 1],
    reduceMotion ? [1, 1] : [1, restingScale]
  )

  return (
    <section className="stack-card-sticky">
      <motion.figure
        className="stack-card-figure"
        style={{
          scale,
          rotate: reduceMotion ? 0 : TILT_PATTERN[index % TILT_PATTERN.length],
          // Small symmetric cascade around dead-center, instead of a large
          // downward offset — keeps the resting stack vertically centered.
          top: `${(index - (total - 1) / 2) * 14}px`,
        }}
      >
        <div className="stack-card-photo-wrap">
          <img
            src={card.src}
            alt={card.title}
            loading={index < 2 ? 'eager' : 'lazy'}
            draggable={false}
          />
        </div>
        <figcaption className="stack-card-caption">{card.title}</figcaption>
      </motion.figure>
    </section>
  )
}

/**
 * Sticky-stacking scroll reel — cards pin in place and shrink/tilt as the
 * next one scrolls over it. Adapted from the shadcn "sticky-scroll-cards"
 * component to use the site's own polaroid/scrapbook styling instead of
 * Tailwind, and dropped the Lenis smooth-scroll wrapper so it doesn't
 * hijack scrolling on the rest of the page.
 */
export default function StickyScrollCards({ cards, hint = 'scroll to explore', className = '' }) {
  const container = useRef(null)
  const reduceMotion = useReducedMotion() ?? false

  return (
    <div ref={container} className={`stack-cards-root ${className}`}>
      <div className="stack-cards-hint">
        <p>{hint}</p>
        <span className="stack-cards-hint-line" />
      </div>

      {cards.map((card, index) => (
        <StackCard
          key={`${card.src}-${index}`}
          card={card}
          index={index}
          total={cards.length}
          container={container}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  )
}
