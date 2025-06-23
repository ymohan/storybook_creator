import React from 'react';
import Icon from 'components/AppIcon';


const HeroSection = ({ isReturningUser, onCreateStory, onViewLibrary }) => {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {isReturningUser ? (
              <>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading text-text-primary mb-6">
                  Welcome Back,
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary block">
                    Story Creator!
                  </span>
                </h1>
                <p className="text-xl text-text-secondary mb-8 max-w-2xl">
                  Ready to continue your magical storytelling journey? Create new adventures or revisit your favorite tales.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button
                    onClick={onCreateStory}
                    className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook hover:scale-105 storybook-transition shadow-storybook text-lg font-medium"
                  >
                    <Icon name="Plus" size={24} />
                    <span>Create New Story</span>
                  </button>
                  <button
                    onClick={onViewLibrary}
                    className="flex items-center justify-center space-x-2 px-8 py-4 bg-surface text-text-primary border border-primary-200 rounded-storybook hover:bg-primary-50 storybook-transition text-lg font-medium"
                  >
                    <Icon name="Library" size={24} />
                    <span>View My Library</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading text-text-primary mb-6">
                  Create Magical
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary block">
                    AI-Powered Stories
                  </span>
                </h1>
                <p className="text-xl text-text-secondary mb-8 max-w-2xl">
                  Bring your child's imagination to life with personalized stories featuring custom characters, beautiful illustrations, and interactive reading experiences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                  <button
                    onClick={onCreateStory}
                    className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook hover:scale-105 storybook-transition shadow-storybook text-lg font-medium"
                  >
                    <Icon name="PenTool" size={24} />
                    <span>Create Your Story</span>
                  </button>
                  <button
                    onClick={() => document.getElementById('featured-stories').scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center justify-center space-x-2 px-8 py-4 bg-surface text-text-primary border border-primary-200 rounded-storybook hover:bg-primary-50 storybook-transition text-lg font-medium"
                  >
                    <Icon name="BookOpen" size={24} />
                    <span>Browse Sample Stories</span>
                  </button>
                </div>
                
                {/* Key Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center lg:text-left">
                  <div className="flex items-center space-x-2 justify-center lg:justify-start">
                    <Icon name="Palette" size={20} className="text-accent" />
                    <span className="text-sm text-text-secondary">Custom Illustrations</span>
                  </div>
                  <div className="flex items-center space-x-2 justify-center lg:justify-start">
                    <Icon name="Users" size={20} className="text-secondary" />
                    <span className="text-sm text-text-secondary">Personalized Characters</span>
                  </div>
                  <div className="flex items-center space-x-2 justify-center lg:justify-start">
                    <Icon name="Volume2" size={20} className="text-primary" />
                    <span className="text-sm text-text-secondary">Audio Narration</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Illustration */}
          <div className="relative">
            <div className="relative z-10">
              <div className="w-full max-w-lg mx-auto">
                <div className="relative bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl p-8 shadow-storybook-lg">
                  <div className="aspect-square bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl flex items-center justify-center mb-6">
                    <Icon name="BookHeart" size={120} className="text-primary" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-heading text-text-primary mb-2">
                      Your Story Awaits
                    </h3>
                    <p className="text-sm text-text-secondary">
                      Every great adventure begins with a single page
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-secondary rounded-full flex items-center justify-center shadow-storybook animate-bounce">
              <Icon name="Star" size={24} color="white" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-storybook animate-pulse">
              <Icon name="Heart" size={20} color="white" />
            </div>
            <div className="absolute top-1/2 -right-8 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-storybook animate-bounce" style={{ animationDelay: '1s' }}>
              <Icon name="Sparkles" size={22} color="white" />
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 opacity-5">
          <Icon name="BookOpen" size={200} className="text-primary" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-5">
          <Icon name="PenTool" size={150} className="text-secondary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;