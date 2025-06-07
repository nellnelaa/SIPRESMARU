import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/achievement/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/achievement/create"!</div>
}
