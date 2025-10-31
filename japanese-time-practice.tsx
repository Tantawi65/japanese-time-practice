import React, { useState, useEffect } from 'react';
import { Clock, Check, X, RefreshCw } from 'lucide-react';

export default function JapaneseTimePractice() {
  const [currentTime, setCurrentTime] = useState({ hour: 0, minute: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [showReference, setShowReference] = useState(false);

  const hours = ['reiji', 'ichiji', 'niji', 'sanji', 'yoji', 'goji', 'rokuji', 
                 'shichiji', 'hachiji', 'kuji', 'juuji', 'juuichiji'];

  const generateTime = () => {
    const hour = Math.floor(Math.random() * 12);
    const minute = Math.random() < 0.5 ? 0 : 30;
    setCurrentTime({ hour, minute });
    setUserAnswer('');
    setShowResult(false);
    
    let answer = hours[hour];
    if (minute === 30) {
      answer += ' han';
    }
    setCorrectAnswer(answer);
  };

  useEffect(() => {
    generateTime();
  }, []);

  const checkAnswer = () => {
    const normalizedUser = userAnswer.toLowerCase().trim().replace(/\s+/g, ' ');
    const normalizedCorrect = correctAnswer.toLowerCase().trim();
    
    setIsCorrect(normalizedUser === normalizedCorrect);
    setShowResult(true);
  };

  const formatTime = (hour, minute) => {
    const displayHour = hour === 0 ? 12 : hour;
    return `${displayHour}:${minute.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Time Practice</h1>
          </div>
          <p className="text-gray-600">Japanese Midterm Prep</p>
        </div>

        <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-8 mb-6">
          <div className="text-center">
            <div className="text-6xl font-bold text-gray-800 mb-2">
              {formatTime(currentTime.hour, currentTime.minute)}
            </div>
            <p className="text-gray-600 text-sm">What time is this in Japanese?</p>
          </div>
        </div>

        {!showResult ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your answer (romaji):
              </label>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., goji"
                autoFocus
              />
            </div>
            <button
              onClick={checkAnswer}
              disabled={!userAnswer.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Check Answer
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'}`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <>
                    <Check className="w-6 h-6 text-green-600" />
                    <span className="font-bold text-green-800 text-lg">Correct!</span>
                  </>
                ) : (
                  <>
                    <X className="w-6 h-6 text-red-600" />
                    <span className="font-bold text-red-800 text-lg">Not quite!</span>
                  </>
                )}
              </div>
              <div className="text-sm text-gray-700">
                <p className="mb-1"><strong>Your answer:</strong> {userAnswer}</p>
                <p><strong>Correct answer:</strong> {correctAnswer}</p>
              </div>
            </div>
            <button
              onClick={generateTime}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Next Question
            </button>
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <button
            onClick={() => setShowReference(!showReference)}
            className="w-full text-left font-semibold text-gray-800 mb-2 text-sm flex items-center justify-between hover:text-blue-600 transition-colors"
          >
            <span>Quick Reference</span>
            <span className="text-lg">{showReference ? '−' : '+'}</span>
          </button>
          {showReference && (
            <div className="text-xs text-gray-600 space-y-1 mt-2">
              <p>• Hours: ichiji (1), niji (2), sanji (3), yoji (4), goji (5), rokuji (6)</p>
              <p>• shichiji (7), hachiji (8), kuji (9), juuji (10), juuichiji (11), reiji (12)</p>
              <p>• Half past: add "han" (e.g., "goji han" = 5:30)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}