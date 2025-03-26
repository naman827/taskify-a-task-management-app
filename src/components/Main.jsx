import React from 'react'

const Main = () => {
  return (
    <div className="main-content">
      <div className="content-container px-8 py-6">
        <div className="text-white flex items-center text-nowrap text-2xl font-bold">
          <h2>Most popular templates</h2>
        </div>
        <p className="text-gray-400 text-sm mt-2">Get going faster with a template from the Taskify community or</p>
        
        <div className="mt-4">
          <select className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500 w-64">
            <option value="">choose a category</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="education">Education</option>
          </select>
        </div>

        {/* Template Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-blue-600 rounded-lg p-4 cursor-pointer hover:opacity-90 hover:transform hover:scale-105 transition-all">
            <div className="text-sm text-gray-200 mb-2">Template</div>
            <h3 className="text-white text-xl font-bold">Basic Board</h3>
          </div>

          <div className="rounded-lg p-4 cursor-pointer hover:opacity-90 hover:transform hover:scale-105 transition-all" 
               style={{background: 'linear-gradient(45deg, #00c6fb, #005bea)'}}>
            <div className="text-sm text-gray-200 mb-2">Template</div>
            <h3 className="text-white text-xl font-bold">Kanban Template</h3>
          </div>

          <div className="rounded-lg p-4 cursor-pointer hover:opacity-90 hover:transform hover:scale-105 transition-all bg-cover bg-center" 
               style={{backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60")'}}>
            <div className="text-sm text-gray-200 mb-2">Template</div>
            <h3 className="text-white text-xl font-bold">Daily Task Management</h3>
          </div>

          <div className="rounded-lg p-4 cursor-pointer hover:opacity-90 hover:transform hover:scale-105 transition-all bg-cover bg-center" 
               style={{backgroundImage: 'url("https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60")'}}>
            <div className="text-sm text-gray-200 mb-2">Template</div>
            <h3 className="text-white text-xl font-bold">Remote Team Hub</h3>
          </div>
        </div>

        <a href="#" className="text-blue-400 hover:underline block mt-6">Browse the full template gallery</a>

        {/* Recently Viewed Section */}
        <div className="mt-12">
          <div className="flex items-center gap-2 text-gray-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"/>
            </svg>
            <h3 className="text-lg">Recently viewed</h3>
          </div>

          {/* Recently Viewed Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
            <div className="bg-blue-600 rounded-lg w-full max-w-xs h-28 relative cursor-pointer hover:opacity-90">
              <span className="absolute bottom-2 left-2 text-white font-medium">board</span>
              <div className="absolute top-2 right-2">
                <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
            </div>

            <div className="rounded-lg w-full max-w-xs h-28 relative cursor-pointer hover:opacity-90 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="naman board" 
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 text-white font-medium">naman</span>
            </div>

            <div className="rounded-lg w-full max-w-xs h-28 bg-gray-800 border-2 border-dashed border-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-700">
              <span className="text-gray-400">Create new board</span>
            </div>
          </div>

          {/* View All Closed Boards Link */}
          <button className="text-gray-400 hover:text-gray-300 mt-4 text-sm bg-gray-800/50 px-4 py-2 rounded-md">
            View all closed boards
          </button>

          {/* Workspaces Section - This is where we want to stop scrolling */}
          <div className="mt-12 pb-8">
            <h2 className="text-gray-400 text-xl mb-4">YOUR WORKSPACES</h2>
            <div className="flex flex-wrap gap-4">
              <div className="workspace-card bg-gray-800/50 p-4 rounded-lg w-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-indigo-500 w-8 h-8 rounded flex items-center justify-center text-white">
                    N
                  </div>
                  <span className="text-white font-medium">naman's Workspace</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button className="text-gray-400 hover:text-white px-3 py-1 rounded flex items-center gap-2 hover:bg-gray-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
                    </svg>
                    Boards
                  </button>
                  <button className="text-gray-400 hover:text-white px-3 py-1 rounded flex items-center gap-2 hover:bg-gray-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    Views
                  </button>
                  <button className="text-gray-400 hover:text-white px-3 py-1 rounded flex items-center gap-2 hover:bg-gray-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Members (1)
                  </button>
                  <button className="text-gray-400 hover:text-white px-3 py-1 rounded flex items-center gap-2 hover:bg-gray-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </button>
                  <button className="text-gray-400 hover:text-white px-3 py-1 rounded flex items-center gap-2 ml-auto hover:bg-gray-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Upgrade
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
