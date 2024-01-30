import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import Home from "./components/Home";
import Settings from "./components/Settings";
import Create from "./components/pages/create/Create";
import QuestionsPage from "./components/pages/questions/QuestionsPage";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/questions',
    requireAuth: true,
    element: <QuestionsPage />
  },
  {
    path: '/create',
    requireAuth: true,
    element: <Create />
  },
  {
    path: '/settings',
    requireAuth: true,
    element: <Settings />
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
