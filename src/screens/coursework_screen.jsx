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
        Here I list some notable courses I've taken. A full list of courses is available at the bottom of this page.
      </p>

      <CS240E />
      <CS246 />
      <CS341 />
      <CS349 />
      <CS763 />
      <CS466 />
      <Full_Course_List />
    </Screen_Layout>
  )
}

function CS240E() {
  const t = useTheme
  return (
    <div>
      <div style={course_title_style(t)}>CS240E: Data Structures</div>
      <p style={course_blurb_style(t)}>
        {cs240e_blurb}{' '}
        <a
          href="https://student.cs.uwaterloo.ca/~cs240e/w25/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', 'text-decoration': 'underline' }}
        >
          https://student.cs.uwaterloo.ca/~cs240e/w25/
        </a>
      </p>
    </div>
  )
}

function CS246() {
  const t = useTheme
  return (
    <div>
      <div style={course_title_style(t)}>CS246: Designing Medium Sized Programs</div>
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
      <p style={course_blurb_style(t)}>
        {cs341_blurb}{' '}
        <a
          href="https://cs.uwaterloo.ca/~lapchi/cs341-2025/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', 'text-decoration': 'underline' }}
        >
          https://cs.uwaterloo.ca/~lapchi/cs341-2025/
        </a>
      </p>
    </div>
  )
}

function CS349() {
  const t = useTheme
  return (
    <div>
      <div style={course_title_style(t)}>CS349: Introduction to UI</div>
      <p style={course_blurb_style(t)}>
        {cs349_blurb}{' '}
        <a
          href="https://student.cs.uwaterloo.ca/~cs349/1259/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', 'text-decoration': 'underline' }}
        >
          https://student.cs.uwaterloo.ca/~cs349/1259/
        </a>
      </p>
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

function CS466() {
  const t = useTheme
  return (
    <div>
      <div style={{
        'font-weight': 700,
        'font-size': '1.5rem',
        margin: '1rem 0 0.5rem',
        color: '#00FFFF',
        'font-family': "'Oxygen', sans-serif",
      }}>CS466: Probabilistic Algorithms</div>
      <p style={course_blurb_style(t)}>
        {cs466_blurb}{' '}
        <a
          href="https://cs.uwaterloo.ca/~lapchi/cs466-2026/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', 'text-decoration': 'underline' }}
        >
          https://cs.uwaterloo.ca/~lapchi/cs466-2026/
        </a>
      </p>
    </div>
  )
}

function Full_Course_List() {
  const t = useTheme
  return (
    <div>
      <div style={course_title_style(t)}>Full Course List</div>
      <p style={course_blurb_style(t)}>
        {full_course_list_blurb}{' '}
        <a
          href="https://docs.google.com/spreadsheets/d/1IwaYNhCEy5anOaNXzIjaTLys7r3DP2efDOYdtB7jQ3M/edit?gid=0#gid=0"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', 'text-decoration': 'underline' }}
        >
          https://docs.google.com/spreadsheets/d/1IwaYNhCEy5anOaNXzIjaTLys7r3DP2efDOYdtB7jQ3M/edit?gid=0#gid=0
        </a>
      </p>
    </div>
  )
}

const course_title_style = (t) => ({
  'font-weight': 700,
  'font-size': '1.5rem',
  margin: '1rem 0 0.5rem',
  color: t().text_h,
  'font-family': "'Oxygen', sans-serif",
})

const course_blurb_style = (t) => ({
  margin: 0,
  color: t().text_h,
  'font-size': '1.1rem',
  'line-height': 1.6,
  'white-space': 'pre-line',
})

const cs240e_blurb =
`A course on standard data structures, plus some algorithms on string matching, e.g. KMP, Boyer-Moore, as well as algorithms for text compression, e.g. RLE, LZW, bzip2.`

const cs246_blurb =
`The first course in this program that teaches you how to structure larger programs. I owe much of what I can do now to this course.`

const cs341_blurb =
`A standard course on deterministic algorithms, plus max-flow and NP-complete reductions. A substantial amount of course material focuses on graph algorithms and CO (Combinatorics and Optimization) style problems. Two very difficult dynamic programming problems.`

const cs349_blurb =
`A modern course on the inner workings of UI, with very well designed assignments. In A1 we drew things directly to a canvas, in A2 we started abstracting things into widget classes, in A3 we did HTML dom manipulation, and in A4 we learned Preact. Having to implement the subject-observer patterns in A2 and A3 gave good basic understanding of what frameworks like React and Preact were doing underneath.`

const cs763_blurb =
`We closely followed the textbook "Computational Geometry: Algorithms and Applications" by de Berg, Cheong, van Kreveld, Overmars. Despite being a graduate course, it wasn't too difficult.`

const cs466_blurb =
`This is the hardest course I've ever taken. We studied various randomized algorithms, basic spectral graph theory, and approximation algorithms via linear program relaxations.`

const full_course_list_blurb =
`Every course I've taken and plan to take:`
