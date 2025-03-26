import React, { useState, useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import Card from './Card';

const List = ({ list, index, onCardAdd, onCardMove, onListTitleChange, moveList, onCardClick, onCardDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(list.title);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');

  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'LIST',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      moveList(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'LIST',
    item: () => ({ id: list.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, cardDrop] = useDrop({
    accept: 'CARD',
    drop: (item, monitor) => {
      if (!ref.current) return;
      
      const dragIndex = item.index;
      const hoverIndex = list.cards.length;
      
      if (item.listId !== list.id) {
        onCardMove(item.id, item.listId, list.id, dragIndex, hoverIndex);
        return { listId: list.id, hoverIndex };
      }
      return undefined;
    },
    hover: (item, monitor) => {
      if (!ref.current) return;
      
      const dragIndex = item.index;
      const cards = list.cards;
      let hoverIndex = cards.length;
      
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      
      // Find the correct insertion index based on mouse position
      for (let i = 0; i < cards.length; i++) {
        const card = document.querySelector(`[data-card-id="${cards[i].id}"]`);
        if (!card) continue;
        
        const cardRect = card.getBoundingClientRect();
        const cardMiddleY = (cardRect.bottom - cardRect.top) / 2;
        
        if (hoverClientY < cardRect.top + cardMiddleY) {
          hoverIndex = i;
          break;
        }
      }
      
      // Don't replace items with themselves
      if (dragIndex === hoverIndex && item.listId === list.id) return;
      
      // Time to actually perform the action
      if (item.listId === list.id) {
        onCardMove(item.id, list.id, list.id, dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleTitleSubmit = () => {
    if (newTitle.trim() && newTitle !== list.title) {
      onListTitleChange(list.id, newTitle);
    }
    setIsEditing(false);
  };

  const handleAddCard = () => {
    if (!newCardTitle.trim()) return;

    const newCard = {
      id: Date.now().toString(),
      title: newCardTitle,
      description: '',
      labels: [],
      dueDate: null,
      members: [],
      checklist: [],
      coverImage: null,
      createdAt: new Date().toISOString()
    };

    onCardAdd(list.id, newCard);
    setNewCardTitle('');
    setIsAddingCard(false);
  };

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`list-wrapper bg-gray-800 rounded-md p-2 w-72 flex-shrink-0 ${isOver ? 'bg-gray-700' : ''} ${isDragging ? 'opacity-50' : ''}`}
      data-handler-id={handlerId}
    >
      <div className="list-header mb-2">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={handleTitleSubmit}
              onKeyPress={(e) => e.key === 'Enter' && handleTitleSubmit()}
              className="w-full bg-gray-700 text-white rounded px-2 py-1"
              autoFocus
            />
          </div>
        ) : (
          <h3
            className="text-white font-medium cursor-pointer hover:bg-gray-700 px-2 py-1 rounded text-sm"
            onClick={() => setIsEditing(true)}
          >
            {list.title}
          </h3>
        )}
      </div>

      <div ref={cardDrop} className="cards-container space-y-2 mb-2 min-h-[2rem] max-h-[calc(100vh-200px)] overflow-y-auto">
        {list.cards.map((card, cardIndex) => (
          <Card
            key={card.id}
            card={card}
            listId={list.id}
            index={cardIndex}
            onCardClick={onCardClick}
            onCardDelete={onCardDelete}
            moveCard={onCardMove}
          />
        ))}
      </div>

      {isAddingCard ? (
        <div className="mt-2">
          <textarea
            placeholder="Enter a title for this card..."
            className="w-full bg-gray-700 text-white rounded p-2 mb-2 min-h-[60px] resize-none"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            autoFocus
          />
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddCard}
              className="bg-blue-500 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600"
            >
              Add card
            </button>
            <button
              onClick={() => {
                setIsAddingCard(false);
                setNewCardTitle('');
              }}
              className="text-gray-400 hover:text-white text-xl leading-none"
            >
              ×
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingCard(true)}
          className="w-full text-left text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-gray-700 transition-colors text-sm"
        >
          + Add a card
        </button>
      )}
    </div>
  );
};

export default List;