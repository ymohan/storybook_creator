import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const StoryPreviewModal = ({ isOpen, story, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock preview pages
  const previewPages = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=400&fit=crop",
      text: `Once upon a time, in a galaxy far, far away, there lived a brave little astronaut named Luna. She had always dreamed of exploring the mysterious planets beyond her home world.

One starry night, Luna received a special message from the Space Academy. They needed her help to discover a new planet that had appeared on their cosmic maps.`
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=600&h=400&fit=crop",
      text: `Luna packed her magical space suit and climbed aboard her shimmering rocket ship. As she soared through the twinkling stars, she met a friendly alien named Zorp who had rainbow-colored tentacles.

"Welcome to our cosmic neighborhood!" said Zorp with a warm smile. "Would you like to see our crystal caves and singing flowers?"`
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=600&h=400&fit=crop",
      text: `Together, Luna and Zorp explored the enchanted planet filled with floating islands and waterfalls that flowed upward into the sky. They discovered that friendship knows no boundaries, not even in the vastness of space.

Luna learned that the greatest adventures happen when you're brave enough to make new friends and explore the unknown.`
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setCurrentPage(0);
      setIsPlaying(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNextPage = () => {
    if (currentPage < previewPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control audio narration
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowRight') {
      handleNextPage();
    } else if (e.key === 'ArrowLeft') {
      handlePrevPage();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, currentPage]);

  if (!isOpen || !story) return null;

  const currentPageData = previewPages[currentPage];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl mx-4 bg-background rounded-2xl shadow-storybook-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-surface">
          <div>
            <h2 className="text-xl font-heading text-text-primary">
              {story.title} - Preview
            </h2>
            <p className="text-sm text-text-secondary">
              Page {currentPage + 1} of {previewPages.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface rounded-storybook storybook-transition"
          >
            <Icon name="X" size={24} className="text-text-secondary" />
          </button>
        </div>

        {/* Story Content */}
        <div className="relative">
          {/* Story Page */}
          <div className="flex flex-col lg:flex-row min-h-96">
            {/* Image Side */}
            <div className="lg:w-1/2 relative overflow-hidden">
              <Image
                src={currentPageData.image}
                alt={`Page ${currentPage + 1}`}
                className="w-full h-64 lg:h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Text Side */}
            <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
              <div className="prose prose-lg max-w-none">
                <p className="text-text-primary leading-relaxed text-lg">
                  {currentPageData.text}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-4 bg-black/20 backdrop-blur-sm rounded-full px-6 py-3">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className={`p-2 rounded-full storybook-transition ${
                  currentPage === 0 
                    ? 'text-white/30 cursor-not-allowed' :'text-white hover:bg-white/20'
                }`}
              >
                <Icon name="ChevronLeft" size={20} />
              </button>

              <button
                onClick={handlePlayPause}
                className="p-3 bg-primary hover:bg-primary-600 text-white rounded-full storybook-transition"
              >
                <Icon name={isPlaying ? 'Pause' : 'Play'} size={20} />
              </button>

              <button
                onClick={handleNextPage}
                disabled={currentPage === previewPages.length - 1}
                className={`p-2 rounded-full storybook-transition ${
                  currentPage === previewPages.length - 1 
                    ? 'text-white/30 cursor-not-allowed' :'text-white hover:bg-white/20'
                }`}
              >
                <Icon name="ChevronRight" size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-surface bg-surface">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={16} />
                <span>{story.readTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="FileText" size={16} />
                <span>{story.pages} pages</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={16} />
                <span>{story.ageRange}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-text-secondary hover:text-text-primary storybook-transition"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  onClose();
                  // Navigate to story creation with this theme
                }}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook hover:scale-105 storybook-transition font-medium"
              >
                <Icon name="PenTool" size={16} />
                <span>Create Similar Story</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPreviewModal;