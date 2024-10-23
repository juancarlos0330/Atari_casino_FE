import Allgames from "./Allgames";
import PageNotFound from "./Error/PageNotFound";
import EditGameSubmit from "./Mypage/EditGameSubmit";
import GameSubmit from "./Mypage/GameSubmit";
import MyPage from "./Mypage/MyPage";

const routes = [
  {
    path: "/",
    element: <Allgames />,
    children: [
      { path: "mypage", element: <MyPage /> },
      { path: "upload-game", element: <GameSubmit /> },
      { path: "upload-game/:g_id", element: <EditGameSubmit /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
];

export default routes;
