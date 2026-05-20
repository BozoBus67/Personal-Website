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

      <p
        style={{
          margin: 0,
          color: t().text,
          'font-size': '1.1rem',
          'text-align': 'center',
        }}
      >
        Some of my favorite courses taken:
      </p>

      <CS246 />
      <CS341 />
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
      <div style={course_title_style(t)}>CS246: Designing Medium Programs</div>
      <p style={course_blurb_style(t)}>{cs246_blurb}</p>
    </div>
  )
}

function CS341() {
  const t = useTheme
  return (
    <div>
      <div style={course_title_style(t)}>
        <a
          href="https://cs.uwaterloo.ca/~lapchi/cs341-2025/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', 'text-decoration': 'none' }}
        >
          CS341
        </a>: Beginner Algorithms
      </div>
      <p style={course_blurb_style(t)}>{cs341_blurb}</p>
    </div>
  )
}

function CS349() {
  const t = useTheme
  return (
    <div>
      <div style={course_title_style(t)}>CS349: Introduction to UI</div>
      <p style={course_blurb_style(t)}>{cs349_blurb}</p>
    </div>
  )
}

function CS466() {
  const t = useTheme
  return (
    <div>
      <div style={course_title_style(t)}>CS466: Intermediate Algorithms</div>
      <p style={course_blurb_style(t)}>{cs466_blurb}</p>
    </div>
  )
}

function CS763() {
  const t = useTheme
  return (
    <div>
      <div style={course_title_style(t)}>CS763: Computational Geometry</div>
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
`This is branded as an object oriented programming course, but it's more of a "how to design medium sized programs" course. As someone whose only prior programming experience are W3School tutorials, this course tuaght me how to actually program something larger than 1 file. This was the starting point for everything I can do now.`

const cs349_blurb =
`Very well designed assignments. A1 was essentially drawing things diectly to a screen canvas, A2 we started abstracting things into widget classes, A3 was raw HTML dom manipulation, and A4 we learned Preact. Very well designed assignments. Having to implement the subject-observer patterns in A2 and A3 gave good basic understanding of what frameworks like React and Preact were doing underneath.`

const cs341_blurb =
`Difficult. We learned standard determinstic algorithm techniques like Divide and Conquer, Greedy Algorithms, and Dynamic Programming, but there was a large emphasis on graph algorithms, as well as CO (Combinatorics and Optimization) style problems, which were often quite difficult. Interestingly, the two hardest problems in the course were not graph related. You can check out the coruse website here: . Taught by Lap Chi Lau. Extremely good lecture notes, but tough.`

const cs466_blurb =
`Currently taking! This course is on randomized, distributed, and streaming algorithms. Taught by Lap Chi Lau. Will probably e the hardest course I ever take.`

const cs763_blurb =
`Currently taking! Computational geometry.`
