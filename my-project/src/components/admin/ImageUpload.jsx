import React, { useRef, useState } from 'react';
import './ImageUpload.css';

/**
 * ImageUpload Component
 * Handles image upload with drag-drop, preview, and validation
 * Single Responsibility: Image upload only
 */
const ImageUpload = ({ onImageChange, existingImageUrl, error }) => {
  const [preview, setPreview] = useState(existingImageUrl || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

  const validateFile = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return { valid: false, error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.' };
    }
    if (file.size > MAX_FILE_SIZE) {
      return { valid: false, error: 'File too large. Maximum size is 5MB.' };
    }
    return { valid: true };
  };

  const handleFileSelect = (file) => {
    const validation = validateFile(file);
    if (!validation.valid) {
      if (onImageChange) {
        onImageChange(null, validation.error);
      }
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      if (onImageChange) {
        onImageChange(file, null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onImageChange) {
      onImageChange(null, null);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="image-upload">
      <label className="image-upload-label">Product Image</label>
      <div
        className={`image-upload-area ${isDragging ? 'dragging' : ''} ${error ? 'error' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {preview ? (
          <div className="image-preview-container">
            <img src={preview} alt="Preview" className="image-preview" />
            <button
              type="button"
              className="image-remove-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              aria-label="Remove image"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="image-upload-placeholder">
            <span className="upload-icon">📷</span>
            <p className="upload-text">Click to upload or drag and drop</p>
            <p className="upload-hint">PNG, JPG, GIF, WebP up to 5MB</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          onChange={handleFileInputChange}
          className="image-upload-input"
        />
      </div>
      {error && <div className="image-upload-error">{error}</div>}
    </div>
  );
};

export default ImageUpload;
