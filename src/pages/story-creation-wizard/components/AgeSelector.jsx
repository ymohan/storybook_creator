import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const AgeSelector = ({ selectedAge, onAgeSelect }) => {
  const ageGroups = [
    {
      range: '1-3',
      label: 'Toddler',
      description: 'Simple stories with basic concepts',
      icon: 'Baby',
      color: 'from-pink-200 to-pink-300',
      image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop'
    },
    {
      range: '4-5',
      label: 'Preschooler',
      description: 'Fun adventures with learning elements',
      icon: 'Blocks',
      color: 'from-yellow-200 to-orange-300',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop'
    },
    {
      range: '6-8',
      label: 'Early Reader',
      description: 'Engaging stories with vocabulary building',
      icon: 'BookOpen',
      color: 'from-green-200 to-green-300',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop'
    },
    {
      range: '9-12',
      label: 'Advanced Reader',
      description: 'Complex narratives with deeper themes',
      icon: 'GraduationCap',
      color: 'from-blue-200 to-purple-300',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-heading text-text-primary mb-4">
          Choose Your Child's Age
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          This helps us create age-appropriate content with the right vocabulary and themes for your little one.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {ageGroups.map((group) => (
          <button
            key={group.range}
            onClick={() => onAgeSelect(group.range)}
            className={`
              relative p-6 rounded-2xl border-2 storybook-transition hover:scale-105 text-left
              ${selectedAge === group.range
                ? 'border-primary bg-primary-50 shadow-storybook-lg'
                : 'border-primary-200 bg-background hover:border-primary-300 hover:bg-primary-50'
              }
            `}
          >
            {/* Background Image */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-10">
              <Image
                src={group.image}
                alt={group.label}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-4">
                <div className={`
                  w-16 h-16 rounded-full bg-gradient-to-br ${group.color} 
                  flex items-center justify-center shadow-storybook
                `}>
                  <Icon name={group.icon} size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-heading text-text-primary">
                    Ages {group.range}
                  </h3>
                  <p className="text-lg font-medium text-primary">
                    {group.label}
                  </p>
                </div>
              </div>
              
              <p className="text-text-secondary">
                {group.description}
              </p>

              {/* Selection Indicator */}
              {selectedAge === group.range && (
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={16} color="white" />
                  </div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Custom Age Input */}
      <div className="mt-8 p-6 bg-surface rounded-2xl border border-primary-100">
        <h4 className="text-lg font-heading text-text-primary mb-4">
          Or enter a specific age:
        </h4>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            min="1"
            max="12"
            placeholder="Age"
            className="w-24 px-4 py-2 border border-primary-200 rounded-storybook focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            onChange={(e) => {
              const age = e.target.value;
              if (age && age >= 1 && age <= 12) {
                onAgeSelect(age);
              }
            }}
          />
          <span className="text-text-secondary">years old</span>
        </div>
      </div>
    </div>
  );
};

export default AgeSelector;