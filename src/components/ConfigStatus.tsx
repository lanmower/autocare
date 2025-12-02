import React from 'react';
import { useConfig } from '../hooks/useConfig';

/**
 * Development component to show the status of configuration loading
 * This helps developers understand whether CMS data is loading properly
 */
export function ConfigStatus() {
  const { config, loading, error, cmsDataLoaded } = useConfig();

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: '#f0f0f0',
      border: '1px solid #ccc',
      borderRadius: '4px',
      padding: '8px 12px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px',
      fontFamily: 'monospace'
    }}>
      <div><strong>Configuration Status</strong></div>
      
      <div style={{ marginTop: '4px' }}>
        Loading: {loading ? '🔄 Yes' : '✅ No'}
      </div>
      
      <div>
        CMS Data: {cmsDataLoaded ? '✅ Loaded' : '❌ Fallback'}
      </div>
      
      <div>
        Services: {config.services.length} items
      </div>
      
      <div>
        Portfolio: {config.portfolio.length} items  
      </div>
      
      <div>
        Testimonials: {config.testimonials.length} items
      </div>
      
      <div>
        Process Steps: {config.process.length} items
      </div>
      
      <div>
        Business Hours: {config.businessHours.length} items
      </div>

      {error && (
        <div style={{ color: 'red', marginTop: '4px' }}>
          Error: {error}
        </div>
      )}
      
      {config.dataSource.errors.length > 0 && (
        <div style={{ color: 'orange', marginTop: '4px' }}>
          Warnings: {config.dataSource.errors.length}
        </div>
      )}
      
      <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.7 }}>
        Updated: {config.dataSource.lastUpdated.toLocaleTimeString()}
      </div>
    </div>
  );
}

export default ConfigStatus;