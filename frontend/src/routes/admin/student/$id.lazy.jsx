import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/student/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/student/$id"!</div>
}
