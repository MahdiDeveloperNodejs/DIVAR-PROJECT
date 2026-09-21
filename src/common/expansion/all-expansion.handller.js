// function AllExpansionHandller(app) {
//   app.use((err, req, res, next) => {
//     let status = err?.status ?? err?.statusCode ?? err?.code;
//     if (!status || isNaN(+status) || status > 511 || status < 200) status = 500;
//     res.status(status).json({
//       message: err?.message ?? err?.stack ?? "Internal Server Error"
//     });
//   });
// }
// module.exports = AllExpansionHandller;

function AllExpansionHandler(app) {
  app.use((err, req, res, next) => {
    console.error(err); // این خط رو اضافه کنید
    let status = err?.status ?? err?.statusCode ?? err?.code;
    if (!status || isNaN(+status) || status > 511 || status < 200) status = 500;
    res.status(status).json({
      message: err?.message ?? err?.stack ?? "Internal Server Error"
    });
  });
}
module.exports = AllExpansionHandler;