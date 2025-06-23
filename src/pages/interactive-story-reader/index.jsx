import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import ReaderNavigationControls from 'components/ui/ReaderNavigationControls';
import StoryPage from './components/StoryPage';
import ReadingSettings from './components/ReadingSettings';
import VocabularyTooltip from './components/VocabularyTooltip';
import BookmarkPanel from './components/BookmarkPanel';

const InteractiveStoryReader = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  const [readingMode, setReadingMode] = useState('read-to-me'); // read-to-me, read-myself, follow-along
  const [fontSize, setFontSize] = useState('medium');
  const [narrationSpeed, setNarrationSpeed] = useState(1);
  const [backgroundMusic, setBackgroundMusic] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [readingProgress, setReadingProgress] = useState({});
  const readerRef = useRef(null);

  // Mock story data
  const storyData = {
    id: 'story-1',
    title: 'Luna\'s Magical Space Adventure',
    author: 'StoryMagic AI',
    coverImage: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop',
    totalPages: 12,
    ageGroup: '6-8 years',
    readingLevel: 'Beginner',
    pages: [
      {
        id: 1,
        leftPage: {
          illustration: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=400&fit=crop',
          text: `Once upon a time, in a small town surrounded by rolling hills, lived a curious little girl named Luna. She had sparkling brown eyes and loved to gaze at the stars every night from her bedroom window.`,
          interactiveElements: [
            { type: 'character', x: 45, y: 60, character: 'Luna', animation: 'wave' },
            { type: 'object', x: 80, y: 30, object: 'stars', animation: 'twinkle' }
          ],
          vocabularyWords: ['curious', 'sparkling', 'surrounded']
        },
        rightPage: {
          illustration: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=600&h=400&fit=crop',
          text: `One magical evening, as Luna was watching the night sky, she noticed something extraordinary. A shooting star was heading straight toward her house! But this wasn't just any shooting star - it was glowing with rainbow colors.`,
          interactiveElements: [
            { type: 'object', x: 60, y: 25, object: 'shooting-star', animation: 'streak' },
            { type: 'effect', x: 70, y: 40, effect: 'rainbow-glow', animation: 'pulse' }
          ],
          vocabularyWords: ['extraordinary', 'shooting star', 'rainbow']
        }
      },
      {
        id: 2,
        leftPage: {
          illustration: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&h=400&fit=crop',text: `The rainbow shooting star landed gently in Luna's backyard with a soft, musical chime. As she approached, the star began to transform into a beautiful, shimmering spaceship no bigger than her bicycle.`,
          interactiveElements: [
            { type: 'object', x: 50, y: 70, object: 'spaceship', animation: 'shimmer' },
            { type: 'sound', x: 30, y: 50, sound: 'magical-chime', animation: 'sound-wave' }
          ],
          vocabularyWords: ['transform', 'shimmering', 'musical chime']
        },
        rightPage: {
          illustration: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=400&fit=crop',
          text: `A tiny door opened on the side of the spaceship, and out stepped the most adorable alien Luna had ever imagined. The alien had big, friendly purple eyes and wore a silver suit covered in tiny stars.`,
          interactiveElements: [
            { type: 'character', x: 55, y: 65, character: 'alien', animation: 'greeting' },
            { type: 'object', x: 40, y: 60, object: 'spaceship-door', animation: 'open' }
          ],
          vocabularyWords: ['adorable', 'alien', 'imagined']
        }
      }
    ]
  };

  const totalPages = storyData.totalPages;

  useEffect(() => {
    // Update reading progress
    setReadingProgress(prev => ({
      ...prev,
      [storyData.id]: {
        currentPage,
        totalPages,
        lastRead: new Date().toISOString(),
        completed: currentPage === totalPages
      }
    }));
  }, [currentPage, storyData.id, totalPages]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSettingsOpen = () => {
    setShowSettings(true);
  };

  const handleExit = () => {
    navigate('/story-library-management');
  };

  const handleWordClick = (word, position) => {
    setSelectedWord({ word, position });
  };

  const handleBookmark = () => {
    const bookmark = {
      id: Date.now(),
      storyId: storyData.id,
      page: currentPage,
      title: `Page ${currentPage}`,
      timestamp: new Date().toISOString(),
      preview: storyData.pages[Math.floor((currentPage - 1) / 2)]?.leftPage?.text?.substring(0, 50) + '...'
    };
    
    setBookmarks(prev => [...prev, bookmark]);
  };

  const handleRemoveBookmark = (bookmarkId) => {
    setBookmarks(prev => prev.filter(b => b.id !== bookmarkId));
  };

  const handleGoToBookmark = (page) => {
    setCurrentPage(page);
    setShowBookmarks(false);
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      case 'extra-large': return 'text-xl';
      default: return 'text-base';
    }
  };

  const currentPageData = storyData.pages[Math.floor((currentPage - 1) / 2)];
  const isLeftPage = currentPage % 2 === 1;
  const pageContent = currentPageData ? (isLeftPage ? currentPageData.leftPage : currentPageData.rightPage) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 relative overflow-hidden">
      {/* Background Music Indicator */}
      {backgroundMusic && (
        <div className="fixed top-20 right-4 z-30 bg-black/20 text-white px-3 py-1 rounded-full text-xs flex items-center space-x-1">
          <Icon name="Music" size={12} />
          <span>Background Music</span>
        </div>
      )}

      {/* Main Reader Container */}
      <div 
        ref={readerRef}
        className="pt-16 pb-4 px-4 min-h-screen flex items-center justify-center"
      >
        <div className="max-w-6xl w-full">
          {/* Desktop Book Layout */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ aspectRatio: '16/10' }}>
              <div className="flex h-full">
                {/* Left Page */}
                <div className="flex-1 border-r border-gray-200">
                  <StoryPage
                    pageData={currentPageData?.leftPage}
                    pageNumber={currentPage % 2 === 1 ? currentPage : currentPage - 1}
                    isActive={currentPage % 2 === 1}
                    fontSize={getFontSizeClass()}
                    onWordClick={handleWordClick}
                    onInteractiveClick={(element) => console.log('Interactive element clicked:', element)}
                    readingMode={readingMode}
                    isPlaying={isPlaying}
                  />
                </div>
                
                {/* Right Page */}
                <div className="flex-1">
                  <StoryPage
                    pageData={currentPageData?.rightPage}
                    pageNumber={currentPage % 2 === 0 ? currentPage : currentPage + 1}
                    isActive={currentPage % 2 === 0}
                    fontSize={getFontSizeClass()}
                    onWordClick={handleWordClick}
                    onInteractiveClick={(element) => console.log('Interactive element clicked:', element)}
                    readingMode={readingMode}
                    isPlaying={isPlaying}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Single Page Layout */}
          <div className="lg:hidden">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mx-auto max-w-md" style={{ aspectRatio: '3/4' }}>
              <StoryPage
                pageData={pageContent}
                pageNumber={currentPage}
                isActive={true}
                fontSize={getFontSizeClass()}
                onWordClick={handleWordClick}
                onInteractiveClick={(element) => console.log('Interactive element clicked:', element)}
                readingMode={readingMode}
                isPlaying={isPlaying}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reading Controls */}
      <ReaderNavigationControls
        currentPage={currentPage}
        totalPages={totalPages}
        isPlaying={isPlaying}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
        onPlayPause={handlePlayPause}
        onSettingsOpen={handleSettingsOpen}
        onExit={handleExit}
        autoHide={true}
        showPageNumbers={true}
      />

      {/* Floating Action Buttons */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-30 space-y-3">
        <button
          onClick={handleBookmark}
          className="w-12 h-12 bg-secondary hover:bg-secondary-600 text-white rounded-full shadow-storybook-lg flex items-center justify-center storybook-transition hover:scale-105"
          title="Bookmark Page"
        >
          <Icon name="Bookmark" size={20} />
        </button>
        
        <button
          onClick={() => setShowBookmarks(true)}
          className="w-12 h-12 bg-accent hover:bg-accent-600 text-white rounded-full shadow-storybook-lg flex items-center justify-center storybook-transition hover:scale-105"
          title="View Bookmarks"
        >
          <Icon name="BookmarkCheck" size={20} />
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-4 left-4 z-30 bg-black/20 text-white px-4 py-2 rounded-full text-sm flex items-center space-x-2">
        <Icon name="BookOpen" size={16} />
        <span>{Math.round((currentPage / totalPages) * 100)}% Complete</span>
      </div>

      {/* Vocabulary Tooltip */}
      {selectedWord && (
        <VocabularyTooltip
          word={selectedWord.word}
          position={selectedWord.position}
          onClose={() => setSelectedWord(null)}
        />
      )}

      {/* Reading Settings Modal */}
      {showSettings && (
        <ReadingSettings
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          readingMode={readingMode}
          onReadingModeChange={setReadingMode}
          fontSize={fontSize}
          onFontSizeChange={setFontSize}
          narrationSpeed={narrationSpeed}
          onNarrationSpeedChange={setNarrationSpeed}
          backgroundMusic={backgroundMusic}
          onBackgroundMusicChange={setBackgroundMusic}
        />
      )}

      {/* Bookmarks Panel */}
      {showBookmarks && (
        <BookmarkPanel
          isOpen={showBookmarks}
          onClose={() => setShowBookmarks(false)}
          bookmarks={bookmarks}
          onGoToBookmark={handleGoToBookmark}
          onRemoveBookmark={handleRemoveBookmark}
        />
      )}
    </div>
  );
};

export default InteractiveStoryReader;