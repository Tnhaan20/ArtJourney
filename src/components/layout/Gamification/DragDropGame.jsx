import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGamificationForm } from '@/hooks/Gamification/use-gamification-form';
import { useAuthStore } from '@/domains/store/use-auth-store';
import { useToast } from '@/utils/Toast';
import {
  Timer,
  Trophy,
  Star,
  ArrowLeft,
  RotateCcw,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  Medal,
  Zap,
  Target,
  Crown,
  Sparkles,
  Award,
  Gift,
  Flame,
  Music,
  Volume2,
  VolumeX
} from 'lucide-react';

export default function DragDropGame({ courseId, challengeId, challengeData, challengeInfo, autoStart = false }) {
  const navigate = useNavigate();
  const { useSessionForm } = useGamificationForm();
  const { getCurrentUser } = useAuthStore();
  const { toast } = useToast();
  
  // Get user info
  const { user } = getCurrentUser();
  
  // Game state
  const [gameState, setGameState] = useState(autoStart ? 'playing' : 'ready');
  const [timeLeft, setTimeLeft] = useState(challengeData.challenge.durationSeconds);
  const [score, setScore] = useState(0);
  const [matches, setMatches] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [gameStartTime, setGameStartTime] = useState(autoStart ? Date.now() : null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [perfectMatch, setPerfectMatch] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [dragOverTarget, setDragOverTarget] = useState(null);

  const { challenge, artworks, details } = challengeData;

  // Session form
  const { 
    form: sessionForm, 
    onSubmit: submitSession, 
    isLoading: isSubmitting,
    isSuccess: sessionSuccess,
    error: sessionError 
  } = useSessionForm();

  // Auto start effect
  useEffect(() => {
    if (autoStart) {
      startGame();
    }
  }, [autoStart]);

  // Timer effect with exciting animations
  useEffect(() => {
    let interval;
    if (gameState === 'playing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleGameEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, timeLeft]);

  // Combo effect
  useEffect(() => {
    if (showCombo) {
      const timer = setTimeout(() => setShowCombo(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showCombo]);

  // Toast notifications
  useEffect(() => {
    if (sessionSuccess) {
      toast({
        title: "🎉 Amazing!",
        description: "Your wonderful performance has been saved!",
        variant: "success",
      });
    }
    if (sessionError) {
      toast({
        title: "😅 Oops!",
        description: "Couldn't save your progress. But don't worry, you can try again!",
        variant: "destructive",
      });
    }
  }, [sessionSuccess, sessionError, toast]);

  // Start game
  const startGame = () => {
    setGameState('playing');
    setGameStartTime(Date.now());
    setTimeLeft(challenge.durationSeconds);
    setScore(0);
    setMatches({});
    setCombo(0);
  };

  // Handle game end
  const handleGameEnd = () => {
    setGameState('finished');
    const endTime = Date.now();
    const totalTime = Math.floor((endTime - gameStartTime) / 1000);
    setTimeTaken(totalTime);
    
    // Calculate final score with combo bonus
    const correctMatches = Object.entries(matches).filter(([artworkId, detailId]) => {
      const detail = details.find(d => d.id === parseInt(detailId));
      return detail && detail.correctMatch === parseInt(artworkId);
    }).length;
    
    const baseScore = (correctMatches / details.length) * 100;
    const timeBonus = Math.max(0, (challenge.durationSeconds - totalTime) / challenge.durationSeconds * 20);
    const comboBonus = combo * 5;
    const finalScore = Math.min(100, baseScore + timeBonus + comboBonus);
    
    setScore(finalScore);
    setPerfectMatch(correctMatches === details.length);
    
    // Submit session using form
    submitGameSession(finalScore, totalTime, correctMatches === details.length);
  };

  // Submit session using form
  const submitGameSession = (finalScore, totalTime, isCompleted) => {
    if (!user?.id) {
      toast({
        title: "🔐 Authentication Required",
        description: "Please login to save your progress!",
        variant: "destructive",
      });
      return;
    }

    const sessionData = {
      userId: user.userId,
      challengeId: parseInt(challengeId),
      score: Math.round(finalScore),
      timeTaken: totalTime,
      isCompleted,
    };

    // Set form data and submit
    sessionForm.setValue('userId', sessionData.userId);
    sessionForm.setValue('challengeId', sessionData.challengeId);
    sessionForm.setValue('score', sessionData.score);
    sessionForm.setValue('timeTaken', sessionData.timeTaken);
    sessionForm.setValue('isCompleted', sessionData.isCompleted);

    // Submit form
    submitSession();
  };

  // Handle drag start
  const handleDragStart = (e, detail) => {
    setDraggedItem(detail);
    e.dataTransfer.effectAllowed = 'move';
    e.target.style.opacity = '0.5';
  };

  // Handle drag end
  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDragOverTarget(null);
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Handle drag enter
  const handleDragEnter = (e, artwork) => {
    e.preventDefault();
    setDragOverTarget(artwork.id);
  };

  // Handle drag leave
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOverTarget(null);
  };

  // Handle drop with enhanced feedback
  const handleDrop = (e, artwork) => {
    e.preventDefault();
    setDragOverTarget(null);
    
    if (draggedItem && gameState === 'playing') {
      const newMatches = { ...matches };
      
      // Remove any existing match for this artwork
      Object.keys(newMatches).forEach(key => {
        if (newMatches[key] === draggedItem.id) {
          delete newMatches[key];
        }
      });
      
      // Add new match
      newMatches[artwork.id] = draggedItem.id;
      setMatches(newMatches);
      
      // Check if correct match
      const detail = details.find(d => d.id === draggedItem.id);
      const isCorrect = detail && detail.correctMatch === artwork.id;
      
      if (isCorrect) {
        setCombo(prev => prev + 1);
        setShowCombo(true);
      } else {
        setCombo(0);
      }
      
      // Check if all matches are made
      if (Object.keys(newMatches).length === details.length) {
        setTimeout(() => handleGameEnd(), 1500);
      }
    }
    
    setDraggedItem(null);
  };

  // Format time with colors
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get time color based on remaining time
  const getTimeColor = () => {
    const percentage = (timeLeft / challenge.durationSeconds) * 100;
    if (percentage > 50) return 'text-green-700 bg-green-100 border-green-300';
    if (percentage > 25) return 'text-amber-700 bg-amber-100 border-amber-300';
    return 'text-red-700 bg-red-100 border-red-300 animate-pulse';
  };

  // Get match result
  const getMatchResult = (artworkId) => {
    const matchedDetailId = matches[artworkId];
    if (!matchedDetailId) return null;
    
    const detail = details.find(d => d.id === matchedDetailId);
    const isCorrect = detail && detail.correctMatch === artworkId;
    
    return { detail, isCorrect };
  };

  // Restart game
  const restartGame = () => {
    setGameState('playing');
    setTimeLeft(challenge.durationSeconds);
    setScore(0);
    setMatches({});
    setDraggedItem(null);
    setGameStartTime(Date.now());
    setTimeTaken(0);
    setCombo(0);
    setPerfectMatch(false);
  };

  // Get score color and icon
  const getScoreDisplay = () => {
    if (score >= 90) return { color: 'text-amber-800 bg-amber-100 border-amber-400', icon: <Crown className="w-5 h-5" /> };
    if (score >= 75) return { color: 'text-orange-800 bg-orange-100 border-orange-400', icon: <Trophy className="w-5 h-5" /> };
    if (score >= 50) return { color: 'text-yellow-800 bg-yellow-100 border-yellow-400', icon: <Medal className="w-5 h-5" /> };
    return { color: 'text-gray-700 bg-gray-100 border-gray-300', icon: <Target className="w-5 h-5" /> };
  };

  const scoreDisplay = getScoreDisplay();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-yellow-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-amber-200 to-yellow-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-br from-orange-200 to-amber-300 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
        ))}
      </div>

      {/* Combo Display */}
      {showCombo && combo > 1 && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-2xl text-2xl font-bold flex items-center space-x-2">
            <Flame className="w-6 h-6" />
            <span>COMBO x{combo}!</span>
            <Flame className="w-6 h-6" />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-md border-b border-amber-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(`/learn/course/${courseId}`)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-all duration-200 bg-white/70 hover:bg-white/90 px-4 py-2 rounded-xl backdrop-blur-sm border border-amber-200 shadow-md"
              >
                <ArrowLeft size={20} />
                <span className="font-medium">Back to Course</span>
              </button>
              <div className="h-8 w-px bg-amber-300" />
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">{challenge.name}</h1>
                  <p className="text-amber-600 text-sm">Art Matching Challenge</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Sound Toggle */}
              

              {/* Timer */}
              {gameState === 'playing' && (
                <div className={`flex items-center space-x-3 ${getTimeColor()} border rounded-xl px-4 py-3 backdrop-blur-sm shadow-lg`}>
                  <Timer className="w-5 h-5" />
                  <div className="text-center">
                    <div className="font-mono text-xl font-bold">{formatTime(timeLeft)}</div>
                    <div className="text-xs opacity-75">Time Left</div>
                  </div>
                </div>
              )}
              
              {/* Score */}
              <div className={`flex items-center space-x-3 ${scoreDisplay.color} border rounded-xl px-4 py-3 backdrop-blur-sm shadow-lg`}>
                {scoreDisplay.icon}
                <div className="text-center">
                  <div className="text-xl font-bold">{Math.round(score)}</div>
                  <div className="text-xs opacity-75">Score</div>
                </div>
              </div>

              {/* Combo */}
              {combo > 1 && (
                <div className="flex items-center space-x-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white border border-amber-300 rounded-xl px-4 py-3 shadow-lg animate-pulse">
                  <Flame className="w-5 h-5" />
                  <div className="text-center">
                    <div className="text-xl font-bold">x{combo}</div>
                    <div className="text-xs opacity-90">Combo</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Game State: Ready */}
        {gameState === 'ready' && !autoStart && (
          <div className="text-center max-w-3xl mx-auto">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-amber-200">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <Crown className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-yellow-800" />
                </div>
              </div>
              
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Ready to Master Art?
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Step into the beautiful world of masterpieces! Match each artwork with its correct artist, period, and year.
                You have <span className="font-bold text-amber-600">{formatTime(challenge.durationSeconds)}</span> to become an art expert!
              </p>
              
              <div className="bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Award className="w-6 h-6 text-amber-600" />
                  <h3 className="font-bold text-amber-800 text-xl">Game Rules</h3>
                  <Award className="w-6 h-6 text-amber-600" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-amber-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                      <span className="text-amber-800 font-bold text-sm">1</span>
                    </div>
                    <span>Drag artist cards to artworks</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                      <span className="text-amber-800 font-bold text-sm">2</span>
                    </div>
                    <span>Build combos for bonus points</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                      <span className="text-amber-800 font-bold text-sm">3</span>
                    </div>
                    <span>Match all before time runs out</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                      <span className="text-amber-800 font-bold text-sm">4</span>
                    </div>
                    <span>Earn time bonus for speed</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={startGame}
                className="group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-3 mx-auto"
              >
                <Play size={24} />
                <span>Start Your Art Journey</span>
                <Sparkles className="w-5 h-5 group-hover:animate-spin" />
              </button>
            </div>
          </div>
        )}

        {/* Game State: Playing */}
        {gameState === 'playing' && (
          <div className="space-y-8">
            {/* Game Instructions */}
            <div className="bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full p-3">
                  <Zap size={20} />
                </div>
                <h3 className="font-bold text-amber-800 text-xl">How to Play</h3>
              </div>
              <p className="text-amber-700 text-center">
                🎨 Drag the <span className="font-bold text-amber-800">artist information cards</span> and drop them on the correct artwork. 
                Build combos for bonus points! ⚡
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
              {/* Artworks */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Masterpieces</h3>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {artworks.map((artwork) => {
                    const matchResult = getMatchResult(artwork.id);
                    const isDropTarget = dragOverTarget === artwork.id;
                    
                    return (
                      <div
                        key={artwork.id}
                        className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border-2 transition-all duration-500 transform hover:scale-105 ${
                          matchResult
                            ? matchResult.isCorrect
                              ? 'border-green-400 bg-green-50 shadow-green-200'
                              : 'border-red-400 bg-red-50 shadow-red-200'
                            : isDropTarget
                            ? 'border-amber-400 bg-amber-50 shadow-amber-200 scale-105'
                            : 'border-amber-200 hover:border-amber-300'
                        }`}
                        onDragOver={handleDragOver}
                        onDragEnter={(e) => handleDragEnter(e, artwork)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, artwork)}
                      >
                        {/* Artwork Image */}
                        <div className="aspect-square relative overflow-hidden">
                          <img
                            src={artwork.image}
                            alt={artwork.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          {isDropTarget && (
                            <div className="absolute inset-0 bg-amber-400/30 backdrop-blur-sm flex items-center justify-center">
                              <div className="text-white font-bold text-lg animate-pulse">Drop Here!</div>
                            </div>
                          )}
                          {matchResult && (
                            <div className="absolute top-4 right-4">
                              {matchResult.isCorrect ? (
                                <div className="bg-green-500 text-white p-2 rounded-full shadow-lg animate-bounce">
                                  <CheckCircle className="w-6 h-6" />
                                </div>
                              ) : (
                                <div className="bg-red-500 text-white p-2 rounded-full shadow-lg animate-pulse">
                                  <XCircle className="w-6 h-6" />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        
                        {/* Artwork Info */}
                        <div className="p-6">
                          <h4 className="font-bold text-gray-800 text-lg mb-4">{artwork.title}</h4>
                          
                          {matchResult && (
                            <div className={`p-4 rounded-xl ${
                              matchResult.isCorrect 
                                ? 'bg-green-100 border border-green-300' 
                                : 'bg-red-100 border border-red-300'
                            }`}>
                              <div className="flex items-center justify-between mb-2">
                                <span className={`font-bold ${
                                  matchResult.isCorrect ? 'text-green-700' : 'text-red-700'
                                }`}>
                                  {matchResult.detail.artist}
                                </span>
                                {matchResult.isCorrect && <Gift className="w-5 h-5 text-green-600" />}
                              </div>
                              <p className={`text-sm ${
                                matchResult.isCorrect ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {matchResult.detail.period} • {matchResult.detail.year}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Medal className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Artist Information</h3>
                </div>
                
                <div className="space-y-4">
                  {details.map((detail) => {
                    const isUsed = Object.values(matches).includes(detail.id);
                    const isDragging = draggedItem?.id === detail.id;
                    
                    return (
                      <div
                        key={detail.id}
                        className={`group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-2 transition-all duration-300 transform ${
                          isUsed 
                            ? 'border-gray-300 opacity-50 scale-95' 
                            : isDragging
                            ? 'border-amber-400 bg-amber-50 shadow-amber-200 scale-105 rotate-2'
                            : 'border-amber-200 hover:border-amber-300 hover:bg-amber-50 cursor-move hover:scale-105'
                        }`}
                        draggable={!isUsed}
                        onDragStart={(e) => handleDragStart(e, detail)}
                        onDragEnd={handleDragEnd}
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                              <h4 className="font-bold text-gray-800 text-lg">{detail.artist}</h4>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                              <span className="text-sm">{detail.period}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                              <span className="text-sm">{detail.year}</span>
                            </div>
                          </div>
                          
                          {isUsed ? (
                            <div className="bg-green-100 p-3 rounded-full">
                              <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                          ) : (
                            <div className="bg-amber-100 p-3 rounded-full group-hover:bg-amber-200 transition-colors">
                              <Target className="w-6 h-6 text-amber-600 group-hover:text-amber-700" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Game State: Finished */}
        {gameState === 'finished' && (
          <div className="text-center max-w-3xl mx-auto">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-amber-200">
              <div className="relative mb-8">
                <div className="w-28 h-28 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  {perfectMatch ? <Crown className="w-14 h-14 text-white" /> : <Medal className="w-14 h-14 text-white" />}
                </div>
                {perfectMatch && (
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                    <Sparkles className="w-6 h-6 text-yellow-800" />
                  </div>
                )}
              </div>
              
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                {perfectMatch ? '🏆 Perfect Match!' : '🎨 Challenge Complete!'}
              </h2>
              
              <p className="text-gray-600 text-lg mb-8">
                {perfectMatch 
                  ? 'Outstanding! You\'ve achieved perfect mastery of art matching!' 
                  : 'Great job! You\'ve completed the art challenge beautifully!'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 rounded-2xl p-6">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <Trophy className="w-6 h-6 text-amber-600" />
                    <span className="font-bold text-amber-800">Final Score</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-800">{Math.round(score)}</p>
                  <p className="text-amber-700 text-sm mt-1">
                    {score >= 90 ? 'Legendary!' : score >= 75 ? 'Excellent!' : score >= 50 ? 'Good!' : 'Keep practicing!'}
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 rounded-2xl p-6">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <Timer className="w-6 h-6 text-yellow-600" />
                    <span className="font-bold text-yellow-800">Time Taken</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-800">{formatTime(timeTaken)}</p>
                  <p className="text-yellow-700 text-sm mt-1">
                    {timeTaken < challenge.durationSeconds * 0.5 ? 'Lightning fast!' : 'Well done!'}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-300 rounded-2xl p-6">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <Flame className="w-6 h-6 text-orange-600" />
                    <span className="font-bold text-orange-800">Max Combo</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-800">x{combo}</p>
                  <p className="text-orange-700 text-sm mt-1">
                    {combo > 3 ? 'Combo master!' : combo > 1 ? 'Nice streak!' : 'Try combos!'}
                  </p>
                </div>
              </div>

              {/* Submission Status */}
              {isSubmitting && (
                <div className="bg-amber-100 border border-amber-300 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-amber-600 border-t-transparent"></div>
                    <span className="text-amber-800 font-medium">Saving your progress...</span>
                  </div>
                </div>
              )}

              {sessionSuccess && (
                <div className="bg-green-100 border border-green-300 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span className="text-green-800 font-medium">Progress saved successfully!</span>
                  </div>
                </div>
              )}

              {sessionError && (
                <div className="bg-red-100 border border-red-300 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-center space-x-3">
                    <XCircle className="w-6 h-6 text-red-600" />
                    <span className="text-red-800 font-medium">Couldn't save progress. Try again!</span>
                  </div>
                </div>
              )}
              
              <div className="flex justify-center space-x-6">
                <button
                  onClick={restartGame}
                  className="group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-3"
                  disabled={isSubmitting}
                >
                  <RotateCcw size={20} />
                  <span>Play Again</span>
                  <Sparkles className="w-5 h-5 group-hover:animate-spin" />
                </button>
                
                <button
                  onClick={() => navigate(`/learn/course/${courseId}`)}
                  className="bg-white/80 hover:bg-white/90 text-gray-700 px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm border border-amber-200"
                >
                  Back to Course
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
