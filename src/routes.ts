import { indexGetAction } from './controllers/IndexGetAction'

export const AppRoutes = [
  {
      path: "/",
      method: "get",
      action: indexGetAction
  }
];