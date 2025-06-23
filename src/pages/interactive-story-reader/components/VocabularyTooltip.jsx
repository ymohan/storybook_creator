import React, { useEffect, useState } from 'react';
import Icon from 'components/AppIcon';

const VocabularyTooltip = ({ word, position, onClose }) => {
  const [tooltipPosition, setTooltipPosition] = useState(position);

  // Mock vocabulary definitions
  const vocabularyDefinitions = {
    'curious': {
      definition: 'Wanting to learn or know more about something',
      example: 'Luna was curious about the stars in the sky.',
      pronunciation: 'KYUR-ee-us',
      partOfSpeech: 'adjective'
    },
    'sparkling': {
      definition: 'Shining brightly with flashes of light',
      example: 'Her sparkling eyes showed her excitement.',
      pronunciation: 'SPAR-kling',
      partOfSpeech: 'adjective'
    },
    'surrounded': {
      definition: 'Having something all around on every side',
      example: 'The town was surrounded by beautiful hills.',
      pronunciation: 'sur-ROUND-ed',
      partOfSpeech: 'verb (past tense)'
    },
    'extraordinary': {
      definition: 'Very unusual or remarkable; amazing',
      example: 'The shooting star was an extraordinary sight.',
      pronunciation: 'ik-STRAWR-dn-er-ee',
      partOfSpeech: 'adjective'
    },
    'transform': {
      definition: 'To change completely in appearance or form',
      example: 'The star began to transform into a spaceship.',
      pronunciation: 'trans-FORM',
      partOfSpeech: 'verb'
    },
    'shimmering': {
      definition: 'Shining with a soft, wavering light',
      example: 'The shimmering spaceship looked magical.',
      pronunciation: 'SHIM-er-ing',
      partOfSpeech: 'adjective'
    },
    'adorable': {
      definition: 'Very cute and lovable',
      example: 'The little alien was absolutely adorable.',
      pronunciation: 'uh-DOR-uh-bul',
      partOfSpeech: 'adjective'
    },
    'alien': {
      definition: 'A being from another planet or world',
      example: 'The friendly alien came from a distant star.',
      pronunciation: 'AY-lee-un',
      partOfSpeech: 'noun'
    },
    'imagined': {
      definition: 'Thought of or pictured in your mind',
      example: 'Luna had never imagined meeting a real alien.',
      pronunciation: 'ih-MAJ-ind',
      partOfSpeech: 'verb (past tense)'
    }
  };

  const wordData = vocabularyDefinitions[word.toLowerCase()];

  useEffect(() => {
    // Adjust tooltip position to stay within viewport
    const adjustPosition = () => {
      const tooltipWidth = 320;
      const tooltipHeight = 200;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      let adjustedX = position.x - tooltipWidth / 2;
      let adjustedY = position.y - tooltipHeight - 10;

      // Keep tooltip within horizontal bounds
      if (adjustedX < 10) adjustedX = 10;
      if (adjustedX + tooltipWidth > viewportWidth - 10) {
        adjustedX = viewportWidth - tooltipWidth - 10;
      }

      // Keep tooltip within vertical bounds
      if (adjustedY < 10) {
        adjustedY = position.y + 30; // Show below the word instead
      }

      setTooltipPosition({ x: adjustedX, y: adjustedY });
    };

    adjustPosition();
    window.addEventListener('resize', adjustPosition);
    return () => window.removeEventListener('resize', adjustPosition);
  }, [position]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    const handleClickOutside = (e) => {
      if (!e.target.closest('.vocabulary-tooltip')) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  if (!wordData) {
    return (
      <div
        className="vocabulary-tooltip fixed z-50 bg-white border border-surface rounded-storybook shadow-storybook-lg p-4 max-w-xs"
        style={{
          left: `${tooltipPosition.x}px`,
          top: `${tooltipPosition.y}px`
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-heading text-primary capitalize">{word}</h4>
          <button
            onClick={onClose}
            className="p-1 hover:bg-surface rounded storybook-transition"
          >
            <Icon name="X" size={16} />
          </button>
        </div>
        <p className="text-sm text-text-secondary">
          Definition not available for this word.
        </p>
      </div>
    );
  }

  return (
    <div
      className="vocabulary-tooltip fixed z-50 bg-white border border-surface rounded-storybook shadow-storybook-lg p-4 max-w-sm"
      style={{
        left: `${tooltipPosition.x}px`,
        top: `${tooltipPosition.y}px`
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="font-heading text-primary capitalize text-lg">{word}</h4>
          <p className="text-xs text-text-secondary">{wordData.partOfSpeech}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-surface rounded storybook-transition"
        >
          <Icon name="X" size={16} />
        </button>
      </div>

      {/* Pronunciation */}
      <div className="mb-3">
        <div className="flex items-center space-x-2 mb-1">
          <Icon name="Volume2" size={14} className="text-secondary" />
          <span className="text-sm font-medium text-text-primary">Pronunciation</span>
        </div>
        <p className="text-sm text-secondary font-mono">{wordData.pronunciation}</p>
      </div>

      {/* Definition */}
      <div className="mb-3">
        <div className="flex items-center space-x-2 mb-1">
          <Icon name="BookOpen" size={14} className="text-accent" />
          <span className="text-sm font-medium text-text-primary">Definition</span>
        </div>
        <p className="text-sm text-text-primary leading-relaxed">{wordData.definition}</p>
      </div>

      {/* Example */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-1">
          <Icon name="Quote" size={14} className="text-primary" />
          <span className="text-sm font-medium text-text-primary">Example</span>
        </div>
        <p className="text-sm text-text-secondary italic bg-surface p-2 rounded">
          "{wordData.example}"
        </p>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <button className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 bg-primary-50 hover:bg-primary-100 text-primary rounded-storybook storybook-transition text-sm">
          <Icon name="Volume2" size={14} />
          <span>Listen</span>
        </button>
        <button className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 bg-secondary-50 hover:bg-secondary-100 text-secondary rounded-storybook storybook-transition text-sm">
          <Icon name="Star" size={14} />
          <span>Save</span>
        </button>
      </div>

      {/* Tooltip Arrow */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-surface rotate-45" />
    </div>
  );
};

export default VocabularyTooltip;