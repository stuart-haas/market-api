import { getManager } from 'typeorm'
import { User } from '@entity/User'

export class UserController {

  public static async create(req, res) {
    
    const userRepository = getManager().getRepository(User)

    const newUser = userRepository.create(req.body)

    await userRepository.save(newUser)

    res.send(newUser)
  }

  public static async findById(req, res) {
  
    const userRepository = getManager().getRepository(User)

    const user = await userRepository.findOne(req.params.id)

    if (!user) {
      res.status(404)
      res.end()
      return
    }

    res.send(user)
  }

  public static async findBySession(req, res) {
    
      const userRepository = getManager().getRepository(User)
  
      const user = await userRepository.findOne(req.session.user.id)
  
      if (!user) {
        res.status(404)
        res.end()
        return
      }
  
      res.send(user)
    }

  public static async findAll(req, res) {
  
    const userRepository = getManager().getRepository(User)

    const user = await userRepository.find()

    res.send(user)
  }
}
