import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/tag copy/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/tag/create"!</div>
}
