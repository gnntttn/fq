let isOneSignalInitialized = false;

export const initializeOneSignal = () => {
  if (typeof window === 'undefined' || !('OneSignalDeferred' in window) || isOneSignalInitialized) {
    return;
  }
  
  // OneSignal is configured to only run on the production domain.
  // Skip initialization on other domains (like localhost or preview URLs) to prevent errors.
  const productionHostname = 'aya00.netlify.app';
  if (window.location.hostname !== productionHostname) {
    console.log(`OneSignal initialization skipped. Current hostname (${window.location.hostname}) is not the configured production hostname (${productionHostname}).`);
    return;
  }

  isOneSignalInitialized = true;

  window.OneSignalDeferred.push(function(OneSignal) {
    const ONESIGNAL_APP_ID = import.meta.env.VITE_ONESIGNAL_APP_ID;

    if (!ONESIGNAL_APP_ID || ONESIGNAL_APP_ID.includes('YOUR_ONESIGNAL_APP_ID') || ONESIGNAL_APP_ID.includes('***')) {
      console.warn('OneSignal App ID is not configured. Push notifications will be disabled.');
      isOneSignalInitialized = false;
      return;
    }

    OneSignal.init({
      appId: ONESIGNAL_APP_ID,
      safari_web_id: "web.onesignal.auto.123456-7890-etc",
      allowLocalhostAsSecureOrigin: true,
      promptOptions: {
        slidedown: {
          enabled: true,
          autoPrompt: true,
          timeDelay: 5,
          pageViews: 1,
        },
      },
    }).then(() => {
      console.log("OneSignal Initialized Successfully");
    }).catch((error: any) => {
      console.error("OneSignal initialization error:", error);
      if (error.message !== 'SDK already initialized') {
         isOneSignalInitialized = false;
      }
    });
  });
};
