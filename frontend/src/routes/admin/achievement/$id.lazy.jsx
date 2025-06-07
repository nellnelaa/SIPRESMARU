import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/achievement/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/achievement/$id"!</div>
}
