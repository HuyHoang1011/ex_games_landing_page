'use client';

import { useEffect } from 'react';

import { bootstrapLandingSession } from '@/modules/landing-session/utils/landing-session.bootstrap';

export default function LandingSessionBootstrap() {
  useEffect(() => {
    bootstrapLandingSession();
  }, []);

  return null;
}
