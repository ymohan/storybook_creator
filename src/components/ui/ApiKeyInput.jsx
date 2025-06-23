import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ApiKeyInput = ({ onApiKeySubmit, isLoading = false, error = null }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      return;
    }

    if (!apiKey.startsWith('sk-')) {
      return;
    }

    setIsValidating(true);
    try {
      await onApiKeySubmit(apiKey.trim());
    } finally {
      setIsValidating(false);
    }
  };

  const isValidFormat = apiKey.startsWith('sk-') && apiKey.length > 10;

  return (
    <div className="bg-background p-8 rounded-2xl shadow-storybook border border-primary-200">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
          <Icon name="Key" size={32} color="white" />
        </div>
        <h3 className="text-2xl font-heading text-text-primary mb-2">
          OpenAI API Key Required
        </h3>
        <p className="text-text-secondary">
          To create your magical story, please enter your OpenAI API key
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label className="block text-sm font-medium text-text-primary mb-2">
            OpenAI API Key
          </label>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className={`
                w-full px-4 py-3 pr-12 rounded-storybook border storybook-transition
                ${isValidFormat 
                  ? 'border-success bg-success-50 focus:border-success' :'border-gray-300 focus:border-primary'
                }
                focus:outline-none focus:ring-2 focus:ring-primary-200
              `}
              disabled={isLoading || isValidating}
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary storybook-transition"
              disabled={isLoading || isValidating}
            >
              <Icon name={showKey ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>
          {apiKey && !isValidFormat && (
            <p className="text-sm text-error mt-1 flex items-center space-x-1">
              <Icon name="AlertCircle" size={16} />
              <span>API key should start with 'sk-'</span>
            </p>
          )}
        </div>

        {error && (
          <div className="bg-error-50 border border-error-200 rounded-storybook p-3">
            <p className="text-sm text-error flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} />
              <span>{error}</span>
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={!isValidFormat || isLoading || isValidating}
          className={`
            w-full py-3 px-6 rounded-storybook font-medium storybook-transition
            ${isValidFormat && !isLoading && !isValidating
              ? 'bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 shadow-storybook'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {isValidating ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Validating...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Sparkles" size={20} />
              <span>Start Creating Stories</span>
            </div>
          )}
        </button>
      </form>

      <div className="mt-6 p-4 bg-info-50 rounded-storybook border border-info-200">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-info mt-0.5" />
          <div className="text-sm">
            <h4 className="font-medium text-text-primary mb-1">Need an API Key?</h4>
            <p className="text-text-secondary mb-2">
              Get your OpenAI API key from the OpenAI platform to start creating personalized stories.
            </p>
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-primary hover:text-secondary storybook-transition underline"
            >
              <span>Get API Key</span>
              <Icon name="ExternalLink" size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-text-secondary text-center">
        <p className="flex items-center justify-center space-x-1">
          <Icon name="Shield" size={14} />
          <span>Your API key is stored securely and used only for story generation</span>
        </p>
      </div>
    </div>
  );
};

export default ApiKeyInput;