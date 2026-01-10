export type PageName = 
  | 'Dashboard'
  | 'Signals'
  | 'RebalancePacket'
  | 'Portfolio'
  | 'Performance'
  | 'Risk'
  | 'TaxTLH'
  | 'LogsAudit'
  | 'Settings';

/**
 * Creates a URL path for a given page name
 */
export function createPageUrl(pageName: PageName): string {
  const pageMap: Record<PageName, string> = {
    Dashboard: '/dashboard',
    Signals: '/signals',
    RebalancePacket: '/rebalance-packet',
    Portfolio: '/portfolio',
    Performance: '/performance',
    Risk: '/risk',
    TaxTLH: '/tax-tlh',
    LogsAudit: '/logs-audit',
    Settings: '/settings',
  };

  return pageMap[pageName] || '/dashboard';
}
