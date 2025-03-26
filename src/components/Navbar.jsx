import React, { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { SiTask } from "react-icons/si";
import { Link } from "react-router-dom";
import {
  FaStar,
  FaRegStar,
  FaClock,
  FaPlus,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { MdWorkspaces, MdNotificationsNone } from "react-icons/md";
import { BsFolderPlus } from "react-icons/bs";

const Navbar = () => {
  // Replace individual state variables with a single activeDropdown state
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [starredItems, setStarredItems] = useState([]);

  // Function to toggle dropdown
  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  // Function to toggle starred status
  const toggleStarred = (item, e) => {
    e.stopPropagation();
    if (starredItems.some((i) => i.id === item.id)) {
      setStarredItems(starredItems.filter((i) => i.id !== item.id));
    } else {
      setStarredItems([...starredItems, item]);
    }
  };

  // Sample workspace data
  const workspaceItems = [{ id: 1, name: "naman's Workspace", initial: "N" }];

  // Sample recent items
  const recentItems = [
    { id: 1, name: "naman", workspace: "naman's Workspace", isStarred: false },
    {
      id: 2,
      name: "naman's Workspace",
      workspace: "naman's Workspace",
      isStarred: false,
    },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-20 bg-gray-900 shadow-md">
      <div className="Container flex items-center justify-between py-3">
        <div className="flex items-center gap-10">
          <span className="text-white text-4xl">
            <CgMenuGridO className="" />
          </span>
          <div className="text-white text-3xl flex items-center gap-3">
            <SiTask />
            <span>Planova</span>
          </div>
          <ul className="flex items-center gap-5 text-md capitalize p-3 rounded-2xl text-white ">
            <li className="relative hover:bg-gray-800 p-2 rounded-2xl">
              <button
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => toggleDropdown("workspace")}
              >
                <MdWorkspaces className="text-lg" />
                Workspace
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeDropdown === "workspace" && (
                <ul className="absolute bg-gray-800 rounded-md shadow-lg mt-2 py-2 w-64 z-10">
                  <li className="px-4 py-2 text-gray-400 font-semibold text-sm">
                    Your Workspaces
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="flex items-center px-4 py-2 hover:bg-gray-700"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="bg-blue-500 text-white w-8 h-8 rounded flex items-center justify-center mr-3">
                        N
                      </div>
                      <span>naman's Workspace</span>
                    </Link>
                  </li>
                  <li className="border-t border-gray-700 mt-2 pt-2">
                    <Link
                      to="/create-workspace"
                      className="flex items-center px-4 py-2 hover:bg-gray-700 text-blue-400"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <BsFolderPlus className="mr-2" />
                      Create Workspace
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="relative hover:bg-gray-800 p-2 rounded-2xl">
              <button
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => toggleDropdown("recent")}
              >
                <FaClock className="text-lg" />
                Recent
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeDropdown === "recent" && (
                <ul className="absolute bg-gray-800 rounded-md shadow-lg mt-2 py-2 w-64 z-10">
                  {recentItems.map((item) => (
                    <li key={item.id}>
                      <Link
                        to="/"
                        className="flex items-center justify-between px-4 py-2 hover:bg-gray-700"
                      >
                        <span>{item.name}</span>
                        <button
                          onClick={(e) => toggleStarred(item, e)}
                          className="text-gray-400 hover:text-yellow-400"
                        >
                          {item.isStarred ? <FaStar /> : <FaRegStar />}
                        </button>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li className="relative hover:bg-gray-800 p-2 rounded-2xl">
              <button
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => toggleDropdown("starred")}
              >
                <FaStar className="text-lg" />
                Starred
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeDropdown === "starred" && (
                <ul className="absolute bg-gray-800 rounded-md shadow-lg mt-2 py-2 w-64 z-10">
                  {starredItems.length === 0 ? (
                    <li className="px-4 py-2 text-gray-400">No starred items</li>
                  ) : (
                    starredItems.map((item) => (
                      <li key={item.id}>
                        <Link
                          to="/"
                          className="flex items-center justify-between px-4 py-2 hover:bg-gray-700"
                        >
                          <span>{item.name}</span>
                          <button
                            onClick={(e) => toggleStarred(item, e)}
                            className="text-yellow-400"
                          >
                            <FaStar />
                          </button>
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              )}
            </li>
          </ul>
          <button className="text-xl bg-violet-500 text-white py-1 px-3 rounded-2xl ">
            Create
          </button>
        </div>
        <div className="flex items-center gap-6">
          <input
            type="search"
            name=""
            id=""
            placeholder="Search..."
            className="bg-gray-800 border border-gray-500 rounded-xl outline-0 text-white py-1 px-3"
          />
          <MdNotificationsNone className="text-white text-2xl " />
          <FaRegQuestionCircle className="text-white text-2xl "/>
          <span className="text-white bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center">N</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
