import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/tag copy/edit/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/tag/edit/$id"!</div>
}
