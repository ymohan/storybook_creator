import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const CollectionManager = ({ collections, stories, onCollectionClick }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [selectedColor, setSelectedColor] = useState('primary');
  const [selectedIcon, setSelectedIcon] = useState('Folder');

  const colorOptions = [
    { value: 'primary', label: 'Blue', class: 'bg-primary' },
    { value: 'secondary', label: 'Pink', class: 'bg-secondary' },
    { value: 'accent', label: 'Teal', class: 'bg-accent' },
    { value: 'success', label: 'Green', class: 'bg-success' },
    { value: 'warning', label: 'Orange', class: 'bg-warning' },
    { value: 'error', label: 'Red', class: 'bg-error' }
  ];

  const iconOptions = [
    'Folder', 'Heart', 'Star', 'BookOpen', 'Map', 'Crown', 
    'Rocket', 'Fish', 'TreePine', 'Sparkles', 'Gift', 'Music'
  ];

  const getCollectionStats = (collection) => {
    const collectionStories = stories.filter(story => 
      collection.storyIds.includes(story.id)
    );
    const totalPages = collectionStories.reduce((sum, story) => sum + story.totalPages, 0);
    const avgProgress = collectionStories.length > 0 
      ? Math.round(collectionStories.reduce((sum, story) => sum + story.readingProgress, 0) / collectionStories.length)
      : 0;
    
    return {
      storyCount: collectionStories.length,
      totalPages,
      avgProgress
    };
  };

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      // Mock create collection
      console.log('Creating collection:', {
        name: newCollectionName,
        color: selectedColor,
        icon: selectedIcon
      });
      setShowCreateForm(false);
      setNewCollectionName('');
      setSelectedColor('primary');
      setSelectedIcon('Folder');
    }
  };

  const getColorClass = (color) => {
    const colorClasses = {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      accent: 'bg-accent',
      success: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-error'
    };
    return colorClasses[color] || 'bg-primary';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-heading text-text-primary mb-2">
            Collections
          </h2>
          <p className="text-text-secondary">
            Organize your stories into themed collections
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-surface text-text-primary border border-primary-200 rounded-storybook hover:bg-primary-50 storybook-transition"
        >
          <Icon name="Plus" size={18} />
          <span>New Collection</span>
        </button>
      </div>

      {/* Create Collection Form */}
      {showCreateForm && (
        <div className="bg-surface border border-primary-200 rounded-storybook p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading text-text-primary">
              Create New Collection
            </h3>
            <button
              onClick={() => setShowCreateForm(false)}
              className="p-1 text-text-secondary hover:text-text-primary storybook-transition"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Collection Name
              </label>
              <input
                type="text"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="Enter collection name..."
                className="w-full px-3 py-2 bg-background border border-primary-200 rounded-storybook text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Color
                </label>
                <div className="flex items-center space-x-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`
                        w-8 h-8 rounded-full storybook-transition
                        ${color.class}
                        ${selectedColor === color.value ? 'ring-2 ring-offset-2 ring-text-primary' : 'hover:scale-110'}
                      `}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Icon
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {iconOptions.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => setSelectedIcon(icon)}
                      className={`
                        p-2 rounded-storybook storybook-transition
                        ${selectedIcon === icon 
                          ? 'bg-primary text-white' :'bg-background text-text-secondary hover:text-text-primary hover:bg-surface'
                        }
                      `}
                    >
                      <Icon name={icon} size={16} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 text-text-secondary hover:text-text-primary storybook-transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCollection}
                disabled={!newCollectionName.trim()}
                className="px-4 py-2 bg-primary text-white rounded-storybook hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed storybook-transition"
              >
                Create Collection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => {
          const stats = getCollectionStats(collection);
          return (
            <div
              key={collection.id}
              className="bg-surface border border-primary-200 rounded-storybook p-6 hover:shadow-storybook-lg storybook-transition cursor-pointer group"
              onClick={() => onCollectionClick(collection)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-12 h-12 rounded-storybook flex items-center justify-center
                    ${getColorClass(collection.color)}
                  `}>
                    <Icon name={collection.icon} size={24} color="white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading text-text-primary group-hover:text-primary storybook-transition">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {stats.storyCount} {stats.storyCount === 1 ? 'story' : 'stories'}
                    </p>
                  </div>
                </div>
                <button className="p-1 text-text-secondary hover:text-text-primary opacity-0 group-hover:opacity-100 storybook-transition">
                  <Icon name="MoreVertical" size={18} />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Total Pages</span>
                  <span className="text-text-primary font-medium">{stats.totalPages}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Avg Progress</span>
                  <span className="text-text-primary font-medium">{stats.avgProgress}%</span>
                </div>
                <div className="w-full h-2 bg-primary-100 rounded-full">
                  <div
                    className={`h-full rounded-full storybook-transition ${getColorClass(collection.color)}`}
                    style={{ width: `${stats.avgProgress}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-primary-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">
                    Click to view stories
                  </span>
                  <Icon name="ArrowRight" size={16} className="text-text-secondary group-hover:text-primary storybook-transition" />
                </div>
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {collections.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-surface rounded-full flex items-center justify-center">
              <Icon name="FolderPlus" size={24} className="text-text-secondary" />
            </div>
            <h3 className="text-lg font-heading text-text-primary mb-2">
              No Collections Yet
            </h3>
            <p className="text-text-secondary mb-4">
              Create collections to organize your stories by theme, character, or any way you like
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-4 py-2 bg-primary text-white rounded-storybook hover:bg-primary-600 storybook-transition"
            >
              Create Your First Collection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionManager;