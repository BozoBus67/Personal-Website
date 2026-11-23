import { useTheme } from '../shared/constants'
import { Screen_Layout, Page_Title } from '../shared/utility_components'

export function Coursework_Screen() {
  const t = useTheme
  return (
    <Screen_Layout>
      <Page_Title description={page_title_description}>
        Coursework
      </Page_Title>

      <CS240E />
      <CS246 />
      <CS341 />
      <CS346 />
      <CS348 />
      <CS349 />
      <CS466 />
      <CS480 />
      <CS763 />
      <Full_Course_List />
    </Screen_Layout>
  )
}

function CS240E() {
  const t = useTheme
  return (
    <div>
      <Course_Title href="https://student.cs.uwaterloo.ca/~cs240e/w25/lectures.phtml">CS240E: Data Structures</Course_Title>
      <p style={course_blurb_style(t)}>{cs240e_blurb}</p>
    </div>
  )
}

function CS246() {
  const t = useTheme
  return (
    <div>
      <Course_Title>CS246: Object Oriented Programming</Course_Title>
      <p style={course_blurb_style(t)}>{cs246_blurb}</p>
    </div>
  )
}

function CS341() {
  const t = useTheme
  return (
    <div>
      <Course_Title href="https://cs.uwaterloo.ca/~lapchi/cs341-2025/notes.html">CS341: Algorithms 1</Course_Title>
      <p style={course_blurb_style(t)}>{cs341_blurb}</p>
    </div>
  )
}

function CS346() {
  const t = useTheme
  return (
    <div>
      <Course_Title>CS346: Mobile App Development</Course_Title>
      <p style={course_blurb_style(t)}>
        {cs346_blurb}{' '}
        <Inline_Link href="https://student.cs.uwaterloo.ca/~cs346/site/project/">Newest offering here.</Inline_Link>
      </p>
    </div>
  )
}

function CS348() {
  const t = useTheme
  return (
    <div>
      <Course_Title>CS348: Introduction to Databases</Course_Title>
      <p style={course_blurb_style(t)}>
        {cs348_blurb}{' '}
        <Inline_Link href="https://cs.uwaterloo.ca/~smaiyya/cs348/">Newest offering here.</Inline_Link>
      </p>
    </div>
  )
}

function CS349() {
  const t = useTheme
  return (
    <div>
      <Course_Title>CS349: Introduction to UI</Course_Title>
      <p style={course_blurb_style(t)}>
        {cs349_blurb}{' '}
        <Inline_Link href="https://student.cs.uwaterloo.ca/~cs349/1269/assignments/">Newest offering here.</Inline_Link>
      </p>
    </div>
  )
}

function CS763() {
  const t = useTheme
  return (
    <div>
      <Course_Title>CS763: Computational Geometry</Course_Title>
      <p style={course_blurb_style(t)}>{cs763_blurb}</p>
    </div>
  )
}

function CS466() {
  const t = useTheme
  return (
    <div>
      <Course_Title
        href="https://cs.uwaterloo.ca/~lapchi/cs466-2026/"
        color={t().color_scheme === 'dark' ? '#00FFFF' : '#6d28d9'}
      >
        CS466: Algorithms 2
      </Course_Title>
      <p style={course_blurb_style(t)}>{cs466_blurb}</p>
    </div>
  )
}

function CS480() {
  const t = useTheme
  return (
    <div>
      <Course_Title
        href="https://cs.uwaterloo.ca/~y328yu/teaching/480/"
        color={t().color_scheme === 'dark' ? '#FFD700' : '#B45309'}
      >
        CS480: Introduction to Machine Learning
      </Course_Title>
      <p style={course_blurb_style(t)}>{cs480_blurb}</p>
    </div>
  )
}

function Full_Course_List() {
  return (
    <div style={{ 'text-align': 'center', 'margin-top': '1.5rem' }}>
      <Course_Title
        href="https://docs.google.com/spreadsheets/d/1IwaYNhCEy5anOaNXzIjaTLys7r3DP2efDOYdtB7jQ3M/edit?gid=0#gid=0"
        size="1.3rem"
      >
        full list of courses
      </Course_Title>
    </div>
  )
}

function Inline_Link(props) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: 'inherit', 'text-decoration': 'underline' }}
    >
      {props.children}
    </a>
  )
}

function Course_Title(props) {
  const t = useTheme
  const text_color = () => props.color ?? t().text_h
  const glow_color = () => (t().name === 'light' ? '#cce4ff' : '#1a2d6b')
  const base = () => ({
    'font-weight': 700,
    'font-size': props.size ?? '1.5rem',
    margin: '1rem 0 0.5rem',
    'font-family': "'Oxygen', sans-serif",
    'text-shadow': `0 0 8px ${glow_color()}, 0 0 16px ${glow_color()}, 0 0 24px ${glow_color()}`,
  })
  if (!props.href) {
    return (
      <div style={{ ...base(), color: text_color() }}>
        {props.children}
      </div>
    )
  }
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        ...base(),
        color: text_color(),
        'text-decoration': 'underline',
        display: 'inline-block',
      }}
    >
      {props.children}
    </a>
  )
}

const course_blurb_style = (t) => ({
  margin: 0,
  color: t().text,
  'font-size': '1.1rem',
  'line-height': 1.6,
  'white-space': 'pre-line',
})

const page_title_description =
`A non-exhaustive list of CS electives I've taken. A full list of courses is available at the bottom of this page.
Where the original course website is still up, the title links to it directly.`

const cs240e_blurb =
`In addition to basic data structures, we learned some algorithms for string matching (KMP, Boyer-Moore) and some algorithms for text compression (RLE, LZW, bzip2). We also covered the basics of external memory model.`

const cs246_blurb =
`I owe much of what I can do now as a programmer to this course.`

const cs341_blurb =
`A standard course on leetcode-style algorithms, including max-flow and NP-complete reductions.`

const cs346_blurb =
`You make an Android app in groups of 4.`

const cs348_blurb =
`Covers SQL and basic transactional properties like ACID, plus some minor optimizations.`

const cs349_blurb =
`Very well designed assignments.`

const cs763_blurb =
`We follow the textbook "Computational Geometry: Algorithms and Applications" by de Berg, Cheong, van Kreveld, and Overmars, and covered some additional topics such as the straight skeleton of a polygon and basic robot motion planning.`

const cs466_blurb =
`We studied various randomized algorithms and probabilistic methods, basic spectral graph theory, and approximation algorithms via linear program relaxations. Sublinear algorithms, streaming algorithms, and the multiplicative weights update method were also explored.`

const cs480_blurb =
`We studied classical methods such as gradient boosting, as well as modern architectures such as LLMs, Diffusion, and Flow matching. We also briefly studied robustness, fairness, privacy, valuation, and causality.`
