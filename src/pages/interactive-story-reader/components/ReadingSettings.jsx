import React from 'react';
import Icon from 'components/AppIcon';

const ReadingSettings = ({
  isOpen,
  onClose,
  readingMode,
  onReadingModeChange,
  fontSize,
  onFontSizeChange,
  narrationSpeed,
  onNarrationSpeedChange,
  backgroundMusic,
  onBackgroundMusicChange
}) => {
  if (!isOpen) return null;

  const readingModes = [
    {
      value: 'read-to-me',
      label: 'Read to Me',
      description: 'Listen to the story narration',
      icon: 'Volume2'
    },
    {
      value: 'read-myself',
      label: 'Read Myself',
      description: 'Read the story independently',
      icon: 'BookOpen'
    },
    {
      value: 'follow-along',
      label: 'Follow Along',
      description: 'Read while listening with highlighting',
      icon: 'Eye'
    }
  ];

  const fontSizes = [
    { value: 'small', label: 'Small', preview: 'Aa' },
    { value: 'medium', label: 'Medium', preview: 'Aa' },
    { value: 'large', label: 'Large', preview: 'Aa' },
    { value: 'extra-large', label: 'Extra Large', preview: 'Aa' }
  ];

  const narrationSpeeds = [
    { value: 0.5, label: 'Very Slow' },
    { value: 0.75, label: 'Slow' },
    { value: 1, label: 'Normal' },
    { value: 1.25, label: 'Fast' },
    { value: 1.5, label: 'Very Fast' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-surface">
          <h2 className="text-xl font-heading text-text-primary">Reading Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface rounded-storybook storybook-transition"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Reading Mode */}
          <div>
            <h3 className="text-lg font-heading text-text-primary mb-4">Reading Mode</h3>
            <div className="space-y-3">
              {readingModes.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => onReadingModeChange(mode.value)}
                  className={`
                    w-full flex items-center space-x-4 p-4 rounded-storybook border-2 storybook-transition
                    ${readingMode === mode.value 
                      ? 'border-primary bg-primary-50' :'border-surface hover:border-primary-200'
                    }
                  `}
                >
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${readingMode === mode.value ? 'bg-primary text-white' : 'bg-surface text-text-secondary'}
                  `}>
                    <Icon name={mode.icon} size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-text-primary">{mode.label}</div>
                    <div className="text-sm text-text-secondary">{mode.description}</div>
                  </div>
                  {readingMode === mode.value && (
                    <Icon name="Check" size={20} className="text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div>
            <h3 className="text-lg font-heading text-text-primary mb-4">Text Size</h3>
            <div className="grid grid-cols-2 gap-3">
              {fontSizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => onFontSizeChange(size.value)}
                  className={`
                    p-4 rounded-storybook border-2 storybook-transition text-center
                    ${fontSize === size.value 
                      ? 'border-primary bg-primary-50' :'border-surface hover:border-primary-200'
                    }
                  `}
                >
                  <div className={`
                    font-bold mb-2
                    ${size.value === 'small' ? 'text-sm' : 
                      size.value === 'large' ? 'text-lg' : 
                      size.value === 'extra-large' ? 'text-xl' : 'text-base'}
                  `}>
                    {size.preview}
                  </div>
                  <div className="text-sm text-text-secondary">{size.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Narration Speed */}
          {readingMode !== 'read-myself' && (
            <div>
              <h3 className="text-lg font-heading text-text-primary mb-4">Narration Speed</h3>
              <div className="space-y-2">
                {narrationSpeeds.map((speed) => (
                  <button
                    key={speed.value}
                    onClick={() => onNarrationSpeedChange(speed.value)}
                    className={`
                      w-full flex items-center justify-between p-3 rounded-storybook storybook-transition
                      ${narrationSpeed === speed.value 
                        ? 'bg-primary-50 text-primary' :'hover:bg-surface text-text-secondary'
                      }
                    `}
                  >
                    <span>{speed.label}</span>
                    {narrationSpeed === speed.value && (
                      <Icon name="Check" size={16} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Background Music */}
          <div>
            <h3 className="text-lg font-heading text-text-primary mb-4">Audio Settings</h3>
            <div className="flex items-center justify-between p-4 bg-surface rounded-storybook">
              <div className="flex items-center space-x-3">
                <Icon name="Music" size={20} className="text-text-secondary" />
                <div>
                  <div className="font-medium text-text-primary">Background Music</div>
                  <div className="text-sm text-text-secondary">Soft ambient sounds</div>
                </div>
              </div>
              <button
                onClick={() => onBackgroundMusicChange(!backgroundMusic)}
                className={`
                  relative w-12 h-6 rounded-full storybook-transition
                  ${backgroundMusic ? 'bg-primary' : 'bg-gray-300'}
                `}
              >
                <div className={`
                  absolute top-0.5 w-5 h-5 bg-white rounded-full storybook-transition
                  ${backgroundMusic ? 'left-6' : 'left-0.5'}
                `} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-surface">
          <button
            onClick={onClose}
            className="w-full py-3 bg-primary hover:bg-primary-600 text-white rounded-storybook storybook-transition font-medium"
          >
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadingSettings;