import React, { useState } from 'react';
import Icon from 'components/AppIcon';

import ChildProfileCard from './components/ChildProfileCard';
import StoryPreferencesSection from './components/StoryPreferencesSection';
import AccountManagementSection from './components/AccountManagementSection';
import ReadingSettingsSection from './components/ReadingSettingsSection';
import ParentalControlsSection from './components/ParentalControlsSection';

const AccountSettingsProfiles = () => {
  const [activeTab, setActiveTab] = useState('profiles');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mockChildProfiles = [
    {
      id: 1,
      name: "Emma",
      age: 7,
      readingLevel: "Grade 2",
      interests: ["Animals", "Adventure", "Magic"],
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      contentFilter: "Mild",
      vocabularyLevel: "Elementary",
      favoriteThemes: ["Fairy Tales", "Animal Stories"],
      createdStories: 12,
      isActive: true
    },
    {
      id: 2,
      name: "Lucas",
      age: 10,
      readingLevel: "Grade 4",
      interests: ["Space", "Science", "Robots"],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      contentFilter: "Moderate",
      vocabularyLevel: "Intermediate",
      favoriteThemes: ["Science Fiction", "Adventure"],
      createdStories: 8,
      isActive: false
    }
  ];

  const tabItems = [
    { id: 'profiles', label: 'Child Profiles', icon: 'Users', count: mockChildProfiles.length },
    { id: 'preferences', label: 'Story Preferences', icon: 'BookOpen' },
    { id: 'account', label: 'Account Management', icon: 'Settings' },
    { id: 'reading', label: 'Reading Settings', icon: 'Volume2' },
    { id: 'controls', label: 'Parental Controls', icon: 'Shield' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profiles':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-heading text-text-primary">Child Profiles</h2>
                <p className="text-text-secondary mt-1">Manage profiles for personalized story experiences</p>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook hover:scale-105 storybook-transition shadow-storybook">
                <Icon name="Plus" size={18} />
                <span>Add Profile</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockChildProfiles.map((profile) => (
                <ChildProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </div>
        );
      case 'preferences':
        return <StoryPreferencesSection />;
      case 'account':
        return <AccountManagementSection />;
      case 'reading':
        return <ReadingSettingsSection />;
      case 'controls':
        return <ParentalControlsSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-surface pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading text-text-primary mb-2">Account Settings</h1>
          <p className="text-text-secondary">Manage your account, child profiles, and story preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Tab Selector */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full flex items-center justify-between p-4 bg-surface border border-primary-200 rounded-storybook text-text-primary"
            >
              <div className="flex items-center space-x-3">
                <Icon name={tabItems.find(tab => tab.id === activeTab)?.icon} size={20} />
                <span className="font-medium">{tabItems.find(tab => tab.id === activeTab)?.label}</span>
              </div>
              <Icon name={isMobileMenuOpen ? "ChevronUp" : "ChevronDown"} size={20} />
            </button>
            
            {isMobileMenuOpen && (
              <div className="mt-2 bg-surface border border-primary-200 rounded-storybook shadow-storybook">
                {tabItems.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`
                      w-full flex items-center justify-between p-4 text-left storybook-transition
                      ${activeTab === tab.id 
                        ? 'bg-primary-50 text-primary border-r-2 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-primary-50'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={tab.icon} size={18} />
                      <span>{tab.label}</span>
                    </div>
                    {tab.count && (
                      <span className="bg-primary-100 text-primary text-xs px-2 py-1 rounded-full">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-surface border border-primary-200 rounded-storybook shadow-storybook overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-primary-200">
                <h3 className="font-heading text-text-primary">Settings Menu</h3>
              </div>
              <nav className="p-2">
                {tabItems.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center justify-between p-3 rounded-storybook text-left storybook-transition mb-1
                      ${activeTab === tab.id 
                        ? 'bg-primary-50 text-primary border-r-2 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-primary-50'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={tab.icon} size={18} />
                      <span className="font-medium">{tab.label}</span>
                    </div>
                    {tab.count && (
                      <span className="bg-primary-100 text-primary text-xs px-2 py-1 rounded-full">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-background border border-primary-200 rounded-storybook shadow-storybook p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsProfiles;