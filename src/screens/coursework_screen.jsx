import { useTheme } from '../shared/constants'
import { Screen_Layout } from '../shared/utility_components'

export function Coursework_Screen() {
  const t = useTheme
  return (
    <Screen_Layout>
      <h2
        style={{
          'font-weight': 700,
          'font-size': '48px',
          'line-height': 1,
          margin: 0,
          color: t().text_h,
          'text-align': 'center',
        }}
      >
        Coursework
      </h2>

      <CS246 />
      <CS349 />
      <CS466 />
      <CS763 />
    </Screen_Layout>
  )
}

function CS246() {
  const t = useTheme
  return (
    <div>
      <div style={course_title_style(t)}>CS246</div>
      <p style={course_blurb_style(t)}>{cs246_blurb}</p>
    </div>
  )
}

function CS349() {
  const t = useTheme
  return (
    <div>
      <div style={course_title_style(t)}>CS349</div>
      <p style={course_blurb_style(t)}>{cs349_blurb}</p>
    </div>
  )
}

function CS466() {
  const t = useTheme
  return (
    <div>
      <div style={course_title_style(t)}>CS466</div>
      <p style={course_blurb_style(t)}>{cs466_blurb}</p>
    </div>
  )
}

function CS763() {
  const t = useTheme
  return (
    <div>
      <div style={course_title_style(t)}>CS763</div>
      <p style={course_blurb_style(t)}>{cs763_blurb}</p>
    </div>
  )
}

const course_title_style = (t) => ({
  'font-weight': 700,
  'font-size': '1.5rem',
  margin: '1rem 0 0.5rem',
  color: t().text_h,
})

const course_blurb_style = (t) => ({
  margin: 0,
  color: t().text_h,
  'font-size': '1.1rem',
  'line-height': 1.6,
  'white-space': 'pre-line',
})

const cs246_blurb =
`Object-Oriented Software Development. C++ throughout — classes, inheritance, templates, exceptions, the STL. Design patterns and Unix tooling (shell, make, valgrind) on top. The Waterloo CS course that teaches you to write software, not just code.`

const cs349_blurb =
`User Interfaces. Event-driven programming, GUI toolkits, MVC. Built small desktop apps with a focus on interaction design — input handling, layout, redraw loops, the actual mechanics behind what a button click does.`

const cs466_blurb =
`Algorithm Design and Analysis. The course that picks up after CS341 — approximation algorithms, randomized algorithms, online algorithms, NP-hardness reductions. Heavier on proofs of correctness and competitive ratios than on implementation.`

const cs763_blurb =
`Computational Geometry. Convex hulls, Voronoi diagrams, range searching, geometric data structures. Graduate course — a lot of the algorithms feel obvious in 2D and turn into puzzles in higher dimensions.`
