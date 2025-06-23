import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const StoryPreferencesSection = () => {
  const [preferences, setPreferences] = useState({
    defaultTheme: 'adventure',
    storyLength: 'medium',
    educationalFocus: ['vocabulary', 'creativity'],
    illustrationStyle: 'cartoon',
    includeMusic: true,
    includeSoundEffects: true,
    autoSave: true,
    defaultLanguage: 'english'
  });

  const themes = [
    { id: 'adventure', name: 'Adventure', icon: 'Compass', color: 'text-primary' },
    { id: 'fairy-tale', name: 'Fairy Tale', icon: 'Sparkles', color: 'text-secondary' },
    { id: 'science', name: 'Science', icon: 'Atom', color: 'text-accent' },
    { id: 'animals', name: 'Animals', icon: 'Rabbit', color: 'text-success' },
    { id: 'space', name: 'Space', icon: 'Rocket', color: 'text-warning' },
    { id: 'underwater', name: 'Underwater', icon: 'Fish', color: 'text-primary' }
  ];

  const storyLengths = [
    { id: 'short', name: 'Short (3-5 pages)', description: 'Quick bedtime stories' },
    { id: 'medium', name: 'Medium (6-10 pages)', description: 'Perfect for reading sessions' },
    { id: 'long', name: 'Long (11-15 pages)', description: 'Extended adventures' }
  ];

  const educationalOptions = [
    { id: 'vocabulary', name: 'Vocabulary Building', icon: 'BookOpen' },
    { id: 'creativity', name: 'Creativity & Imagination', icon: 'Palette' },
    { id: 'problem-solving', name: 'Problem Solving', icon: 'Puzzle' },
    { id: 'social-skills', name: 'Social Skills', icon: 'Users' },
    { id: 'science', name: 'Science Concepts', icon: 'Atom' },
    { id: 'math', name: 'Math Skills', icon: 'Calculator' }
  ];

  const illustrationStyles = [
    { id: 'cartoon', name: 'Cartoon', description: 'Colorful and playful' },
    { id: 'realistic', name: 'Realistic', description: 'Lifelike illustrations' },
    { id: 'watercolor', name: 'Watercolor', description: 'Soft and artistic' },
    { id: 'digital', name: 'Digital Art', description: 'Modern and vibrant' }
  ];

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleEducationalFocusToggle = (option) => {
    setPreferences(prev => ({
      ...prev,
      educationalFocus: prev.educationalFocus.includes(option)
        ? prev.educationalFocus.filter(item => item !== option)
        : [...prev.educationalFocus, option]
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-heading text-text-primary mb-2">Story Preferences</h2>
        <p className="text-text-secondary">Configure default settings for story creation</p>
      </div>

      {/* Default Theme */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-text-primary flex items-center">
          <Icon name="Palette" size={20} className="mr-2 text-primary" />
          Default Theme
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handlePreferenceChange('defaultTheme', theme.id)}
              className={`
                p-4 border-2 rounded-storybook storybook-transition text-left
                ${preferences.defaultTheme === theme.id
                  ? 'border-primary bg-primary-50' :'border-primary-200 hover:border-primary-300 bg-surface'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <Icon name={theme.icon} size={24} className={theme.color} />
                <span className="font-medium text-text-primary">{theme.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Story Length */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-text-primary flex items-center">
          <Icon name="BookOpen" size={20} className="mr-2 text-secondary" />
          Preferred Story Length
        </h3>
        <div className="space-y-3">
          {storyLengths.map((length) => (
            <label
              key={length.id}
              className={`
                flex items-center p-4 border-2 rounded-storybook cursor-pointer storybook-transition
                ${preferences.storyLength === length.id
                  ? 'border-secondary bg-secondary-50' :'border-primary-200 hover:border-secondary-300 bg-surface'
                }
              `}
            >
              <input
                type="radio"
                name="storyLength"
                value={length.id}
                checked={preferences.storyLength === length.id}
                onChange={(e) => handlePreferenceChange('storyLength', e.target.value)}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="font-medium text-text-primary">{length.name}</div>
                <div className="text-sm text-text-secondary">{length.description}</div>
              </div>
              {preferences.storyLength === length.id && (
                <Icon name="Check" size={20} className="text-secondary" />
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Educational Focus */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-text-primary flex items-center">
          <Icon name="GraduationCap" size={20} className="mr-2 text-accent" />
          Educational Focus Areas
        </h3>
        <p className="text-sm text-text-secondary">Select areas you'd like stories to emphasize</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {educationalOptions.map((option) => (
            <label
              key={option.id}
              className={`
                flex items-center p-3 border-2 rounded-storybook cursor-pointer storybook-transition
                ${preferences.educationalFocus.includes(option.id)
                  ? 'border-accent bg-accent-50' :'border-primary-200 hover:border-accent-300 bg-surface'
                }
              `}
            >
              <input
                type="checkbox"
                checked={preferences.educationalFocus.includes(option.id)}
                onChange={() => handleEducationalFocusToggle(option.id)}
                className="sr-only"
              />
              <Icon name={option.icon} size={18} className="mr-3 text-accent" />
              <span className="font-medium text-text-primary">{option.name}</span>
              {preferences.educationalFocus.includes(option.id) && (
                <Icon name="Check" size={16} className="ml-auto text-accent" />
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Illustration Style */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-text-primary flex items-center">
          <Icon name="Image" size={20} className="mr-2 text-success" />
          Illustration Style
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {illustrationStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => handlePreferenceChange('illustrationStyle', style.id)}
              className={`
                p-4 border-2 rounded-storybook storybook-transition text-left
                ${preferences.illustrationStyle === style.id
                  ? 'border-success bg-success-50' :'border-primary-200 hover:border-success-300 bg-surface'
                }
              `}
            >
              <div className="font-medium text-text-primary">{style.name}</div>
              <div className="text-sm text-text-secondary mt-1">{style.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Audio & Media Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-text-primary flex items-center">
          <Icon name="Volume2" size={20} className="mr-2 text-warning" />
          Audio & Media Settings
        </h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-surface border border-primary-200 rounded-storybook">
            <div>
              <div className="font-medium text-text-primary">Include Background Music</div>
              <div className="text-sm text-text-secondary">Add ambient music to enhance the story experience</div>
            </div>
            <input
              type="checkbox"
              checked={preferences.includeMusic}
              onChange={(e) => handlePreferenceChange('includeMusic', e.target.checked)}
              className="w-5 h-5 text-primary rounded focus:ring-primary"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-surface border border-primary-200 rounded-storybook">
            <div>
              <div className="font-medium text-text-primary">Include Sound Effects</div>
              <div className="text-sm text-text-secondary">Add sound effects for interactive elements</div>
            </div>
            <input
              type="checkbox"
              checked={preferences.includeSoundEffects}
              onChange={(e) => handlePreferenceChange('includeSoundEffects', e.target.checked)}
              className="w-5 h-5 text-primary rounded focus:ring-primary"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-surface border border-primary-200 rounded-storybook">
            <div>
              <div className="font-medium text-text-primary">Auto-Save Progress</div>
              <div className="text-sm text-text-secondary">Automatically save story creation progress</div>
            </div>
            <input
              type="checkbox"
              checked={preferences.autoSave}
              onChange={(e) => handlePreferenceChange('autoSave', e.target.checked)}
              className="w-5 h-5 text-primary rounded focus:ring-primary"
            />
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-primary-200">
        <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook hover:scale-105 storybook-transition shadow-storybook">
          <Icon name="Save" size={18} />
          <span>Save Preferences</span>
        </button>
      </div>
    </div>
  );
};

export default StoryPreferencesSection;