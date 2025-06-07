import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/tag/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/tag/create"!</div>
}
