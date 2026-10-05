const { SiteService, } = require('../../services')

const Task = function (task) {
    this.task = task.task
}

Task.getSiteBy = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await SiteService.getSiteBy(req.body, connection)
        success(result)
    } catch (err) {
        error(err)
    }
})

Task.getSiteById = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await SiteService.getSiteById(req.body, connection)
        success(result)
    } catch (err) {
        error(err)
    }
})

Task.updateSiteById = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await SiteService.updateSiteById(req.body, connection)
        success()
    } catch (err) {
        error(err)
    }
})
Task.insertSite = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await SiteService.insertSite(req.body, connection)
        success()
    } catch (err) {
        error(err)
    }
})
Task.deleteSiteById = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await SiteService.deleteSiteById(req.body, connection)
        success()
    } catch (err) {
        error(err)
    }
})


module.exports = Task