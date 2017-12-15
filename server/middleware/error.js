import express from 'express'

const app=express()

/* --- Middleware ERRORS --- */

app.use((err, req, res, next)=> {
  const error = new Error('Not found')
  err.status = 404
  next(err)
})

app.use((req, res, next) => {
    res.status(404)
    res.json({ message: 'Ruta desconocida.' })
    next()
})

app.use((err, req, res, next)  => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Please send a valid Token...' })
    }
    if(err.name==='Unauthorized'){
      res.status(401).json({ error: 'Please send a valid Token...' })
    }
    next()
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({ error: err.message })
    next()
})



module.exports.ErrorMiddleware = app