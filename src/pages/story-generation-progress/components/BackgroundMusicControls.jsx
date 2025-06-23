import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BackgroundMusicControls = ({ isPlaying, onToggle }) => {
  const [volume, setVolume] = useState(50);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  return (
    <div className="relative">
      {/* Volume Slider */}
      {showVolumeSlider && (
        <div className="absolute bottom-full right-0 mb-2 bg-background border border-surface rounded-storybook shadow-storybook p-3">
          <div className="flex items-center space-x-2">
            <Icon name="VolumeX" size={16} className="text-text-secondary" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-surface rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${volume}%, var(--color-surface) ${volume}%, var(--color-surface) 100%)`
              }}
            />
            <Icon name="Volume2" size={16} className="text-text-secondary" />
          </div>
          <div className="text-xs text-center text-text-secondary mt-1">
            {volume}%
          </div>
        </div>
      )}

      {/* Control Panel */}
      <div className="bg-background border border-surface rounded-2xl shadow-storybook p-2 flex items-center space-x-2">
        {/* Play/Pause Button */}
        <button
          onClick={onToggle}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center storybook-transition
            ${isPlaying 
              ? 'bg-gradient-to-r from-primary to-secondary text-white' :'bg-surface text-text-secondary hover:bg-primary-50 hover:text-primary'
            }
          `}
          title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          <Icon name={isPlaying ? 'Pause' : 'Play'} size={16} />
        </button>

        {/* Volume Button */}
        <button
          onClick={() => setShowVolumeSlider(!showVolumeSlider)}
          className="w-8 h-8 rounded-full bg-surface hover:bg-primary-50 text-text-secondary hover:text-primary flex items-center justify-center storybook-transition"
          title="Volume Control"
        >
          <Icon 
            name={volume === 0 ? 'VolumeX' : volume < 50 ? 'Volume1' : 'Volume2'} 
            size={14} 
          />
        </button>

        {/* Music Info */}
        <div className="hidden sm:block text-xs text-text-secondary">
          <div className="font-medium">Magical Melodies</div>
          <div className="opacity-60">Story Creation Music</div>
        </div>
      </div>

      {/* Music Visualization */}
      {isPlaying && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex items-end space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-gradient-to-t from-primary to-secondary rounded-full animate-pulse"
              style={{
                height: `${8 + Math.random() * 12}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BackgroundMusicControls;