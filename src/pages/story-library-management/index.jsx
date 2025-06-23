import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import QuickActionMenu from 'components/ui/QuickActionMenu';
import StoryCard from './components/StoryCard';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import FeaturedSection from './components/FeaturedSection';
import BulkActions from './components/BulkActions';
import CollectionManager from './components/CollectionManager';

const StoryLibraryManagement = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [selectedStories, setSelectedStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    ageRange: 'all',
    theme: 'all',
    dateRange: 'all',
    readingStatus: 'all'
  });
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [quickActionMenu, setQuickActionMenu] = useState({
    isOpen: false,
    position: { x: 0, y: 0 },
    story: null
  });
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [collections, setCollections] = useState([]);

  // Mock data for stories
  const mockStories = [
    {
      id: 1,
      title: "Emma\'s Space Adventure",
      coverImage: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop",
      createdDate: new Date('2024-01-15'),
      childAge: 6,
      theme: 'space',
      readingProgress: 85,
      totalPages: 12,
      currentPage: 10,
      isCompleted: false,
      readCount: 5,
      lastRead: new Date('2024-01-20'),
      description: `Join Emma as she embarks on an incredible journey through the cosmos, meeting friendly aliens and discovering the wonders of space.`,
      characters: ['Emma', 'Zorp the Alien', 'Captain Star'],
      educationalTopics: ['Solar System', 'Friendship', 'Courage'],
      readingLevel: 'Beginner',
      isFavorite: true
    },
    {
      id: 2,
      title: "The Underwater Kingdom",
      coverImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
      createdDate: new Date('2024-01-10'),
      childAge: 8,
      theme: 'underwater',
      readingProgress: 100,
      totalPages: 15,
      currentPage: 15,
      isCompleted: true,
      readCount: 3,
      lastRead: new Date('2024-01-18'),
      description: `Dive deep into the ocean with Maya as she discovers a magical underwater kingdom filled with talking sea creatures and hidden treasures.`,
      characters: ['Maya', 'King Neptune', 'Dolly the Dolphin'],
      educationalTopics: ['Ocean Life', 'Environmental Care', 'Teamwork'],
      readingLevel: 'Intermediate',
      isFavorite: false
    },
    {
      id: 3,
      title: "Jungle Safari Mystery",
      coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      createdDate: new Date('2024-01-08'),
      childAge: 7,
      theme: 'jungle',
      readingProgress: 45,
      totalPages: 10,
      currentPage: 4,
      isCompleted: false,
      readCount: 2,
      lastRead: new Date('2024-01-16'),
      description: `Follow Alex on a thrilling jungle adventure where every tree holds a secret and every animal has a story to tell.`,
      characters: ['Alex', 'Mango the Monkey', 'Wise Owl'],
      educationalTopics: ['Wildlife', 'Problem Solving', 'Nature Conservation'],
      readingLevel: 'Beginner',
      isFavorite: true
    },
    {
      id: 4,
      title: "The Magic Castle",
      coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      createdDate: new Date('2024-01-05'),
      childAge: 5,
      theme: 'fairy-tale',
      readingProgress: 70,
      totalPages: 8,
      currentPage: 6,
      isCompleted: false,
      readCount: 7,
      lastRead: new Date('2024-01-19'),
      description: `Enter a world of magic and wonder where Princess Lily must solve riddles and overcome challenges to save her kingdom.`,
      characters: ['Princess Lily', 'Dragon Friend', 'Wizard Merlin'],
      educationalTopics: ['Problem Solving', 'Kindness', 'Perseverance'],
      readingLevel: 'Beginner',
      isFavorite: false
    },
    {
      id: 5,
      title: "Robot Friends Forever",
      coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      createdDate: new Date('2024-01-03'),
      childAge: 9,
      theme: 'science',
      readingProgress: 30,
      totalPages: 14,
      currentPage: 4,
      isCompleted: false,
      readCount: 1,
      lastRead: new Date('2024-01-15'),
      description: `Join Sam in a futuristic world where robots and humans work together to solve problems and build a better tomorrow.`,
      characters: ['Sam', 'Robo-Buddy', 'Dr. Tech'],
      educationalTopics: ['Technology', 'Friendship', 'Innovation'],
      readingLevel: 'Advanced',
      isFavorite: true
    },
    {
      id: 6,
      title: "The Time Travel Adventure",
      coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      createdDate: new Date('2024-01-01'),
      childAge: 10,
      theme: 'adventure',
      readingProgress: 100,
      totalPages: 18,
      currentPage: 18,
      isCompleted: true,
      readCount: 4,
      lastRead: new Date('2024-01-12'),
      description: `Travel through time with Jake as he visits different eras, meets historical figures, and learns valuable lessons about history and courage.`,
      characters: ['Jake', 'Time Guardian', 'Historical Heroes'],
      educationalTopics: ['History', 'Time Concepts', 'Cultural Awareness'],
      readingLevel: 'Advanced',
      isFavorite: false
    }
  ];

  // Mock collections
  const mockCollections = [
    {
      id: 1,
      name: 'Favorites',
      storyIds: [1, 3, 5],
      color: 'primary',
      icon: 'Heart'
    },
    {
      id: 2,
      name: 'Adventure Stories',
      storyIds: [1, 3, 6],
      color: 'secondary',
      icon: 'Map'
    },
    {
      id: 3,
      name: 'Educational',
      storyIds: [2, 5, 6],
      color: 'accent',
      icon: 'BookOpen'
    }
  ];

  useEffect(() => {
    setStories(mockStories);
    setCollections(mockCollections);
  }, []);

  useEffect(() => {
    let filtered = [...stories];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(story =>
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.characters.some(char => char.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply filters
    if (filters.ageRange !== 'all') {
      const [min, max] = filters.ageRange.split('-').map(Number);
      filtered = filtered.filter(story => story.childAge >= min && story.childAge <= max);
    }

    if (filters.theme !== 'all') {
      filtered = filtered.filter(story => story.theme === filters.theme);
    }

    if (filters.readingStatus !== 'all') {
      if (filters.readingStatus === 'completed') {
        filtered = filtered.filter(story => story.isCompleted);
      } else if (filters.readingStatus === 'in-progress') {
        filtered = filtered.filter(story => !story.isCompleted && story.readingProgress > 0);
      } else if (filters.readingStatus === 'unread') {
        filtered = filtered.filter(story => story.readingProgress === 0);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdDate) - new Date(a.createdDate);
        case 'oldest':
          return new Date(a.createdDate) - new Date(b.createdDate);
        case 'most-read':
          return b.readCount - a.readCount;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'progress':
          return b.readingProgress - a.readingProgress;
        default:
          return 0;
      }
    });

    setFilteredStories(filtered);
  }, [stories, searchQuery, filters, sortBy]);

  const handleStoryAction = (action, story) => {
    switch (action) {
      case 'read': navigate('/interactive-story-reader', { state: { story } });
        break;
      case 'edit': navigate('/story-creation-wizard', { state: { editStory: story } });
        break;
      case 'share':
        handleShareStory(story);
        break;
      case 'delete':
        handleDeleteStory(story);
        break;
      case 'duplicate':
        handleDuplicateStory(story);
        break;
      case 'download':
        handleDownloadStory(story);
        break;
      default:
        break;
    }
  };

  const handleShareStory = (story) => {
    const shareData = {
      title: story.title,
      text: `Check out this amazing story: ${story.title}`,
      url: `${window.location.origin}/story/${story.id}`
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert('Story link copied to clipboard!');
    }
  };

  const handleDeleteStory = (story) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${story.title}"? This action cannot be undone.`);
    if (confirmDelete) {
      setStories(prev => prev.filter(s => s.id !== story.id));
      setSelectedStories(prev => prev.filter(id => id !== story.id));
    }
  };

  const handleDuplicateStory = (story) => {
    const duplicatedStory = {
      ...story,
      id: Date.now(),
      title: `${story.title} (Copy)`,
      createdDate: new Date(),
      readingProgress: 0,
      currentPage: 1,
      isCompleted: false,
      readCount: 0,
      lastRead: null
    };
    setStories(prev => [duplicatedStory, ...prev]);
  };

  const handleDownloadStory = (story) => {
    // Mock download functionality
    alert(`Downloading "${story.title}" as PDF...`);
  };

  const handleQuickAction = (event, story) => {
    event.preventDefault();
    event.stopPropagation();
    
    const rect = event.currentTarget.getBoundingClientRect();
    setQuickActionMenu({
      isOpen: true,
      position: { x: rect.right, y: rect.top },
      story
    });
  };

  const handleStorySelect = (storyId) => {
    setSelectedStories(prev => {
      if (prev.includes(storyId)) {
        return prev.filter(id => id !== storyId);
      } else {
        return [...prev, storyId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedStories.length === filteredStories.length) {
      setSelectedStories([]);
    } else {
      setSelectedStories(filteredStories.map(story => story.id));
    }
  };

  const handleBulkAction = (action) => {
    const selectedStoryObjects = stories.filter(story => selectedStories.includes(story.id));
    
    switch (action) {
      case 'delete':
        const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedStories.length} stories? This action cannot be undone.`);
        if (confirmDelete) {
          setStories(prev => prev.filter(story => !selectedStories.includes(story.id)));
          setSelectedStories([]);
        }
        break;
      case 'download':
        alert(`Downloading ${selectedStories.length} stories as PDF...`);
        break;
      case 'add-to-collection':
        // Handle adding to collection
        break;
      default:
        break;
    }
  };

  const featuredStories = stories.filter(story => story.isFavorite || story.readCount > 3).slice(0, 3);

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-heading text-text-primary mb-2">
                Story Library
              </h1>
              <p className="text-text-secondary">
                Manage and organize your collection of {stories.length} magical stories
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <button
                onClick={() => navigate('/story-creation-wizard')}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook hover:scale-105 storybook-transition shadow-storybook"
              >
                <Icon name="Plus" size={20} />
                <span>Create New Story</span>
              </button>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1 max-w-md">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search stories, characters, or themes..."
              />
            </div>
            
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-surface rounded-storybook p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-storybook storybook-transition ${
                    viewMode === 'grid' ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name="Grid3X3" size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-storybook storybook-transition ${
                    viewMode === 'list' ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name="List" size={18} />
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-surface border border-primary-200 rounded-storybook text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="most-read">Most Read</option>
                <option value="alphabetical">A-Z</option>
                <option value="progress">By Progress</option>
              </select>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-storybook storybook-transition ${
                  showFilters ? 'bg-primary text-white' : 'bg-surface text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name="Filter" size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-6">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              onClose={() => setShowFilters(false)}
            />
          </div>
        )}

        {/* Featured Section */}
        {featuredStories.length > 0 && (
          <div className="mb-8">
            <FeaturedSection
              stories={featuredStories}
              onStoryClick={(story) => navigate('/interactive-story-reader', { state: { story } })}
              onQuickAction={handleQuickAction}
            />
          </div>
        )}

        {/* Bulk Actions */}
        {selectedStories.length > 0 && (
          <div className="mb-6">
            <BulkActions
              selectedCount={selectedStories.length}
              totalCount={filteredStories.length}
              onSelectAll={handleSelectAll}
              onBulkAction={handleBulkAction}
              onClearSelection={() => setSelectedStories([])}
            />
          </div>
        )}

        {/* Stories Grid/List */}
        <div className="mb-8">
          {filteredStories.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-surface rounded-full flex items-center justify-center">
                <Icon name="BookOpen" size={32} className="text-text-secondary" />
              </div>
              <h3 className="text-lg font-heading text-text-primary mb-2">
                {searchQuery || Object.values(filters).some(f => f !== 'all') 
                  ? 'No stories match your search' :'No stories yet'
                }
              </h3>
              <p className="text-text-secondary mb-4">
                {searchQuery || Object.values(filters).some(f => f !== 'all')
                  ? 'Try adjusting your search or filters' :'Create your first magical story to get started'
                }
              </p>
              <button
                onClick={() => navigate('/story-creation-wizard')}
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook hover:scale-105 storybook-transition shadow-storybook"
              >
                Create Your First Story
              </button>
            </div>
          ) : (
            <div className={`
              ${viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :'space-y-4'
              }
            `}>
              {filteredStories.map((story) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  viewMode={viewMode}
                  isSelected={selectedStories.includes(story.id)}
                  onSelect={() => handleStorySelect(story.id)}
                  onClick={() => navigate('/interactive-story-reader', { state: { story } })}
                  onQuickAction={handleQuickAction}
                />
              ))}
            </div>
          )}
        </div>

        {/* Collections Section */}
        <div className="mb-8">
          <CollectionManager
            collections={collections}
            stories={stories}
            onCollectionClick={(collection) => {
              // Filter stories by collection
              const collectionStories = stories.filter(story => 
                collection.storyIds.includes(story.id)
              );
              setFilteredStories(collectionStories);
            }}
          />
        </div>
      </div>

      {/* Quick Action Menu */}
      <QuickActionMenu
        isOpen={quickActionMenu.isOpen}
        onClose={() => setQuickActionMenu({ ...quickActionMenu, isOpen: false })}
        position={quickActionMenu.position}
        story={quickActionMenu.story}
        onRead={(story) => handleStoryAction('read', story)}
        onEdit={(story) => handleStoryAction('edit', story)}
        onShare={(story) => handleStoryAction('share', story)}
        onDelete={(story) => handleStoryAction('delete', story)}
        onDuplicate={(story) => handleStoryAction('duplicate', story)}
        onDownload={(story) => handleStoryAction('download', story)}
      />
    </div>
  );
};

export default StoryLibraryManagement;