import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';
import openaiService from 'services/openaiService';
import ApiKeyInput from 'components/ui/ApiKeyInput';

import ProgressAnimation from './components/ProgressAnimation';
import StoryPreview from './components/StoryPreview';
import BackgroundMusicControls from './components/BackgroundMusicControls';

const StoryGenerationProgress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [generatedStory, setGeneratedStory] = useState(null);
  const [error, setError] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [needsApiKey, setNeedsApiKey] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);

  // Get story data from navigation state
  const storyData = location.state?.storyData || {
    title: "The Magical Adventure",
    character: { name: "Alex" },
    theme: "Fantasy",
    age: "6-8"
  };

  const generationStages = [
    {
      id: 1,
      title: "Creating your character...",
      description: "Bringing your hero to life with magical details",
      duration: 2000,
      icon: "User"
    },
    {
      id: 2,
      title: "Writing your adventure...",
      description: "Crafting an exciting story just for you",
      duration: 8000,
      icon: "PenTool"
    },
    {
      id: 3,
      title: "Illustrating magical moments...",
      description: "Painting beautiful pictures for your story",
      duration: 15000,
      icon: "Palette"
    },
    {
      id: 4,
      title: "Adding finishing touches...",
      description: "Making everything perfect and ready to read",
      duration: 2000,
      icon: "Sparkles"
    }
  ];

  useEffect(() => {
    // Check if we have API key on mount
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey || apiKey === 'your-openai-api-key-here') {
      setNeedsApiKey(true);
    } else {
      try {
        openaiService.initialize(apiKey);
        startStoryGeneration();
      } catch (error) {
        setNeedsApiKey(true);
      }
    }
  }, []);

  const handleApiKeySubmit = async (apiKey) => {
    try {
      openaiService.initialize(apiKey);
      setNeedsApiKey(false);
      setError(null);
      startStoryGeneration();
    } catch (error) {
      setError(error.message);
    }
  };

  const startStoryGeneration = async () => {
    setIsGenerating(true);
    setError(null);
    
    let progressInterval;
    
    try {
      // Stage 1: Character creation (simulated)
      setCurrentStage(0);
      progressInterval = createProgressInterval(0, 10, 2000);
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Stage 2: Story generation
      setCurrentStage(1);
      clearInterval(progressInterval);
      progressInterval = createProgressInterval(10, 50, 8000);
      
      const story = await openaiService.generateStory(storyData);
      setGeneratedStory(story);
      setShowPreview(true);
      
      // Stage 3: Image generation
      setCurrentStage(2);
      clearInterval(progressInterval);
      progressInterval = createProgressInterval(50, 90, 15000);
      
      // Generate images for each page
      const imagePrompts = story.pages.map(page => page.imagePrompt);
      const images = await openaiService.generateStoryImages(imagePrompts, {
        ageGroup: storyData.age,
        theme: storyData.theme,
        character: storyData.character?.name
      });
      
      setGeneratedImages(images);
      
      // Combine story with images
      const completeStory = {
        ...story,
        pages: story.pages.map((page, index) => ({
          ...page,
          imageUrl: images[index]?.url || null,
          imageError: images[index]?.error || null
        }))
      };
      
      setGeneratedStory(completeStory);

      // Stage 4: Finishing touches
      setCurrentStage(3);
      clearInterval(progressInterval);
      progressInterval = createProgressInterval(90, 100, 2000);
      await new Promise(resolve => setTimeout(resolve, 2000));

      clearInterval(progressInterval);
      setProgress(100);
      
      // Navigate to story reader
      setTimeout(() => {
        navigate('/interactive-story-reader', { 
          state: { story: completeStory }
        });
      }, 1500);

    } catch (error) {
      console.error('Story generation error:', error);
      setError(error.message || 'Failed to generate story. Please try again.');
      if (progressInterval) clearInterval(progressInterval);
    } finally {
      setIsGenerating(false);
    }
  };

  const createProgressInterval = (startProgress, endProgress, duration) => {
    const increment = (endProgress - startProgress) / (duration / 100);
    let currentProgress = startProgress;
    
    return setInterval(() => {
      currentProgress += increment;
      if (currentProgress <= endProgress) {
        setProgress(Math.min(currentProgress, endProgress));
      }
    }, 100);
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm('Are you sure you want to cancel story generation? Your progress will be lost.');
    if (confirmCancel) {
      navigate('/story-creation-wizard');
    }
  };

  const handleRetry = () => {
    setError(null);
    setProgress(0);
    setCurrentStage(0);
    setShowPreview(false);
    setGeneratedStory(null);
    setGeneratedImages([]);
    
    if (openaiService.isInitialized()) {
      startStoryGeneration();
    } else {
      setNeedsApiKey(true);
    }
  };

  const getTimeRemaining = () => {
    if (progress < 25) return "Just getting started...";
    if (progress < 50) return "Halfway there!";
    if (progress < 75) return "Almost ready!";
    if (progress < 95) return "Just a few more magical moments!";
    return "Ready to read!";
  };

  // Show API key input if needed
  if (needsApiKey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center px-4 pt-16">
        <div className="max-w-md mx-auto">
          <ApiKeyInput 
            onApiKeySubmit={handleApiKeySubmit}
            isLoading={isGenerating}
            error={error}
          />
        </div>
      </div>
    );
  }

  if (error && !isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center px-4 pt-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-error-100 rounded-full flex items-center justify-center">
            <Icon name="AlertCircle" size={48} className="text-error" />
          </div>
          <h2 className="text-2xl font-heading text-text-primary mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-text-secondary mb-2">
            {error}
          </p>
          <p className="text-text-secondary mb-6">
            Don't worry! Sometimes magic needs a little extra time. Let's try creating your story again.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleRetry}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook hover:scale-105 storybook-transition shadow-storybook"
            >
              <Icon name="RefreshCw" size={20} />
              <span>Try Again</span>
            </button>
            <button
              onClick={() => navigate('/story-creation-wizard')}
              className="px-6 py-3 bg-surface text-text-primary border border-primary-200 rounded-storybook hover:bg-primary-50 storybook-transition"
            >
              Back to Creation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50 pt-16">
      {/* Minimal Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="BookHeart" size={20} color="white" />
              </div>
              <span className="text-xl font-heading text-primary">StoryMagic</span>
            </div>
            <button
              onClick={handleCancel}
              className="text-text-secondary hover:text-text-primary storybook-transition"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-heading text-text-primary mb-4">
              Creating Your Magical Story
            </h1>
            <p className="text-lg text-text-secondary mb-6">
              {generationStages[currentStage]?.description || "Preparing your adventure..."}
            </p>
            
            {/* Progress Bar */}
            <div className="max-w-md mx-auto mb-4">
              <div className="flex items-center justify-between text-sm text-text-secondary mb-2">
                <span>{Math.round(progress)}% Complete</span>
                <span>{getTimeRemaining()}</span>
              </div>
              <div className="w-full h-3 bg-surface rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-primary via-accent to-secondary rounded-full storybook-transition-slow relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                </div>
              </div>
            </div>

            <p className="text-primary font-medium">
              {generationStages[currentStage]?.title || "Getting ready..."}
            </p>
          </div>

          {/* Main Content Area */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Animation Section */}
            <div className="order-2 lg:order-1">
              <ProgressAnimation 
                currentStage={currentStage}
                progress={progress}
                stageData={generationStages[currentStage]}
              />
            </div>

            {/* Preview Section */}
            <div className="order-1 lg:order-2">
              {showPreview ? (
                <StoryPreview 
                  story={generatedStory || mockGeneratedStory}
                  isComplete={!!generatedStory}
                />
              ) : (
                <div className="bg-surface/50 rounded-2xl p-8 text-center border border-primary-100">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon name="Eye" size={32} className="text-primary animate-pulse" />
                  </div>
                  <h3 className="text-lg font-heading text-text-primary mb-2">
                    Preview Coming Soon
                  </h3>
                  <p className="text-text-secondary">
                    Your story preview will appear here as we create your magical adventure
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Background Music Controls */}
          <div className="fixed bottom-6 right-6 z-40">
            <BackgroundMusicControls 
              isPlaying={isMusicPlaying}
              onToggle={() => setIsMusicPlaying(!isMusicPlaying)}
            />
          </div>

          {/* Floating Decorative Elements */}
          <div className="fixed top-1/4 left-8 opacity-20 animate-bounce">
            <Icon name="Star" size={24} className="text-secondary" />
          </div>
          <div className="fixed top-1/3 right-12 opacity-20 animate-pulse">
            <Icon name="Heart" size={20} className="text-accent" />
          </div>
          <div className="fixed bottom-1/4 left-16 opacity-20 animate-bounce" style={{ animationDelay: '1s' }}>
            <Icon name="Sparkles" size={28} className="text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryGenerationProgress;