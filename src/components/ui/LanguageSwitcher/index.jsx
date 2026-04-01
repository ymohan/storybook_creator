import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from 'context/LanguageContext';
import Icon from 'components/AppIcon';

const LanguageSwitcher = ({ compact = false }) => {
  const { language, changeLanguage, t, translations, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = translations[language];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 rounded-storybook border border-primary-200 bg-surface
          hover:bg-primary-50 storybook-transition text-text-primary font-medium
          ${compact ? 'px-2 py-1.5 text-sm' : 'px-3 py-2 text-sm'}
        `}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="text-base leading-none">{currentLang?.flag}</span>
        {!compact && (
          <span className="hidden sm:inline">{currentLang?.nativeName}</span>
        )}
        <Icon
          name={isOpen ? 'ChevronUp' : 'ChevronDown'}
          size={14}
          className="text-text-secondary"
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50 min-w-[160px] bg-background border border-primary-200 rounded-storybook shadow-storybook-lg overflow-hidden animate-in">
          {availableLanguages.map((langCode) => {
            const lang = translations[langCode];
            const isActive = langCode === language;
            return (
              <button
                key={langCode}
                onClick={() => handleSelect(langCode)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 text-left storybook-transition text-sm
                  ${isActive
                    ? 'bg-primary-50 text-primary font-semibold'
                    : 'text-text-primary hover:bg-primary-50 hover:text-primary'}
                `}
              >
                <span className="text-base">{lang.flag}</span>
                <div>
                  <div className="font-medium">{lang.nativeName}</div>
                  <div className="text-xs text-text-secondary">{lang.name}</div>
                </div>
                {isActive && (
                  <Icon name="Check" size={14} className="ml-auto text-primary" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
