// src/main/lib/directus/fetchAssetMetadata.ts
import { DIRECTUS_URL } from "./constants";
import { Asset } from "./interfaces";

export async function fetchAssetMetadata(assetId: string): Promise<Asset | null> {
  try {
    const url = `${DIRECTUS_URL}/assets/${assetId}`;
    const response = await fetch(url);
    
    if (!response.ok) return null;

    const buffer = await response.arrayBuffer();
    const view = new DataView(buffer);

    // Check if it's a JPEG file
    if (view.getUint16(0) === 0xFFD8) {
      let offset = 2;
      while (offset < view.byteLength) {
        // Look for SOF0 marker (Start of Frame)
        if (view.getUint16(offset) === 0xFFC0) {
          return {
            id: assetId,
            height: view.getUint16(offset + 5), // Height comes first in JPEG
            width: view.getUint16(offset + 7),
            type: response.headers.get('content-type') || 'image/jpeg',
            filename: response.headers.get('content-disposition')?.match(/filename="(.+?)"/)?.[1] || ''
          };
        }
        offset += 2 + view.getUint16(offset + 2);
      }
    }

    return null;
  } catch (error) {
    console.error('Error in fetchAssetMetadata:', error);
    return null;
  }
}