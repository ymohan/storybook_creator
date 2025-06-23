import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ThemeSelector = ({ selectedTheme, onThemeSelect }) => {
  const themes = [
    {
      id: 'space',
      name: 'Space Adventure',
      description: 'Explore galaxies, meet aliens, and discover new planets',
      icon: 'Rocket',
      color: 'from-purple-400 to-blue-500',
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop',
      tags: ['Adventure', 'Science', 'Exploration']
    },
    {
      id: 'underwater',
      name: 'Underwater World',
      description: 'Dive deep into ocean mysteries with sea creatures',
      icon: 'Fish',
      color: 'from-blue-400 to-teal-500',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
      tags: ['Ocean', 'Marine Life', 'Discovery']
    },
    {
      id: 'jungle',
      name: 'Jungle Safari',
      description: 'Adventure through wild jungles with amazing animals',
      icon: 'TreePine',
      color: 'from-green-400 to-emerald-500',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      tags: ['Animals', 'Nature', 'Adventure']
    },
    {
      id: 'fairy-tale',
      name: 'Fairy Tale Magic',
      description: 'Magical kingdoms with princesses, dragons, and castles',
      icon: 'Castle',
      color: 'from-pink-400 to-purple-500',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      tags: ['Magic', 'Fantasy', 'Kingdoms']
    },
    {
      id: 'dinosaur',
      name: 'Dinosaur World',
      description: 'Travel back in time to meet prehistoric creatures',
      icon: 'Bone',
      color: 'from-orange-400 to-red-500',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      tags: ['Prehistoric', 'Adventure', 'History']
    },
    {
      id: 'superhero',
      name: 'Superhero Adventure',
      description: 'Save the day with amazing superpowers and heroic deeds',
      icon: 'Zap',
      color: 'from-red-400 to-yellow-500',
      image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=300&fit=crop',
      tags: ['Heroes', 'Powers', 'Action']
    },
    {
      id: 'farm',
      name: 'Farm Life',
      description: 'Learn about farm animals and country adventures',
      icon: 'Tractor',
      color: 'from-yellow-400 to-green-500',
      image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop',
      tags: ['Animals', 'Nature', 'Learning']
    },
    {
      id: 'pirate',
      name: 'Pirate Treasure',
      description: 'Sail the seas in search of hidden treasure',
      icon: 'Anchor',
      color: 'from-blue-500 to-indigo-600',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
      tags: ['Adventure', 'Ocean', 'Treasure']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-heading text-text-primary mb-4">
          Pick Your Story Theme
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Choose the magical world where your story will take place. Each theme offers unique adventures and learning opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onThemeSelect(theme.id)}
            className={`
              relative group p-6 rounded-2xl border-2 storybook-transition hover:scale-105 text-left overflow-hidden
              ${selectedTheme === theme.id
                ? 'border-primary bg-primary-50 shadow-storybook-lg'
                : 'border-primary-200 bg-background hover:border-primary-300 hover:bg-primary-50'
              }
            `}
          >
            {/* Background Image */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 storybook-transition">
              <Image
                src={theme.image}
                alt={theme.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Gradient Overlay */}
            <div className={`
              absolute inset-0 bg-gradient-to-br ${theme.color} opacity-10 group-hover:opacity-20 storybook-transition
            `} />

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`
                  w-12 h-12 rounded-full bg-gradient-to-br ${theme.color} 
                  flex items-center justify-center shadow-storybook
                `}>
                  <Icon name={theme.icon} size={24} color="white" />
                </div>
                <h3 className="text-lg font-heading text-text-primary">
                  {theme.name}
                </h3>
              </div>
              
              <p className="text-text-secondary text-sm mb-4">
                {theme.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {theme.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-surface text-text-secondary text-xs rounded-full border border-primary-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Selection Indicator */}
              {selectedTheme === theme.id && (
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-storybook">
                    <Icon name="Check" size={16} color="white" />
                  </div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Popular Themes Indicator */}
      <div className="mt-8 p-4 bg-accent-50 rounded-2xl border border-accent-200">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="TrendingUp" size={20} className="text-accent" />
          <span className="font-medium text-accent">Most Popular This Week</span>
        </div>
        <p className="text-sm text-text-secondary">
          Space Adventure and Fairy Tale Magic are the top choices among kids this week!
        </p>
      </div>
    </div>
  );
};

export default ThemeSelector;