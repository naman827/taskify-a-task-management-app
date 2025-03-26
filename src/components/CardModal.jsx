import React, { useState } from 'react';
import { FaTimes, FaEdit, FaClock, FaTags, FaCheckSquare, FaImage } from 'react-icons/fa';

const CardModal = ({ card, listTitle, onClose, onUpdate }) => {
  const [editedCard, setEditedCard] = useState(card);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newChecklistItem, setNewChecklistItem] = useState('');

  const handleTitleSubmit = () => {
    if (editedCard.title.trim()) {
      onUpdate({ ...editedCard });
      setIsEditingTitle(false);
    }
  };

  const handleDescriptionSubmit = () => {
    onUpdate({ ...editedCard });
    setIsEditingDescription(false);
  };

  const handleAddLabel = (color) => {
    const newLabel = {
      id: Date.now().toString(),
      name: 'New Label',
      color
    };
    setEditedCard({
      ...editedCard,
      labels: [...(editedCard.labels || []), newLabel]
    });
    onUpdate({ ...editedCard, labels: [...(editedCard.labels || []), newLabel] });
  };

  const handleAddChecklistItem = () => {
    if (!newChecklistItem.trim()) return;

    const newItem = {
      id: Date.now().toString(),
      text: newChecklistItem,
      checked: false
    };

    setEditedCard({
      ...editedCard,
      checklist: [...(editedCard.checklist || []), newItem]
    });
    onUpdate({ ...editedCard, checklist: [...(editedCard.checklist || []), newItem] });
    setNewChecklistItem('');
  };

  const handleToggleChecklistItem = (itemId) => {
    const updatedChecklist = editedCard.checklist.map(item =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    setEditedCard({ ...editedCard, checklist: updatedChecklist });
    onUpdate({ ...editedCard, checklist: updatedChecklist });
  };

  const handleDueDateChange = (date) => {
    setEditedCard({ ...editedCard, dueDate: date });
    onUpdate({ ...editedCard, dueDate: date });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              {isEditingTitle ? (
                <input
                  type="text"
                  value={editedCard.title}
                  onChange={(e) => setEditedCard({ ...editedCard, title: e.target.value })}
                  onBlur={handleTitleSubmit}
                  onKeyPress={(e) => e.key === 'Enter' && handleTitleSubmit()}
                  className="w-full bg-gray-700 text-white rounded px-3 py-2"
                  autoFocus
                />
              ) : (
                <h2
                  className="text-2xl font-bold text-white cursor-pointer hover:bg-gray-700 px-2 py-1 rounded"
                  onClick={() => setIsEditingTitle(true)}
                >
                  {editedCard.title}
                </h2>
              )}
              <p className="text-gray-400 mt-1">in list {listTitle}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              {/* Description */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FaEdit className="text-gray-400" />
                  <h3 className="text-white font-medium">Description</h3>
                </div>
                {isEditingDescription ? (
                  <div>
                    <textarea
                      value={editedCard.description}
                      onChange={(e) => setEditedCard({ ...editedCard, description: e.target.value })}
                      className="w-full bg-gray-700 text-white rounded p-3 min-h-[100px]"
                      placeholder="Add a more detailed description..."
                      autoFocus
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={handleDescriptionSubmit}
                        className="bg-blue-500 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditingDescription(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => setIsEditingDescription(true)}
                    className="bg-gray-700/50 text-gray-300 p-3 rounded cursor-pointer hover:bg-gray-700"
                  >
                    {editedCard.description || 'Add a more detailed description...'}
                  </div>
                )}
              </div>

              {/* Checklist */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FaCheckSquare className="text-gray-400" />
                  <h3 className="text-white font-medium">Checklist</h3>
                </div>
                <div className="space-y-2">
                  {editedCard.checklist?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-2 text-white"
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => handleToggleChecklistItem(item.id)}
                        className="rounded bg-gray-700 border-gray-600"
                      />
                      <span className={item.checked ? 'line-through text-gray-400' : ''}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newChecklistItem}
                      onChange={(e) => setNewChecklistItem(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddChecklistItem()}
                      placeholder="Add an item"
                      className="flex-1 bg-gray-700 text-white rounded px-3 py-1.5"
                    />
                    <button
                      onClick={handleAddChecklistItem}
                      className="bg-blue-500 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Labels */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FaTags className="text-gray-400" />
                  <h3 className="text-white font-medium">Labels</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editedCard.labels?.map((label) => (
                    <span
                      key={label.id}
                      className={`${label.color} px-2 py-0.5 rounded-full text-xs text-white`}
                    >
                      {label.name}
                    </span>
                  ))}
                  <button
                    onClick={() => handleAddLabel('bg-blue-500')}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    + Add a label
                  </button>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FaClock className="text-gray-400" />
                  <h3 className="text-white font-medium">Due Date</h3>
                </div>
                <input
                  type="datetime-local"
                  value={editedCard.dueDate || ''}
                  onChange={(e) => handleDueDateChange(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded px-3 py-1.5"
                />
              </div>

              {/* Cover Image */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FaImage className="text-gray-400" />
                  <h3 className="text-white font-medium">Cover</h3>
                </div>
                <input
                  type="text"
                  value={editedCard.coverImage || ''}
                  onChange={(e) => {
                    setEditedCard({ ...editedCard, coverImage: e.target.value });
                    onUpdate({ ...editedCard, coverImage: e.target.value });
                  }}
                  placeholder="Enter image URL"
                  className="w-full bg-gray-700 text-white rounded px-3 py-1.5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;