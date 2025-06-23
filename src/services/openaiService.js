import OpenAI from 'openai';

/**
 * OpenAI Service for StoryBook Creator
 * Handles story generation and image creation using OpenAI API
 */
class OpenAIService {
  constructor() {
    this.client = null;
  }

  /**
   * Initialize OpenAI client with API key
   * @param {string} apiKey - OpenAI API key
   */
  initialize(apiKey) {
    if (!apiKey || apiKey.trim() === '' || apiKey === 'your-openai-api-key-here') {
      throw new Error('Please provide a valid OpenAI API key');
    }

    this.client = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true, // Required for client-side usage in React
    });
  }

  /**
   * Check if OpenAI client is initialized
   */
  isInitialized() {
    return this.client !== null;
  }

  /**
   * Generate a personalized children's story using GPT-3.5
   * @param {Object} storyData - Story parameters
   * @returns {Promise<Object>} Generated story with structured format
   */
  async generateStory(storyData) {
    if (!this.isInitialized()) {
      throw new Error('OpenAI service not initialized. Please provide an API key.');
    }

    try {
      const prompt = this.createStoryPrompt(storyData);
      
      const response = await this.client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a creative children\'s story writer who creates engaging, age-appropriate, and educational stories. Always ensure content is safe, positive, and suitable for children.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'children_story_response',
            schema: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                pages: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      pageNumber: { type: 'number' },
                      text: { type: 'string' },
                      imagePrompt: { type: 'string' }
                    },
                    required: ['pageNumber', 'text', 'imagePrompt']
                  }
                },
                summary: { type: 'string' },
                moralLesson: { type: 'string' },
                readingTime: { type: 'string' },
                vocabularyWords: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      word: { type: 'string' },
                      definition: { type: 'string' }
                    },
                    required: ['word', 'definition']
                  }
                }
              },
              required: ['title', 'pages', 'summary', 'moralLesson', 'readingTime', 'vocabularyWords'],
              additionalProperties: false
            }
          }
        },
        temperature: 0.8,
        max_tokens: 3000
      });

      const generatedStory = JSON.parse(response.choices[0].message.content);
      
      // Add metadata
      return {
        ...generatedStory,
        id: `story-${Date.now()}`,
        createdAt: new Date().toISOString(),
        character: storyData.character,
        theme: storyData.theme,
        ageGroup: storyData.age,
        pageCount: generatedStory.pages.length
      };

    } catch (error) {
      console.error('Error generating story:', error);
      throw new Error(`Failed to generate story: ${error.message}`);
    }
  }

  /**
   * Generate an illustration for a story page using DALL-E
   * @param {string} imagePrompt - Description for the image
   * @param {Object} storyContext - Additional context about the story
   * @returns {Promise<string>} URL of the generated image
   */
  async generateImage(imagePrompt, storyContext = {}) {
    if (!this.isInitialized()) {
      throw new Error('OpenAI service not initialized. Please provide an API key.');
    }

    try {
      // Enhance the prompt for children's book style
      const enhancedPrompt = this.enhanceImagePrompt(imagePrompt, storyContext);

      const response = await this.client.images.generate({
        model: 'dall-e-3',
        prompt: enhancedPrompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        style: 'vivid'
      });

      return response.data[0].url;

    } catch (error) {
      console.error('Error generating image:', error);
      throw new Error(`Failed to generate image: ${error.message}`);
    }
  }

  /**
   * Generate multiple images for story pages
   * @param {Array} imagePrompts - Array of image descriptions
   * @param {Object} storyContext - Story context
   * @returns {Promise<Array>} Array of generated image URLs
   */
  async generateStoryImages(imagePrompts, storyContext = {}) {
    const images = [];
    
    // Generate images sequentially to avoid rate limits
    for (let i = 0; i < imagePrompts.length; i++) {
      try {
        const imageUrl = await this.generateImage(imagePrompts[i], storyContext);
        images.push({
          pageNumber: i + 1,
          url: imageUrl,
          prompt: imagePrompts[i]
        });
        
        // Add small delay between requests
        if (i < imagePrompts.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error(`Error generating image for page ${i + 1}:`, error);
        images.push({
          pageNumber: i + 1,
          url: null,
          error: error.message,
          prompt: imagePrompts[i]
        });
      }
    }
    
    return images;
  }

  /**
   * Create a detailed prompt for story generation
   * @param {Object} storyData - Story parameters
   * @returns {string} Formatted prompt
   */
  createStoryPrompt(storyData) {
    const {
      age,
      theme,
      character,
      storyDescription,
      pageCount,
      educationalElements
    } = storyData;

    const ageGroup = this.getAgeGroupDescription(age);
    const vocabularyLevel = educationalElements?.vocabularyLevel || 'age-appropriate';
    const subjects = educationalElements?.subjectIntegration || [];
    const moralLessons = educationalElements?.moralLessons || [];

    return `Create a personalized children's story with the following specifications:

CHARACTER: ${character?.name || 'The main character'} who is ${character?.personality?.join(', ') || 'brave and kind'}
THEME: ${theme} adventure
TARGET AGE: ${ageGroup}
PAGES: ${pageCount} pages (each page should have 1-3 sentences appropriate for the age group)
VOCABULARY: ${vocabularyLevel} level
STORY DESCRIPTION: ${storyDescription || 'An exciting adventure story'}

${subjects.length > 0 ? `EDUCATIONAL INTEGRATION: Subtly incorporate these subjects: ${subjects.join(', ')}` : ''}
${moralLessons.length > 0 ? `MORAL LESSONS: Include themes about: ${moralLessons.join(', ')}` : ''}

REQUIREMENTS:
- Make the story engaging and age-appropriate for ${ageGroup}
- Each page should have a clear, vivid scene perfect for illustration
- Include diverse characters and positive role models
- Ensure the story has a clear beginning, middle, and end
- Create detailed image prompts for each page that describe the scene in a way suitable for children's book illustrations
- Include 5-8 vocabulary words appropriate for the age group with simple definitions
- Provide an estimated reading time
- Include a meaningful moral lesson or positive message

The story should be wholesome, educational, and inspire imagination while being perfectly safe for children.`;
  }

  /**
   * Enhance image prompts for children's book style
   * @param {string} prompt - Original image prompt
   * @param {Object} context - Story context
   * @returns {string} Enhanced prompt
   */
  enhanceImagePrompt(prompt, context) {
    const styleElements = [
      'children\'s book illustration style',
      'bright and colorful',
      'friendly and approachable characters',
      'soft rounded shapes',
      'warm lighting',
      'safe and cheerful environment'
    ];

    const ageSpecificStyles = {
      '1-3': 'simple shapes, large friendly characters, very bright colors',
      '4-5': 'detailed but not complex, expressive characters, vibrant scenes',
      '6-8': 'rich details, dynamic scenes, adventure elements',
      '9-12': 'sophisticated illustrations, complex scenes, realistic elements'
    };

    const ageStyle = ageSpecificStyles[context.ageGroup] || 'age-appropriate illustration style';
    
    return `${prompt}, ${styleElements.join(', ')}, ${ageStyle}, high quality digital art, suitable for children, no scary or inappropriate elements`;
  }

  /**
   * Get age group description for prompts
   * @param {string} age - Age selector value
   * @returns {string} Age group description
   */
  getAgeGroupDescription(age) {
    const ageGroups = {
      '1-3': 'toddlers (very simple language, basic concepts)',
      '4-5': 'preschoolers (simple sentences, familiar concepts)',
      '6-8': 'early readers (short paragraphs, adventure themes)',
      '9-12': 'advanced readers (complex sentences, detailed stories)'
    };
    
    return ageGroups[age] || 'children';
  }

  /**
   * Validate API key format
   * @param {string} apiKey - API key to validate
   * @returns {boolean} Whether the key appears valid
   */
  static validateApiKey(apiKey) {
    return apiKey && 
           typeof apiKey === 'string' && 
           apiKey.trim().length > 0 && 
           apiKey.startsWith('sk-') &&
           apiKey !== 'your-openai-api-key-here';
  }
}

// Create singleton instance
const openaiService = new OpenAIService();

export default openaiService;