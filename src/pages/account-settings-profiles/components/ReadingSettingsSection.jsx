import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ReadingSettingsSection = () => {
  const [settings, setSettings] = useState({
    narrationVoice: 'sarah',
    playbackSpeed: 1.0,
    textSize: 'medium',
    fontFamily: 'inter',
    highContrast: false,
    reducedMotion: false,
    autoAdvance: true,
    highlightText: true,
    backgroundMusic: true,
    soundEffects: true,
    volumeLevel: 75,
    readingMode: 'guided'
  });

  const voices = [
    { id: 'sarah', name: 'Sarah', description: 'Warm and friendly female voice', gender: 'female' },
    { id: 'david', name: 'David', description: 'Clear and engaging male voice', gender: 'male' },
    { id: 'emma', name: 'Emma', description: 'Gentle and soothing female voice', gender: 'female' },
    { id: 'james', name: 'James', description: 'Energetic and expressive male voice', gender: 'male' }
  ];

  const textSizes = [
    { id: 'small', name: 'Small', sample: 'The quick brown fox jumps', size: 'text-sm' },
    { id: 'medium', name: 'Medium', sample: 'The quick brown fox jumps', size: 'text-base' },
    { id: 'large', name: 'Large', sample: 'The quick brown fox jumps', size: 'text-lg' },
    { id: 'extra-large', name: 'Extra Large', sample: 'The quick brown fox jumps', size: 'text-xl' }
  ];

  const fontFamilies = [
    { id: 'inter', name: 'Inter', class: 'font-sans', description: 'Clean and modern' },
    { id: 'nunito', name: 'Nunito', class: 'font-nunito', description: 'Friendly and rounded' },
    { id: 'jetbrains', name: 'JetBrains Mono', class: 'font-mono', description: 'Clear and readable' }
  ];

  const readingModes = [
    { id: 'guided', name: 'Guided Reading', description: 'Text highlights as narration plays', icon: 'Navigation' },
    { id: 'independent', name: 'Independent Reading', description: 'Child controls the pace', icon: 'BookOpen' },
    { id: 'interactive', name: 'Interactive Mode', description: 'Clickable elements and animations', icon: 'MousePointer' }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const playVoiceSample = (voiceId) => {
    // Mock voice sample playback
    alert(`Playing sample for ${voices.find(v => v.id === voiceId)?.name} voice`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-heading text-text-primary mb-2">Reading Settings</h2>
        <p className="text-text-secondary">Customize the reading experience for optimal learning and enjoyment</p>
      </div>

      {/* Narration Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-text-primary flex items-center">
          <Icon name="Volume2" size={20} className="mr-2 text-primary" />
          Narration Settings
        </h3>
        
        {/* Voice Selection */}
        <div className="bg-surface border border-primary-200 rounded-storybook p-4">
          <h4 className="font-medium text-text-primary mb-3">Narration Voice</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {voices.map((voice) => (
              <div
                key={voice.id}
                className={`
                  p-3 border-2 rounded-storybook cursor-pointer storybook-transition
                  ${settings.narrationVoice === voice.id
                    ? 'border-primary bg-primary-50' :'border-primary-200 hover:border-primary-300 bg-background'
                  }
                `}
                onClick={() => handleSettingChange('narrationVoice', voice.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={voice.gender === 'female' ? 'User' : 'UserCheck'} 
                      size={18} 
                      className="text-primary" 
                    />
                    <div>
                      <div className="font-medium text-text-primary">{voice.name}</div>
                      <div className="text-xs text-text-secondary">{voice.description}</div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playVoiceSample(voice.id);
                    }}
                    className="p-2 bg-primary-100 hover:bg-primary-200 text-primary rounded-storybook storybook-transition"
                  >
                    <Icon name="Play" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Playback Speed */}
        <div className="bg-surface border border-primary-200 rounded-storybook p-4">
          <h4 className="font-medium text-text-primary mb-3">Playback Speed</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Slow</span>
              <span className="font-medium text-text-primary">{settings.playbackSpeed}x</span>
              <span className="text-text-secondary">Fast</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={settings.playbackSpeed}
              onChange={(e) => handleSettingChange('playbackSpeed', parseFloat(e.target.value))}
              className="w-full h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-text-secondary">
              <span>0.5x</span>
              <span>1.0x</span>
              <span>1.5x</span>
              <span>2.0x</span>
            </div>
          </div>
        </div>

        {/* Volume Control */}
        <div className="bg-surface border border-primary-200 rounded-storybook p-4">
          <h4 className="font-medium text-text-primary mb-3">Volume Level</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Icon name="VolumeX" size={18} className="text-text-secondary" />
              <input
                type="range"
                min="0"
                max="100"
                value={settings.volumeLevel}
                onChange={(e) => handleSettingChange('volumeLevel', parseInt(e.target.value))}
                className="flex-1 h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <Icon name="Volume2" size={18} className="text-text-secondary" />
              <span className="text-sm font-medium text-text-primary w-12">{settings.volumeLevel}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Text Display Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-text-primary flex items-center">
          <Icon name="Type" size={20} className="mr-2 text-secondary" />
          Text Display Settings
        </h3>

        {/* Text Size */}
        <div className="bg-surface border border-primary-200 rounded-storybook p-4">
          <h4 className="font-medium text-text-primary mb-3">Text Size</h4>
          <div className="space-y-3">
            {textSizes.map((size) => (
              <label
                key={size.id}
                className={`
                  flex items-center justify-between p-3 border-2 rounded-storybook cursor-pointer storybook-transition
                  ${settings.textSize === size.id
                    ? 'border-secondary bg-secondary-50' :'border-primary-200 hover:border-secondary-300 bg-background'
                  }
                `}
              >
                <input
                  type="radio"
                  name="textSize"
                  value={size.id}
                  checked={settings.textSize === size.id}
                  onChange={(e) => handleSettingChange('textSize', e.target.value)}
                  className="sr-only"
                />
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-text-primary">{size.name}</span>
                  <span className={`${size.size} text-text-secondary`}>{size.sample}</span>
                </div>
                {settings.textSize === size.id && (
                  <Icon name="Check" size={18} className="text-secondary" />
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Font Family */}
        <div className="bg-surface border border-primary-200 rounded-storybook p-4">
          <h4 className="font-medium text-text-primary mb-3">Font Family</h4>
          <div className="space-y-3">
            {fontFamilies.map((font) => (
              <label
                key={font.id}
                className={`
                  flex items-center justify-between p-3 border-2 rounded-storybook cursor-pointer storybook-transition
                  ${settings.fontFamily === font.id
                    ? 'border-accent bg-accent-50' :'border-primary-200 hover:border-accent-300 bg-background'
                  }
                `}
              >
                <input
                  type="radio"
                  name="fontFamily"
                  value={font.id}
                  checked={settings.fontFamily === font.id}
                  onChange={(e) => handleSettingChange('fontFamily', e.target.value)}
                  className="sr-only"
                />
                <div>
                  <div className={`font-medium text-text-primary ${font.class}`}>{font.name}</div>
                  <div className="text-sm text-text-secondary">{font.description}</div>
                </div>
                {settings.fontFamily === font.id && (
                  <Icon name="Check" size={18} className="text-accent" />
                )}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Reading Mode */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-text-primary flex items-center">
          <Icon name="BookOpen" size={20} className="mr-2 text-accent" />
          Reading Mode
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {readingModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => handleSettingChange('readingMode', mode.id)}
              className={`
                p-4 border-2 rounded-storybook storybook-transition text-left
                ${settings.readingMode === mode.id
                  ? 'border-accent bg-accent-50' :'border-primary-200 hover:border-accent-300 bg-surface'
                }
              `}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon name={mode.icon} size={20} className="text-accent" />
                <span className="font-medium text-text-primary">{mode.name}</span>
              </div>
              <p className="text-sm text-text-secondary">{mode.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Accessibility Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-text-primary flex items-center">
          <Icon name="Accessibility" size={20} className="mr-2 text-success" />
          Accessibility Settings
        </h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-surface border border-primary-200 rounded-storybook">
            <div>
              <div className="font-medium text-text-primary">High Contrast Mode</div>
              <div className="text-sm text-text-secondary">Increase contrast for better readability</div>
            </div>
            <input
              type="checkbox"
              checked={settings.highContrast}
              onChange={(e) => handleSettingChange('highContrast', e.target.checked)}
              className="w-5 h-5 text-primary rounded focus:ring-primary"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-surface border border-primary-200 rounded-storybook">
            <div>
              <div className="font-medium text-text-primary">Reduced Motion</div>
              <div className="text-sm text-text-secondary">Minimize animations and transitions</div>
            </div>
            <input
              type="checkbox"
              checked={settings.reducedMotion}
              onChange={(e) => handleSettingChange('reducedMotion', e.target.checked)}
              className="w-5 h-5 text-primary rounded focus:ring-primary"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-surface border border-primary-200 rounded-storybook">
            <div>
              <div className="font-medium text-text-primary">Text Highlighting</div>
              <div className="text-sm text-text-secondary">Highlight text as it's being read aloud</div>
            </div>
            <input
              type="checkbox"
              checked={settings.highlightText}
              onChange={(e) => handleSettingChange('highlightText', e.target.checked)}
              className="w-5 h-5 text-primary rounded focus:ring-primary"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-surface border border-primary-200 rounded-storybook">
            <div>
              <div className="font-medium text-text-primary">Auto-Advance Pages</div>
              <div className="text-sm text-text-secondary">Automatically turn pages when narration ends</div>
            </div>
            <input
              type="checkbox"
              checked={settings.autoAdvance}
              onChange={(e) => handleSettingChange('autoAdvance', e.target.checked)}
              className="w-5 h-5 text-primary rounded focus:ring-primary"
            />
          </label>
        </div>
      </div>

      {/* Audio Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-text-primary flex items-center">
          <Icon name="Music" size={20} className="mr-2 text-warning" />
          Audio Enhancement
        </h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-surface border border-primary-200 rounded-storybook">
            <div>
              <div className="font-medium text-text-primary">Background Music</div>
              <div className="text-sm text-text-secondary">Play ambient music during story reading</div>
            </div>
            <input
              type="checkbox"
              checked={settings.backgroundMusic}
              onChange={(e) => handleSettingChange('backgroundMusic', e.target.checked)}
              className="w-5 h-5 text-primary rounded focus:ring-primary"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-surface border border-primary-200 rounded-storybook">
            <div>
              <div className="font-medium text-text-primary">Sound Effects</div>
              <div className="text-sm text-text-secondary">Play sound effects for interactive elements</div>
            </div>
            <input
              type="checkbox"
              checked={settings.soundEffects}
              onChange={(e) => handleSettingChange('soundEffects', e.target.checked)}
              className="w-5 h-5 text-primary rounded focus:ring-primary"
            />
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-primary-200">
        <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook hover:scale-105 storybook-transition shadow-storybook">
          <Icon name="Save" size={18} />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );
};

export default ReadingSettingsSection;