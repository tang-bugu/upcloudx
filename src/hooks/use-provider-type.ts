import type { ProviderTypeMap, ProviderTypeReturn } from './types';

const DEFAULT_PROVIDER_MAP: ProviderTypeMap = {
  aws: 'AWS',
  cloudflare: 'Cloudflare',
  gcp: 'GCP',
};

export function useProviderType(customMap?: ProviderTypeMap): ProviderTypeReturn {
  const providerMap: ProviderTypeMap = {};

  for (const [key, value] of Object.entries(DEFAULT_PROVIDER_MAP)) {
    providerMap[key.toLowerCase()] = value;
  }
  if (customMap) {
    for (const [key, value] of Object.entries(customMap)) {
      providerMap[key.toLowerCase()] = value;
    }
  }

  const formatProviderType = (providerType: string): string => {
    const lowerKey = providerType.toLowerCase();
    if (Object.prototype.hasOwnProperty.call(providerMap, lowerKey)) {
      return providerMap[lowerKey] as string;
    }
    return providerType.toUpperCase();
  };

  return { formatProviderType };
}
