import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';

const SearchBar = ({ value, onChange, placeholder = "Search stories..." }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Mock search suggestions
  const mockSuggestions = [
    { type: 'recent', text: 'Emma\'s Space Adventure', icon: 'Clock' },
    { type: 'recent', text: 'Underwater Kingdom', icon: 'Clock' },
    { type: 'character', text: 'Princess Lily', icon: 'User' },
    { type: 'character', text: 'Captain Star', icon: 'User' },
    { type: 'theme', text: 'Space adventures', icon: 'Rocket' },
    { type: 'theme', text: 'Fairy tales', icon: 'Crown' },
    { type: 'theme', text: 'Jungle stories', icon: 'TreePine' }
  ];

  useEffect(() => {
    if (value && value.length > 0) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions(mockSuggestions.slice(0, 5));
      setShowSuggestions(isFocused);
    }
  }, [value, isFocused]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current && !inputRef.current.contains(event.target) &&
        suggestionsRef.current && !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion.text);
    setShowSuggestions(false);
    setIsFocused(false);
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const getSuggestionTypeColor = (type) => {
    const colors = {
      recent: 'text-text-secondary',
      character: 'text-secondary',
      theme: 'text-primary'
    };
    return colors[type] || 'text-text-secondary';
  };

  const getSuggestionTypeLabel = (type) => {
    const labels = {
      recent: 'Recent',
      character: 'Character',
      theme: 'Theme'
    };
    return labels[type] || '';
  };

  return (
    <div className="relative">
      <div className={`
        relative flex items-center bg-background border-2 rounded-storybook storybook-transition
        ${isFocused ? 'border-primary shadow-storybook' : 'border-primary-200 hover:border-primary-300'}
      `}>
        <Icon 
          name="Search" 
          size={20} 
          className="absolute left-3 text-text-secondary" 
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 bg-transparent text-text-primary placeholder-text-secondary focus:outline-none"
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 p-1 text-text-secondary hover:text-text-primary storybook-transition"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-background border border-primary-200 rounded-storybook shadow-storybook-lg z-50 max-h-64 overflow-y-auto"
        >
          <div className="py-2">
            {!value && (
              <div className="px-4 py-2 text-xs font-medium text-text-secondary uppercase tracking-wide">
                Recent Searches & Suggestions
              </div>
            )}
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-surface storybook-transition"
              >
                <Icon 
                  name={suggestion.icon} 
                  size={16} 
                  className={getSuggestionTypeColor(suggestion.type)}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-text-primary truncate">
                    {suggestion.text}
                  </div>
                  {suggestion.type !== 'recent' && (
                    <div className="text-xs text-text-secondary">
                      {getSuggestionTypeLabel(suggestion.type)}
                    </div>
                  )}
                </div>
                {suggestion.type === 'recent' && (
                  <Icon name="ArrowUpLeft" size={14} className="text-text-secondary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;