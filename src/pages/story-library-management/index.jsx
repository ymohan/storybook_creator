import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import { useLanguage } from 'context/LanguageContext';

// ─── Default story seed data ────────────────────────────────────────────────
const DEFAULT_STORIES = [
  {
    id: 1,
    title: "Luna's Space Adventure",
    ageRange: "5-8 years",
    theme: "Space",
    coverImage: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=500&fit=crop",
    description: "Join Luna as she explores distant planets and makes friends with alien creatures.",
    pages: 8,
    readTime: "10 min",
    progress: 85,
    isCompleted: false,
    createdDate: "2024-01-15",
    lastRead: "2024-01-20",
  },
  {
    id: 2,
    title: "The Enchanted Forest",
    ageRange: "6-10 years",
    theme: "Fantasy",
    coverImage: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=500&fit=crop",
    description: "Follow Alex through a magical forest where trees talk and animals have special powers.",
    pages: 12,
    readTime: "15 min",
    progress: 100,
    isCompleted: true,
    createdDate: "2024-01-10",
    lastRead: "2024-01-18",
  },
  {
    id: 3,
    title: "Robot Friends",
    ageRange: "6-11 years",
    theme: "Technology",
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=500&fit=crop",
    description: "Join Max as he builds his first robot and learns about friendship and problem-solving.",
    pages: 9,
    readTime: "11 min",
    progress: 40,
    isCompleted: false,
    createdDate: "2024-01-08",
    lastRead: "2024-01-09",
  },
];

// ─── Toast Notification ──────────────────────────────────────────────────────
const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-primary',
  };

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] ${colors[type]} text-white px-6 py-3 rounded-full shadow-storybook-lg flex items-center gap-2 text-sm font-medium animate-in`}>
      <Icon name={type === 'success' ? 'CheckCircle' : type === 'error' ? 'XCircle' : 'Info'} size={16} />
      {message}
    </div>
  );
};

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
const DeleteModal = ({ story, onConfirm, onCancel, t }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
    <div className="bg-background rounded-2xl shadow-storybook-lg p-6 max-w-sm w-full">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <Icon name="Trash2" size={32} className="text-red-500" />
        </div>
      </div>
      <h3 className="text-lg font-heading text-text-primary text-center mb-2">
        {t.library.deleteStory}
      </h3>
      <p className="text-text-secondary text-sm text-center mb-6">
        {t.library.confirmDelete}
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-primary-200 text-text-primary rounded-storybook hover:bg-primary-50 storybook-transition text-sm font-medium"
        >
          {t.library.deleteCancel}
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-storybook storybook-transition text-sm font-medium"
        >
          {t.library.deleteConfirm}
        </button>
      </div>
    </div>
  </div>
);

// ─── Edit Modal ───────────────────────────────────────────────────────────────
const EditModal = ({ story, onSave, onCancel, t }) => {
  const [form, setForm] = useState({
    title: story.title,
    description: story.description,
    ageRange: story.ageRange,
    theme: story.theme,
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave({ ...story, ...form });
  };

  const themeOptions = ['Space', 'Fantasy', 'Ocean', 'Adventure', 'Technology', 'Nature', 'Family', 'Art & Creativity'];
  const ageOptions = ['3-5 years', '4-7 years', '5-8 years', '6-9 years', '6-10 years', '6-11 years', '8-12 years'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-background rounded-2xl shadow-storybook-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary-100">
          <div className="flex items-center gap-2">
            <Icon name="PenTool" size={20} className="text-primary" />
            <h3 className="text-lg font-heading text-text-primary">{t.library.editStory}</h3>
          </div>
          <button onClick={onCancel} className="text-text-secondary hover:text-text-primary storybook-transition">
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Story Title */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              {t.library.storyTitle} *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2.5 border border-primary-200 rounded-storybook text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              placeholder={t.library.storyTitle}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              {t.library.storyContent}
            </label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 border border-primary-200 rounded-storybook text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-none"
              placeholder={t.library.storyContent}
            />
          </div>

          {/* Age Range */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              {t.library.ageRange}
            </label>
            <select
              value={form.ageRange}
              onChange={(e) => handleChange('ageRange', e.target.value)}
              className="w-full px-4 py-2.5 border border-primary-200 rounded-storybook text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            >
              {ageOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Theme */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              {t.library.theme}
            </label>
            <div className="flex flex-wrap gap-2">
              {themeOptions.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleChange('theme', opt)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium storybook-transition border ${
                    form.theme === opt
                      ? 'bg-primary text-white border-primary'
                      : 'bg-surface text-text-secondary border-primary-200 hover:border-primary hover:text-primary'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 border border-primary-200 text-text-primary rounded-storybook hover:bg-primary-50 storybook-transition text-sm font-medium"
            >
              {t.library.cancelEdit}
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook hover:scale-105 storybook-transition shadow-storybook text-sm font-medium"
            >
              <Icon name="Save" size={16} />
              {t.library.saveStory}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Story Card ───────────────────────────────────────────────────────────────
const StoryCard = ({ story, onRead, onEdit, onDelete, onUpdate, t }) => {
  const progressColor = story.isCompleted
    ? 'bg-green-500'
    : story.progress >= 50
    ? 'bg-primary'
    : 'bg-secondary';

  return (
    <div className="bg-background border border-primary-100 rounded-2xl shadow-storybook overflow-hidden flex flex-col storybook-transition hover:shadow-storybook-lg hover:-translate-y-0.5 group">
      {/* Cover Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img
          src={story.coverImage}
          alt={story.title}
          className="w-full h-full object-cover group-hover:scale-105 storybook-transition-slow"
          onError={(e) => { e.target.src = '/assets/images/no_image.png'; }}
        />
        {/* Status Badge */}
        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${
          story.isCompleted ? 'bg-green-500' : 'bg-primary'
        }`}>
          {story.isCompleted ? t.library.completed : t.library.inProgress}
        </div>
        {/* Quick action overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 storybook-transition flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={() => onRead(story)}
            className="bg-white text-primary px-5 py-2 rounded-full font-semibold text-sm shadow-lg hover:scale-105 storybook-transition flex items-center gap-2"
          >
            <Icon name="BookOpen" size={16} />
            {story.progress > 0 && !story.isCompleted ? t.library.continueReading : t.library.readStory}
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Title & Theme */}
        <div>
          <h3 className="font-heading text-text-primary text-base leading-tight mb-1 line-clamp-2">
            {story.title}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs bg-primary-50 text-primary px-2 py-0.5 rounded-full font-medium">
              {story.theme}
            </span>
            <span className="text-xs text-text-secondary">{story.ageRange}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-text-secondary line-clamp-2">{story.description}</p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span className="flex items-center gap-1">
            <Icon name="BookOpen" size={12} />
            {story.pages} {t.library.pages}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Clock" size={12} />
            {story.readTime} {t.library.readTime}
          </span>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-xs text-text-secondary mb-1">
            <span>{t.library.progress}</span>
            <span>{story.progress}%</span>
          </div>
          <div className="h-1.5 bg-primary-50 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full storybook-transition-slow ${progressColor}`}
              style={{ width: `${story.progress}%` }}
            />
          </div>
        </div>

        {/* Created date */}
        <div className="text-xs text-text-secondary">
          {t.library.createdOn}: {new Date(story.createdDate).toLocaleDateString()}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto pt-2 border-t border-primary-50">
          {/* Read */}
          <button
            onClick={() => onRead(story)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook hover:scale-105 storybook-transition shadow-storybook text-xs font-medium"
          >
            <Icon name="BookOpen" size={14} />
            {story.progress > 0 && !story.isCompleted ? t.library.continueReading : t.library.readStory}
          </button>

          {/* Edit */}
          <button
            onClick={() => onEdit(story)}
            title={t.library.editStory}
            className="w-9 h-9 flex items-center justify-center border border-primary-200 text-text-secondary hover:text-primary hover:border-primary hover:bg-primary-50 rounded-storybook storybook-transition"
          >
            <Icon name="Pencil" size={15} />
          </button>

          {/* Update / Re-generate */}
          <button
            onClick={() => onUpdate(story)}
            title={t.library.updateStory}
            className="w-9 h-9 flex items-center justify-center border border-primary-200 text-text-secondary hover:text-secondary hover:border-secondary hover:bg-secondary-50 rounded-storybook storybook-transition"
          >
            <Icon name="RefreshCw" size={15} />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(story)}
            title={t.library.deleteStory}
            className="w-9 h-9 flex items-center justify-center border border-primary-200 text-text-secondary hover:text-red-500 hover:border-red-300 hover:bg-red-50 rounded-storybook storybook-transition"
          >
            <Icon name="Trash2" size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const StoryLibraryManagement = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [stories, setStories] = useState(() => {
    try {
      const saved = localStorage.getItem('storymagic_library');
      return saved ? JSON.parse(saved) : DEFAULT_STORIES;
    } catch {
      return DEFAULT_STORIES;
    }
  });

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all | completed | inProgress
  const [sort, setSort] = useState('newest');
  const [editingStory, setEditingStory] = useState(null);
  const [deletingStory, setDeletingStory] = useState(null);
  const [toast, setToast] = useState(null);
  const [view, setView] = useState('grid'); // grid | list

  // Persist to localStorage whenever stories change
  useEffect(() => {
    localStorage.setItem('storymagic_library', JSON.stringify(stories));
    localStorage.setItem('hasCreatedStories', 'true');
  }, [stories]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // ── Handlers ──
  const handleRead = (story) => {
    navigate('/interactive-story-reader', { state: { story } });
  };

  const handleEdit = (story) => {
    setEditingStory(story);
  };

  const handleSave = (updatedStory) => {
    setStories(prev => prev.map(s => s.id === updatedStory.id ? updatedStory : s));
    setEditingStory(null);
    showToast(t.library.savedSuccess, 'success');
  };

  const handleDelete = (story) => {
    setDeletingStory(story);
  };

  const confirmDelete = () => {
    setStories(prev => prev.filter(s => s.id !== deletingStory.id));
    setDeletingStory(null);
    showToast(t.library.deletedSuccess, 'info');
  };

  const handleUpdate = (story) => {
    // Re-generate: navigate to wizard pre-filled, or show update progress
    navigate('/story-generation-progress', {
      state: {
        storyData: {
          title: story.title,
          character: { name: story.title.split("'")[0] || 'Hero' },
          theme: story.theme,
          age: story.ageRange,
          isUpdate: true,
          originalId: story.id,
        }
      }
    });
  };

  const handleCreate = () => {
    navigate('/story-creation-wizard');
  };

  // ── Filtering & sorting ──
  const filteredStories = stories
    .filter(s => {
      const matchesSearch =
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.theme.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        filter === 'all' ||
        (filter === 'completed' && s.isCompleted) ||
        (filter === 'inProgress' && !s.isCompleted);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sort === 'newest') return new Date(b.createdDate) - new Date(a.createdDate);
      if (sort === 'oldest') return new Date(a.createdDate) - new Date(b.createdDate);
      if (sort === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  const completedCount = stories.filter(s => s.isCompleted).length;
  const inProgressCount = stories.filter(s => !s.isCompleted).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-surface pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading text-text-primary mb-1">{t.library.title}</h1>
            <p className="text-text-secondary">{t.library.subtitle}</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook hover:scale-105 storybook-transition shadow-storybook font-medium self-start sm:self-auto"
          >
            <Icon name="PenTool" size={18} />
            {t.nav.createStory}
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: t.library.filterAll, count: stories.length, icon: 'Library', color: 'text-primary bg-primary-50' },
            { label: t.library.completed, count: completedCount, icon: 'CheckCircle', color: 'text-green-600 bg-green-50' },
            { label: t.library.inProgress, count: inProgressCount, icon: 'BookOpen', color: 'text-secondary bg-secondary-50' },
          ].map(stat => (
            <div key={stat.label} className="bg-background border border-primary-100 rounded-2xl p-4 flex items-center gap-3 shadow-storybook">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <Icon name={stat.icon} size={20} />
              </div>
              <div>
                <div className="text-2xl font-heading text-text-primary">{stat.count}</div>
                <div className="text-xs text-text-secondary">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.library.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2.5 border border-primary-200 rounded-storybook bg-surface text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <div className="flex rounded-storybook border border-primary-200 overflow-hidden">
            {[
              { key: 'all', label: t.library.filterAll },
              { key: 'completed', label: t.library.filterCompleted },
              { key: 'inProgress', label: t.library.filterInProgress },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-2.5 text-xs font-medium storybook-transition whitespace-nowrap ${
                  filter === f.key
                    ? 'bg-primary text-white'
                    : 'bg-surface text-text-secondary hover:text-text-primary hover:bg-primary-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2.5 border border-primary-200 rounded-storybook bg-surface text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="newest">{t.library.sortNewest}</option>
            <option value="oldest">{t.library.sortOldest}</option>
            <option value="title">{t.library.sortTitle}</option>
          </select>

          {/* View Toggle */}
          <div className="flex rounded-storybook border border-primary-200 overflow-hidden">
            <button
              onClick={() => setView('grid')}
              className={`w-10 h-10 flex items-center justify-center storybook-transition ${
                view === 'grid' ? 'bg-primary text-white' : 'bg-surface text-text-secondary hover:bg-primary-50'
              }`}
            >
              <Icon name="LayoutGrid" size={16} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`w-10 h-10 flex items-center justify-center storybook-transition ${
                view === 'list' ? 'bg-primary text-white' : 'bg-surface text-text-secondary hover:bg-primary-50'
              }`}
            >
              <Icon name="List" size={16} />
            </button>
          </div>
        </div>

        {/* Stories Grid / List */}
        {filteredStories.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-primary-50 rounded-full flex items-center justify-center">
              <Icon name="BookHeart" size={48} className="text-primary" />
            </div>
            <h3 className="text-xl font-heading text-text-primary mb-2">{t.library.noStories}</h3>
            <p className="text-text-secondary mb-6">{t.library.noStoriesDesc}</p>
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook hover:scale-105 storybook-transition shadow-storybook mx-auto font-medium"
            >
              <Icon name="PenTool" size={20} />
              {t.library.createFirst}
            </button>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStories.map(story => (
              <StoryCard
                key={story.id}
                story={story}
                onRead={handleRead}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                t={t}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredStories.map(story => (
              <div
                key={story.id}
                className="bg-background border border-primary-100 rounded-2xl shadow-storybook p-4 flex items-center gap-4 hover:shadow-storybook-lg storybook-transition"
              >
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  onError={(e) => { e.target.src = '/assets/images/no_image.png'; }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-heading text-text-primary truncate">{story.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium text-white flex-shrink-0 ${story.isCompleted ? 'bg-green-500' : 'bg-primary'}`}>
                      {story.isCompleted ? t.library.completed : t.library.inProgress}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary truncate">{story.description}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs bg-primary-50 text-primary px-2 py-0.5 rounded-full">{story.theme}</span>
                    <span className="text-xs text-text-secondary">{story.ageRange}</span>
                    <span className="text-xs text-text-secondary">{story.pages} {t.library.pages}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleRead(story)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook text-xs font-medium hover:scale-105 storybook-transition shadow-storybook"
                  >
                    <Icon name="BookOpen" size={13} />
                    {t.library.readStory}
                  </button>
                  <button onClick={() => handleEdit(story)} className="w-8 h-8 flex items-center justify-center border border-primary-200 rounded-storybook text-text-secondary hover:text-primary hover:border-primary hover:bg-primary-50 storybook-transition">
                    <Icon name="Pencil" size={14} />
                  </button>
                  <button onClick={() => handleUpdate(story)} className="w-8 h-8 flex items-center justify-center border border-primary-200 rounded-storybook text-text-secondary hover:text-secondary hover:border-secondary hover:bg-secondary-50 storybook-transition">
                    <Icon name="RefreshCw" size={14} />
                  </button>
                  <button onClick={() => handleDelete(story)} className="w-8 h-8 flex items-center justify-center border border-primary-200 rounded-storybook text-text-secondary hover:text-red-500 hover:border-red-300 hover:bg-red-50 storybook-transition">
                    <Icon name="Trash2" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {editingStory && (
        <EditModal
          story={editingStory}
          onSave={handleSave}
          onCancel={() => setEditingStory(null)}
          t={t}
        />
      )}

      {deletingStory && (
        <DeleteModal
          story={deletingStory}
          onConfirm={confirmDelete}
          onCancel={() => setDeletingStory(null)}
          t={t}
        />
      )}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default StoryLibraryManagement;
