import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BulkActions = ({
  selectedCount,
  totalCount,
  onSelectAll,
  onBulkAction,
  onClearSelection
}) => {
  const [showActionMenu, setShowActionMenu] = useState(false);

  const bulkActions = [
    {
      id: 'download',
      label: 'Download as PDF',
      icon: 'Download',
      color: 'text-primary',
      description: 'Download selected stories as PDF files'
    },
    {
      id: 'add-to-collection',
      label: 'Add to Collection',
      icon: 'FolderPlus',
      color: 'text-accent',
      description: 'Add stories to an existing or new collection'
    },
    {
      id: 'share',
      label: 'Share Stories',
      icon: 'Share2',
      color: 'text-secondary',
      description: 'Generate shareable links for selected stories'
    },
    {
      id: 'duplicate',
      label: 'Duplicate Stories',
      icon: 'Copy',
      color: 'text-text-secondary',
      description: 'Create copies of selected stories'
    },
    {
      id: 'delete',
      label: 'Delete Stories',
      icon: 'Trash2',
      color: 'text-error',
      description: 'Permanently delete selected stories',
      separator: true
    }
  ];

  const handleActionClick = (actionId) => {
    onBulkAction(actionId);
    setShowActionMenu(false);
  };

  return (
    <div className="bg-primary-50 border border-primary-200 rounded-storybook p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={onSelectAll}
              className={`
                w-5 h-5 rounded border-2 flex items-center justify-center storybook-transition
                ${selectedCount === totalCount 
                  ? 'bg-primary border-primary text-white' 
                  : selectedCount > 0
                  ? 'bg-primary border-primary text-white' :'border-primary-300 hover:border-primary'
                }
              `}
            >
              {selectedCount === totalCount ? (
                <Icon name="Check" size={12} />
              ) : selectedCount > 0 ? (
                <Icon name="Minus" size={12} />
              ) : null}
            </button>
            <span className="text-sm font-medium text-text-primary">
              {selectedCount === totalCount ? 'All' : selectedCount} of {totalCount} selected
            </span>
          </div>

          <button
            onClick={onClearSelection}
            className="text-sm text-text-secondary hover:text-text-primary storybook-transition"
          >
            Clear selection
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              onClick={() => setShowActionMenu(!showActionMenu)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-storybook hover:bg-primary-600 storybook-transition"
            >
              <Icon name="Settings" size={16} />
              <span>Actions</span>
              <Icon name="ChevronDown" size={16} />
            </button>

            {showActionMenu && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-background border border-surface rounded-storybook shadow-storybook-lg z-50">
                <div className="py-2">
                  {bulkActions.map((action) => (
                    <div key={action.id}>
                      {action.separator && <div className="border-t border-surface my-1" />}
                      <button
                        onClick={() => handleActionClick(action.id)}
                        className={`
                          w-full flex items-start space-x-3 px-4 py-3 text-left hover:bg-surface storybook-transition
                          ${action.color}
                        `}
                      >
                        <Icon name={action.icon} size={18} className="mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{action.label}</div>
                          <div className="text-xs text-text-secondary mt-0.5">
                            {action.description}
                          </div>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <button
            onClick={() => handleActionClick('download')}
            className="p-2 bg-background text-text-secondary hover:text-text-primary hover:bg-surface rounded-storybook storybook-transition"
            title="Download Selected"
          >
            <Icon name="Download" size={18} />
          </button>

          <button
            onClick={() => handleActionClick('delete')}
            className="p-2 bg-background text-error hover:bg-error-50 rounded-storybook storybook-transition"
            title="Delete Selected"
          >
            <Icon name="Trash2" size={18} />
          </button>
        </div>
      </div>

      {/* Selection Summary */}
      <div className="mt-3 pt-3 border-t border-primary-200">
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <span>
            {selectedCount} {selectedCount === 1 ? 'story' : 'stories'} selected
          </span>
          <div className="flex items-center space-x-4">
            <span>Ready for bulk operations</span>
            <Icon name="ArrowRight" size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;