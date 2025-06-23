import React from 'react';
import Icon from 'components/AppIcon';


const CharacterCreator = ({ character, onCharacterUpdate }) => {
  const hairOptions = [
    { id: 'brown-short', name: 'Brown Short', color: '#8B4513', style: 'short' },
    { id: 'blonde-long', name: 'Blonde Long', color: '#FFD700', style: 'long' },
    { id: 'black-curly', name: 'Black Curly', color: '#000000', style: 'curly' },
    { id: 'red-wavy', name: 'Red Wavy', color: '#FF6347', style: 'wavy' },
    { id: 'brown-braids', name: 'Brown Braids', color: '#8B4513', style: 'braids' },
    { id: 'black-straight', name: 'Black Straight', color: '#000000', style: 'straight' }
  ];

  const clothingOptions = [
    { id: 'casual', name: 'Casual Wear', icon: 'Shirt', color: 'from-blue-400 to-blue-500' },
    { id: 'formal', name: 'Formal Dress', icon: 'Crown', color: 'from-purple-400 to-purple-500' },
    { id: 'adventure', name: 'Adventure Gear', icon: 'Backpack', color: 'from-green-400 to-green-500' },
    { id: 'superhero', name: 'Superhero Costume', icon: 'Zap', color: 'from-red-400 to-red-500' },
    { id: 'princess', name: 'Princess Gown', icon: 'Sparkles', color: 'from-pink-400 to-pink-500' },
    { id: 'pirate', name: 'Pirate Outfit', icon: 'Anchor', color: 'from-indigo-400 to-indigo-500' }
  ];

  const personalityTraits = [
    { id: 'brave', name: 'Brave', icon: 'Shield', description: 'Faces challenges with courage' },
    { id: 'kind', name: 'Kind', icon: 'Heart', description: 'Always helps others' },
    { id: 'curious', name: 'Curious', icon: 'Search', description: 'Loves to explore and learn' },
    { id: 'funny', name: 'Funny', icon: 'Smile', description: 'Makes everyone laugh' },
    { id: 'smart', name: 'Smart', icon: 'Brain', description: 'Solves problems cleverly' },
    { id: 'creative', name: 'Creative', icon: 'Palette', description: 'Thinks outside the box' },
    { id: 'loyal', name: 'Loyal', icon: 'Users', description: 'A true friend to all' },
    { id: 'adventurous', name: 'Adventurous', icon: 'Compass', description: 'Ready for any adventure' }
  ];

  const updateCharacter = (updates) => {
    onCharacterUpdate({
      ...character,
      ...updates
    });
  };

  const updateAppearance = (key, value) => {
    updateCharacter({
      appearance: {
        ...character.appearance,
        [key]: value
      }
    });
  };

  const togglePersonality = (traitId) => {
    const currentTraits = character.personality || [];
    const updatedTraits = currentTraits.includes(traitId)
      ? currentTraits.filter(id => id !== traitId)
      : [...currentTraits, traitId];
    
    updateCharacter({ personality: updatedTraits });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-heading text-text-primary mb-4">
          Create Your Main Character
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Design the hero of your story! Give them a name, choose their appearance, and select personality traits that will shape their adventures.
        </p>
      </div>

      {/* Character Name */}
      <div className="bg-surface p-6 rounded-2xl border border-primary-100">
        <h3 className="text-xl font-heading text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="User" size={24} className="text-primary" />
          <span>Character Name</span>
        </h3>
        <input
          type="text"
          placeholder="Enter your character's name..."
          value={character.name}
          onChange={(e) => updateCharacter({ name: e.target.value })}
          className="w-full px-4 py-3 border border-primary-200 rounded-storybook focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
        />
      </div>

      {/* Hair Selection */}
      <div className="bg-surface p-6 rounded-2xl border border-primary-100">
        <h3 className="text-xl font-heading text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="Scissors" size={24} className="text-primary" />
          <span>Hair Style</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {hairOptions.map((hair) => (
            <button
              key={hair.id}
              onClick={() => updateAppearance('hair', hair.id)}
              className={`
                p-4 rounded-storybook border-2 storybook-transition hover:scale-105 text-center
                ${character.appearance.hair === hair.id
                  ? 'border-primary bg-primary-50' :'border-primary-200 bg-background hover:border-primary-300'
                }
              `}
            >
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-white shadow-storybook"
                style={{ backgroundColor: hair.color }}
              />
              <span className="text-sm font-medium text-text-primary">
                {hair.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Clothing Selection */}
      <div className="bg-surface p-6 rounded-2xl border border-primary-100">
        <h3 className="text-xl font-heading text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="Shirt" size={24} className="text-primary" />
          <span>Clothing Style</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {clothingOptions.map((clothing) => (
            <button
              key={clothing.id}
              onClick={() => updateAppearance('clothing', clothing.id)}
              className={`
                p-4 rounded-storybook border-2 storybook-transition hover:scale-105 text-center
                ${character.appearance.clothing === clothing.id
                  ? 'border-primary bg-primary-50' :'border-primary-200 bg-background hover:border-primary-300'
                }
              `}
            >
              <div className={`
                w-12 h-12 rounded-storybook mx-auto mb-2 bg-gradient-to-br ${clothing.color}
                flex items-center justify-center shadow-storybook
              `}>
                <Icon name={clothing.icon} size={20} color="white" />
              </div>
              <span className="text-sm font-medium text-text-primary">
                {clothing.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Personality Traits */}
      <div className="bg-surface p-6 rounded-2xl border border-primary-100">
        <h3 className="text-xl font-heading text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="Star" size={24} className="text-primary" />
          <span>Personality Traits</span>
        </h3>
        <p className="text-text-secondary mb-4">
          Choose 2-3 traits that describe your character's personality:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {personalityTraits.map((trait) => (
            <button
              key={trait.id}
              onClick={() => togglePersonality(trait.id)}
              className={`
                p-4 rounded-storybook border-2 storybook-transition hover:scale-105 text-left
                ${character.personality?.includes(trait.id)
                  ? 'border-primary bg-primary-50' :'border-primary-200 bg-background hover:border-primary-300'
                }
              `}
            >
              <div className="flex items-start space-x-3">
                <div className={`
                  w-10 h-10 rounded-storybook flex items-center justify-center
                  ${character.personality?.includes(trait.id)
                    ? 'bg-primary text-white' :'bg-primary-100 text-primary'
                  }
                `}>
                  <Icon name={trait.icon} size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">
                    {trait.name}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {trait.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Character Preview */}
      {character.name && (
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-6 rounded-2xl border border-primary-200">
          <h3 className="text-xl font-heading text-text-primary mb-4 text-center">
            Character Preview
          </h3>
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center shadow-storybook-lg">
              <Icon name="User" size={40} color="white" />
            </div>
            <h4 className="text-2xl font-heading text-primary mb-2">
              {character.name}
            </h4>
            {character.personality?.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {character.personality.map((traitId) => {
                  const trait = personalityTraits.find(t => t.id === traitId);
                  return (
                    <span
                      key={traitId}
                      className="px-3 py-1 bg-primary-100 text-primary text-sm rounded-full"
                    >
                      {trait?.name}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterCreator;