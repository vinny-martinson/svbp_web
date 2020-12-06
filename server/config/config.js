/**
 * Constant Keys.
 * @global
 */

export default {
  db: {
    uri: 'mongodb://admin:admin@cluster0-shard-00-00.ipp8e.mongodb.net:27017,cluster0-shard-00-01.ipp8e.mongodb.net:27017,cluster0-shard-00-02.ipp8e.mongodb.net:27017/forum?ssl=true&replicaSet=atlas-91eimq-shard-0&authSource=admin&retryWrites=true&w=majority'
  },
  port: 5000,
  spotify: {
    client_id: '8f5869daae3a460697265093f8afe542',
    client_secret: '1b690c95ba5e4204bc20a1e61d1774da',
    redirect_uri: 'http://localhost:3001/api/web/spotify/callback',
    redirect_settings: 'http://localhost:3000/settings'
  }
};