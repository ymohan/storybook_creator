import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ChildProfileCard = ({ profile }) => {
  const [isEditing, setIsEditing] = useState(false);

  const getReadingLevelColor = (level) => {
    const colors = {
      'Grade 1': 'bg-success-100 text-success-700',
      'Grade 2': 'bg-primary-100 text-primary-700',
      'Grade 3': 'bg-accent-100 text-accent-700',
      'Grade 4': 'bg-secondary-100 text-secondary-700',
      'Grade 5': 'bg-warning-100 text-warning-700'
    };
    return colors[level] || 'bg-surface text-text-secondary';
  };

  const getContentFilterColor = (filter) => {
    const colors = {
      'Mild': 'bg-success-100 text-success-700',
      'Moderate': 'bg-warning-100 text-warning-700',
      'Strict': 'bg-error-100 text-error-700'
    };
    return colors[filter] || 'bg-surface text-text-secondary';
  };

  return (
    <div className="bg-surface border border-primary-200 rounded-storybook shadow-storybook overflow-hidden hover:shadow-storybook-lg storybook-transition">
      {/* Profile Header */}
      <div className="relative p-6 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={profile.avatar}
              alt={`${profile.name}'s avatar`}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-storybook"
            />
            {profile.isActive && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-white flex items-center justify-center">
                <Icon name="Check" size={12} color="white" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-heading text-text-primary">{profile.name}</h3>
            <p className="text-text-secondary">Age {profile.age}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getReadingLevelColor(profile.readingLevel)}`}>
                {profile.readingLevel}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getContentFilterColor(profile.contentFilter)}`}>
                {profile.contentFilter} Filter
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 bg-white/80 hover:bg-white text-text-secondary hover:text-text-primary rounded-storybook storybook-transition"
            title="Edit Profile"
          >
            <Icon name="Edit3" size={16} />
          </button>
          <button
            className="p-2 bg-white/80 hover:bg-white text-text-secondary hover:text-text-primary rounded-storybook storybook-transition"
            title="More Options"
          >
            <Icon name="MoreVertical" size={16} />
          </button>
        </div>
      </div>

      {/* Profile Details */}
      <div className="p-6 space-y-4">
        {/* Interests */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-2 flex items-center">
            <Icon name="Heart" size={16} className="mr-2 text-secondary" />
            Interests
          </h4>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-accent-50 text-accent-700 rounded-full text-xs font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Favorite Themes */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-2 flex items-center">
            <Icon name="BookOpen" size={16} className="mr-2 text-primary" />
            Favorite Themes
          </h4>
          <div className="flex flex-wrap gap-2">
            {profile.favoriteThemes.map((theme, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary-100">
          <div className="text-center">
            <div className="text-2xl font-heading text-primary">{profile.createdStories}</div>
            <div className="text-xs text-text-secondary">Stories Created</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading text-accent">{profile.vocabularyLevel}</div>
            <div className="text-xs text-text-secondary">Vocabulary Level</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4">
          <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary-50 text-primary hover:bg-primary-100 rounded-storybook storybook-transition">
            <Icon name="BookOpen" size={16} />
            <span className="text-sm font-medium">View Stories</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-secondary-50 text-secondary hover:bg-secondary-100 rounded-storybook storybook-transition">
            <Icon name="Settings" size={16} />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChildProfileCard;