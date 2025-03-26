import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import List from '../components/List';
import CardModal from '../components/CardModal';

const BoardPage = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedListTitle, setSelectedListTitle] = useState('');

  useEffect(() => {
    // Load board data
    const loadBoardData = () => {
      const storedBoard = localStorage.getItem(`board_${boardId}`);
      if (storedBoard) {
        const boardData = JSON.parse(storedBoard);
        setBoard(boardData);
        setLists(boardData.lists || []);
      } else {
        // Initialize default board structure
        const defaultBoard = {
          id: boardId,
          title: 'New Board',
          lists: [
            { id: '1', title: 'Todo', cards: [] },
            { id: '2', title: 'Doing', cards: [] },
            { id: '3', title: 'Done', cards: [] }
          ]
        };
        setBoard(defaultBoard);
        setLists(defaultBoard.lists);
        localStorage.setItem(`board_${boardId}`, JSON.stringify(defaultBoard));
      }
    };

    loadBoardData();
  }, [boardId]);

  const saveBoard = (updatedLists) => {
    const updatedBoard = {
      ...board,
      lists: updatedLists
    };
    setBoard(updatedBoard);
    localStorage.setItem(`board_${boardId}`, JSON.stringify(updatedBoard));
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

  const handleCardMove = (cardId, sourceListId, targetListId, dragIndex, hoverIndex) => {
    const updatedLists = lists.map(list => {
      if (list.id === sourceListId && sourceListId === targetListId) {
        const cards = [...list.cards];
        const [draggedCard] = cards.splice(dragIndex, 1);
        cards.splice(hoverIndex, 0, draggedCard);
        return { ...list, cards };
      }
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

  const handleCardClick = (card, listTitle) => {
    setSelectedCard(card);
    setSelectedListTitle(listTitle);
  };

  const handleCardUpdate = (updatedCard) => {
    const updatedLists = lists.map(list => ({
      ...list,
      cards: list.cards.map(card =>
        card.id === updatedCard.id ? updatedCard : card
      )
    }));
    setLists(updatedLists);
    saveBoard(updatedLists);
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

  const moveList = (dragIndex, hoverIndex) => {
    const updatedLists = [...lists];
    const [draggedList] = updatedLists.splice(dragIndex, 1);
    updatedLists.splice(hoverIndex, 0, draggedList);
    setLists(updatedLists);
    saveBoard(updatedLists);
  };

  const handleAddList = () => {
    const newList = {
      id: Date.now().toString(),
      title: 'New List',
      cards: []
    };
    const updatedLists = [...lists, newList];
    setLists(updatedLists);
    saveBoard(updatedLists);
  };

  if (!board) {
    return <div className="text-white text-center mt-8">Loading board...</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board-container bg-blue-900">
        <div className="flex items-center justify-between p-10 mb-4">
          <h1 className="text-3xl font-bold text-white">{board.title}</h1>
        </div>

        <div className="lists-container flex gap-6 px-10 pb-6 overflow-x-auto">
          {lists.map((list, index) => (
            <List
              key={list.id}
              list={list}
              onCardAdd={handleCardAdd}
              onCardMove={handleCardMove}
              onListTitleChange={handleListTitleChange}
              onCardClick={(card) => handleCardClick(card, list.title)}
              onCardDelete={handleCardDelete}
              moveList={moveList}
              index={index}
            />
          ))}

          <button
            onClick={handleAddList}
            className="add-list-button bg-blue-800/50 hover:bg-blue-800 text-gray-200 hover:text-white rounded-lg p-4 w-72 flex-shrink-0 h-fit"
          >
            + Add another list
          </button>
        </div>

        {selectedCard && (
          <CardModal
            card={selectedCard}
            listTitle={selectedListTitle}
            onClose={() => setSelectedCard(null)}
            onUpdate={handleCardUpdate}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default BoardPage;