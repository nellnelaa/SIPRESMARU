import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/achievement/edit/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/achievement/edit/$id"!</div>
}
