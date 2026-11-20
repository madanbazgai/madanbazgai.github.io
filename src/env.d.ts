declare module "virtual:pwa-register" {
  export function registerSW(options?: { immediate?: boolean }): (reload?: boolean) => Promise<void>;
}

declare module "virtual:pwa-info" {
  export const pwaInfo: { webManifest: { linkTag: string } } | undefined;
}
