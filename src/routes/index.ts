import { Router } from 'express'
import { resolve } from 'path'

const router = Router()

router.get('/home_5s.css', (req, res) => {
  // delay 5s
  setTimeout(() => {
    const path = resolve('./public/styles/home_5s.css')
    res.sendFile(path)
  }, 5_000)
})

router.get('/home_10s.css', (req, res) => {
  // delay 10s
  setTimeout(() => {
    const path = resolve('./public/styles/home_10s.css')
    res.sendFile(path)
  }, 10_000)
})

router.get('/home_5s.js', (req, res) => {
  // delay 5s
  setTimeout(() => {
    const path = resolve('./public/scripts/home_5s.js')
    res.sendFile(path)
  }, 5_000)
})

router.get('/home_8s.js', (req, res) => {
  // delay 8s
  setTimeout(() => {
    const path = resolve('./public/scripts/home_8s.js')
    res.sendFile(path)
  }, 8_000)
})

router.get('/:vidu', (req, res) => {
  res.render(`pages/${req.params.vidu}`)
})

export default router
