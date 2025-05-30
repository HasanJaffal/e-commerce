/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as CategoriesNameImport } from './routes/categories/$name'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const CategoriesNameRoute = CategoriesNameImport.update({
  id: '/categories/$name',
  path: '/categories/$name',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/categories/$name': {
      id: '/categories/$name'
      path: '/categories/$name'
      fullPath: '/categories/$name'
      preLoaderRoute: typeof CategoriesNameImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/categories/$name': typeof CategoriesNameRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/categories/$name': typeof CategoriesNameRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/categories/$name': typeof CategoriesNameRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/categories/$name'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/categories/$name'
  id: '__root__' | '/' | '/categories/$name'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CategoriesNameRoute: typeof CategoriesNameRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CategoriesNameRoute: CategoriesNameRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/categories/$name"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/categories/$name": {
      "filePath": "categories/$name.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
