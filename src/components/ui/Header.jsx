import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Discover',
      path: '/welcome-story-gallery',
      icon: 'Sparkles',
      tooltip: 'Explore sample stories and get inspired'
    },
    {
      label: 'Create',
      path: '/story-creation-wizard',
      icon: 'PenTool',
      tooltip: 'Start creating your custom story'
    },
    {
      label: 'Read',
      path: '/interactive-story-reader',
      icon: 'BookOpen',
      tooltip: 'Read your interactive stories'
    },
    {
      label: 'Library',
      path: '/story-library-management',
      icon: 'Library',
      tooltip: 'Manage your story collection'
    },
    {
      label: 'Settings',
      path: '/account-settings-profiles',
      icon: 'Settings',
      tooltip: 'Account and profile settings'
    }
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-surface shadow-storybook">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div 
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => handleNavigation('/welcome-story-gallery')}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:scale-105 storybook-transition">
                <Icon name="BookHeart" size={20} color="white" />
              </div>
              <span className="text-xl font-heading text-primary group-hover:text-primary-600 storybook-transition">
                StoryMagic
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`
                  relative flex items-center space-x-2 px-4 py-2 rounded-storybook text-sm font-medium
                  storybook-transition hover:bg-surface group
                  ${isActive(item.path) 
                    ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-text-primary'
                  }
                `}
                title={item.tooltip}
              >
                <Icon 
                  name={item.icon} 
                  size={18} 
                  className={`
                    ${isActive(item.path) ? 'text-primary' : 'text-text-secondary group-hover:text-text-primary'}
                    storybook-transition
                  `}
                />
                <span>{item.label}</span>
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-storybook text-text-secondary hover:text-text-primary hover:bg-surface storybook-transition"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-surface shadow-storybook-lg">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-storybook text-left
                  storybook-transition
                  ${isActive(item.path) 
                    ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }
                `}
              >
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className={`
                    ${isActive(item.path) ? 'text-primary' : 'text-text-secondary'}
                  `}
                />
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-text-secondary mt-0.5">{item.tooltip}</div>
                </div>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;