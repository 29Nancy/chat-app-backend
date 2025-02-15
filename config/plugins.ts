export default () => ({});
module.exports = ({ env }) => ({
    settings: {
      socketio: {
        enabled: true,
        debug: true, // Change to false in production
      },
    },
  });
  