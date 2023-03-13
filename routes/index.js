module.exports.Controller = (app) => {
    app.use("/api/user", require("./user"))
}