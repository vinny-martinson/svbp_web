export default {
  db: {
    uri: 'mongodb+srv://admin:admin@cluster0.uxiab.mongodb.net/Cluster0?retryWrites=true&w=majority'
  },
  port: 5000,
  spotify: {
    client_id: '8f5869daae3a460697265093f8afe542',
    client_secret: '1b690c95ba5e4204bc20a1e61d1774da',
    redirect_uri: 'http://localhost:3001/api/web/spotify/callback'
  }
};