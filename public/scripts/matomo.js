// Matomo Setup
const _paq = (window._paq = window._paq || []);
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function () {
    const u = 'https://tracerfinance.matomo.cloud/';
    _paq.push(['setTrackerUrl', u + 'matomo.php']);
    _paq.push(['setSiteId', '2']);
    const d = document,
        g = d.createElement('script'),
        s = d.getElementsByTagName('script')[0];
    g.async = true;
    g.src = '//cdn.matomo.cloud/tracerfinance.matomo.cloud/matomo.js';
    s.parentNode.insertBefore(g, s);
})();

// Matomo tag manager
const _mtm = (window._mtm = window._mtm || []);
_mtm.push({ 'mtm.startTime': new Date().getTime(), event: 'mtm.Start' });
const d = document,
    g = d.createElement('script'),
    s = d.getElementsByTagName('script')[0];
g.async = true;
g.src = 'https://cdn.matomo.cloud/tracerfinance.matomo.cloud/container_9pOj4o6E_staging_0dde2c7af69ee784018e71f1.js';
s.parentNode.insertBefore(g, s);
