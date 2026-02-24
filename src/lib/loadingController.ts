let showLoadingGlobal: (() => void) | null = null;
let hideLoadingGlobal: (() => void) | null = null;

export function registerLoadingHandlers(show: () => void, hide: () => void) {
    showLoadingGlobal = show;
    hideLoadingGlobal = hide;
}

export function showGlobalLoading() {
    showLoadingGlobal?.();
}

export function hideGlobalLoading() {
    hideLoadingGlobal?.();
}