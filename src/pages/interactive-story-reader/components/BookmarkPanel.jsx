import React from 'react';
import Icon from 'components/AppIcon';

const BookmarkPanel = ({
  isOpen,
  onClose,
  bookmarks = [],
  onGoToBookmark,
  onRemoveBookmark
}) => {
  if (!isOpen) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      
      {/* Desktop Side Panel */}
      <div className="hidden md:block fixed right-0 top-0 bottom-0 w-80 bg-white border-l border-surface shadow-storybook-lg z-50 overflow-hidden">
        <BookmarkContent 
          bookmarks={bookmarks}
          onClose={onClose}
          onGoToBookmark={onGoToBookmark}
          onRemoveBookmark={onRemoveBookmark}
          formatDate={formatDate}
        />
      </div>

      {/* Mobile Bottom Sheet */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-surface rounded-t-2xl shadow-storybook-lg max-h-[80vh] overflow-hidden">
        <div className="p-4">
          <div className="w-12 h-1 bg-surface rounded-full mx-auto mb-4" />
        </div>
        <BookmarkContent 
          bookmarks={bookmarks}
          onClose={onClose}
          onGoToBookmark={onGoToBookmark}
          onRemoveBookmark={onRemoveBookmark}
          formatDate={formatDate}
          isMobile={true}
        />
      </div>
    </>
  );
};

const BookmarkContent = ({ 
  bookmarks, 
  onClose, 
  onGoToBookmark, 
  onRemoveBookmark, 
  formatDate,
  isMobile = false 
}) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-surface">
        <div className="flex items-center space-x-2">
          <Icon name="BookmarkCheck" size={20} className="text-accent" />
          <h2 className="text-lg font-heading text-text-primary">Bookmarks</h2>
          <span className="bg-accent-100 text-accent px-2 py-1 rounded-full text-xs">
            {bookmarks.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-surface rounded-storybook storybook-transition"
        >
          <Icon name="X" size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {bookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-4">
              <Icon name="Bookmark" size={24} className="text-accent" />
            </div>
            <h3 className="text-lg font-heading text-text-primary mb-2">No Bookmarks Yet</h3>
            <p className="text-text-secondary text-sm max-w-xs">
              Tap the bookmark button while reading to save your favorite pages for quick access later.
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="bg-surface hover:bg-primary-50 rounded-storybook p-4 storybook-transition group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary group-hover:text-primary">
                      {bookmark.title}
                    </h4>
                    <p className="text-xs text-text-secondary mt-1">
                      {formatDate(bookmark.timestamp)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 ml-2">
                    <button
                      onClick={() => onGoToBookmark(bookmark.page)}
                      className="p-2 hover:bg-primary-100 text-primary rounded-storybook storybook-transition"
                      title="Go to page"
                    >
                      <Icon name="ArrowRight" size={16} />
                    </button>
                    <button
                      onClick={() => onRemoveBookmark(bookmark.id)}
                      className="p-2 hover:bg-error-100 text-error rounded-storybook storybook-transition"
                      title="Remove bookmark"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </div>
                
                {bookmark.preview && (
                  <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                    {bookmark.preview}
                  </p>
                )}
                
                <button
                  onClick={() => onGoToBookmark(bookmark.page)}
                  className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-white hover:bg-primary-50 border border-primary-200 hover:border-primary text-primary rounded-storybook storybook-transition text-sm font-medium"
                >
                  <Icon name="BookOpen" size={16} />
                  <span>Go to Page {bookmark.page}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {bookmarks.length > 0 && (
        <div className="p-4 border-t border-surface">
          <button
            onClick={() => {
              bookmarks.forEach(bookmark => onRemoveBookmark(bookmark.id));
            }}
            className="w-full flex items-center justify-center space-x-2 py-2 px-3 text-error hover:bg-error-50 rounded-storybook storybook-transition text-sm"
          >
            <Icon name="Trash2" size={16} />
            <span>Clear All Bookmarks</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default BookmarkPanel;