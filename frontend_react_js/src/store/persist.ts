const PERSIST_KEY = "vizai_store_v1";

export function loadPersist(): any | null {
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function savePersist(state: any) {
  try {
    const toPersist = {
      animal: state.animal,
      filters: state.filters,
      // Persist only the fields that define navigation context to avoid bloat
      ui: {
        modal: state.ui?.modal ?? null,
        lastActiveTab: state.ui?.lastActiveTab ?? 'dashboard',
        globalDateRange: state.ui?.globalDateRange,
        species: state.ui?.species ?? 'giant-anteater',
      },
    };
    localStorage.setItem(PERSIST_KEY, JSON.stringify(toPersist));
  } catch {
    // ignore
  }
}
