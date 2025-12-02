import { useState, useEffect } from 'react';
import { getConfig, getConfigSync } from '../data/config';
import type { UnifiedConfig } from '../data/unifiedConfig';

interface UseConfigResult {
  config: UnifiedConfig;
  loading: boolean;
  error: string | null;
  cmsDataLoaded: boolean;
}

/**
 * React hook for accessing the unified configuration
 * Starts with synchronous fallback data and loads CMS data asynchronously
 */
export function useConfig(): UseConfigResult {
  const [config, setConfig] = useState<UnifiedConfig>(getConfigSync());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadConfig() {
      try {
        setLoading(true);
        setError(null);
        
        const unifiedConfig = await getConfig();
        
        if (isMounted) {
          setConfig(unifiedConfig);
          setLoading(false);
          
          // Log status for debugging
          if (unifiedConfig.dataSource.cmsLoaded) {
            console.log('✅ CMS data loaded successfully');
          } else if (unifiedConfig.dataSource.errors.length > 0) {
            console.warn('⚠️ CMS data failed to load:', unifiedConfig.dataSource.errors);
          }
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error loading config';
          setError(errorMessage);
          setLoading(false);
          console.error('❌ Failed to load config:', err);
        }
      }
    }

    loadConfig();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    config,
    loading,
    error,
    cmsDataLoaded: config.dataSource.cmsLoaded
  };
}

/**
 * Hook that provides only the static configuration (no CMS loading)
 * Use this for components that don't need dynamic CMS content
 */
export function useStaticConfig() {
  return getConfigSync();
}