import { Link } from "react-router-dom";
import { useLayoutContext } from "@/hooks/context";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import HomeIcon from "@icons/home.svg";
import CogIcon from "@icons/cog.svg";

const Sidebar = () => {
  const { isSidebarOpen, sidebarRef } = useLayoutContext();

  return (
    <>
      <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
        <div className="py-4 text-gray-500 dark:text-gray-400">
          <Link
            className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
            to="/"
          >
            Shifter Shop
          </Link>
          <ul className="mt-6">
            <SidebarItem label="Dashboard" href="/" icon={<HomeIcon />} />
            <SidebarItem label="Settings" href="/settings" icon={<CogIcon />} />
          </ul>
        </div>
      </aside>
      <aside
        ref={sidebarRef}
        className={
          "fixed inset-y-0 flex-shrink-0 w-64 mt-14 overflow-y-auto bg-white dark:bg-gray-800 md:hidden transition ease-in-out duration-150" +
          (isSidebarOpen
            ? " z-20 opacity-100 transform"
            : " -z-10 opacity-0 transform -translate-x-20")
        }
      >
        <div className="py-4 text-gray-500 dark:text-gray-400">
          <Link
            className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
            to="/"
          >
            Shifter Shop
          </Link>
          <ul className="mt-6">
            <SidebarItem label="Dashboard" href="/" icon={<HomeIcon />} />
            <SidebarItem label="Settings" href="/settings" icon={<CogIcon />} />
          </ul>
          <div className="px-6 my-6">
            <button className="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
              Create account
              <span className="ml-2" aria-hidden="true">
                +
              </span>
            </button>
          </div>
        </div>
      </aside>
      <div
        className={
          "fixed md:hidden inset-0 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center transition-opacity ease-in-out duration-150" +
          (isSidebarOpen ? " opacity-100 z-10" : " opacity-0 -z-10")
        }
      ></div>
    </>
  );
};

export default Sidebar;
