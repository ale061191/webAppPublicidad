/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { View } from './types';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './views/Dashboard';
import TotemsList from './views/TotemsList';
import MediaLibrary from './views/MediaLibrary';
import Settings from './views/Settings';
import PlaylistEditor from './views/PlaylistEditor';
import Login from './views/Login';
import TotemPlayer from './views/TotemPlayer';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleViewChange = (view: View) => {
    setCurrentView(view);
  };

  if (currentView === 'player') {
    return <TotemPlayer />;
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'totems': return <TotemsList />;
      case 'media': return <MediaLibrary />;
      case 'settings': return <Settings />;
      case 'playlist': return <PlaylistEditor />;
      default: return <Dashboard />;
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'TERMINAL KINÉTICA';
      case 'totems': return 'GESTIÓN DE UNIDADES';
      case 'media': return 'BIBLIOTECA MULTIMEDIA';
      case 'settings': return 'CONFIGURACIÓN GLOBAL';
      case 'playlist': return 'EDITOR DE PLAYLIST';
      default: return 'TERMINAL KINÉTICA';
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar currentView={currentView} onViewChange={handleViewChange} />
      <TopBar 
        title={getTitle()} 
        onBack={currentView !== 'dashboard' ? () => setCurrentView('dashboard') : undefined} 
      />
      
      <main className="ml-64 pt-24 px-8 pb-12 min-h-screen">
        {renderView()}
      </main>

      {/* Floating Toggle for Player View (Demo purposes) */}
      <button 
        onClick={() => setCurrentView(currentView === 'player' ? 'dashboard' : 'player')}
        className="fixed bottom-4 right-4 z-[100] bg-primary text-on-primary p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
        title="Toggle Player View"
      >
        <Activity className="w-6 h-6" />
      </button>
    </div>
  );
}

import { Activity } from 'lucide-react';

