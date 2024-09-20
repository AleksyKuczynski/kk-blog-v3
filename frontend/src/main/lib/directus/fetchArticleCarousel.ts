import { ArticleCarousel, DIRECTUS_URL } from "./index";

export async function fetchArticleCarousel(id: string): Promise<ArticleCarousel | null> {
    try {
      const timestamp = Date.now();
      const url = `${DIRECTUS_URL}/items/article_carousel/${id}?timestamp=${timestamp}`;
      const response = await fetch(url, { 
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch article carousel. Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(`Error fetching article carousel ${id}:`, error);
      return null;
    }
  }