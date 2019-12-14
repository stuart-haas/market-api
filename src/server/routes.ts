import { AssetRoute } from '@route/AssetRoute';
import { CartRoute } from '@route/CartRoute';
import { UserRoute } from '@route/UserRoute';
import { Array } from '@util/Array';

const routes = [
  AssetRoute,
  CartRoute,
  UserRoute
]

export const BasePath = '/api'

export const Routes = Array.flatten(routes)
