
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/Brian-E-Ramirez-Zea.github.io/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 5150, hash: '9c7a472a0f275b099e6dfaf9b80a0a8a627e3c1abb93fe47c2e2a7b1eb9cd417', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1039, hash: '589a0676004e9a9003eca692ebe57b772b545bf93401c350e5f1b18c6f7b632c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-HRVUD5YO.css': {size: 231059, hash: 'Ud20Z/uPlIQ', text: () => import('./assets-chunks/styles-HRVUD5YO_css.mjs').then(m => m.default)}
  },
};
