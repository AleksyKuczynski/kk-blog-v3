// src/main/lib/directus/fetchAssetMetadata.ts
import { DIRECTUS_URL } from "./constants";
import { Asset } from "./interfaces";

export async function fetchAssetMetadata(assetId: string): Promise<Asset | null> {
  try {
    const url = `${DIRECTUS_URL}/files/${assetId}`;
    const response = await fetch(url);
    
    if (!response.ok) return null;
    
    const { data } = await response.json();
    
    return {
      id: data.id,
      width: data.width || 1200,
      height: data.height || 800,
      type: data.type || 'image/jpeg',
      filename: data.filename_download,
      title: data.title || data.filename_download
    };
  } catch (error) {
    console.error('Error fetching asset metadata:', error);
    return null;
  }
}