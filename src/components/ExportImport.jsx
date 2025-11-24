import React, { useState } from 'react';
import { Save, Trash2, BarChart3, Palette, Settings, CheckSquare, X, Volume2, Clipboard, FolderOpen, Check } from 'lucide-react';
import './ExportImport.css';

/**
 * Export/Import Component
 * Allows backing up and restoring app data
 */
const ExportImport = () => {
  const [importStatus, setImportStatus] = useState('');

  // Export all data to JSON file
  const handleExport = () => {
    try {
      const data = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        statistics: localStorage.getItem('mercurial-statistics'),
        tasks: localStorage.getItem('mercurial-tasks'),
        soundEnabled: localStorage.getItem('mercurial-sound-enabled'),
        soundVolume: localStorage.getItem('mercurial-sound-volume'),
        soundType: localStorage.getItem('mercurial-sound-type'),
        theme: localStorage.getItem('mercurial-theme'),
        openSidebarSection: localStorage.getItem('openSidebarSection')
      };

      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `mercurial-timer-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setImportStatus('Export successful!');
      setTimeout(() => setImportStatus(''), 3000);
    } catch {
      setImportStatus('Export failed. Please try again.');
      setTimeout(() => setImportStatus(''), 3000);
    }
  };

  // Import data from JSON file
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        // Validate data structure
        if (!data.version) {
          throw new Error('Invalid backup file');
        }

        // Restore data
        if (data.statistics) localStorage.setItem('mercurial-statistics', data.statistics);
        if (data.tasks) localStorage.setItem('mercurial-tasks', data.tasks);
        if (data.soundEnabled) localStorage.setItem('mercurial-sound-enabled', data.soundEnabled);
        if (data.soundVolume) localStorage.setItem('mercurial-sound-volume', data.soundVolume);
        if (data.soundType) localStorage.setItem('mercurial-sound-type', data.soundType);
        if (data.theme) localStorage.setItem('mercurial-theme', data.theme);
        if (data.openSidebarSection) localStorage.setItem('openSidebarSection', data.openSidebarSection);

        setImportStatus('Import successful! Refresh page to see changes.');
      } catch {
        setImportStatus('Import failed. Invalid file.');
        setTimeout(() => setImportStatus(''), 3000);
      }
    };

    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  // Clear all data
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear ALL data? This cannot be undone!')) {
      try {
        localStorage.removeItem('mercurial-statistics');
        localStorage.removeItem('mercurial-tasks');
        localStorage.removeItem('mercurial-sound-enabled');
        localStorage.removeItem('mercurial-sound-volume');
        localStorage.removeItem('mercurial-sound-type');
        localStorage.removeItem('mercurial-theme');
        localStorage.removeItem('openSidebarSection');
        
        setImportStatus('All data cleared! Refresh page.');
      } catch {
        setImportStatus('Failed to clear data.');
        setTimeout(() => setImportStatus(''), 3000);
      }
    }
  };

  return (
    <div className="export-import-container">
      <p className="section-description">
        Backup and restore your timer data, tasks, and settings.
      </p>

      {/* Export Button */}
      <button 
        className="export-btn"
        onClick={handleExport}
      >
        <Save size={16} style={{verticalAlign: 'middle', marginRight: '6px'}} /> Export Data
      </button>

      {/* Import Button */}
      <label className="import-btn-wrapper">
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="import-input"
        />
        <span className="import-btn">
          <FolderOpen size={16} style={{marginRight: '6px'}} />
          Import Data
        </span>
      </label>

      {/* Clear All Button */}
      <button 
        className="clear-all-btn"
        onClick={handleClearAll}
      >
        <Trash2 size={16} style={{verticalAlign: 'middle', marginRight: '6px'}} /> Clear All Data
      </button>

      {/* Status Message */}
      {importStatus && (
        <div className={`import-status ${importStatus.includes('failed') || importStatus.includes('Failed') ? 'error' : 'success'}`}>
          {importStatus}
        </div>
      )}

      {/* What's Included */}
      <div className="data-info">
        <h5>What's Included:</h5>
        <ul>
          <li><BarChart3 size={14} style={{verticalAlign: 'middle', marginRight: '6px'}} /> Statistics & Session History</li>
          <li><Clipboard size={14} style={{display: 'inline', marginRight: '6px'}} /> Tasks & Task History</li>
          <li><Volume2 size={14} style={{display: 'inline', marginRight: '6px'}} /> Sound Settings</li>
          <li><Palette size={14} style={{verticalAlign: 'middle', marginRight: '6px'}} /> Theme Preference</li>
          <li><Settings size={14} style={{verticalAlign: 'middle', marginRight: '6px'}} /> UI Preferences</li>
        </ul>
      </div>
    </div>
  );
};

export default ExportImport;
