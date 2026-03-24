import { motion } from 'motion/react';
import { useState } from 'react';
import { Lock } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (password: string) => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in production, this should be handled by backend
    if (password === 'ariel2024') {
      onLogin(password);
      setError('');
    } else {
      setError('סיסמא שגויה / Incorrect password');
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-12 rounded-sm shadow-lg max-w-md w-full"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#C6A667]/10 flex items-center justify-center">
            <Lock className="w-8 h-8 text-[#C6A667]" />
          </div>
        </div>

        <h1 className="text-center mb-2" style={{ 
          color: '#1A1A1A', 
          fontSize: '2rem', 
          fontWeight: 300,
          letterSpacing: '0.5px'
        }}>
          Admin Access
        </h1>

        <p className="text-center mb-8" style={{ 
          color: '#1A1A1A', 
          opacity: 0.6, 
          fontSize: '0.9rem',
          fontWeight: 300
        }}>
          כניסה למערכת ניהול / Admin Login
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label 
              htmlFor="password"
              className="block mb-2"
              style={{ 
                color: '#1A1A1A', 
                fontSize: '0.85rem',
                fontWeight: 400,
                letterSpacing: '0.5px'
              }}
            >
              Password / סיסמא
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:border-[#C6A667] focus:outline-none transition-colors"
              placeholder="Enter password"
              style={{ fontSize: '0.95rem', fontWeight: 300 }}
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-3 bg-red-50 border border-red-200 text-center"
              style={{ color: '#DC2626', fontSize: '0.85rem' }}
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-[#C6A667] text-white hover:bg-[#B89557] transition-colors duration-300"
            style={{ 
              fontSize: '0.9rem',
              fontWeight: 400,
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}
          >
            Login / התחבר
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#1A1A1A]/10">
          <p className="text-center" style={{ 
            color: '#1A1A1A', 
            opacity: 0.5, 
            fontSize: '0.75rem',
            fontWeight: 300
          }}>
            Default password: ariel2024
          </p>
        </div>
      </motion.div>
    </div>
  );
}
