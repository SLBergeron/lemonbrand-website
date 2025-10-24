'use client';

import React, { useEffect } from 'react';
import Intercom from '@intercom/messenger-js-sdk';

export function IntercomMessenger() {
  useEffect(() => {
    Intercom({
      app_id: 'm98ah6je',
    });
  }, []);

  return null;
}
