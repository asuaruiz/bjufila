import { lazy, Suspense, type ComponentType } from "react";

// React 18's hydrateRoot can't hydrate a Suspense boundary whose lazy
// component hasn't resolved yet — it discards the SSR'd DOM and re-renders
// client-only (console errors, a visible flash). To route-split safely we
// need the *current* route's component already resolved before the first
// render/hydrate call. This wrapper exposes a `.preload()` that, once
// awaited, makes the component render synchronously (no Suspense involved)
// instead of going through `lazy()`. Other routes still code-split normally
// via `lazy()` for client-side navigation.
export function lazyPreloadable<P extends object>(loader: () => Promise<{ default: ComponentType<P> }>) {
  let Resolved: ComponentType<P> | null = null;
  const LazyComponent = lazy(async () => {
    const mod = await loader();
    Resolved = mod.default;
    return mod;
  });

  function Wrapper(props: P) {
    if (Resolved) {
      const Comp = Resolved;
      return <Comp {...props} />;
    }
    return (
      <Suspense fallback={null}>
        <LazyComponent {...props} />
      </Suspense>
    );
  }

  Wrapper.preload = async () => {
    if (!Resolved) {
      const mod = await loader();
      Resolved = mod.default;
    }
    return Resolved;
  };

  return Wrapper;
}
