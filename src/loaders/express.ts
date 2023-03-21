import express, { Application } from 'express'

import routes from '@hn/routes'

export default async ({ app }: { app: Application }) => {
  app.set('views', './views')
  app.set('view engine', 'pug')

  // app.use(express.static('public'))

  // load routes
  app.use(routes)
}
