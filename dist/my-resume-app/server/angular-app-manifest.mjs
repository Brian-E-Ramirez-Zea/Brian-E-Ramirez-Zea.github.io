
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 5120, hash: '8b3fcd9ca525cb85ef1a4081b286df5601229f4d30f23e59cc6b695433ab5234', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1009, hash: '7b7e21592c36a14e1b1e3ac5790705fb174b6bbb23aac24d335781f8ad0da2b6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-HRVUD5YO.css': {size: 231059, hash: 'Ud20Z/uPlIQ', text: () => import('./assets-chunks/styles-HRVUD5YO_css.mjs').then(m => m.default)}
  },
};
