import React, { useState } from 'react';
import './App.css';
import SiteSelector from './components/SiteSelector';
import ContentEditor from './components/ContentEditor';
import { SiteContent, SiteId } from './types/Site';
import { SiteService } from './services/SiteService';

function App() {
  const [selectedSite, setSelectedSite] = useState<SiteId | null>(null);
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSiteSelect = async (siteId: SiteId) => {
    setLoading(true);
    setError(null);
    try {
      const content = await SiteService.loadSiteContent(siteId);
      setSiteContent(content);
      setSelectedSite(siteId);
    } catch (err) {
      setError(`Failed to load content for ${siteId}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = (content: SiteContent) => {
    setSiteContent(content);
  };

  const handleSave = async () => {
    if (!siteContent) return;

    setLoading(true);
    setError(null);
    try {
      await SiteService.saveSiteContent(siteContent);
      alert('Content saved successfully!');
    } catch (err) {
      setError('Failed to save content');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Content Forge</h1>
        <p>by</p>
        <h2>Let's Create.</h2>
      </header>

      <main className="App-main">
        {!selectedSite ? (
          <SiteSelector onSiteSelect={handleSiteSelect} />
        ) : (
          <div className="editor-container">
            <div className="editor-header">
              <button
                onClick={() => setSelectedSite(null)}
                className="back-button"
              >
                ← Back to Site Selection
              </button>
              <button
                onClick={handleSave}
                className="save-button"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {siteContent && (
              <ContentEditor
                content={siteContent}
                onContentChange={handleContentChange}
              />
            )}
          </div>
        )}

        {loading && <div className="loading">Loading...</div>}
      </main>
    </div>
  );
}

export default App;
