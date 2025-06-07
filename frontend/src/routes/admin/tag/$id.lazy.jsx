import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/tag/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/tag/$id"!</div>
}
