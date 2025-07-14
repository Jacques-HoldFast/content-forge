import { SiteContent, SiteId } from '../types/Site';

export class SiteService {
  private static readonly API_URL = '/api/sites';
  private static readonly UPLOAD_URL = '/api/upload';

  static async loadSiteContent(siteId: SiteId): Promise<SiteContent> {
    try {
      const response = await fetch(`${this.API_URL}/${siteId}`);
      if (!response.ok) {
        throw new Error(`Failed to load site content for ${siteId}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error loading site content:', error);
      throw error;
    }
  }

  static async saveSiteContent(content: SiteContent): Promise<void> {
    try {
      const updatedContent = {
        ...content,
        lastUpdated: new Date().toISOString()
      };

      const response = await fetch(`${this.API_URL}/${content.siteId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContent),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.error('Error saving site content:', error);
      throw error;
    }
  }

  static async uploadImage(file: File, type: 'logos' | 'heroes' | 'about' | 'testimonials'): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('type', type);

      const response = await fetch(this.UPLOAD_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload response status:', response.status);
        console.error('Upload response text:', errorText);
        throw new Error(`Upload failed (${response.status}): ${errorText.substring(0, 200)}...`);
      }

      const result = await response.json();
      return result.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
}