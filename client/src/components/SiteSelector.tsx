import React from 'react';
import { SITE_IDS, SiteId } from '../types/Site';

interface SiteSelectorProps {
  onSiteSelect: (siteId: SiteId) => void;
}

const SiteSelector: React.FC<SiteSelectorProps> = ({ onSiteSelect }) => {
  return (
    <div className="site-selector">
      <h2>Select Site to Edit</h2>
      <div className="site-buttons">
        {SITE_IDS.map((siteId) => (
          <div key={siteId} className="site-option">
            <button
              onClick={() => onSiteSelect(siteId)}
              className="site-button"
            >
              {siteId.toUpperCase()}
            </button>
            <a 
              href={`/sites/${siteId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="site-link"
            >
              View {siteId.toUpperCase()} →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiteSelector;