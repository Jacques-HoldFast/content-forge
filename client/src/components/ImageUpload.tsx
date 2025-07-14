import React, { useState } from 'react';
import { SiteService } from '../services/SiteService';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  type: 'logos' | 'heroes' | 'about' | 'testimonials';
  placeholder?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  value,
  onChange,
  type,
  placeholder = 'Enter image URL or upload a file'
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const uploadedUrl = await SiteService.uploadImage(file, type);
      onChange(uploadedUrl);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="form-group">
      <label>{label}:</label>
      
      <div className="image-upload-container">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="url-input"
        />
        
        <div className="upload-section">
          <label className="upload-button">
            {uploading ? 'Uploading...' : 'Upload File'}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              style={{ display: 'none' }}
            />
          </label>
          
          {uploadError && (
            <div className="upload-error">{uploadError}</div>
          )}
        </div>
      </div>
      
      {value && (
        <div className="image-preview">
          <img src={value} alt={label} className="preview-image" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;