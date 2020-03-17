async function routes (fastify, options) {
  fastify.get('/', async (request, reply) => {
    request.log.info('Some info about the current request')
    return {'foo': 'bar'};
  })
}

module.exports = routes