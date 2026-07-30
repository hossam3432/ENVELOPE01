import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "envelope01_consent_preferences";

// Fired by anything that wants to reopen the preferences modal (e.g. the
// "Cookie Settings" footer link) without threading state through the tree.
export const OPEN_PREFERENCES_EVENT = "envelope01:open-consent-preferences";

function readStoredPrefs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return { analytics: Boolean(parsed.analytics), ads: Boolean(parsed.ads) };
  } catch {
    return null;
  }
}

function pushConsentUpdate(prefs) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push([
    "consent",
    "update",
    {
      analytics_storage: prefs.analytics ? "granted" : "denied",
      ad_storage: prefs.ads ? "granted" : "denied",
      ad_user_data: prefs.ads ? "granted" : "denied",
      ad_personalization: prefs.ads ? "granted" : "denied",
    },
  ]);
}

export default function useConsent() {
  const [prefs, setPrefs] = useState({ analytics: false, ads: false });
  const [bannerOpen, setBannerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const stored = readStoredPrefs();
    if (stored) {
      setPrefs(stored);
    } else {
      setBannerOpen(true);
    }

    const onOpenPreferences = () => setModalOpen(true);
    window.addEventListener(OPEN_PREFERENCES_EVENT, onOpenPreferences);
    return () =>
      window.removeEventListener(OPEN_PREFERENCES_EVENT, onOpenPreferences);
  }, []);

  const commit = useCallback((next) => {
    setPrefs(next);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...next, updatedAt: Date.now() })
    );
    pushConsentUpdate(next);
    setBannerOpen(false);
    setModalOpen(false);
  }, []);

  const acceptAll = useCallback(
    () => commit({ analytics: true, ads: true }),
    [commit]
  );
  const rejectAll = useCallback(
    () => commit({ analytics: false, ads: false }),
    [commit]
  );
  const savePreferences = useCallback((custom) => commit(custom), [commit]);

  return {
    prefs,
    bannerOpen,
    modalOpen,
    openModal: () => setModalOpen(true),
    closeModal: () => setModalOpen(false),
    acceptAll,
    rejectAll,
    savePreferences,
  };
}
