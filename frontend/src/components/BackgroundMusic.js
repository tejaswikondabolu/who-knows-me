import React, { useState, useRef, useEffect } from 'react';

function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log('Click to enable audio'));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} />
      <button 
        className={`music-toggle ${isPlaying ? 'playing' : ''}`}
        onClick={toggleMusic}
        title={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        {isPlaying ? '🔊' : '🔇'}
      </button>
    </>
  );
}

export default BackgroundMusic;
