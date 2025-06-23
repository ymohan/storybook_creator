import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import HeroSection from './components/HeroSection';
import FeaturedStories from './components/FeaturedStories';
import HowItWorks from './components/HowItWorks';
import RecentStories from './components/RecentStories';
import StoryPreviewModal from './components/StoryPreviewModal';

const WelcomeStoryGallery = () => {
  const navigate = useNavigate();
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Mock data for featured stories
  const featuredStories = [
    {
      id: 1,
      title: "Luna\'s Space Adventure",
      ageRange: "5-8 years",
      theme: "Space",
      coverImage: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=500&fit=crop",
      description: "Join Luna as she explores distant planets and makes friends with alien creatures in this exciting space adventure.",
      pages: 8,
      readTime: "10 min",
      isInteractive: true
    },
    {
      id: 2,
      title: "The Underwater Kingdom",
      ageRange: "4-7 years",
      theme: "Ocean",
      coverImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=500&fit=crop",
      description: "Dive deep into the ocean with Marina to discover a magical underwater kingdom filled with colorful sea creatures.",
      pages: 6,
      readTime: "8 min",
      isInteractive: true
    },
    {
      id: 3,
      title: "The Enchanted Forest",
      ageRange: "6-10 years",
      theme: "Fantasy",
      coverImage: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=500&fit=crop",
      description: "Follow Alex through a magical forest where trees talk and animals have special powers in this enchanting tale.",
      pages: 12,
      readTime: "15 min",
      isInteractive: true
    },
    {
      id: 4,
      title: "Dinosaur Discovery",
      ageRange: "5-9 years",
      theme: "Adventure",
      coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
      description: "Travel back in time with Sam to meet friendly dinosaurs and learn about prehistoric life.",
      pages: 10,
      readTime: "12 min",
      isInteractive: true
    },
    {
      id: 5,
      title: "The Magic Paintbrush",
      ageRange: "4-8 years",
      theme: "Art & Creativity",
      coverImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=500&fit=crop",
      description: "Discover the power of creativity with Emma and her magical paintbrush that brings drawings to life.",
      pages: 7,
      readTime: "9 min",
      isInteractive: true
    },
    {
      id: 6,
      title: "Robot Friends",
      ageRange: "6-11 years",
      theme: "Technology",
      coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=500&fit=crop",
      description: "Join Max as he builds his first robot and learns about friendship, teamwork, and problem-solving.",
      pages: 9,
      readTime: "11 min",
      isInteractive: true
    }
  ];

  // Mock data for recent stories (for returning users)
  const recentStories = [
    {
      id: 101,
      title: "Emma\'s Magical Garden",
      ageRange: "5-8 years",
      theme: "Nature",
      coverImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=500&fit=crop",
      createdDate: "2024-01-15",
      progress: 85,
      isCompleted: false
    },
    {
      id: 102,
      title: "The Brave Little Knight",
      ageRange: "6-9 years",
      theme: "Adventure",
      coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
      createdDate: "2024-01-12",
      progress: 100,
      isCompleted: true
    },
    {
      id: 103,
      title: "Cooking with Grandma",
      ageRange: "4-7 years",
      theme: "Family",
      coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=500&fit=crop",
      createdDate: "2024-01-10",
      progress: 60,
      isCompleted: false
    }
  ];

  useEffect(() => {
    // Check if user has created stories before (mock logic)
    const hasCreatedStories = localStorage.getItem('hasCreatedStories');
    setIsReturningUser(!!hasCreatedStories);
  }, []);

  const handleCreateStory = () => {
    navigate('/story-creation-wizard');
  };

  const handleReadSample = (story) => {
    setSelectedStory(story);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setSelectedStory(null);
  };

  const handleReadStory = (story) => {
    navigate('/interactive-story-reader', { state: { story } });
  };

  const handleViewLibrary = () => {
    navigate('/story-library-management');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-surface pt-16">
      {/* Hero Section */}
      <HeroSection 
        isReturningUser={isReturningUser}
        onCreateStory={handleCreateStory}
        onViewLibrary={handleViewLibrary}
      />

      {/* Recent Stories for Returning Users */}
      {isReturningUser && (
        <RecentStories 
          stories={recentStories}
          onReadStory={handleReadStory}
          onCreateNew={handleCreateStory}
        />
      )}

      {/* Featured Stories Gallery */}
      <FeaturedStories 
        stories={featuredStories}
        onReadSample={handleReadSample}
      />

      {/* How It Works Section */}
      <HowItWorks onCreateStory={handleCreateStory} />

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-background rounded-2xl p-8 shadow-storybook-lg">
            <div className="mb-6">
              <Icon name="Sparkles" size={48} className="text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-heading text-text-primary mb-4">
                Ready to Create Magic?
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Join thousands of families creating personalized stories that spark imagination and create lasting memories.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCreateStory}
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook hover:scale-105 storybook-transition shadow-storybook text-lg font-medium"
              >
                <Icon name="PenTool" size={24} />
                <span>Start Creating Now</span>
              </button>
              
              <button
                onClick={() => document.getElementById('featured-stories').scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-surface text-text-primary border border-primary-200 rounded-storybook hover:bg-primary-50 storybook-transition text-lg font-medium"
              >
                <Icon name="BookOpen" size={24} />
                <span>Explore More Stories</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Story Preview Modal */}
      <StoryPreviewModal 
        isOpen={isPreviewOpen}
        story={selectedStory}
        onClose={handleClosePreview}
      />

      {/* Decorative Elements */}
      <div className="fixed top-1/4 left-4 opacity-10 pointer-events-none">
        <Icon name="Star" size={32} className="text-secondary animate-pulse" />
      </div>
      <div className="fixed top-1/3 right-8 opacity-10 pointer-events-none">
        <Icon name="Heart" size={28} className="text-accent animate-pulse" />
      </div>
      <div className="fixed bottom-1/4 left-8 opacity-10 pointer-events-none">
        <Icon name="Sparkles" size={36} className="text-primary animate-pulse" />
      </div>
    </div>
  );
};

export default WelcomeStoryGallery;