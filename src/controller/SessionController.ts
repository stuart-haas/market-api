import { getManager } from "typeorm"
import { User } from '@entity/User'

export class SessionController {

  public static async create(req, res, next) {
    const userRepository = getManager().getRepository(User)
    try {
      let user = await userRepository.findOneOrFail({where: {'username': req.body.username}, select: ["id", "username"]})
      req.session.user = user
    } catch (error) {
      res.status(404).send("User not found")
      return
    }

    return next()
  }

  public static delete(req, res, next) {
    if(req.session && req.session.user) {
      req.session.destroy((error) => {
        return next()
      })
    } else {
      return next()
    }
  }
}