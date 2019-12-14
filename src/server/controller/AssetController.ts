import * as path from 'path'
import * as crypto from 'crypto'
import * as multer from 'multer'
import { getManager } from 'typeorm'
import { Asset } from '@entity/Asset'

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

export class AssetController {

  public static uploadSingle = upload.single('file')

  public static async create(req, res) {
    const assetRepository = getManager().getRepository(Asset)

    req.file.path = req.file.path.replace(/^public\//, '/')

    const newAsset = assetRepository.create({ path: req.file.path })
    const asset = await assetRepository.save(newAsset)
    res.send(asset)
  }

  public static async findAll(req, res) {
    const assetRepository = getManager().getRepository(Asset)
    const asset = await assetRepository.find()
    res.send(asset)
  }
}