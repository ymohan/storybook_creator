import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const StoryPage = ({
  pageData,
  pageNumber,
  isActive,
  fontSize = 'text-base',
  onWordClick,
  onInteractiveClick,
  readingMode = 'read-to-me',
  isPlaying = false
}) => {
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(-1);
  const [animatingElements, setAnimatingElements] = useState(new Set());

  useEffect(() => {
    if (isPlaying && readingMode === 'follow-along') {
      // Simulate word highlighting during narration
      const words = pageData?.text?.split(' ') || [];
      let currentIndex = 0;
      
      const interval = setInterval(() => {
        if (currentIndex < words.length) {
          setHighlightedWordIndex(currentIndex);
          currentIndex++;
        } else {
          setHighlightedWordIndex(-1);
          clearInterval(interval);
        }
      }, 500); // Adjust timing based on narration speed

      return () => clearInterval(interval);
    } else {
      setHighlightedWordIndex(-1);
    }
  }, [isPlaying, readingMode, pageData?.text]);

  const handleInteractiveElementClick = (element, index) => {
    setAnimatingElements(prev => new Set([...prev, index]));
    
    // Remove animation after duration
    setTimeout(() => {
      setAnimatingElements(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }, 2000);

    if (onInteractiveClick) {
      onInteractiveClick(element);
    }
  };

  const handleWordClick = (word, event) => {
    const rect = event.target.getBoundingClientRect();
    const position = {
      x: rect.left + rect.width / 2,
      y: rect.top
    };
    
    if (onWordClick) {
      onWordClick(word, position);
    }
  };

  const renderTextWithHighlighting = (text) => {
    if (!text) return null;

    const words = text.split(' ');
    const vocabularyWords = pageData?.vocabularyWords || [];

    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,!?;:]/g, '').toLowerCase();
      const isVocabulary = vocabularyWords.includes(cleanWord);
      const isHighlighted = highlightedWordIndex === index;

      return (
        <span
          key={index}
          className={`
            inline-block mr-1 cursor-pointer storybook-transition
            ${isHighlighted ? 'bg-primary text-white px-1 rounded' : ''}
            ${isVocabulary ? 'text-primary font-medium hover:bg-primary-50 px-1 rounded' : ''}
          `}
          onClick={(e) => handleWordClick(cleanWord, e)}
        >
          {word}
        </span>
      );
    });
  };

  if (!pageData) {
    return (
      <div className="h-full flex items-center justify-center bg-surface">
        <div className="text-center text-text-secondary">
          <Icon name="BookOpen" size={48} className="mx-auto mb-4 opacity-50" />
          <p>Page {pageNumber}</p>
          <p className="text-sm">Content not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Illustration Section */}
      <div className="flex-1 relative bg-gradient-to-b from-primary-50 to-secondary-50">
        <Image
          src={pageData.illustration}
          alt={`Story illustration for page ${pageNumber}`}
          className="w-full h-full object-cover"
        />
        
        {/* Interactive Elements Overlay */}
        {pageData.interactiveElements?.map((element, index) => (
          <button
            key={index}
            className={`
              absolute w-8 h-8 rounded-full bg-primary/20 hover:bg-primary/40 
              flex items-center justify-center storybook-transition hover:scale-110
              ${animatingElements.has(index) ? 'animate-pulse bg-secondary' : ''}
            `}
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => handleInteractiveElementClick(element, index)}
            title={`Click to interact with ${element.character || element.object || element.effect}`}
          >
            <Icon 
              name={element.type === 'character' ? 'User' : element.type === 'sound' ? 'Volume2' : 'Sparkles'} 
              size={16} 
              className="text-white"
            />
          </button>
        ))}

        {/* Page Number */}
        <div className="absolute bottom-2 right-2 bg-black/20 text-white px-2 py-1 rounded text-xs">
          {pageNumber}
        </div>
      </div>

      {/* Text Section */}
      <div className="p-6 bg-white">
        <div className={`
          leading-relaxed text-text-primary ${fontSize}
          ${readingMode === 'read-myself' ? 'font-medium' : ''}
        `}>
          {renderTextWithHighlighting(pageData.text)}
        </div>

        {/* Reading Mode Indicator */}
        {readingMode !== 'read-myself' && (
          <div className="mt-4 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-xs text-text-secondary bg-surface px-3 py-1 rounded-full">
              <Icon 
                name={isPlaying ? 'Volume2' : 'VolumeX'} 
                size={12} 
                className={isPlaying ? 'text-primary' : ''} 
              />
              <span>
                {readingMode === 'read-to-me' ? 'Listen Mode' : 'Follow Along'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryPage;