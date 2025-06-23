import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';


const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/welcome-story-gallery');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center px-4 pt-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Illustration */}
        <div className="mb-8">
          <div className="w-64 h-64 mx-auto bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center">
            <Icon name="BookX" size={120} className="text-primary-400" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h1 className="text-6xl font-heading text-primary mb-4">404</h1>
          <h2 className="text-3xl font-heading text-text-primary mb-4">
            Oops! Story Not Found
          </h2>
          <p className="text-lg text-text-secondary mb-8 max-w-md mx-auto">
            It looks like this page has wandered off into a different story. Let's get you back to creating magical tales!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoHome}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook hover:scale-105 storybook-transition shadow-storybook"
            >
              <Icon name="Home" size={20} />
              <span>Back to Story Gallery</span>
            </button>
            
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-surface text-text-primary border border-primary-200 rounded-storybook hover:bg-primary-50 storybook-transition"
            >
              <Icon name="ArrowLeft" size={20} />
              <span>Go Back</span>
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <Icon name="Star" size={24} className="text-secondary animate-pulse" />
        </div>
        <div className="absolute top-32 right-16 opacity-20">
          <Icon name="Heart" size={20} className="text-accent animate-pulse" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-20">
          <Icon name="Sparkles" size={28} className="text-primary animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;