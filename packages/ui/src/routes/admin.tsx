import { RouteObject } from "react-router-dom";
import Home from "@/pages/Home";
import DefaultLayout from "@/layouts/DefaultLayout";
import NotFound from "@/pages/errors/NotFound";

const adminRoutes: RouteObject[] = [
	{
		element: <DefaultLayout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
];

export default adminRoutes;
