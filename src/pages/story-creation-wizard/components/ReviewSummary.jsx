import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import openaiService from 'services/openaiService';
import ApiKeyInput from 'components/ui/ApiKeyInput';

const ReviewSummary = ({ formData, onEdit, onGenerate, meta }) => {
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKeyError, setApiKeyError] = useState(null);

  const handleGenerateStory = () => {
    // Check if OpenAI is initialized
    const envApiKey = import.meta.env.VITE_OPENAI_API_KEY;

    if (!envApiKey || envApiKey === 'your-openai-api-key-here' || !openaiService.isInitialized()) {
      setShowApiKeyInput(true);
      return;
    }

    // Proceed with generation
    onGenerate();
  };

  const handleApiKeySubmit = async (apiKey) => {
    try {
      openaiService.initialize(apiKey);
      setShowApiKeyInput(false);
      setApiKeyError(null);
      onGenerate();
    } catch (error) {
      setApiKeyError(error.message);
    }
  };

  const getAgeGroupLabel = (age) => {
    if (age === '1-3') return 'Toddler (1-3 years)';
    if (age === '4-5') return 'Preschooler (4-5 years)';
    if (age === '6-8') return 'Early Reader (6-8 years)';
    if (age === '9-12') return 'Advanced Reader (9-12 years)';
    return `${age} years old`;
  };

  const getThemeLabel = (themeId) => {
    const themes = {
      'space': 'Space Adventure',
      'underwater': 'Underwater World',
      'jungle': 'Jungle Safari',
      'fairy-tale': 'Fairy Tale Magic',
      'dinosaur': 'Dinosaur World',
      'superhero': 'Superhero Adventure',
      'farm': 'Farm Life',
      'pirate': 'Pirate Treasure'
    };
    return themes[themeId] || themeId;
  };

  const getPersonalityTraits = (traits) => {
    const traitLabels = {
      'brave': 'Brave',
      'kind': 'Kind',
      'curious': 'Curious',
      'funny': 'Funny',
      'smart': 'Smart',
      'creative': 'Creative',
      'loyal': 'Loyal',
      'adventurous': 'Adventurous'
    };
    return traits?.map((trait) => traitLabels[trait]).join(', ') || 'None selected';
  };

  const getSubjects = (subjects) => {
    const subjectLabels = {
      'science': 'Science',
      'math': 'Mathematics',
      'history': 'History',
      'geography': 'Geography',
      'social-skills': 'Social Skills',
      'creativity': 'Creativity & Arts'
    };
    return subjects?.map((subject) => subjectLabels[subject]).join(', ') || 'None selected';
  };

  const getMoralLessons = (lessons) => {
    const lessonLabels = {
      'honesty': 'Honesty',
      'kindness': 'Kindness',
      'courage': 'Courage',
      'perseverance': 'Perseverance',
      'friendship': 'Friendship',
      'responsibility': 'Responsibility'
    };
    return lessons?.map((lesson) => lessonLabels[lesson]).join(', ') || 'None selected';
  };

  const getVocabularyLevel = (level) => {
    const levels = {
      'simple': 'Simple Words',
      'age-appropriate': 'Age Appropriate',
      'challenging': 'Challenging'
    };
    return levels[level] || level;
  };

  // Show API key input if needed
  if (showApiKeyInput) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-heading text-text-primary mb-4">
            Almost Ready to Create!
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            To generate your personalized story with AI, we need your OpenAI API key.
          </p>
        </div>

        <ApiKeyInput
          onApiKeySubmit={handleApiKeySubmit}
          error={apiKeyError} />


        <div className="text-center">
          <button
            onClick={() => setShowApiKeyInput(false)}
            className="text-text-secondary hover:text-text-primary storybook-transition">

            ← Back to Review
          </button>
        </div>
      </div>);

  }

  const summaryItems = [
  {
    step: 1,
    title: 'Age Group',
    value: getAgeGroupLabel(formData.age),
    icon: 'User',
    color: 'text-primary'
  },
  {
    step: 2,
    title: 'Story Theme',
    value: getThemeLabel(formData.theme),
    icon: 'Sparkles',
    color: 'text-secondary'
  },
  {
    step: 3,
    title: 'Main Character',
    value: formData.character?.name || 'Unnamed Character',
    subtitle: getPersonalityTraits(formData.character?.personality),
    icon: 'Heart',
    color: 'text-accent'
  },
  {
    step: 4,
    title: 'Story Length',
    value: `${formData.pageCount} pages`,
    subtitle: formData.storyDescription ? `"${formData.storyDescription.substring(0, 100)}..."` : '',
    icon: 'BookOpen',
    color: 'text-success'
  },
  {
    step: 5,
    title: 'Educational Elements',
    value: getVocabularyLevel(formData.educationalElements?.vocabularyLevel),
    subtitle: `Subjects: ${getSubjects(formData.educationalElements?.subjectIntegration)}`,
    icon: 'GraduationCap',
    color: 'text-warning'
  }];


  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-heading text-text-primary mb-4">
          Review Your Story
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Take a final look at your story settings before we create your personalized adventure. You can edit any section if needed.
        </p>
      </div>

      {/* Story Summary Cards */}
      <div className="space-y-4">
        {summaryItems.map((item) =>
        <div
          key={item.step}
          className="bg-surface p-6 rounded-2xl border border-primary-100 hover:shadow-storybook storybook-transition">

            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className={`
                  w-12 h-12 rounded-storybook bg-gradient-to-br from-primary-100 to-secondary-100
                  flex items-center justify-center
                `}>
                  <Icon name={item.icon} size={20} className={item.color} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-heading text-text-primary mb-1">
                    {item.title}
                  </h3>
                  <p className="text-text-primary font-medium mb-1">
                    {item.value}
                  </p>
                  {item.subtitle &&
                <p className="text-sm text-text-secondary">
                      {item.subtitle}
                    </p>
                }
                </div>
              </div>
              <button
              onClick={() => onEdit(item.step)}
              className="flex items-center space-x-1 px-3 py-2 text-primary hover:bg-primary-50 rounded-storybook storybook-transition">

                <Icon name="Edit3" size={16} />
                <span className="text-sm">Edit</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Story Preview */}
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 rounded-2xl border border-primary-200">
        <h3 className="text-2xl font-heading text-text-primary mb-6 text-center">
          Story Preview
        </h3>
        
        <div className="bg-background p-6 rounded-storybook shadow-storybook">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center shadow-storybook-lg">
              <Icon name="BookHeart" size={32} color="white" />
            </div>
            <h4 className="text-xl font-heading text-primary mb-2">
              {formData.character?.name}'s {getThemeLabel(formData.theme)}
            </h4>
            <p className="text-text-secondary">
              A personalized story for {getAgeGroupLabel(formData.age)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h5 className="font-medium text-text-primary mb-2">Story Details:</h5>
              <ul className="space-y-1 text-text-secondary">
                <li>• {formData.pageCount} illustrated pages</li>
                <li>• {getVocabularyLevel(formData.educationalElements?.vocabularyLevel)} vocabulary</li>
                <li>• AI-generated illustrations</li>
                <li>• Interactive reading experience</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-text-primary mb-2">Learning Elements:</h5>
              <ul className="space-y-1 text-text-secondary">
                {formData.educationalElements?.subjectIntegration?.length > 0 &&
                <li>• Subject integration: {getSubjects(formData.educationalElements.subjectIntegration)}</li>
                }
                {formData.educationalElements?.moralLessons?.length > 0 &&
                <li>• Moral lessons: {getMoralLessons(formData.educationalElements.moralLessons)}</li>
                }
                <li>• Age-appropriate vocabulary</li>
                <li>• Positive role models</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* AI Generation Info */}
      <div className="bg-gradient-to-r from-info-50 to-primary-50 p-6 rounded-2xl border border-info-200">
        <div className="flex items-start space-x-3">
          <Icon name="Sparkles" size={24} className="text-primary mt-1" />
          <div>
            <h4 className="font-medium text-text-primary mb-2">
              AI-Powered Story Creation
            </h4>
            <p className="text-text-secondary text-sm mb-3">
              Your personalized story will be created using advanced AI technology. This process includes:
            </p>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Custom story writing with GPT-3.5</li>
              <li>• Unique illustrations with DALL-E</li>
              <li>• Age-appropriate content and vocabulary</li>
              <li>• Educational elements integration</li>
            </ul>
            <p className="text-xs text-text-secondary mt-3">
              Generation typically takes 2-4 minutes depending on story length and complexity.
            </p>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="text-center">
        <button
          onClick={handleGenerateStory}
          className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-success to-accent text-white text-lg font-medium rounded-2xl hover:scale-105 storybook-transition shadow-storybook-lg">

          <Icon name="Wand2" size={24} />
          <span>Create My Story with AI</span>
          <Icon name="ArrowRight" size={20} />
        </button>
        <p className="text-sm text-text-secondary mt-3">
          This will start the AI generation process
        </p>
      </div>
    </div>);

};

export default ReviewSummary;