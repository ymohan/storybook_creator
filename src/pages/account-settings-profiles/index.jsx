import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import { useLanguage } from 'context/LanguageContext';

// ─── Toast ────────────────────────────────────────────────────────────────────
const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] text-white px-6 py-3 rounded-full shadow-storybook-lg flex items-center gap-2 text-sm font-medium ${type === 'success' ? 'bg-green-500' : 'bg-primary'}`}>
      <Icon name={type === 'success' ? 'CheckCircle' : 'Info'} size={16} />
      {message}
    </div>
  );
};

// ─── Avatar Picker ────────────────────────────────────────────────────────────
const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=face',
];

const INTEREST_OPTIONS = ['Animals', 'Adventure', 'Magic', 'Space', 'Science', 'Robots', 'Nature', 'Art', 'Music', 'Sports', 'Ocean', 'Dinosaurs'];
const THEME_OPTIONS = ['Fairy Tales', 'Animal Stories', 'Science Fiction', 'Adventure', 'Fantasy', 'Mystery', 'Comedy', 'History'];
const CONTENT_FILTER_OPTIONS = ['None', 'Mild', 'Moderate', 'Strict'];
const VOCAB_LEVEL_OPTIONS = ['Beginner', 'Elementary', 'Intermediate', 'Advanced'];
const READING_LEVEL_OPTIONS = ['Pre-K', 'Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'];

// ─── Child Profile Modal ──────────────────────────────────────────────────────
const ProfileModal = ({ profile, onSave, onCancel }) => {
  const [form, setForm] = useState(
    profile || {
      id: Date.now(),
      name: '',
      age: 6,
      readingLevel: 'Grade 1',
      interests: [],
      avatar: AVATAR_OPTIONS[0],
      contentFilter: 'Mild',
      vocabularyLevel: 'Elementary',
      favoriteThemes: [],
      createdStories: 0,
      isActive: false,
    }
  );

  const isNew = !profile;

  const toggle = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-background rounded-2xl shadow-storybook-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary-100 sticky top-0 bg-background z-10">
          <div className="flex items-center gap-2">
            <Icon name="UserCircle" size={20} className="text-primary" />
            <h3 className="text-lg font-heading text-text-primary">
              {isNew ? 'Add Child Profile' : 'Edit Profile'}
            </h3>
          </div>
          <button onClick={onCancel} className="text-text-secondary hover:text-text-primary storybook-transition">
            <Icon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Avatar */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Avatar</label>
            <div className="flex gap-3 flex-wrap">
              {AVATAR_OPTIONS.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, avatar: av }))}
                  className={`w-14 h-14 rounded-full overflow-hidden border-4 storybook-transition ${form.avatar === av ? 'border-primary scale-110' : 'border-transparent hover:border-primary-200'}`}
                >
                  <img src={av} alt="avatar" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Child's Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full px-4 py-2.5 border border-primary-200 rounded-storybook bg-surface text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter name"
              required
            />
          </div>

          {/* Age & Reading Level */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Age</label>
              <input
                type="number"
                min={3} max={18}
                value={form.age}
                onChange={(e) => setForm(f => ({ ...f, age: Number(e.target.value) }))}
                className="w-full px-4 py-2.5 border border-primary-200 rounded-storybook bg-surface text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Reading Level</label>
              <select
                value={form.readingLevel}
                onChange={(e) => setForm(f => ({ ...f, readingLevel: e.target.value }))}
                className="w-full px-4 py-2.5 border border-primary-200 rounded-storybook bg-surface text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {READING_LEVEL_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>
          </div>

          {/* Vocabulary & Content Filter */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Vocabulary Level</label>
              <select
                value={form.vocabularyLevel}
                onChange={(e) => setForm(f => ({ ...f, vocabularyLevel: e.target.value }))}
                className="w-full px-4 py-2.5 border border-primary-200 rounded-storybook bg-surface text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {VOCAB_LEVEL_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Content Filter</label>
              <select
                value={form.contentFilter}
                onChange={(e) => setForm(f => ({ ...f, contentFilter: e.target.value }))}
                className="w-full px-4 py-2.5 border border-primary-200 rounded-storybook bg-surface text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {CONTENT_FILTER_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Interests</label>
            <div className="flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map(interest => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggle('interests', interest)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium storybook-transition border ${form.interests.includes(interest) ? 'bg-primary text-white border-primary' : 'bg-surface text-text-secondary border-primary-200 hover:border-primary hover:text-primary'}`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Favourite Themes */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Favourite Story Themes</label>
            <div className="flex flex-wrap gap-2">
              {THEME_OPTIONS.map(theme => (
                <button
                  key={theme}
                  type="button"
                  onClick={() => toggle('favoriteThemes', theme)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium storybook-transition border ${form.favoriteThemes.includes(theme) ? 'bg-secondary text-white border-secondary' : 'bg-surface text-text-secondary border-primary-200 hover:border-secondary hover:text-secondary'}`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          {/* Active profile toggle */}
          <div className="flex items-center justify-between p-4 bg-primary-50 rounded-storybook">
            <div>
              <p className="text-sm font-medium text-text-primary">Set as Active Profile</p>
              <p className="text-xs text-text-secondary">Stories will be created for this profile</p>
            </div>
            <button
              type="button"
              onClick={() => setForm(f => ({ ...f, isActive: !f.isActive }))}
              className={`w-12 h-6 rounded-full storybook-transition relative ${form.isActive ? 'bg-primary' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow storybook-transition ${form.isActive ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 border border-primary-200 text-text-primary rounded-storybook hover:bg-primary-50 storybook-transition text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook hover:scale-105 storybook-transition shadow-storybook text-sm font-medium"
            >
              <Icon name="Save" size={16} />
              {isNew ? 'Add Profile' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Child Profile Card ───────────────────────────────────────────────────────
const ChildProfileCard = ({ profile, onEdit, onDelete, onSetActive }) => (
  <div className={`bg-background border-2 rounded-2xl shadow-storybook p-5 storybook-transition hover:shadow-storybook-lg flex flex-col gap-4 ${profile.isActive ? 'border-primary' : 'border-primary-100'}`}>
    {profile.isActive && (
      <div className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full self-start flex items-center gap-1">
        <Icon name="Star" size={12} /> Active Profile
      </div>
    )}
    <div className="flex items-center gap-4">
      <div className="relative">
        <img src={profile.avatar} alt={profile.name} className="w-16 h-16 rounded-full object-cover border-4 border-primary-100" />
        {profile.isActive && <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />}
      </div>
      <div>
        <h3 className="font-heading text-text-primary text-lg">{profile.name}</h3>
        <p className="text-sm text-text-secondary">Age {profile.age} · {profile.readingLevel}</p>
        <p className="text-xs text-text-secondary mt-0.5">{profile.createdStories} stories created</p>
      </div>
    </div>

    {/* Interests */}
    {profile.interests.length > 0 && (
      <div className="flex flex-wrap gap-1.5">
        {profile.interests.slice(0, 4).map(i => (
          <span key={i} className="text-xs bg-primary-50 text-primary px-2 py-0.5 rounded-full">{i}</span>
        ))}
        {profile.interests.length > 4 && (
          <span className="text-xs text-text-secondary px-2 py-0.5">+{profile.interests.length - 4} more</span>
        )}
      </div>
    )}

    <div className="flex items-center justify-between text-xs text-text-secondary border-t border-primary-50 pt-3">
      <span>Filter: {profile.contentFilter}</span>
      <span>Vocab: {profile.vocabularyLevel}</span>
    </div>

    {/* Actions */}
    <div className="flex gap-2">
      {!profile.isActive && (
        <button
          onClick={() => onSetActive(profile.id)}
          className="flex-1 px-3 py-2 text-xs font-medium bg-primary-50 text-primary border border-primary-200 rounded-storybook hover:bg-primary hover:text-white storybook-transition"
        >
          Set Active
        </button>
      )}
      <button
        onClick={() => onEdit(profile)}
        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium bg-surface border border-primary-200 rounded-storybook hover:bg-primary-50 hover:text-primary storybook-transition"
      >
        <Icon name="Pencil" size={13} /> Edit
      </button>
      <button
        onClick={() => onDelete(profile.id)}
        className="w-9 h-9 flex items-center justify-center border border-primary-200 rounded-storybook text-text-secondary hover:text-red-500 hover:border-red-300 hover:bg-red-50 storybook-transition"
      >
        <Icon name="Trash2" size={14} />
      </button>
    </div>
  </div>
);

// ─── Story Preferences Section ────────────────────────────────────────────────
const StoryPreferencesSection = ({ onSave }) => {
  const [form, setForm] = useState(() => {
    try { return JSON.parse(localStorage.getItem('storymagic_prefs')) || {}; } catch { return {}; }
  });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(form);

  const handleSave = () => {
    setForm(draft);
    localStorage.setItem('storymagic_prefs', JSON.stringify(draft));
    setEditing(false);
    onSave('Story preferences saved!');
  };

  const LENGTHS = ['Short (5-6 pages)', 'Medium (8-10 pages)', 'Long (12-15 pages)'];
  const LANGS = ['English', 'Tamil', 'Hindi', 'Telugu'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading text-text-primary">Story Preferences</h2>
          <p className="text-text-secondary mt-1">Default settings for new story generation</p>
        </div>
        <button
          onClick={() => editing ? handleSave() : setEditing(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-storybook text-sm font-medium storybook-transition ${editing ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-storybook hover:scale-105' : 'bg-surface border border-primary-200 text-text-primary hover:bg-primary-50'}`}
        >
          <Icon name={editing ? 'Save' : 'Pencil'} size={16} />
          {editing ? 'Save Preferences' : 'Edit Preferences'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Default Language */}
        <div className="bg-surface rounded-storybook p-4 border border-primary-100">
          <label className="block text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
            <Icon name="Globe" size={16} className="text-primary" /> Default Language
          </label>
          {editing ? (
            <div className="flex flex-wrap gap-2">
              {LANGS.map(l => (
                <button
                  key={l}
                  onClick={() => setDraft(d => ({ ...d, language: l }))}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium storybook-transition border ${draft.language === l ? 'bg-primary text-white border-primary' : 'bg-background text-text-secondary border-primary-200 hover:border-primary'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-text-primary font-medium">{form.language || 'English'}</p>
          )}
        </div>

        {/* Story Length */}
        <div className="bg-surface rounded-storybook p-4 border border-primary-100">
          <label className="block text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
            <Icon name="BookOpen" size={16} className="text-primary" /> Default Story Length
          </label>
          {editing ? (
            <div className="space-y-1.5">
              {LENGTHS.map(l => (
                <button
                  key={l}
                  onClick={() => setDraft(d => ({ ...d, storyLength: l }))}
                  className={`w-full text-left px-3 py-2 rounded-storybook text-xs font-medium storybook-transition border ${draft.storyLength === l ? 'bg-primary text-white border-primary' : 'bg-background text-text-secondary border-primary-200 hover:border-primary'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-text-primary font-medium">{form.storyLength || 'Medium (8-10 pages)'}</p>
          )}
        </div>

        {/* Moral Lessons */}
        <div className="bg-surface rounded-storybook p-4 border border-primary-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary flex items-center gap-2">
                <Icon name="Heart" size={16} className="text-primary" /> Include Moral Lessons
              </p>
              <p className="text-xs text-text-secondary mt-0.5">Add values and life lessons to stories</p>
            </div>
            <button
              onClick={() => editing && setDraft(d => ({ ...d, moralLessons: !d.moralLessons }))}
              disabled={!editing}
              className={`w-12 h-6 rounded-full storybook-transition relative ${draft.moralLessons ? 'bg-primary' : 'bg-gray-300'} ${!editing ? 'opacity-60 cursor-default' : ''}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow storybook-transition ${draft.moralLessons ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>

        {/* Interactive Elements */}
        <div className="bg-surface rounded-storybook p-4 border border-primary-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary flex items-center gap-2">
                <Icon name="Sparkles" size={16} className="text-primary" /> Interactive Elements
              </p>
              <p className="text-xs text-text-secondary mt-0.5">Clickable elements in stories</p>
            </div>
            <button
              onClick={() => editing && setDraft(d => ({ ...d, interactive: !d.interactive }))}
              disabled={!editing}
              className={`w-12 h-6 rounded-full storybook-transition relative ${draft.interactive !== false ? 'bg-primary' : 'bg-gray-300'} ${!editing ? 'opacity-60 cursor-default' : ''}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow storybook-transition ${draft.interactive !== false ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>
      </div>

      {editing && (
        <button
          onClick={() => { setDraft(form); setEditing(false); }}
          className="text-sm text-text-secondary hover:text-text-primary storybook-transition"
        >
          Cancel changes
        </button>
      )}
    </div>
  );
};

// ─── Account Management Section ───────────────────────────────────────────────
const AccountManagementSection = ({ onSave }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(() => {
    try { return JSON.parse(localStorage.getItem('storymagic_account')) || { name: 'Parent User', email: 'parent@example.com', phone: '' }; }
    catch { return { name: 'Parent User', email: 'parent@example.com', phone: '' }; }
  });
  const [draft, setDraft] = useState(form);

  const handleSave = () => {
    setForm(draft);
    localStorage.setItem('storymagic_account', JSON.stringify(draft));
    setEditing(false);
    onSave('Account details saved!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading text-text-primary">Account Management</h2>
          <p className="text-text-secondary mt-1">Manage your account details</p>
        </div>
        <button
          onClick={() => editing ? handleSave() : setEditing(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-storybook text-sm font-medium storybook-transition ${editing ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-storybook hover:scale-105' : 'bg-surface border border-primary-200 text-text-primary hover:bg-primary-50'}`}
        >
          <Icon name={editing ? 'Save' : 'Pencil'} size={16} />
          {editing ? 'Save Changes' : 'Edit Account'}
        </button>
      </div>

      <div className="space-y-4">
        {[
          { label: 'Full Name', field: 'name', type: 'text', icon: 'User' },
          { label: 'Email Address', field: 'email', type: 'email', icon: 'Mail' },
          { label: 'Phone Number', field: 'phone', type: 'tel', icon: 'Phone' },
        ].map(({ label, field, type, icon }) => (
          <div key={field} className="bg-surface rounded-storybook p-4 border border-primary-100">
            <label className="block text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
              <Icon name={icon} size={16} className="text-primary" /> {label}
            </label>
            {editing ? (
              <input
                type={type}
                value={draft[field]}
                onChange={(e) => setDraft(d => ({ ...d, [field]: e.target.value }))}
                className="w-full px-4 py-2.5 border border-primary-200 rounded-storybook bg-background text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            ) : (
              <p className="text-text-primary">{form[field] || <span className="text-text-secondary italic">Not set</span>}</p>
            )}
          </div>
        ))}

        {/* Password Change */}
        <div className="bg-surface rounded-storybook p-4 border border-primary-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary flex items-center gap-2">
                <Icon name="Lock" size={16} className="text-primary" /> Password
              </p>
              <p className="text-xs text-text-secondary mt-0.5">Last changed: Never</p>
            </div>
            <button className="text-sm text-primary hover:text-primary-700 font-medium storybook-transition flex items-center gap-1">
              <Icon name="Key" size={14} /> Change Password
            </button>
          </div>
        </div>

        {editing && (
          <button
            onClick={() => { setDraft(form); setEditing(false); }}
            className="text-sm text-text-secondary hover:text-text-primary storybook-transition"
          >
            Cancel changes
          </button>
        )}
      </div>
    </div>
  );
};

// ─── Reading Settings Section ─────────────────────────────────────────────────
const ReadingSettingsSection = ({ onSave }) => {
  const [settings, setSettings] = useState(() => {
    try { return JSON.parse(localStorage.getItem('storymagic_reading')) || {}; }
    catch { return {}; }
  });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(settings);

  const handleSave = () => {
    setSettings(draft);
    localStorage.setItem('storymagic_reading', JSON.stringify(draft));
    setEditing(false);
    onSave('Reading settings saved!');
  };

  const FONT_SIZES = ['Small', 'Medium', 'Large', 'Extra Large'];
  const READ_MODES = ['Read to Me', 'Read Myself', 'Follow Along'];
  const SPEEDS = ['0.75x', '1x', '1.25x', '1.5x', '2x'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading text-text-primary">Reading Settings</h2>
          <p className="text-text-secondary mt-1">Default reading experience settings</p>
        </div>
        <button
          onClick={() => editing ? handleSave() : setEditing(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-storybook text-sm font-medium storybook-transition ${editing ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-storybook hover:scale-105' : 'bg-surface border border-primary-200 text-text-primary hover:bg-primary-50'}`}
        >
          <Icon name={editing ? 'Save' : 'Pencil'} size={16} />
          {editing ? 'Save Settings' : 'Edit Settings'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Font Size */}
        <div className="bg-surface rounded-storybook p-4 border border-primary-100">
          <label className="block text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
            <Icon name="Type" size={16} className="text-primary" /> Font Size
          </label>
          {editing ? (
            <div className="grid grid-cols-2 gap-2">
              {FONT_SIZES.map(s => (
                <button key={s} onClick={() => setDraft(d => ({ ...d, fontSize: s }))}
                  className={`px-3 py-2 rounded-storybook text-xs font-medium storybook-transition border ${draft.fontSize === s ? 'bg-primary text-white border-primary' : 'bg-background text-text-secondary border-primary-200 hover:border-primary'}`}
                >{s}</button>
              ))}
            </div>
          ) : <p className="text-text-primary font-medium">{settings.fontSize || 'Medium'}</p>}
        </div>

        {/* Narration Speed */}
        <div className="bg-surface rounded-storybook p-4 border border-primary-100">
          <label className="block text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
            <Icon name="Gauge" size={16} className="text-primary" /> Narration Speed
          </label>
          {editing ? (
            <div className="flex gap-2 flex-wrap">
              {SPEEDS.map(s => (
                <button key={s} onClick={() => setDraft(d => ({ ...d, speed: s }))}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium storybook-transition border ${draft.speed === s ? 'bg-primary text-white border-primary' : 'bg-background text-text-secondary border-primary-200 hover:border-primary'}`}
                >{s}</button>
              ))}
            </div>
          ) : <p className="text-text-primary font-medium">{settings.speed || '1x'}</p>}
        </div>

        {/* Default Read Mode */}
        <div className="bg-surface rounded-storybook p-4 border border-primary-100">
          <label className="block text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
            <Icon name="BookOpen" size={16} className="text-primary" /> Default Reading Mode
          </label>
          {editing ? (
            <div className="space-y-1.5">
              {READ_MODES.map(m => (
                <button key={m} onClick={() => setDraft(d => ({ ...d, readMode: m }))}
                  className={`w-full text-left px-3 py-2 rounded-storybook text-xs font-medium storybook-transition border ${draft.readMode === m ? 'bg-primary text-white border-primary' : 'bg-background text-text-secondary border-primary-200 hover:border-primary'}`}
                >{m}</button>
              ))}
            </div>
          ) : <p className="text-text-primary font-medium">{settings.readMode || 'Read to Me'}</p>}
        </div>

        {/* Toggles */}
        <div className="bg-surface rounded-storybook p-4 border border-primary-100 space-y-4">
          {[
            { label: 'Background Music', field: 'bgMusic', icon: 'Music' },
            { label: 'Sound Effects', field: 'soundFx', icon: 'Volume2' },
            { label: 'Auto-advance Pages', field: 'autoAdvance', icon: 'ChevronRight' },
          ].map(({ label, field, icon }) => (
            <div key={field} className="flex items-center justify-between">
              <p className="text-sm text-text-primary flex items-center gap-2">
                <Icon name={icon} size={14} className="text-primary" /> {label}
              </p>
              <button
                onClick={() => editing && setDraft(d => ({ ...d, [field]: !d[field] }))}
                disabled={!editing}
                className={`w-11 h-6 rounded-full storybook-transition relative ${draft[field] !== false ? 'bg-primary' : 'bg-gray-300'} ${!editing ? 'opacity-60 cursor-default' : ''}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow storybook-transition ${draft[field] !== false ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {editing && (
        <button
          onClick={() => { setDraft(settings); setEditing(false); }}
          className="text-sm text-text-secondary hover:text-text-primary storybook-transition"
        >
          Cancel changes
        </button>
      )}
    </div>
  );
};

// ─── Parental Controls Section ────────────────────────────────────────────────
const ParentalControlsSection = ({ onSave }) => {
  const [controls, setControls] = useState(() => {
    try { return JSON.parse(localStorage.getItem('storymagic_controls')) || {}; }
    catch { return {}; }
  });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(controls);

  const handleSave = () => {
    setControls(draft);
    localStorage.setItem('storymagic_controls', JSON.stringify(draft));
    setEditing(false);
    onSave('Parental controls saved!');
  };

  const TIME_LIMITS = ['15 min', '30 min', '45 min', '1 hour', '2 hours', 'No limit'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading text-text-primary">Parental Controls</h2>
          <p className="text-text-secondary mt-1">Manage content and usage limits</p>
        </div>
        <button
          onClick={() => editing ? handleSave() : setEditing(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-storybook text-sm font-medium storybook-transition ${editing ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-storybook hover:scale-105' : 'bg-surface border border-primary-200 text-text-primary hover:bg-primary-50'}`}
        >
          <Icon name={editing ? 'Save' : 'Pencil'} size={16} />
          {editing ? 'Save Controls' : 'Edit Controls'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Daily Time Limit */}
        <div className="bg-surface rounded-storybook p-4 border border-primary-100">
          <label className="block text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
            <Icon name="Clock" size={16} className="text-primary" /> Daily Reading Limit
          </label>
          {editing ? (
            <div className="flex flex-wrap gap-2">
              {TIME_LIMITS.map(t => (
                <button key={t} onClick={() => setDraft(d => ({ ...d, dailyLimit: t }))}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium storybook-transition border ${draft.dailyLimit === t ? 'bg-primary text-white border-primary' : 'bg-background text-text-secondary border-primary-200 hover:border-primary'}`}
                >{t}</button>
              ))}
            </div>
          ) : <p className="text-text-primary font-medium">{controls.dailyLimit || 'No limit'}</p>}
        </div>

        {/* Restrictions */}
        <div className="bg-surface rounded-storybook p-4 border border-primary-100 space-y-4">
          {[
            { label: 'Require PIN to change settings', field: 'requirePin', icon: 'Shield' },
            { label: 'Restrict story creation', field: 'restrictCreation', icon: 'Lock' },
            { label: 'Email weekly usage report', field: 'weeklyReport', icon: 'Mail' },
          ].map(({ label, field, icon }) => (
            <div key={field} className="flex items-center justify-between">
              <p className="text-sm text-text-primary flex items-center gap-2">
                <Icon name={icon} size={14} className="text-primary" /> {label}
              </p>
              <button
                onClick={() => editing && setDraft(d => ({ ...d, [field]: !d[field] }))}
                disabled={!editing}
                className={`w-11 h-6 rounded-full storybook-transition relative ${draft[field] ? 'bg-primary' : 'bg-gray-300'} ${!editing ? 'opacity-60 cursor-default' : ''}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow storybook-transition ${draft[field] ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {editing && (
        <button
          onClick={() => { setDraft(controls); setEditing(false); }}
          className="text-sm text-text-secondary hover:text-text-primary storybook-transition"
        >
          Cancel changes
        </button>
      )}
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const DEFAULT_PROFILES = [
  {
    id: 1,
    name: 'Emma',
    age: 7,
    readingLevel: 'Grade 2',
    interests: ['Animals', 'Adventure', 'Magic'],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    contentFilter: 'Mild',
    vocabularyLevel: 'Elementary',
    favoriteThemes: ['Fairy Tales', 'Animal Stories'],
    createdStories: 12,
    isActive: true,
  },
  {
    id: 2,
    name: 'Lucas',
    age: 10,
    readingLevel: 'Grade 4',
    interests: ['Space', 'Science', 'Robots'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    contentFilter: 'Moderate',
    vocabularyLevel: 'Intermediate',
    favoriteThemes: ['Science Fiction', 'Adventure'],
    createdStories: 8,
    isActive: false,
  },
];

const AccountSettingsProfiles = () => {
  const [activeTab, setActiveTab] = useState('profiles');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Profiles state
  const [profiles, setProfiles] = useState(() => {
    try { return JSON.parse(localStorage.getItem('storymagic_profiles')) || DEFAULT_PROFILES; }
    catch { return DEFAULT_PROFILES; }
  });
  const [editingProfile, setEditingProfile] = useState(null);
  const [showAddProfile, setShowAddProfile] = useState(false);

  useEffect(() => {
    localStorage.setItem('storymagic_profiles', JSON.stringify(profiles));
  }, [profiles]);

  const showToast = (message) => setToast({ message });

  const handleSaveProfile = (profile) => {
    if (profiles.find(p => p.id === profile.id)) {
      setProfiles(prev => prev.map(p => p.id === profile.id ? profile : p));
      showToast('Profile updated successfully!');
    } else {
      setProfiles(prev => [...prev, profile]);
      showToast('Profile added successfully!');
    }
    setEditingProfile(null);
    setShowAddProfile(false);
  };

  const handleDeleteProfile = (id) => {
    setProfiles(prev => prev.filter(p => p.id !== id));
    showToast('Profile removed.');
  };

  const handleSetActive = (id) => {
    setProfiles(prev => prev.map(p => ({ ...p, isActive: p.id === id })));
    showToast('Active profile updated!');
  };

  const tabItems = [
    { id: 'profiles', label: 'Child Profiles', icon: 'Users', count: profiles.length },
    { id: 'preferences', label: 'Story Preferences', icon: 'BookOpen' },
    { id: 'account', label: 'Account Management', icon: 'Settings' },
    { id: 'reading', label: 'Reading Settings', icon: 'Volume2' },
    { id: 'controls', label: 'Parental Controls', icon: 'Shield' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profiles':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-heading text-text-primary">Child Profiles</h2>
                <p className="text-text-secondary mt-1">Manage profiles for personalized story experiences</p>
              </div>
              <button
                onClick={() => setShowAddProfile(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook hover:scale-105 storybook-transition shadow-storybook text-sm font-medium"
              >
                <Icon name="Plus" size={18} /> Add Profile
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profiles.map(profile => (
                <ChildProfileCard
                  key={profile.id}
                  profile={profile}
                  onEdit={setEditingProfile}
                  onDelete={handleDeleteProfile}
                  onSetActive={handleSetActive}
                />
              ))}
              {profiles.length === 0 && (
                <div className="col-span-3 text-center py-12 text-text-secondary">
                  <Icon name="Users" size={40} className="mx-auto mb-3 opacity-30" />
                  <p>No profiles yet. Add your first child profile!</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'preferences':
        return <StoryPreferencesSection onSave={showToast} />;
      case 'account':
        return <AccountManagementSection onSave={showToast} />;
      case 'reading':
        return <ReadingSettingsSection onSave={showToast} />;
      case 'controls':
        return <ParentalControlsSection onSave={showToast} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-surface pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading text-text-primary mb-2">Account Settings</h1>
          <p className="text-text-secondary">Manage your account, child profiles, and story preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Tab Selector */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full flex items-center justify-between p-4 bg-surface border border-primary-200 rounded-storybook text-text-primary"
            >
              <div className="flex items-center gap-3">
                <Icon name={tabItems.find(t => t.id === activeTab)?.icon} size={20} />
                <span className="font-medium">{tabItems.find(t => t.id === activeTab)?.label}</span>
              </div>
              <Icon name={isMobileMenuOpen ? 'ChevronUp' : 'ChevronDown'} size={20} />
            </button>
            {isMobileMenuOpen && (
              <div className="mt-2 bg-surface border border-primary-200 rounded-storybook shadow-storybook">
                {tabItems.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }}
                    className={`w-full flex items-center justify-between p-4 text-left storybook-transition ${activeTab === tab.id ? 'bg-primary-50 text-primary border-r-2 border-primary' : 'text-text-secondary hover:text-text-primary hover:bg-primary-50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon name={tab.icon} size={18} />
                      <span>{tab.label}</span>
                    </div>
                    {tab.count && <span className="bg-primary-100 text-primary text-xs px-2 py-1 rounded-full">{tab.count}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-surface border border-primary-200 rounded-storybook shadow-storybook overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-primary-200">
                <h3 className="font-heading text-text-primary">Settings Menu</h3>
              </div>
              <nav className="p-2">
                {tabItems.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-storybook text-left storybook-transition mb-1 ${activeTab === tab.id ? 'bg-primary-50 text-primary border-r-2 border-primary' : 'text-text-secondary hover:text-text-primary hover:bg-primary-50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon name={tab.icon} size={18} />
                      <span className="font-medium">{tab.label}</span>
                    </div>
                    {tab.count && <span className="bg-primary-100 text-primary text-xs px-2 py-1 rounded-full">{tab.count}</span>}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-background border border-primary-200 rounded-storybook shadow-storybook p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Modals */}
      {(editingProfile || showAddProfile) && (
        <ProfileModal
          profile={editingProfile}
          onSave={handleSaveProfile}
          onCancel={() => { setEditingProfile(null); setShowAddProfile(false); }}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
};

export default AccountSettingsProfiles;
