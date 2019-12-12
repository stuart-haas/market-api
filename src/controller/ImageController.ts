import * as path from 'path'
import * as crypto from 'crypto'
import * as exifr from 'exifr'
import * as multer from 'multer'
import { getManager } from 'typeorm'
import { Image } from '@entity/Image'

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, callback) => {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return callback(err)
      callback(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})
const upload = multer({ storage: storage })

export class ImageController {

  public static uploadSingle = upload.single('file')

  public static async parseMetaData(req, res, next) {
    req.file.path = req.file.path.replace(/^public\//, '/')
    req.file.relativepath = req.file.destination + "/" + req.file.filename
    req.file.absolutepath = req.protocol + "://" + req.headers.host + req.file.path
    req.file.meta = await exifr.parse(req.file.relativepath)
    return next()
  }

  public static async create(req, res, next) {

    const imageRepository = getManager().getRepository(Image)

    const newImage = imageRepository.create({
      userId: 1, 
      path: req.file.path,
      data: JSON.stringify(req.file.meta)
    })

    const image = await imageRepository.save(newImage)

    req.file.id = image.id

    return next()
  }

  public static async findAll(req, res) {
    
    const images = await getManager().getRepository(Image)
    .createQueryBuilder("image")
    .leftJoinAndSelect("image.prediction", "prediction")
    .where("prediction.imageId = image.id")
    .where("image.userId = :userId", { userId: req.session.user.id })
    .getMany()

    res.send(images)
  }
}