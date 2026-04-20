import { launchImageLibrary, type Asset } from "react-native-image-picker";

/** Bare absolute paths (common on Android) must be `file://…` or RN multipart upload often throws `Network request failed`. */
export function ensureFileUriForMultipart(s: string): string {
  const t = String(s).trim();
  if (!t) return t;
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(t)) return t;
  if (t.startsWith("/")) return `file://${t}`;
  return t;
}

/** Picker sometimes omits `uri` on Android or uses `path` / `originalPath` — normalize so UI + FormData always get a string `uri`. */
function normalizeAsset(asset: Asset, index: number): Asset | null {
  const raw = [asset.uri, (asset as any).path, asset.originalPath].find(
    (x): x is string => typeof x === "string" && x.length > 0
  );
  if (!raw) return null;
  const uri = ensureFileUriForMultipart(raw);
  return {
    ...asset,
    uri,
    type: asset.type || "image/jpeg",
    fileName:
      asset.fileName ||
      (typeof (asset as any).name === "string" ? (asset as any).name : undefined) ||
      `property_${index}.jpg`,
  };
}

export const pickPhotos = async (limit: number) => {
  return new Promise<Asset[]>((resolve, reject) => {
    launchImageLibrary(
      {
        mediaType: "photo",
        selectionLimit: limit > 0 ? limit : 1,
        includeBase64: false,
        // Prefer JPEG-compatible representation; avoids HEIC / odd reps that break some uploads.
        assetRepresentationMode: "compatible",
        quality: 0.7,        // reduced from 0.8 — avoids large payloads that cause network errors
        maxWidth: 1280,       // reduced from 1600 — keeps file sizes manageable for mobile upload
        maxHeight: 1280,
      },
      (response) => {
        if (response.didCancel) {
          reject("User cancelled");
          return;
        }

        if (response.errorCode) {
          reject(response.errorMessage);
          return;
        }

        const assets = response.assets;
        if (!assets?.length) {
          reject("No images selected");
          return;
        }

        const normalized = assets
          .map((a, i) => normalizeAsset(a, i))
          .filter((a): a is Asset => a != null);
        if (!normalized.length) {
          reject("No usable image path on this device (missing uri/path)");
          return;
        }
        resolve(normalized);
      }
    );
  });
};
