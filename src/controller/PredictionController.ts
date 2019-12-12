import { getManager } from 'typeorm'
import { Prediction } from '@entity/Prediction'
import { PredictionService } from '@service/PredictionService'

export class PredictionController {

  public static create(req, res, next) {
    PredictionService.automl(req.file.relativepath).then(response => {
      const predictionRepository = getManager().getRepository(Prediction)
      const newPrediction = predictionRepository.create({
        image: req.file.id, data: JSON.stringify(response)
      })
      predictionRepository.save(newPrediction).then(response => {
        predictionRepository.findOne({
          where: { image: req.file.id },
          relations: ["image"]
        }).then(response => {
          req.file.data = response.data
          res.status(200).json(req.file)
        })
      })
    })
  }

}