import { AssetController } from '@controller/AssetController'

export const AssetRoute = [
  {
    path: "/assets",
    method: "get",
    middleware: [],
    action: AssetController.findAll
  },
  {
    path: "/assets/upload",
    method: "post",
    middleware: [ AssetController.uploadSingle ],
    action: AssetController.create
  }
]