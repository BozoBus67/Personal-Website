import { useTheme } from '../../shared/constants'
import {
  Screen_Layout,
  Page_Title,
  para_style,
} from '../../shared/utility_components'

export function Task_Queue_Screen() {
  return (
    <Screen_Layout>
      <Page_Title>Distributed Task Queue</Page_Title>
      <Dashboard_Link />
    </Screen_Layout>
  )
}

function Dashboard_Link() {
  const t = useTheme
  return (
    <p style={para_style()}>
      Observability runs against a local Prometheus + Grafana stack. Dashboard at{' '}
      <a
        href="http://localhost:3000/d/task-queue/task-queue"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: t().name === 'light' ? '#1e40af' : '#60a5fa',
          'text-decoration': 'underline',
        }}
      >
        localhost:3000/d/task-queue
      </a>{' '}
      when the stack is running locally.
    </p>
  )
}
