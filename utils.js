/**
 * Creates a URL path for a given page name
 * @param {string} pageName - The name of the page
 * @returns {string} - The URL path for the page
 */
export function createPageUrl(pageName) {
  const pageMap = {
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

