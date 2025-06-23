import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressNavigationBar from 'components/ui/ProgressNavigationBar';
import AgeSelector from './components/AgeSelector';
import ThemeSelector from './components/ThemeSelector';
import CharacterCreator from './components/CharacterCreator';
import StoryDetails from './components/StoryDetails';
import EducationalElements from './components/EducationalElements';
import ReviewSummary from './components/ReviewSummary';
import Icon from 'components/AppIcon';

const StoryCreationWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    age: null,
    theme: null,
    character: {
      name: '',
      appearance: {
        hair: null,
        clothing: null,
        accessories: null
      },
      personality: []
    },
    storyDescription: '',
    pageCount: 8,
    educationalElements: {
      moralLessons: false,
      vocabularyLevel: 'age-appropriate',
      subjectIntegration: []
    }
  });

  const totalSteps = 6;

  // Auto-save functionality
  useEffect(() => {
    const savedData = localStorage.getItem('storyWizardData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed.formData || formData);
        setCurrentStep(parsed.currentStep || 1);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('storyWizardData', JSON.stringify({
      formData,
      currentStep
    }));
  }, [formData, currentStep]);

  const updateFormData = (stepData) => {
    setFormData(prev => ({
      ...prev,
      ...stepData
    }));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return formData.age !== null;
      case 2:
        return formData.theme !== null;
      case 3:
        return formData.character.name.trim() !== '' && 
               formData.character.appearance.hair !== null &&
               formData.character.personality.length > 0;
      case 4:
        return formData.storyDescription.trim() !== '';
      case 5:
        return true; // Educational elements are optional
      case 6:
        return true; // Review step
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateCurrentStep() && currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (stepNumber) => {
    if (stepNumber < currentStep) {
      setCurrentStep(stepNumber);
    }
  };

  const handleGenerateStory = () => {
    // Clear saved data
    localStorage.removeItem('storyWizardData');
    // Navigate to generation progress
    navigate('/story-generation-progress', { state: { storyData: formData } });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AgeSelector
            selectedAge={formData.age}
            onAgeSelect={(age) => updateFormData({ age })}
          />
        );
      case 2:
        return (
          <ThemeSelector
            selectedTheme={formData.theme}
            onThemeSelect={(theme) => updateFormData({ theme })}
          />
        );
      case 3:
        return (
          <CharacterCreator
            character={formData.character}
            onCharacterUpdate={(character) => updateFormData({ character })}
          />
        );
      case 4:
        return (
          <StoryDetails
            storyDescription={formData.storyDescription}
            pageCount={formData.pageCount}
            onStoryDescriptionChange={(storyDescription) => updateFormData({ storyDescription })}
            onPageCountChange={(pageCount) => updateFormData({ pageCount })}
          />
        );
      case 5:
        return (
          <EducationalElements
            educationalElements={formData.educationalElements}
            onEducationalElementsChange={(educationalElements) => updateFormData({ educationalElements })}
          />
        );
      case 6:
        return (
          <ReviewSummary
            formData={formData}
            onEdit={(step) => setCurrentStep(step)}
            onGenerate={handleGenerateStory}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <ProgressNavigationBar
        currentStep={currentStep}
        totalSteps={totalSteps}
        onStepClick={handleStepClick}
        canNavigateBack={true}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-background rounded-2xl shadow-storybook-lg overflow-hidden">
          {/* Step Content */}
          <div className="p-6 md:p-8">
            {renderCurrentStep()}
          </div>

          {/* Navigation Footer */}
          <div className="bg-surface px-6 py-4 md:px-8 border-t border-primary-100">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`
                  flex items-center space-x-2 px-6 py-3 rounded-storybook storybook-transition
                  ${currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :'bg-background text-text-primary border border-primary-200 hover:bg-primary-50'
                  }
                `}
              >
                <Icon name="ChevronLeft" size={20} />
                <span>Back</span>
              </button>

              <div className="flex items-center space-x-4">
                {/* Save Progress */}
                <button
                  onClick={() => {
                    localStorage.setItem('storyWizardData', JSON.stringify({
                      formData,
                      currentStep
                    }));
                    alert('Progress saved!');
                  }}
                  className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-text-primary storybook-transition"
                >
                  <Icon name="Save" size={18} />
                  <span className="hidden sm:inline">Save Progress</span>
                </button>

                {currentStep < totalSteps ? (
                  <button
                    onClick={handleNext}
                    disabled={!validateCurrentStep()}
                    className={`
                      flex items-center space-x-2 px-6 py-3 rounded-storybook storybook-transition
                      ${validateCurrentStep()
                        ? 'bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 shadow-storybook'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }
                    `}
                  >
                    <span>Next</span>
                    <Icon name="ChevronRight" size={20} />
                  </button>
                ) : (
                  <button
                    onClick={handleGenerateStory}
                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-success to-accent text-white rounded-storybook hover:scale-105 storybook-transition shadow-storybook"
                  >
                    <Icon name="Sparkles" size={20} />
                    <span>Generate Story</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCreationWizard;