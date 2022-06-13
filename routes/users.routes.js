const {Router} = require("express");

const router = Router()

router.get('/users', (req, res) => {
  const {limit, offset} = req.query
  if(limit && offset){
    res.json({
      limit,
      offset
    })
  }else {
    res.send(' No hay parámetros')
  }
})


module.exports = router
