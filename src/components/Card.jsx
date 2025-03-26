import React, { useState, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { FaEdit, FaClock, FaTags, FaCheckSquare, FaTrash } from 'react-icons/fa';

const Card = ({ card, listId, index, onCardClick, onCardDelete, moveCard }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id: card.id, index, listId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      const didDrop = monitor.didDrop();
      const dragIndex = item.index;
      const sourceListId = item.listId;
      
      if (didDrop && dropResult) {
        const { listId: targetListId, hoverIndex } = dropResult;
        if (sourceListId === targetListId && dragIndex === hoverIndex) {
          return; // No need to update if position hasn't changed
        }
        moveCard(item.id, sourceListId, targetListId, dragIndex, hoverIndex);
      }
    },
  });

  const getLabelColor = (labelId) => {
    const colors = {
      1: 'bg-red-500',
      2: 'bg-blue-500',
      3: 'bg-green-500',
      4: 'bg-yellow-500',
      5: 'bg-purple-500',
    };
    return colors[labelId] || 'bg-gray-500';
  };

  const formatDueDate = (date) => {
    if (!date) return '';
    const dueDate = new Date(date);
    return dueDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  drag(ref);

  return (
    <div
      ref={ref}
      data-card-id={card.id}
      className={`card bg-gray-700 rounded-lg p-3 cursor-pointer transition-all duration-200 transform hover:-translate-y-0.5 ${isDragging ? 'opacity-50 scale-105' : ''} ${isHovered ? 'shadow-lg ring-2 ring-blue-500/50' : ''}`}
      onClick={() => onCardClick(card)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {card.coverImage && (
        <div className="mb-2 rounded overflow-hidden">
          <img
            src={card.coverImage}
            alt="Card cover"
            className="w-full h-24 object-cover"
          />
        </div>
      )}

      <div className="flex justify-between items-start mb-1">
        <h4 className="text-white text-sm">{card.title}</h4>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCardDelete(card.id, listId);
          }}
          className="text-gray-400 hover:text-red-500 transition-colors ml-1"
        >
          <FaTrash className="text-xs" />
        </button>
      </div>

      {card.labels && card.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {card.labels.map((label) => (
            <span
              key={label.id}
              className={`${getLabelColor(label.id)} px-2 py-0.5 rounded-full text-xs text-white`}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 text-gray-400 text-sm">
        {card.dueDate && (
          <div className="flex items-center gap-1">
            <FaClock className="text-xs" />
            <span>{formatDueDate(card.dueDate)}</span>
          </div>
        )}

        {card.description && (
          <div className="flex items-center gap-1">
            <FaEdit className="text-xs" />
          </div>
        )}

        {card.labels?.length > 0 && (
          <div className="flex items-center gap-1">
            <FaTags className="text-xs" />
            <span>{card.labels.length}</span>
          </div>
        )}

        {card.checklist?.length > 0 && (
          <div className="flex items-center gap-1">
            <FaCheckSquare className="text-xs" />
            <span>
              {card.checklist.filter((item) => item.checked).length}/
              {card.checklist.length}
            </span>
          </div>
        )}
      </div>

      {card.members && card.members.length > 0 && (
        <div className="flex -space-x-2 mt-2">
          {card.members.map((member) => (
            <div
              key={member.id}
              className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs ring-2 ring-gray-800"
            >
              {member.name.charAt(0).toUpperCase()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;