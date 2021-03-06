const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
 
server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})

server.get("/filter/:id", (req,res,next)=>{
  let debug=true;
  res.json({
      status:true,
      data: req.query
  });
})  