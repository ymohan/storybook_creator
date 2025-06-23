import React from 'react';
import Icon from 'components/AppIcon';

const ProgressAnimation = ({ currentStage, progress, stageData }) => {
  const getAnimationContent = () => {
    switch (currentStage) {
      case 0: // Creating character
        return (
          <div className="relative">
            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center animate-pulse">
              <Icon name="User" size={80} className="text-primary animate-bounce" />
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full flex items-center justify-center animate-spin">
              <Icon name="Sparkles" size={16} color="white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary rounded-full flex items-center justify-center animate-ping">
              <Icon name="Heart" size={12} color="white" />
            </div>
          </div>
        );
      
      case 1: // Writing adventure
        return (
          <div className="relative">
            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-accent-100 to-primary-100 rounded-2xl flex items-center justify-center">
              <Icon name="PenTool" size={80} className="text-accent animate-pulse" />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
            <div className="absolute -top-2 left-1/4 w-4 h-4 bg-warning rounded-full animate-float" />
            <div className="absolute -bottom-2 right-1/4 w-3 h-3 bg-success rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
          </div>
        );
      
      case 2: // Illustrating
        return (
          <div className="relative">
            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-secondary-100 to-accent-100 rounded-3xl flex items-center justify-center">
              <Icon name="Palette" size={80} className="text-secondary animate-pulse" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-primary/20 rounded-full animate-spin" />
            </div>
            <div className="absolute top-4 right-4 w-6 h-6 bg-error rounded-full animate-bounce" />
            <div className="absolute bottom-4 left-4 w-5 h-5 bg-warning rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
            <div className="absolute top-1/3 left-4 w-4 h-4 bg-success rounded-full animate-bounce" style={{ animationDelay: '0.6s' }} />
          </div>
        );
      
      case 3: // Finishing touches
        return (
          <div className="relative">
            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary-100 via-accent-100 to-secondary-100 rounded-full flex items-center justify-center">
              <Icon name="Sparkles" size={80} className="text-primary animate-spin" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-56 h-56 border-2 border-dashed border-accent/30 rounded-full animate-pulse" />
            </div>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full animate-ping"
                style={{
                  top: `${20 + Math.sin(i * Math.PI / 3) * 30}%`,
                  left: `${50 + Math.cos(i * Math.PI / 3) * 35}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        );
      
      default:
        return (
          <div className="w-48 h-48 mx-auto bg-surface rounded-full flex items-center justify-center">
            <Icon name="BookOpen" size={80} className="text-text-secondary animate-pulse" />
          </div>
        );
    }
  };

  return (
    <div className="text-center">
      <div className="mb-8">
        {getAnimationContent()}
      </div>
      
      {/* Stage Indicator */}
      <div className="flex justify-center space-x-2 mb-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`
              w-3 h-3 rounded-full storybook-transition
              ${i <= currentStage 
                ? 'bg-gradient-to-r from-primary to-secondary' :'bg-surface'
              }
            `}
          />
        ))}
      </div>

      {/* Current Stage Info */}
      <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 border border-surface shadow-storybook">
        <div className="flex items-center justify-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
            <Icon name={stageData?.icon || "Circle"} size={16} color="white" />
          </div>
          <h3 className="text-lg font-heading text-text-primary">
            {stageData?.title || "Processing..."}
          </h3>
        </div>
        <p className="text-text-secondary">
          {stageData?.description || "Working on your story..."}
        </p>
      </div>

      {/* Fun Facts */}
      <div className="mt-6 text-center">
        <p className="text-sm text-text-secondary italic">
          {progress < 25 && "Did you know? Every great story starts with a single word! ✨"}
          {progress >= 25 && progress < 50 && "Fun fact: The best adventures happen when you least expect them! 🌟"}
          {progress >= 50 && progress < 75 && "Almost there! Every picture tells a thousand words! 🎨"}
          {progress >= 75 && "Magic is in the details - we're making yours perfect! ✨"}
        </p>
      </div>
    </div>
  );
};

export default ProgressAnimation;