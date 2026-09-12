function NotFoundHandller(app) {
  app.use((req, res, next) => {
    res.status(404).json({
      message: "Not Found Error",
    });
  });
}
module.exports = NotFoundHandller;
