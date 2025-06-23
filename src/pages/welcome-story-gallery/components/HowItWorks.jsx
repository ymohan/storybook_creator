import React from 'react';
import Icon from 'components/AppIcon';

const HowItWorks = ({ onCreateStory }) => {
  const steps = [
    {
      id: 1,
      title: "Choose Your Theme",
      description: "Select from magical themes like space adventures, underwater kingdoms, or enchanted forests.",
      icon: "Palette",
      color: "text-primary",
      bgColor: "bg-primary-50"
    },
    {
      id: 2,
      title: "Create Characters",
      description: "Design unique characters with custom names, appearances, and personality traits.",
      icon: "Users",
      color: "text-secondary",
      bgColor: "bg-secondary-50"
    },
    {
      id: 3,
      title: "Set the Scene",
      description: "Pick the perfect setting and add personal touches to make the story uniquely yours.",
      icon: "MapPin",
      color: "text-accent",
      bgColor: "bg-accent-50"
    },
    {
      id: 4,
      title: "AI Magic Happens",
      description: "Our AI creates a personalized story with beautiful illustrations tailored to your choices.",
      icon: "Sparkles",
      color: "text-warning",
      bgColor: "bg-warning-50"
    },
    {
      id: 5,
      title: "Interactive Reading",
      description: "Enjoy your story with audio narration, interactive elements, and page-turning animations.",
      icon: "BookOpen",
      color: "text-success",
      bgColor: "bg-success-50"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading text-text-primary mb-4">
            How It Works
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Creating your personalized story is simple and magical. Follow these easy steps to bring your imagination to life.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mb-4 shadow-storybook`}>
                      <Icon name={step.icon} size={28} className={step.color} />
                    </div>
                    <div className="text-center max-w-48">
                      <h3 className="text-lg font-heading text-text-primary mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-primary-200 to-secondary-200 mx-8" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet Cards */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <div key={step.id} className="bg-surface rounded-2xl p-6 shadow-storybook hover:shadow-storybook-lg storybook-transition">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${step.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Icon name={step.icon} size={20} className={step.color} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-text-secondary">Step {step.id}</span>
                    </div>
                    <h3 className="text-lg font-heading text-text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button
            onClick={onCreateStory}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook hover:scale-105 storybook-transition shadow-storybook text-lg font-medium"
          >
            <Icon name="ArrowRight" size={24} />
            <span>Start Your Story Journey</span>
          </button>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Zap" size={28} className="text-primary" />
            </div>
            <h3 className="text-lg font-heading text-text-primary mb-2">
              Lightning Fast
            </h3>
            <p className="text-sm text-text-secondary">
              Create complete stories in just minutes with our advanced AI technology
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Heart" size={28} className="text-secondary" />
            </div>
            <h3 className="text-lg font-heading text-text-primary mb-2">
              Personalized
            </h3>
            <p className="text-sm text-text-secondary">
              Every story is unique and tailored to your child's interests and preferences
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={28} className="text-accent" />
            </div>
            <h3 className="text-lg font-heading text-text-primary mb-2">
              Safe & Educational
            </h3>
            <p className="text-sm text-text-secondary">
              All content is age-appropriate with built-in educational elements and moral lessons
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;