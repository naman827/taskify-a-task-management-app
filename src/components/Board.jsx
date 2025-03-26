import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrop } from 'react-dnd';

const Board = () => {
  const saveBoard = (updatedLists) => {
    const boardData = {
      title: boardTitle,
      lists: updatedLists
    };
    localStorage.setItem(`board_${boardId}`, JSON.stringify(boardData));
  };

  const handleCardAdd = (listId, newCard) => {
    const updatedLists = lists.map(list =>
      list.id === listId
        ? { ...list, cards: [...list.cards, newCard] }
        : list
    );
    setLists(updatedLists);
    saveBoard(updatedLists);
  };

  const handleCardMove = (cardId, sourceListId, targetListId) => {
    const updatedLists = lists.map(list => {
      if (list.id === sourceListId) {
        return {
          ...list,
          cards: list.cards.filter(card => card.id !== cardId)
        };
      }
      if (list.id === targetListId) {
        const cardToMove = lists
          .find(l => l.id === sourceListId)
          .cards.find(c => c.id === cardId);
        return {
          ...list,
          cards: [...list.cards, cardToMove]
        };
      }
      return list;
    });
    setLists(updatedLists);
    saveBoard(updatedLists);
  };

  const handleListTitleChange = (listId, newTitle) => {
    const updatedLists = lists.map(list =>
      list.id === listId ? { ...list, title: newTitle } : list
    );
    setLists(updatedLists);
    saveBoard(updatedLists);
  };

  const handleCardClick = (card) => {
    // Implement card modal functionality here
  };

  const handleCardDelete = (cardId, listId) => {
    const updatedLists = lists.map(list =>
      list.id === listId
        ? { ...list, cards: list.cards.filter(card => card.id !== cardId) }
        : list
    );
    setLists(updatedLists);
    saveBoard(updatedLists);
  };

  const handleListDelete = (listId) => {
    const updatedLists = lists.filter(list => list.id !== listId);
    setLists(updatedLists);
    saveBoard(updatedLists);
  };
  const { boardId } = useParams();
  const [lists, setLists] = useState([]);
  const [boardTitle, setBoardTitle] = useState('');
  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');

  useEffect(() => {
    // Load board data from localStorage
    const loadBoardData = () => {
      const storedBoard = localStorage.getItem(`board_${boardId}`);
      if (storedBoard) {
        const boardData = JSON.parse(storedBoard);
        setBoardTitle(boardData.title);
        setLists(boardData.lists);
      }
    };

    loadBoardData();
  }, [boardId]);

  const handleAddList = () => {
    if (!newListTitle.trim()) return;

    const newList = {
      id: Date.now().toString(),
      title: newListTitle,
      cards: []
    };

    const updatedLists = [...lists, newList];
    setLists(updatedLists);

    // Save to localStorage
    const boardData = {
      title: boardTitle,
      lists: updatedLists
    };
    localStorage.setItem(`board_${boardId}`, JSON.stringify(boardData));
    setNewListTitle('');
    setIsAddingList(false);
  };

  const moveList = (dragIndex, hoverIndex) => {
    const dragList = lists[dragIndex];
    const newLists = [...lists];
    newLists.splice(dragIndex, 1);
    newLists.splice(hoverIndex, 0, dragList);
    setLists(newLists);
    saveBoard(newLists);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board-container ">
        <div className="flex items-center justify-between ">
          <h1 className=" text-2xl font-bold text-white">{boardTitle}</h1>
        </div>

        <div className="lists-container flex gap-4 p-4 overflow-x-auto min-h-[calc(100vh-200px)]">
          {lists.map((list, index) => (
            <List
              key={list.id}
              index={index}
              list={list}
              onCardAdd={handleCardAdd}
              onCardMove={handleCardMove}
              onListTitleChange={handleListTitleChange}
              onCardClick={(card) => handleCardClick(card, list.title)}
              moveList={moveList}
            />
          ))}

          {!isAddingList ? (
            <button
              onClick={() => setIsAddingList(true)}
              className="add-list-button bg-gray-800/50 hover:bg-gray-800 text-gray-400 hover:text-white rounded-lg p-4 w-72 flex-shrink-0 h-fit"
            >
              + Add another list
            </button>
          ) : (
            <div className="bg-gray-800 rounded-lg p-4 w-72 flex-shrink-0">
              <input
                type="text"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                placeholder="Enter list title..."
                className="w-full bg-gray-700 text-white rounded p-2 mb-2"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && handleAddList()}
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddList}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                  Add list
                </button>
                <button
                  onClick={() => {
                    setIsAddingList(false);
                    setNewListTitle('');
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default Board;