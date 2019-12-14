import { AssetRoute } from '@route/api/AssetRoute';
import { CartRoute } from '@route/api/CartRoute';
import { UserRoute } from '@route/api/UserRoute';
import { DashboardRoute } from '@route/view/DashboardRoute';
import { FormRoute } from '@route/view/FormRoute'
import { Array } from '@util/Array';

const apiRoutes = [
  AssetRoute,
  CartRoute,
  UserRoute
]

const viewRoutes = [
  DashboardRoute,
  FormRoute
]

export const ApiRoutes = Array.flatten(apiRoutes)
export const ViewRoutes = Array.flatten(viewRoutes)