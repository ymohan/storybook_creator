import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const QuickActionMenu = ({
  isOpen = false,
  onClose,
  position = { x: 0, y: 0 },
  story = {},
  onRead,
  onEdit,
  onShare,
  onDelete,
  onDuplicate,
  onDownload
}) => {
  const menuRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState(position);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      let adjustedX = position.x;
      let adjustedY = position.y;

      // Adjust horizontal position if menu would overflow
      if (position.x + rect.width > viewportWidth) {
        adjustedX = viewportWidth - rect.width - 16;
      }

      // Adjust vertical position if menu would overflow
      if (position.y + rect.height > viewportHeight) {
        adjustedY = position.y - rect.height;
      }

      setMenuPosition({ x: adjustedX, y: adjustedY });
    }
  }, [isOpen, position]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const menuItems = [
    {
      label: 'Read Story',
      icon: 'BookOpen',
      onClick: onRead,
      color: 'text-primary',
      bgColor: 'hover:bg-primary-50'
    },
    {
      label: 'Edit Story',
      icon: 'Edit3',
      onClick: onEdit,
      color: 'text-accent',
      bgColor: 'hover:bg-accent-50'
    },
    {
      label: 'Share Story',
      icon: 'Share2',
      onClick: onShare,
      color: 'text-secondary',
      bgColor: 'hover:bg-secondary-50'
    },
    {
      label: 'Duplicate',
      icon: 'Copy',
      onClick: onDuplicate,
      color: 'text-text-secondary',
      bgColor: 'hover:bg-surface'
    },
    {
      label: 'Download',
      icon: 'Download',
      onClick: onDownload,
      color: 'text-text-secondary',
      bgColor: 'hover:bg-surface'
    },
    {
      label: 'Delete',
      icon: 'Trash2',
      onClick: onDelete,
      color: 'text-error',
      bgColor: 'hover:bg-error-50',
      separator: true
    }
  ];

  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick(story);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      <div className="md:hidden fixed inset-0 bg-black/20 z-40" onClick={onClose} />
      
      {/* Desktop Menu */}
      <div
        ref={menuRef}
        className="hidden md:block fixed z-50 bg-background border border-surface rounded-storybook shadow-storybook-lg py-2 min-w-48"
        style={{
          left: `${menuPosition.x}px`,
          top: `${menuPosition.y}px`
        }}
      >
        {menuItems.map((item, index) => (
          <div key={item.label}>
            {item.separator && <div className="border-t border-surface my-1" />}
            <button
              onClick={() => handleItemClick(item)}
              className={`
                w-full flex items-center space-x-3 px-4 py-2 text-left text-sm storybook-transition
                ${item.color} ${item.bgColor}
              `}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Mobile Bottom Sheet */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-surface rounded-t-2xl shadow-storybook-lg">
        <div className="p-4">
          <div className="w-12 h-1 bg-surface rounded-full mx-auto mb-4" />
          <h3 className="text-lg font-heading text-text-primary mb-4 text-center">
            Story Actions
          </h3>
          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <div key={item.label}>
                {item.separator && <div className="border-t border-surface my-2" />}
                <button
                  onClick={() => handleItemClick(item)}
                  className={`
                    w-full flex items-center space-x-4 px-4 py-3 text-left rounded-storybook storybook-transition
                    ${item.color} ${item.bgColor}
                  `}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={onClose}
            className="w-full mt-4 py-3 text-center text-text-secondary hover:text-text-primary storybook-transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default QuickActionMenu;