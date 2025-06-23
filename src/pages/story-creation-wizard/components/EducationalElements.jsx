import React from 'react';
import Icon from 'components/AppIcon';

const EducationalElements = ({ educationalElements, onEducationalElementsChange }) => {
  const vocabularyLevels = [
    {
      id: 'simple',
      name: 'Simple Words',
      description: 'Basic vocabulary for early readers',
      icon: 'Baby',
      example: 'The cat sat on the mat.'
    },
    {
      id: 'age-appropriate',
      name: 'Age Appropriate',
      description: 'Vocabulary matching the selected age group',
      icon: 'BookOpen',
      example: 'The curious kitten explored the garden.'
    },
    {
      id: 'challenging',
      name: 'Challenging',
      description: 'Advanced words to expand vocabulary',
      icon: 'GraduationCap',
      example: 'The inquisitive feline investigated the botanical sanctuary.'
    }
  ];

  const subjectAreas = [
    {
      id: 'science',
      name: 'Science',
      description: 'Learn about nature, animals, and how things work',
      icon: 'Microscope',
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'math',
      name: 'Mathematics',
      description: 'Numbers, counting, shapes, and problem-solving',
      icon: 'Calculator',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'history',
      name: 'History',
      description: 'Stories from the past and different cultures',
      icon: 'Clock',
      color: 'from-amber-400 to-orange-500'
    },
    {
      id: 'geography',
      name: 'Geography',
      description: 'Explore different places and environments',
      icon: 'Globe',
      color: 'from-teal-400 to-cyan-500'
    },
    {
      id: 'social-skills',
      name: 'Social Skills',
      description: 'Friendship, sharing, and working together',
      icon: 'Users',
      color: 'from-pink-400 to-rose-500'
    },
    {
      id: 'creativity',
      name: 'Creativity & Arts',
      description: 'Imagination, music, and artistic expression',
      icon: 'Palette',
      color: 'from-purple-400 to-violet-500'
    }
  ];

  const moralLessons = [
    {
      id: 'honesty',
      name: 'Honesty',
      description: 'The importance of telling the truth',
      icon: 'Heart'
    },
    {
      id: 'kindness',
      name: 'Kindness',
      description: 'Being caring and helpful to others',
      icon: 'Smile'
    },
    {
      id: 'courage',
      name: 'Courage',
      description: 'Facing fears and standing up for what\'s right',
      icon: 'Shield'
    },
    {
      id: 'perseverance',
      name: 'Perseverance',
      description: 'Never giving up when things get difficult',
      icon: 'Target'
    },
    {
      id: 'friendship',
      name: 'Friendship',
      description: 'The value of good friends and loyalty',
      icon: 'Users'
    },
    {
      id: 'responsibility',
      name: 'Responsibility',
      description: 'Taking care of duties and being dependable',
      icon: 'CheckCircle'
    }
  ];

  const updateEducationalElements = (updates) => {
    onEducationalElementsChange({
      ...educationalElements,
      ...updates
    });
  };

  const toggleSubject = (subjectId) => {
    const currentSubjects = educationalElements.subjectIntegration || [];
    const updatedSubjects = currentSubjects.includes(subjectId)
      ? currentSubjects.filter(id => id !== subjectId)
      : [...currentSubjects, subjectId];
    
    updateEducationalElements({ subjectIntegration: updatedSubjects });
  };

  const toggleMoralLesson = (lessonId) => {
    const currentLessons = educationalElements.moralLessons || [];
    const updatedLessons = currentLessons.includes(lessonId)
      ? currentLessons.filter(id => id !== lessonId)
      : [...currentLessons, lessonId];
    
    updateEducationalElements({ moralLessons: updatedLessons });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-heading text-text-primary mb-4">
          Educational Elements
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Make your story both fun and educational! Choose learning elements that will help your child grow while enjoying their personalized adventure.
        </p>
      </div>

      {/* Vocabulary Level */}
      <div className="bg-surface p-6 rounded-2xl border border-primary-100">
        <h3 className="text-xl font-heading text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="BookOpen" size={24} className="text-primary" />
          <span>Vocabulary Level</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vocabularyLevels.map((level) => (
            <button
              key={level.id}
              onClick={() => updateEducationalElements({ vocabularyLevel: level.id })}
              className={`
                p-4 rounded-storybook border-2 storybook-transition hover:scale-105 text-left
                ${educationalElements.vocabularyLevel === level.id
                  ? 'border-primary bg-primary-50' :'border-primary-200 bg-background hover:border-primary-300'
                }
              `}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`
                  w-10 h-10 rounded-storybook flex items-center justify-center
                  ${educationalElements.vocabularyLevel === level.id
                    ? 'bg-primary text-white' :'bg-primary-100 text-primary'
                  }
                `}>
                  <Icon name={level.icon} size={18} />
                </div>
                <h4 className="font-medium text-text-primary">
                  {level.name}
                </h4>
              </div>
              <p className="text-sm text-text-secondary mb-3">
                {level.description}
              </p>
              <div className="p-2 bg-accent-50 rounded text-xs text-text-secondary italic">
                Example: "{level.example}"
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Subject Integration */}
      <div className="bg-surface p-6 rounded-2xl border border-primary-100">
        <h3 className="text-xl font-heading text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="GraduationCap" size={24} className="text-primary" />
          <span>Learning Subjects</span>
        </h3>
        
        <p className="text-text-secondary mb-4">
          Choose subjects to weave into your story for educational value:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjectAreas.map((subject) => (
            <button
              key={subject.id}
              onClick={() => toggleSubject(subject.id)}
              className={`
                p-4 rounded-storybook border-2 storybook-transition hover:scale-105 text-left
                ${educationalElements.subjectIntegration?.includes(subject.id)
                  ? 'border-primary bg-primary-50' :'border-primary-200 bg-background hover:border-primary-300'
                }
              `}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`
                  w-10 h-10 rounded-storybook bg-gradient-to-br ${subject.color}
                  flex items-center justify-center shadow-storybook
                `}>
                  <Icon name={subject.icon} size={18} color="white" />
                </div>
                <h4 className="font-medium text-text-primary">
                  {subject.name}
                </h4>
              </div>
              <p className="text-sm text-text-secondary">
                {subject.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Moral Lessons */}
      <div className="bg-surface p-6 rounded-2xl border border-primary-100">
        <h3 className="text-xl font-heading text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="Heart" size={24} className="text-primary" />
          <span>Moral Lessons</span>
        </h3>
        
        <p className="text-text-secondary mb-4">
          Select important values and life lessons to include in your story:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {moralLessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => toggleMoralLesson(lesson.id)}
              className={`
                p-4 rounded-storybook border-2 storybook-transition hover:scale-105 text-left
                ${educationalElements.moralLessons?.includes(lesson.id)
                  ? 'border-primary bg-primary-50' :'border-primary-200 bg-background hover:border-primary-300'
                }
              `}
            >
              <div className="flex items-start space-x-3">
                <div className={`
                  w-10 h-10 rounded-storybook flex items-center justify-center
                  ${educationalElements.moralLessons?.includes(lesson.id)
                    ? 'bg-primary text-white' :'bg-primary-100 text-primary'
                  }
                `}>
                  <Icon name={lesson.icon} size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-text-primary mb-1">
                    {lesson.name}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {lesson.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Additional Features */}
      <div className="bg-surface p-6 rounded-2xl border border-primary-100">
        <h3 className="text-xl font-heading text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="Settings" size={24} className="text-primary" />
          <span>Additional Features</span>
        </h3>
        
        <div className="space-y-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={educationalElements.includeQuestions || false}
              onChange={(e) => updateEducationalElements({ includeQuestions: e.target.checked })}
              className="w-5 h-5 text-primary border-primary-300 rounded focus:ring-primary"
            />
            <div>
              <span className="font-medium text-text-primary">Reading Comprehension Questions</span>
              <p className="text-sm text-text-secondary">Add questions between pages to check understanding</p>
            </div>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={educationalElements.vocabularyHighlights || false}
              onChange={(e) => updateEducationalElements({ vocabularyHighlights: e.target.checked })}
              className="w-5 h-5 text-primary border-primary-300 rounded focus:ring-primary"
            />
            <div>
              <span className="font-medium text-text-primary">Vocabulary Highlights</span>
              <p className="text-sm text-text-secondary">Highlight new words with simple definitions</p>
            </div>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={educationalElements.discussionPrompts || false}
              onChange={(e) => updateEducationalElements({ discussionPrompts: e.target.checked })}
              className="w-5 h-5 text-primary border-primary-300 rounded focus:ring-primary"
            />
            <div>
              <span className="font-medium text-text-primary">Discussion Prompts</span>
              <p className="text-sm text-text-secondary">Questions for parents and children to discuss together</p>
            </div>
          </label>
        </div>
      </div>

      {/* Educational Summary */}
      {(educationalElements.subjectIntegration?.length > 0 || educationalElements.moralLessons?.length > 0) && (
        <div className="bg-gradient-to-br from-success-50 to-accent-50 p-6 rounded-2xl border border-success-200">
          <h3 className="text-xl font-heading text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Award" size={24} className="text-success" />
            <span>Learning Summary</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationalElements.subjectIntegration?.length > 0 && (
              <div>
                <h4 className="font-medium text-text-primary mb-2">Subjects Included:</h4>
                <div className="flex flex-wrap gap-2">
                  {educationalElements.subjectIntegration.map((subjectId) => {
                    const subject = subjectAreas.find(s => s.id === subjectId);
                    return (
                      <span
                        key={subjectId}
                        className="px-3 py-1 bg-success-100 text-success-700 text-sm rounded-full"
                      >
                        {subject?.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {educationalElements.moralLessons?.length > 0 && (
              <div>
                <h4 className="font-medium text-text-primary mb-2">Values Taught:</h4>
                <div className="flex flex-wrap gap-2">
                  {educationalElements.moralLessons.map((lessonId) => {
                    const lesson = moralLessons.find(l => l.id === lessonId);
                    return (
                      <span
                        key={lessonId}
                        className="px-3 py-1 bg-accent-100 text-accent-700 text-sm rounded-full"
                      >
                        {lesson?.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationalElements;