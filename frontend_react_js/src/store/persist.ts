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
      ui: state.ui,
    };
    localStorage.setItem(PERSIST_KEY, JSON.stringify(toPersist));
  } catch {
    // ignore
  }
}
