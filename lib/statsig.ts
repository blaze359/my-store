

import Statsig from 'statsig-node';
let statsigInitialized = false;

// Move getStableID to outer scope
function getStableID() {
  if (typeof globalThis !== 'undefined' && globalThis.localStorage?.getItem) {
    let stableID = globalThis.localStorage.getItem('statsigStableID');
    if (!stableID) {
      stableID = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now();
      globalThis.localStorage.setItem('statsigStableID', stableID);
    }
    return stableID;
  }
  // Node.js fallback
  return (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now();
}

export async function getStatsigInstance() {
  if (!statsigInitialized) {
    await Statsig.initialize(process.env.STATSIG_SERVER_SECRET_KEY || '');
    statsigInitialized = true;
  }
  return Statsig;
}


export async function getDynamicConfig(key: string, user?: { locale?: string }) {
  const statsig = await getStatsigInstance();
  const stableId = getStableID();
  const locale = user?.locale;
  const statsigUser = {
    // No userID while logged out
    customIDs: { stableID: stableId },
    custom: {
      ...(locale ? { locale } : {}),
    },
  };

  // getConfig expects (user, key) and is synchronous
  const config = statsig.getConfig(statsigUser, key);
  return config?.value ?? null;
}
