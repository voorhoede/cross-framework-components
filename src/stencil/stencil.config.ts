import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'socialshare',
  outputTargets:[
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
