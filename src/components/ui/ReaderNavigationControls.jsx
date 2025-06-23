import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const ReaderNavigationControls = ({
  currentPage = 1,
  totalPages = 10,
  isPlaying = false,
  onPreviousPage,
  onNextPage,
  onPlayPause,
  onSettingsOpen,
  onExit,
  autoHide = true,
  showPageNumbers = true
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hideTimeout, setHideTimeout] = useState(null);

  useEffect(() => {
    if (autoHide) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      setHideTimeout(timeout);

      return () => {
        if (hideTimeout) clearTimeout(hideTimeout);
      };
    }
  }, [autoHide, hideTimeout]);

  const showControls = () => {
    setIsVisible(true);
    if (hideTimeout) clearTimeout(hideTimeout);
    
    if (autoHide) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      setHideTimeout(timeout);
    }
  };

  const handleExit = () => {
    if (onExit) {
      const confirmExit = window.confirm('Are you sure you want to exit? Your reading progress will be saved.');
      if (confirmExit) {
        onExit();
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-40"
      onMouseMove={showControls}
      onTouchStart={showControls}
    >
      {/* Top Controls */}
      <div className={`
        absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4 pointer-events-auto
        storybook-transition ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}>
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={handleExit}
            className="flex items-center space-x-2 px-3 py-2 bg-black/30 hover:bg-black/50 text-white rounded-storybook storybook-transition"
          >
            <Icon name="ArrowLeft" size={18} />
            <span className="hidden sm:inline text-sm">Exit Story</span>
          </button>

          {showPageNumbers && (
            <div className="bg-black/30 px-4 py-2 rounded-storybook text-white text-sm">
              Page {currentPage} of {totalPages}
            </div>
          )}

          <button
            onClick={onSettingsOpen}
            className="p-2 bg-black/30 hover:bg-black/50 text-white rounded-storybook storybook-transition"
            title="Reading Settings"
          >
            <Icon name="Settings" size={18} />
          </button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className={`
        absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 pointer-events-auto
        storybook-transition ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}>
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="w-full h-1 bg-white/20 rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full storybook-transition"
                style={{ width: `${(currentPage / totalPages) * 100}%` }}
              />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center space-x-6">
            {/* Previous Page */}
            <button
              onClick={onPreviousPage}
              disabled={currentPage <= 1}
              className={`
                p-3 rounded-full storybook-transition
                ${currentPage <= 1 
                  ? 'bg-white/10 text-white/30 cursor-not-allowed' :'bg-white/20 hover:bg-white/30 text-white'
                }
              `}
              title="Previous Page"
            >
              <Icon name="ChevronLeft" size={24} />
            </button>

            {/* Play/Pause */}
            <button
              onClick={onPlayPause}
              className="p-4 bg-primary hover:bg-primary-600 text-white rounded-full storybook-transition hover:scale-105"
              title={isPlaying ? 'Pause Narration' : 'Play Narration'}
            >
              <Icon name={isPlaying ? 'Pause' : 'Play'} size={28} />
            </button>

            {/* Next Page */}
            <button
              onClick={onNextPage}
              disabled={currentPage >= totalPages}
              className={`
                p-3 rounded-full storybook-transition
                ${currentPage >= totalPages 
                  ? 'bg-white/10 text-white/30 cursor-not-allowed' :'bg-white/20 hover:bg-white/30 text-white'
                }
              `}
              title="Next Page"
            >
              <Icon name="ChevronRight" size={24} />
            </button>
          </div>

          {/* Mobile Gesture Hint */}
          <div className="md:hidden text-center mt-3">
            <p className="text-white/60 text-xs">
              Swipe left or right to turn pages
            </p>
          </div>
        </div>
      </div>

      {/* Side Navigation Areas (Desktop) */}
      <div className="hidden md:block">
        {/* Left Side - Previous Page */}
        <button
          onClick={onPreviousPage}
          disabled={currentPage <= 1}
          className={`
            absolute left-0 top-1/2 transform -translate-y-1/2 w-16 h-32 pointer-events-auto
            flex items-center justify-center storybook-transition
            ${currentPage <= 1 
              ? 'cursor-not-allowed' :'hover:bg-black/10 cursor-pointer'
            }
          `}
          title="Previous Page"
        >
          {currentPage > 1 && (
            <div className="bg-white/20 hover:bg-white/30 p-2 rounded-r-storybook storybook-transition">
              <Icon name="ChevronLeft" size={20} color="white" />
            </div>
          )}
        </button>

        {/* Right Side - Next Page */}
        <button
          onClick={onNextPage}
          disabled={currentPage >= totalPages}
          className={`
            absolute right-0 top-1/2 transform -translate-y-1/2 w-16 h-32 pointer-events-auto
            flex items-center justify-center storybook-transition
            ${currentPage >= totalPages 
              ? 'cursor-not-allowed' :'hover:bg-black/10 cursor-pointer'
            }
          `}
          title="Next Page"
        >
          {currentPage < totalPages && (
            <div className="bg-white/20 hover:bg-white/30 p-2 rounded-l-storybook storybook-transition">
              <Icon name="ChevronRight" size={20} color="white" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReaderNavigationControls;