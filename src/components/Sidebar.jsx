import React, { useState } from "react";
import { MdDashboard, MdPeople, MdSettings } from "react-icons/md";
import { BsGrid, BsHeartFill, BsLayoutSidebar } from "react-icons/bs";
import { FaHome, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { HiTemplate } from "react-icons/hi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(true);

  return (
    <div className="sidebar-container fixed top-21 left-0 z-10 flex flex-col w-64 bg-gray-900 p-4">
      {/* Top Navigation */}
      <ul className="text-gray-300 text-md space-y-2 mb-8">
        <li>
          <Link to="/board" className="flex items-center gap-3 hover:text-white bg-gray-800 p-2 rounded">
            <BsGrid className="text-blue-400" />
            Boards
          </Link>
        </li>
        <li>
          <Link to="/" className="flex items-center gap-3 hover:text-white p-2">
            <HiTemplate />
            Templates
          </Link>
        </li>
        <li>
          <Link to="/" className="flex items-center gap-3 hover:text-white p-2">
            <FaHome />
            Home
          </Link>
        </li>
      </ul>

      {/* Divider */}
      <div className="border-t border-gray-700 my-2"></div>

      {/* Workspaces Section - Make this section scrollable */}
      <div className="overflow-y-auto flex-grow">
        <h2 className="text-gray-400 text-sm font-medium mb-4">Workspaces</h2>
        
        <div className="mb-6">
          <div 
            className="flex items-center justify-between text-gray-300 mb-2 cursor-pointer hover:text-white"
            onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
          >
            <div className="flex items-center">
              <div className="bg-indigo-500 text-white w-7 h-7 rounded flex items-center justify-center mr-3">
                N
              </div>
              <span>naman's Workspace</span>
            </div>
            {isWorkspaceOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
          </div>
          
          {isWorkspaceOpen && (
            <ul className="text-gray-400 text-sm ml-10 space-y-3 mt-3">
              <li>
                <Link to="/board" className="flex items-center gap-3 hover:text-white">
                  <MdDashboard />
                  Boards
                </Link>
              </li>
              <li>
                <Link to="/" className="flex items-center gap-3 hover:text-white">
                  <BsHeartFill />
                  Highlights
                </Link>
              </li>
              <li>
                <Link to="/" className="flex items-center gap-3 hover:text-white">
                  <BsLayoutSidebar />
                  Views
                </Link>
              </li>
              <li>
                <Link to="/" className="flex items-center gap-3 hover:text-white justify-between pr-4">
                  <div className="flex items-center gap-3">
                    <MdPeople />
                    Members
                  </div>
                  <span className="text-lg">+</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="flex items-center gap-3 hover:text-white">
                  <MdSettings />
                  Settings
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
      
      {/* Premium Banner */}
      <div className="mt-auto">
        <div className="text-gray-300 mb-4">
          <h3 className="font-medium mb-2">Try Planova Premium</h3>
          <p className="text-sm text-gray-400">Get unlimited boards, card mirroring, unlimited automation, and more.</p>
          <Link to="/trial" className="text-blue-400 hover:underline text-sm block mt-2">
            Start free trial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
