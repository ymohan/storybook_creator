import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';
import LanguageSwitcher from 'components/ui/LanguageSwitcher';
import { useLanguage } from 'context/LanguageContext';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/welcome-story-gallery', label: t.nav.home, icon: 'Home' },
    { path: '/story-library-management', label: t.nav.library, icon: 'Library' },
    { path: '/account-settings-profiles', label: t.nav.settings, icon: 'Settings' },
  ];

  const isActive = (path) =>
    location.pathname === path || (path === '/welcome-story-gallery' && location.pathname === '/');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-storybook border-b border-primary-100'
          : 'bg-background/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate('/welcome-story-gallery')}
            className="flex items-center gap-2 storybook-transition hover:opacity-80"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-storybook">
              <Icon name="BookHeart" size={20} color="white" />
            </div>
            <span className="text-xl font-heading text-primary hidden sm:block">StoryMagic</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-storybook text-sm font-medium storybook-transition ${
                  isActive(link.path)
                    ? 'bg-primary-50 text-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                <Icon name={link.icon} size={16} />
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Create Story CTA */}
            <button
              onClick={() => navigate('/story-creation-wizard')}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook text-sm font-medium hover:scale-105 storybook-transition shadow-storybook"
            >
              <Icon name="PenTool" size={16} />
              {t.nav.createStory}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface rounded-storybook storybook-transition"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-primary-100 bg-background shadow-storybook-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-storybook text-sm font-medium storybook-transition ${
                  isActive(link.path)
                    ? 'bg-primary-50 text-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                <Icon name={link.icon} size={18} />
                {link.label}
              </button>
            ))}
            <button
              onClick={() => navigate('/story-creation-wizard')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook text-sm font-medium shadow-storybook mt-2"
            >
              <Icon name="PenTool" size={18} />
              {t.nav.createStory}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
