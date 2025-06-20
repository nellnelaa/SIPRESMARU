/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TentangKamiImport } from './routes/tentangKami'
import { Route as PrestasiImport } from './routes/prestasi'
import { Route as InformasiImport } from './routes/informasi'
import { Route as AdminIndexImport } from './routes/admin/index'
import { Route as AdminReportIndexImport } from './routes/admin/report/index'

// Create Virtual Routes

const LoginLazyImport = createFileRoute('/login')()
const IndexLazyImport = createFileRoute('/')()
const AdminTagIndexLazyImport = createFileRoute('/admin/tag/')()
const AdminStudentIndexLazyImport = createFileRoute('/admin/student/')()
const AdminAchievementIndexLazyImport = createFileRoute('/admin/achievement/')()
const AdminTagCreateLazyImport = createFileRoute('/admin/tag/create')()
const AdminStudentCreateLazyImport = createFileRoute('/admin/student/create')()
const AdminReportCreateLazyImport = createFileRoute('/admin/report/create')()
const AdminReportIdLazyImport = createFileRoute('/admin/report/$id')()
const AdminAchievementCreateLazyImport = createFileRoute(
  '/admin/achievement/create',
)()
const AdminAchievementIdLazyImport = createFileRoute('/admin/achievement/$id')()
const AdminTagEditIdLazyImport = createFileRoute('/admin/tag/edit/$id')()
const AdminStudentEditIdLazyImport = createFileRoute(
  '/admin/student/edit/$id',
)()
const AdminReportEditIdLazyImport = createFileRoute('/admin/report/edit/$id')()
const AdminAchievementEditIdLazyImport = createFileRoute(
  '/admin/achievement/edit/$id',
)()

// Create/Update Routes

const LoginLazyRoute = LoginLazyImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login.lazy').then((d) => d.Route))

const TentangKamiRoute = TentangKamiImport.update({
  id: '/tentangKami',
  path: '/tentangKami',
  getParentRoute: () => rootRoute,
} as any)

const PrestasiRoute = PrestasiImport.update({
  id: '/prestasi',
  path: '/prestasi',
  getParentRoute: () => rootRoute,
} as any)

const InformasiRoute = InformasiImport.update({
  id: '/informasi',
  path: '/informasi',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const AdminIndexRoute = AdminIndexImport.update({
  id: '/admin/',
  path: '/admin/',
  getParentRoute: () => rootRoute,
} as any)

const AdminTagIndexLazyRoute = AdminTagIndexLazyImport.update({
  id: '/admin/tag/',
  path: '/admin/tag/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/admin/tag/index.lazy').then((d) => d.Route),
)

const AdminStudentIndexLazyRoute = AdminStudentIndexLazyImport.update({
  id: '/admin/student/',
  path: '/admin/student/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/admin/student/index.lazy').then((d) => d.Route),
)

const AdminAchievementIndexLazyRoute = AdminAchievementIndexLazyImport.update({
  id: '/admin/achievement/',
  path: '/admin/achievement/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/admin/achievement/index.lazy').then((d) => d.Route),
)

const AdminReportIndexRoute = AdminReportIndexImport.update({
  id: '/admin/report/',
  path: '/admin/report/',
  getParentRoute: () => rootRoute,
} as any)

const AdminTagCreateLazyRoute = AdminTagCreateLazyImport.update({
  id: '/admin/tag/create',
  path: '/admin/tag/create',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/admin/tag/create.lazy').then((d) => d.Route),
)

const AdminStudentCreateLazyRoute = AdminStudentCreateLazyImport.update({
  id: '/admin/student/create',
  path: '/admin/student/create',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/admin/student/create.lazy').then((d) => d.Route),
)

const AdminReportCreateLazyRoute = AdminReportCreateLazyImport.update({
  id: '/admin/report/create',
  path: '/admin/report/create',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/admin/report/create.lazy').then((d) => d.Route),
)

const AdminReportIdLazyRoute = AdminReportIdLazyImport.update({
  id: '/admin/report/$id',
  path: '/admin/report/$id',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/admin/report/$id.lazy').then((d) => d.Route),
)

const AdminAchievementCreateLazyRoute = AdminAchievementCreateLazyImport.update(
  {
    id: '/admin/achievement/create',
    path: '/admin/achievement/create',
    getParentRoute: () => rootRoute,
  } as any,
).lazy(() =>
  import('./routes/admin/achievement/create.lazy').then((d) => d.Route),
)

const AdminAchievementIdLazyRoute = AdminAchievementIdLazyImport.update({
  id: '/admin/achievement/$id',
  path: '/admin/achievement/$id',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/admin/achievement/$id.lazy').then((d) => d.Route),
)

const AdminTagEditIdLazyRoute = AdminTagEditIdLazyImport.update({
  id: '/admin/tag/edit/$id',
  path: '/admin/tag/edit/$id',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/admin/tag/edit/$id.lazy').then((d) => d.Route),
)

const AdminStudentEditIdLazyRoute = AdminStudentEditIdLazyImport.update({
  id: '/admin/student/edit/$id',
  path: '/admin/student/edit/$id',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/admin/student/edit/$id.lazy').then((d) => d.Route),
)

const AdminReportEditIdLazyRoute = AdminReportEditIdLazyImport.update({
  id: '/admin/report/edit/$id',
  path: '/admin/report/edit/$id',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/admin/report/edit/$id.lazy').then((d) => d.Route),
)

const AdminAchievementEditIdLazyRoute = AdminAchievementEditIdLazyImport.update(
  {
    id: '/admin/achievement/edit/$id',
    path: '/admin/achievement/edit/$id',
    getParentRoute: () => rootRoute,
  } as any,
).lazy(() =>
  import('./routes/admin/achievement/edit/$id.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/informasi': {
      id: '/informasi'
      path: '/informasi'
      fullPath: '/informasi'
      preLoaderRoute: typeof InformasiImport
      parentRoute: typeof rootRoute
    }
    '/prestasi': {
      id: '/prestasi'
      path: '/prestasi'
      fullPath: '/prestasi'
      preLoaderRoute: typeof PrestasiImport
      parentRoute: typeof rootRoute
    }
    '/tentangKami': {
      id: '/tentangKami'
      path: '/tentangKami'
      fullPath: '/tentangKami'
      preLoaderRoute: typeof TentangKamiImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/': {
      id: '/admin/'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminIndexImport
      parentRoute: typeof rootRoute
    }
    '/admin/achievement/$id': {
      id: '/admin/achievement/$id'
      path: '/admin/achievement/$id'
      fullPath: '/admin/achievement/$id'
      preLoaderRoute: typeof AdminAchievementIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/achievement/create': {
      id: '/admin/achievement/create'
      path: '/admin/achievement/create'
      fullPath: '/admin/achievement/create'
      preLoaderRoute: typeof AdminAchievementCreateLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/report/$id': {
      id: '/admin/report/$id'
      path: '/admin/report/$id'
      fullPath: '/admin/report/$id'
      preLoaderRoute: typeof AdminReportIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/report/create': {
      id: '/admin/report/create'
      path: '/admin/report/create'
      fullPath: '/admin/report/create'
      preLoaderRoute: typeof AdminReportCreateLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/student/create': {
      id: '/admin/student/create'
      path: '/admin/student/create'
      fullPath: '/admin/student/create'
      preLoaderRoute: typeof AdminStudentCreateLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/tag/create': {
      id: '/admin/tag/create'
      path: '/admin/tag/create'
      fullPath: '/admin/tag/create'
      preLoaderRoute: typeof AdminTagCreateLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/report/': {
      id: '/admin/report/'
      path: '/admin/report'
      fullPath: '/admin/report'
      preLoaderRoute: typeof AdminReportIndexImport
      parentRoute: typeof rootRoute
    }
    '/admin/achievement/': {
      id: '/admin/achievement/'
      path: '/admin/achievement'
      fullPath: '/admin/achievement'
      preLoaderRoute: typeof AdminAchievementIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/student/': {
      id: '/admin/student/'
      path: '/admin/student'
      fullPath: '/admin/student'
      preLoaderRoute: typeof AdminStudentIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/tag/': {
      id: '/admin/tag/'
      path: '/admin/tag'
      fullPath: '/admin/tag'
      preLoaderRoute: typeof AdminTagIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/achievement/edit/$id': {
      id: '/admin/achievement/edit/$id'
      path: '/admin/achievement/edit/$id'
      fullPath: '/admin/achievement/edit/$id'
      preLoaderRoute: typeof AdminAchievementEditIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/report/edit/$id': {
      id: '/admin/report/edit/$id'
      path: '/admin/report/edit/$id'
      fullPath: '/admin/report/edit/$id'
      preLoaderRoute: typeof AdminReportEditIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/student/edit/$id': {
      id: '/admin/student/edit/$id'
      path: '/admin/student/edit/$id'
      fullPath: '/admin/student/edit/$id'
      preLoaderRoute: typeof AdminStudentEditIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/tag/edit/$id': {
      id: '/admin/tag/edit/$id'
      path: '/admin/tag/edit/$id'
      fullPath: '/admin/tag/edit/$id'
      preLoaderRoute: typeof AdminTagEditIdLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/informasi': typeof InformasiRoute
  '/prestasi': typeof PrestasiRoute
  '/tentangKami': typeof TentangKamiRoute
  '/login': typeof LoginLazyRoute
  '/admin': typeof AdminIndexRoute
  '/admin/achievement/$id': typeof AdminAchievementIdLazyRoute
  '/admin/achievement/create': typeof AdminAchievementCreateLazyRoute
  '/admin/report/$id': typeof AdminReportIdLazyRoute
  '/admin/report/create': typeof AdminReportCreateLazyRoute
  '/admin/student/create': typeof AdminStudentCreateLazyRoute
  '/admin/tag/create': typeof AdminTagCreateLazyRoute
  '/admin/report': typeof AdminReportIndexRoute
  '/admin/achievement': typeof AdminAchievementIndexLazyRoute
  '/admin/student': typeof AdminStudentIndexLazyRoute
  '/admin/tag': typeof AdminTagIndexLazyRoute
  '/admin/achievement/edit/$id': typeof AdminAchievementEditIdLazyRoute
  '/admin/report/edit/$id': typeof AdminReportEditIdLazyRoute
  '/admin/student/edit/$id': typeof AdminStudentEditIdLazyRoute
  '/admin/tag/edit/$id': typeof AdminTagEditIdLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/informasi': typeof InformasiRoute
  '/prestasi': typeof PrestasiRoute
  '/tentangKami': typeof TentangKamiRoute
  '/login': typeof LoginLazyRoute
  '/admin': typeof AdminIndexRoute
  '/admin/achievement/$id': typeof AdminAchievementIdLazyRoute
  '/admin/achievement/create': typeof AdminAchievementCreateLazyRoute
  '/admin/report/$id': typeof AdminReportIdLazyRoute
  '/admin/report/create': typeof AdminReportCreateLazyRoute
  '/admin/student/create': typeof AdminStudentCreateLazyRoute
  '/admin/tag/create': typeof AdminTagCreateLazyRoute
  '/admin/report': typeof AdminReportIndexRoute
  '/admin/achievement': typeof AdminAchievementIndexLazyRoute
  '/admin/student': typeof AdminStudentIndexLazyRoute
  '/admin/tag': typeof AdminTagIndexLazyRoute
  '/admin/achievement/edit/$id': typeof AdminAchievementEditIdLazyRoute
  '/admin/report/edit/$id': typeof AdminReportEditIdLazyRoute
  '/admin/student/edit/$id': typeof AdminStudentEditIdLazyRoute
  '/admin/tag/edit/$id': typeof AdminTagEditIdLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/informasi': typeof InformasiRoute
  '/prestasi': typeof PrestasiRoute
  '/tentangKami': typeof TentangKamiRoute
  '/login': typeof LoginLazyRoute
  '/admin/': typeof AdminIndexRoute
  '/admin/achievement/$id': typeof AdminAchievementIdLazyRoute
  '/admin/achievement/create': typeof AdminAchievementCreateLazyRoute
  '/admin/report/$id': typeof AdminReportIdLazyRoute
  '/admin/report/create': typeof AdminReportCreateLazyRoute
  '/admin/student/create': typeof AdminStudentCreateLazyRoute
  '/admin/tag/create': typeof AdminTagCreateLazyRoute
  '/admin/report/': typeof AdminReportIndexRoute
  '/admin/achievement/': typeof AdminAchievementIndexLazyRoute
  '/admin/student/': typeof AdminStudentIndexLazyRoute
  '/admin/tag/': typeof AdminTagIndexLazyRoute
  '/admin/achievement/edit/$id': typeof AdminAchievementEditIdLazyRoute
  '/admin/report/edit/$id': typeof AdminReportEditIdLazyRoute
  '/admin/student/edit/$id': typeof AdminStudentEditIdLazyRoute
  '/admin/tag/edit/$id': typeof AdminTagEditIdLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/informasi'
    | '/prestasi'
    | '/tentangKami'
    | '/login'
    | '/admin'
    | '/admin/achievement/$id'
    | '/admin/achievement/create'
    | '/admin/report/$id'
    | '/admin/report/create'
    | '/admin/student/create'
    | '/admin/tag/create'
    | '/admin/report'
    | '/admin/achievement'
    | '/admin/student'
    | '/admin/tag'
    | '/admin/achievement/edit/$id'
    | '/admin/report/edit/$id'
    | '/admin/student/edit/$id'
    | '/admin/tag/edit/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/informasi'
    | '/prestasi'
    | '/tentangKami'
    | '/login'
    | '/admin'
    | '/admin/achievement/$id'
    | '/admin/achievement/create'
    | '/admin/report/$id'
    | '/admin/report/create'
    | '/admin/student/create'
    | '/admin/tag/create'
    | '/admin/report'
    | '/admin/achievement'
    | '/admin/student'
    | '/admin/tag'
    | '/admin/achievement/edit/$id'
    | '/admin/report/edit/$id'
    | '/admin/student/edit/$id'
    | '/admin/tag/edit/$id'
  id:
    | '__root__'
    | '/'
    | '/informasi'
    | '/prestasi'
    | '/tentangKami'
    | '/login'
    | '/admin/'
    | '/admin/achievement/$id'
    | '/admin/achievement/create'
    | '/admin/report/$id'
    | '/admin/report/create'
    | '/admin/student/create'
    | '/admin/tag/create'
    | '/admin/report/'
    | '/admin/achievement/'
    | '/admin/student/'
    | '/admin/tag/'
    | '/admin/achievement/edit/$id'
    | '/admin/report/edit/$id'
    | '/admin/student/edit/$id'
    | '/admin/tag/edit/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  InformasiRoute: typeof InformasiRoute
  PrestasiRoute: typeof PrestasiRoute
  TentangKamiRoute: typeof TentangKamiRoute
  LoginLazyRoute: typeof LoginLazyRoute
  AdminIndexRoute: typeof AdminIndexRoute
  AdminAchievementIdLazyRoute: typeof AdminAchievementIdLazyRoute
  AdminAchievementCreateLazyRoute: typeof AdminAchievementCreateLazyRoute
  AdminReportIdLazyRoute: typeof AdminReportIdLazyRoute
  AdminReportCreateLazyRoute: typeof AdminReportCreateLazyRoute
  AdminStudentCreateLazyRoute: typeof AdminStudentCreateLazyRoute
  AdminTagCreateLazyRoute: typeof AdminTagCreateLazyRoute
  AdminReportIndexRoute: typeof AdminReportIndexRoute
  AdminAchievementIndexLazyRoute: typeof AdminAchievementIndexLazyRoute
  AdminStudentIndexLazyRoute: typeof AdminStudentIndexLazyRoute
  AdminTagIndexLazyRoute: typeof AdminTagIndexLazyRoute
  AdminAchievementEditIdLazyRoute: typeof AdminAchievementEditIdLazyRoute
  AdminReportEditIdLazyRoute: typeof AdminReportEditIdLazyRoute
  AdminStudentEditIdLazyRoute: typeof AdminStudentEditIdLazyRoute
  AdminTagEditIdLazyRoute: typeof AdminTagEditIdLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  InformasiRoute: InformasiRoute,
  PrestasiRoute: PrestasiRoute,
  TentangKamiRoute: TentangKamiRoute,
  LoginLazyRoute: LoginLazyRoute,
  AdminIndexRoute: AdminIndexRoute,
  AdminAchievementIdLazyRoute: AdminAchievementIdLazyRoute,
  AdminAchievementCreateLazyRoute: AdminAchievementCreateLazyRoute,
  AdminReportIdLazyRoute: AdminReportIdLazyRoute,
  AdminReportCreateLazyRoute: AdminReportCreateLazyRoute,
  AdminStudentCreateLazyRoute: AdminStudentCreateLazyRoute,
  AdminTagCreateLazyRoute: AdminTagCreateLazyRoute,
  AdminReportIndexRoute: AdminReportIndexRoute,
  AdminAchievementIndexLazyRoute: AdminAchievementIndexLazyRoute,
  AdminStudentIndexLazyRoute: AdminStudentIndexLazyRoute,
  AdminTagIndexLazyRoute: AdminTagIndexLazyRoute,
  AdminAchievementEditIdLazyRoute: AdminAchievementEditIdLazyRoute,
  AdminReportEditIdLazyRoute: AdminReportEditIdLazyRoute,
  AdminStudentEditIdLazyRoute: AdminStudentEditIdLazyRoute,
  AdminTagEditIdLazyRoute: AdminTagEditIdLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/",
        "/informasi",
        "/prestasi",
        "/tentangKami",
        "/login",
        "/admin/",
        "/admin/achievement/$id",
        "/admin/achievement/create",
        "/admin/report/$id",
        "/admin/report/create",
        "/admin/student/create",
        "/admin/tag/create",
        "/admin/report/",
        "/admin/achievement/",
        "/admin/student/",
        "/admin/tag/",
        "/admin/achievement/edit/$id",
        "/admin/report/edit/$id",
        "/admin/student/edit/$id",
        "/admin/tag/edit/$id"
      ]
    },
    "/": {
      "filePath": "index.lazy.jsx"
    },
    "/informasi": {
      "filePath": "informasi.jsx"
    },
    "/prestasi": {
      "filePath": "prestasi.jsx"
    },
    "/tentangKami": {
      "filePath": "tentangKami.jsx"
    },
    "/login": {
      "filePath": "login.lazy.jsx"
    },
    "/admin/": {
      "filePath": "admin/index.jsx"
    },
    "/admin/achievement/$id": {
      "filePath": "admin/achievement/$id.lazy.jsx"
    },
    "/admin/achievement/create": {
      "filePath": "admin/achievement/create.lazy.jsx"
    },
    "/admin/report/$id": {
      "filePath": "admin/report/$id.lazy.jsx"
    },
    "/admin/report/create": {
      "filePath": "admin/report/create.lazy.jsx"
    },
    "/admin/student/create": {
      "filePath": "admin/student/create.lazy.jsx"
    },
    "/admin/tag/create": {
      "filePath": "admin/tag/create.lazy.jsx"
    },
    "/admin/report/": {
      "filePath": "admin/report/index.jsx"
    },
    "/admin/achievement/": {
      "filePath": "admin/achievement/index.lazy.jsx"
    },
    "/admin/student/": {
      "filePath": "admin/student/index.lazy.jsx"
    },
    "/admin/tag/": {
      "filePath": "admin/tag/index.lazy.jsx"
    },
    "/admin/achievement/edit/$id": {
      "filePath": "admin/achievement/edit/$id.lazy.jsx"
    },
    "/admin/report/edit/$id": {
      "filePath": "admin/report/edit/$id.lazy.jsx"
    },
    "/admin/student/edit/$id": {
      "filePath": "admin/student/edit/$id.lazy.jsx"
    },
    "/admin/tag/edit/$id": {
      "filePath": "admin/tag/edit/$id.lazy.jsx"
    }
  }
}
ROUTE_MANIFEST_END */
