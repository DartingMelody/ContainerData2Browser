const fastify_server_timeout = require('fastify-server-timeout')
const fastify = require('fastify')({logger: true})
const seconds = 1000;
fastify.register(fastify_server_timeout, {
  serverTimeout: 5 * seconds
})
const shell = require('shelljs');
// For fetch kind of scripts
fastify.get('/script/:script_name',  function (request, reply) {
  let container_name = request.params.script_name
  let sr1 = "{sr001"
  let sr2 = "sr002}"
  let sr = sr1 + "," + sr2
  let response = shell.exec(`docker run ${container_name} execute "${sr}"`, {async: true, silent:true});
  try {
    response.stderr.on('data', (data) => {
      reply
      .code(400)
      .send({
        "message": data
      })  
    }) 
    response.stdout.on('data', (data) => {
      reply
      .code(200)
      .send({
        "message": data
      })  
    })      
  } catch (error) {
    reply
    .code(500)
    .send({
      "message": error
    })
  }
})
// For exec kind of scripts
fastify.post('/script/:script_name', function(request, reply) {
  let container_name = request.params.script_name
  let params = request.body.params
  let response = shell.exec(`docker run ${container_name} exec`, {async: true, silent:true});
  try {
    response.stderr.on('data', (data) => {
      reply
      .code(400)
      .send({
        "message": data
      })  
    }) 
    response.stdout.on('data', (data) => {
      reply
      .code(200)
      .send({
        "message": data
      })  
    })      
  } catch (error) {
    reply
    .code(500)
    .send({
      "message": error
    })
  }
})
fastify.listen(3000, '0.0.0.0', (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server is listening on ${address}`)
})