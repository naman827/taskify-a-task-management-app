import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [starredBoards, setStarredBoards] = useState([]);

  useEffect(() => {
    // Load boards from localStorage
    const loadBoards = () => {
      const storedBoards = localStorage.getItem('boards');
      if (storedBoards) {
        setBoards(JSON.parse(storedBoards));
      }
      const storedStarred = localStorage.getItem('starredBoards');
      if (storedStarred) {
        setStarredBoards(JSON.parse(storedStarred));
      }
    };

    loadBoards();
  }, []);

  const handleCreateBoard = () => {
    if (!newBoardTitle.trim()) return;

    const newBoard = {
      id: Date.now().toString(),
      title: newBoardTitle,
      background: 'bg-blue-600', // Default background
      createdAt: new Date().toISOString(),
      taskCount: 0
    };

    const updatedBoards = [...boards, newBoard];
    setBoards(updatedBoards);
    localStorage.setItem('boards', JSON.stringify(updatedBoards));

    setNewBoardTitle('');
    setIsCreating(false);
  };

  const toggleStar = (boardId) => {
    const updatedStarred = starredBoards.includes(boardId)
      ? starredBoards.filter(id => id !== boardId)
      : [...starredBoards, boardId];

    setStarredBoards(updatedStarred);
    localStorage.setItem('starredBoards', JSON.stringify(updatedStarred));
  };

  const getTaskCount = (boardId) => {
    const boardData = localStorage.getItem(`board_${boardId}`);
    if (!boardData) return 0;

    const { lists } = JSON.parse(boardData);
    return lists.reduce((count, list) => count + list.cards.length, 0);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">⭐ Starred Boards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {boards
            .filter(board => starredBoards.includes(board.id))
            .map(board => (
              <div key={board.id} className={`${board.background} rounded-lg p-4 relative group`}>
                <button
                  onClick={() => toggleStar(board.id)}
                  className="absolute top-2 right-2 text-yellow-400"
                >
                  <FaStar className="text-xl" />
                </button>
                <Link to={`/board/${board.id}`} className="block h-full">
                  <h3 className="text-white font-bold mb-2">{board.title}</h3>
                  <div className="text-white/70 text-sm">
                    {getTaskCount(board.id)} tasks
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>

      <h2 className="text-xl font-bold text-white mb-4">All Boards</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map(board => (
          <div key={board.id} className={`${board.background} rounded-lg p-4 relative group`}>
            <button
              onClick={() => toggleStar(board.id)}
              className="absolute top-2 right-2 text-white/70 hover:text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {starredBoards.includes(board.id) ? (
                <FaStar className="text-xl text-yellow-400" />
              ) : (
                <FaRegStar className="text-xl" />
              )}
            </button>
            <Link to={`/board/${board.id}`} className="block h-full">
              <h3 className="text-white font-bold mb-2">{board.title}</h3>
              <div className="text-white/70 text-sm">
                {getTaskCount(board.id)} tasks
              </div>
            </Link>
          </div>
        ))}

        {/* Create New Board Button/Form */}
        <div
          className={`bg-gray-800/50 rounded-lg p-4 cursor-pointer hover:bg-gray-800/70 transition-colors ${
            isCreating ? 'border-2 border-blue-500' : ''
          }`}
          onClick={() => !isCreating && setIsCreating(true)}
        >
          {!isCreating ? (
            <div className="flex items-center justify-center h-full text-gray-400 hover:text-white">
              <span className="text-2xl mr-2">+</span> Create new board
            </div>
          ) : (
            <div className="space-y-3" onClick={e => e.stopPropagation()}>
              <input
                type="text"
                placeholder="Enter board title..."
                className="w-full bg-gray-700 text-white rounded p-2"
                value={newBoardTitle}
                onChange={e => setNewBoardTitle(e.target.value)}
                autoFocus
              />
              <div className="flex justify-between">
                <button
                  onClick={handleCreateBoard}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setNewBoardTitle('');
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardList;