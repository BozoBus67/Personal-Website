import { useTheme } from '../../shared/constants'
import { Screen_Layout } from '../../shared/utility_components'

export function Raft_Screen() {
  const t = useTheme

  const h1_style = () => ({
    'font-weight': 700,
    'font-size': '40px',
    'line-height': 1,
    margin: 0,
    color: t().text_h,
    'text-align': 'center',
  })

  const h2_style = () => ({
    'font-weight': 700,
    'font-size': '22px',
    'line-height': 1,
    margin: '1rem 0 0',
    color: t().text_h,
  })

  const para_style = () => ({
    margin: 0,
    color: t().text_h,
    'font-size': '1.1rem',
    'line-height': 1.5,
  })

  return (
    <Screen_Layout>
      <h1 style={h1_style()}>Raft</h1>

      <p style={para_style()}>
        An implementation of the Raft consensus algorithm in Go, worked up from
        a bare skeleton to the full Figure-2 spec. Built to actually run into
        the failure modes the paper is trying to prevent instead of just
        reading about them.
      </p>

      <h2 style={h2_style()}>Progression</h2>
      <p style={para_style()}>
        Started with a bare skeleton (three nodes, stub RPC handlers that log
        and return true) to see the shape of a Raft node without any
        algorithm. Then a naive hardcoded-leader version to feel what's
        missing: no elections, no majority-ack, no log consistency check,
        commits fire immediately. Then a readability refactor, then the full
        Figure-2 implementation on top of that.
      </p>

      <h2 style={h2_style()}>The full version</h2>
      <p style={para_style()}>
        Randomized 250-500ms election timeouts, RequestVote with the
        up-to-date election restriction from §5.4.1, AppendEntries with the
        prevLogIndex/prevLogTerm consistency check and the conflict-term backup
        optimization, commit-only-current-term counting from §5.4.2 (with a
        no-op appended on election to force the current-term commit event),
        and fsync-before-reply persistence of currentTerm, votedFor, and log
        via write-tmp-fsync-rename. Client API is Submit(op, key, value) →
        (index, term, ok) plus WaitForCommit for callers that want to block
        until a commit lands.
      </p>

      <h2 style={h2_style()}>Notes</h2>
      <p style={para_style()}>
        Verified across ten back-to-back go run -race iterations: two leaders
        per run (initial plus post-failover), zero race warnings, all live
        nodes converge to identical KV state. Snapshots (§7), membership
        changes (§6), and exactly-once client delivery (§8) are intentionally
        out of scope.
      </p>
    </Screen_Layout>
  )
}
