import { AssetRoute } from '@route/api/AssetRoute';
import { CartRoute } from '@route/api/CartRoute';
import { UserRoute } from '@route/api/UserRoute';
import { DashboardRoute } from '@route/view/DashboardRoute';
import { FormRoute } from '@route/view/FormRoute'

const apiRoutes = [
  AssetRoute,
  CartRoute,
  UserRoute
]

const viewRoutes = [
  DashboardRoute,
  FormRoute
]

export const ApiRoutes = [].concat.apply([], apiRoutes)
export const ViewRoutes = [].concat.apply([], viewRoutes)