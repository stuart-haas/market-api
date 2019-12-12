export class ViewController {
  
  public static redirect(url) {
    return (req, res) => {
      res.redirect(url)
    }
  }

  public static renderDashboard(req, res) {
    res.render('pages/dashboard/index', { data: { user: req.session.user }})
  }

  public static renderLogin(req, res) {
    res.render('pages/user/login')
  }

  public static renderRegister(req, res) {
    res.render('pages/user/register')
  }
}