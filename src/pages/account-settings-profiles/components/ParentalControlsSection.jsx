import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ParentalControlsSection = () => {
  const [controls, setControls] = useState({
    contentFilter: 'moderate',
    ageRestriction: 12,
    timeLimit: 60,
    timeLimitEnabled: true,
    sharingPermissions: 'family-only',
    allowDownloads: true,
    allowPrinting: true,
    requireApproval: false,
    blockedWords: ['scary', 'monster'],
    allowedThemes: ['adventure', 'fairy-tale', 'animals', 'science'],
    restrictedThemes: ['horror', 'violence'],
    dailyStoryLimit: 5,
    weeklyReportEmail: true,
    instantNotifications: false
  });

  const [newBlockedWord, setNewBlockedWord] = useState('');

  const contentFilterLevels = [
    {
      id: 'mild',
      name: 'Mild',
      description: 'Very gentle content, suitable for sensitive children',
      color: 'text-success',
      bgColor: 'bg-success-50 border-success-200'
    },
    {
      id: 'moderate',
      name: 'Moderate',
      description: 'Age-appropriate content with some mild conflict resolution',
      color: 'text-warning',
      bgColor: 'bg-warning-50 border-warning-200'
    },
    {
      id: 'relaxed',
      name: 'Relaxed',
      description: 'Broader range of themes including adventure and mystery',
      color: 'text-primary',
      bgColor: 'bg-primary-50 border-primary-200'
    }
  ];

  const sharingOptions = [
    { id: 'private', name: 'Private Only', description: 'Stories cannot be shared', icon: 'Lock' },
    { id: 'family-only', name: 'Family Only', description: 'Share with family members only', icon: 'Users' },
    { id: 'friends', name: 'Friends & Family', description: 'Share with approved contacts', icon: 'UserPlus' },
    { id: 'public', name: 'Public Sharing', description: 'Allow public sharing with privacy controls', icon: 'Globe' }
  ];

  const availableThemes = [
    { id: 'adventure', name: 'Adventure', icon: 'Compass' },
    { id: 'fairy-tale', name: 'Fairy Tale', icon: 'Sparkles' },
    { id: 'animals', name: 'Animals', icon: 'Rabbit' },
    { id: 'science', name: 'Science', icon: 'Atom' },
    { id: 'space', name: 'Space', icon: 'Rocket' },
    { id: 'underwater', name: 'Underwater', icon: 'Fish' },
    { id: 'mystery', name: 'Mystery', icon: 'Search' },
    { id: 'fantasy', name: 'Fantasy', icon: 'Wand2' },
    { id: 'historical', name: 'Historical', icon: 'Clock' },
    { id: 'educational', name: 'Educational', icon: 'GraduationCap' }
  ];

  const handleControlChange = (key, value) => {
    setControls(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleThemeToggle = (themeId, listType) => {
    const currentList = controls[listType];
    const otherList = listType === 'allowedThemes' ? 'restrictedThemes' : 'allowedThemes';
    
    if (currentList.includes(themeId)) {
      // Remove from current list
      handleControlChange(listType, currentList.filter(id => id !== themeId));
    } else {
      // Add to current list and remove from other list
      handleControlChange(listType, [...currentList, themeId]);
      handleControlChange(otherList, controls[otherList].filter(id => id !== themeId));
    }
  };

  const addBlockedWord = () => {
    if (newBlockedWord.trim() && !controls.blockedWords.includes(newBlockedWord.trim().toLowerCase())) {
      handleControlChange('blockedWords', [...controls.blockedWords, newBlockedWord.trim().toLowerCase()]);
      setNewBlockedWord('');
    }
  };

  const removeBlockedWord = (word) => {
    handleControlChange('blockedWords', controls.blockedWords.filter(w => w !== word));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-heading text-text-primary mb-2">Parental Controls</h2>
        <p className="text-text-secondary">Set up safety measures and content restrictions for your children</p>
      </div>

      {/* Content Filtering */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-text-primary flex items-center">
          <Icon name="Shield" size={20} className="mr-2 text-primary" />
          Content Filtering
        </h3>
        
        <div className="space-y-3">
          {contentFilterLevels.map((level) => (
            <label
              key={level.id}
              className={`
                flex items-center p-4 border-2 rounded-storybook cursor-pointer storybook-transition
                ${controls.contentFilter === level.id
                  ? level.bgColor
                  : 'border-primary-200 hover:border-primary-300 bg-surface'
                }
              `}
            >
              <input
                type="radio"
                name="contentFilter"
                value={level.id}
                checked={controls.contentFilter === level.id}
                onChange={(e) => handleControlChange('contentFilter', e.target.value)}
                className="sr-only"
              />
              <div className="flex-1">
                <div className={`font-medium ${level.color}`}>{level.name}</div>
                <div className="text-sm text-text-secondary mt-1">{level.description}</div>
              </div>
              {controls.contentFilter === level.id && (
                <Icon name="Check" size={20} className={level.color} />
              )}
            </label>
          ))}
        </div>

        {/* Age Restriction */}
        <div className="bg-surface border border-primary-200 rounded-storybook p-4">
          <h4 className="font-medium text-text-primary mb-3">Maximum Age Rating</h4>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="3"
              max="18"
              value={controls.ageRestriction}
              onChange={(e) => handleControlChange('ageRestriction', parseInt(e.target.value))}
              className="flex-1 h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-lg font-heading text-primary w-12 text-center">
              {controls.ageRestriction}
            </div>
          </div>
          <div className="flex justify-between text-xs text-text-secondary mt-2">
            <span>3 years</span>
            <span>18 years</span>
          </div>
        </div>
      </div>

      {/* Time Management */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-text-primary flex items-center">
          <Icon name="Clock" size={20} className="mr-2 text-secondary" />
          Time Management
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface border border-primary-200 rounded-storybook p-4">
            <label className="flex items-center justify-between mb-3">
              <span className="font-medium text-text-primary">Enable Time Limits</span>
              <input
                type="checkbox"
                checked={controls.timeLimitEnabled}
                onChange={(e) => handleControlChange('timeLimitEnabled', e.target.checked)}
                className="w-5 h-5 text-primary rounded focus:ring-primary"
              />
            </label>
            {controls.timeLimitEnabled && (
              <div>
                <label className="block text-sm text-text-secondary mb-2">
                  Daily Time Limit (minutes)
                </label>
                <input
                  type="number"
                  min="15"
                  max="480"
                  value={controls.timeLimit}
                  onChange={(e) => handleControlChange('timeLimit', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-primary-200 rounded-storybook bg-background text-text-primary"
                />
              </div>
            )}
          </div>

          <div className="bg-surface border border-primary-200 rounded-storybook p-4">
            <label className="block text-sm text-text-secondary mb-2">
              Daily Story Limit
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={controls.dailyStoryLimit}
              onChange={(e) => handleControlChange('dailyStoryLimit', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-primary-200 rounded-storybook bg-background text-text-primary"
            />
            <p className="text-xs text-text-secondary mt-1">
              Maximum number of stories that can be created per day
            </p>
          </div>
        </div>
      </div>

      {/* Theme Restrictions */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-text-primary flex items-center">
          <Icon name="Palette" size={20} className="mr-2 text-accent" />
          Theme Restrictions
        </h3>
        
        <div className="bg-surface border border-primary-200 rounded-storybook p-4">
          <h4 className="font-medium text-text-primary mb-3">Allowed Themes</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {availableThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeToggle(theme.id, 'allowedThemes')}
                className={`
                  flex items-center space-x-2 p-2 rounded-storybook text-sm storybook-transition
                  ${controls.allowedThemes.includes(theme.id)
                    ? 'bg-success-50 text-success-700 border border-success-200'
                    : controls.restrictedThemes.includes(theme.id)
                    ? 'bg-error-50 text-error-700 border border-error-200' :'bg-background text-text-secondary border border-primary-200 hover:border-primary-300'
                  }
                `}
              >
                <Icon name={theme.icon} size={14} />
                <span>{theme.name}</span>
                {controls.allowedThemes.includes(theme.id) && (
                  <Icon name="Check" size={12} className="text-success" />
                )}
                {controls.restrictedThemes.includes(theme.id) && (
                  <Icon name="X" size={12} className="text-error" />
                )}
              </button>
            ))}
          </div>
          <p className="text-xs text-text-secondary mt-2">
            <span className="text-success">Green</span> = Allowed, 
            <span className="text-error ml-2">Red</span> = Restricted, 
            <span className="text-text-secondary ml-2">Gray</span> = Neutral
          </p>
        </div>
      </div>

      {/* Content Blocking */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-text-primary flex items-center">
          <Icon name="Ban" size={20} className="mr-2 text-error" />
          Content Blocking
        </h3>
        
        <div className="bg-surface border border-primary-200 rounded-storybook p-4">
          <h4 className="font-medium text-text-primary mb-3">Blocked Words</h4>
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={newBlockedWord}
              onChange={(e) => setNewBlockedWord(e.target.value)}
              placeholder="Add word to block..."
              className="flex-1 px-3 py-2 border border-primary-200 rounded-storybook bg-background text-text-primary"
              onKeyPress={(e) => e.key === 'Enter' && addBlockedWord()}
            />
            <button
              onClick={addBlockedWord}
              className="px-4 py-2 bg-error-50 text-error hover:bg-error-100 rounded-storybook storybook-transition"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {controls.blockedWords.map((word) => (
              <span
                key={word}
                className="flex items-center space-x-2 px-3 py-1 bg-error-50 text-error-700 rounded-full text-sm"
              >
                <span>{word}</span>
                <button
                  onClick={() => removeBlockedWord(word)}
                  className="hover:text-error-800 storybook-transition"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sharing & Privacy */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-text-primary flex items-center">
          <Icon name="Share2" size={20} className="mr-2 text-success" />
          Sharing & Privacy
        </h3>
        
        <div className="space-y-3">
          {sharingOptions.map((option) => (
            <label
              key={option.id}
              className={`
                flex items-center p-4 border-2 rounded-storybook cursor-pointer storybook-transition
                ${controls.sharingPermissions === option.id
                  ? 'border-success bg-success-50' :'border-primary-200 hover:border-success-300 bg-surface'
                }
              `}
            >
              <input
                type="radio"
                name="sharingPermissions"
                value={option.id}
                checked={controls.sharingPermissions === option.id}
                onChange={(e) => handleControlChange('sharingPermissions', e.target.value)}
                className="sr-only"
              />
              <Icon name={option.icon} size={18} className="mr-3 text-success" />
              <div className="flex-1">
                <div className="font-medium text-text-primary">{option.name}</div>
                <div className="text-sm text-text-secondary">{option.description}</div>
              </div>
              {controls.sharingPermissions === option.id && (
                <Icon name="Check" size={18} className="text-success" />
              )}
            </label>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center justify-between p-4 bg-surface border border-primary-200 rounded-storybook">
            <div>
              <div className="font-medium text-text-primary">Allow Downloads</div>
              <div className="text-sm text-text-secondary">Let children download stories for offline reading</div>
            </div>
            <input
              type="checkbox"
              checked={controls.allowDownloads}
              onChange={(e) => handleControlChange('allowDownloads', e.target.checked)}
              className="w-5 h-5 text-primary rounded focus:ring-primary"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-surface border border-primary-200 rounded-storybook">
            <div>
              <div className="font-medium text-text-primary">Allow Printing</div>
              <div className="text-sm text-text-secondary">Enable printing of stories and illustrations</div>
            </div>
            <input
              type="checkbox"
              checked={controls.allowPrinting}
              onChange={(e) => handleControlChange('allowPrinting', e.target.checked)}
              className="w-5 h-5 text-primary rounded focus:ring-primary"
            />
          </label>
        </div>
      </div>

      {/* Notifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-text-primary flex items-center">
          <Icon name="Bell" size={20} className="mr-2 text-warning" />
          Notifications & Reports
        </h3>
        
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-surface border border-primary-200 rounded-storybook">
            <div>
              <div className="font-medium text-text-primary">Weekly Activity Report</div>
              <div className="text-sm text-text-secondary">Receive email summaries of your child's reading activity</div>
            </div>
            <input
              type="checkbox"
              checked={controls.weeklyReportEmail}
              onChange={(e) => handleControlChange('weeklyReportEmail', e.target.checked)}
              className="w-5 h-5 text-primary rounded focus:ring-primary"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-surface border border-primary-200 rounded-storybook">
            <div>
              <div className="font-medium text-text-primary">Instant Notifications</div>
              <div className="text-sm text-text-secondary">Get notified when time limits are reached</div>
            </div>
            <input
              type="checkbox"
              checked={controls.instantNotifications}
              onChange={(e) => handleControlChange('instantNotifications', e.target.checked)}
              className="w-5 h-5 text-primary rounded focus:ring-primary"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-surface border border-primary-200 rounded-storybook">
            <div>
              <div className="font-medium text-text-primary">Require Approval for New Stories</div>
              <div className="text-sm text-text-secondary">Review and approve stories before children can read them</div>
            </div>
            <input
              type="checkbox"
              checked={controls.requireApproval}
              onChange={(e) => handleControlChange('requireApproval', e.target.checked)}
              className="w-5 h-5 text-primary rounded focus:ring-primary"
            />
          </label>
        </div>
      </div>

      {/* Emergency Override */}
      <div className="bg-warning-50 border border-warning-200 rounded-storybook p-4">
        <h4 className="font-medium text-warning-800 mb-2 flex items-center">
          <Icon name="AlertTriangle" size={18} className="mr-2" />
          Emergency Override
        </h4>
        <p className="text-sm text-warning-700 mb-3">
          In case of emergency, you can temporarily disable all parental controls. This action will be logged and you'll receive an email notification.
        </p>
        <button className="px-4 py-2 bg-warning text-white hover:bg-warning-600 rounded-storybook storybook-transition">
          Disable All Controls (24 hours)
        </button>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-primary-200">
        <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook hover:scale-105 storybook-transition shadow-storybook">
          <Icon name="Save" size={18} />
          <span>Save Controls</span>
        </button>
      </div>
    </div>
  );
};

export default ParentalControlsSection;