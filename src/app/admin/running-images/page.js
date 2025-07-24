"use client";
import { useState, useEffect } from 'react';

export default function RunningImagesAdmin() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/running-images');
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      }
    } catch (error) {
      // handle error
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = reader.result;
        
        const res = await fetch('/api/running-images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64 })
        });

        if (res.ok) {
          alert('Image uploaded successfully!');
          setFile(null);
        } else {
          throw new Error('Upload failed');
        }
      };
    } catch (error) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (imageId) => {
    if (!window.confirm('Delete this image?')) return;
    setDeleting(imageId);
    try {
      const res = await fetch('/api/running-images', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageId })
      });
      if (res.ok) {
        setImages(images.filter(img => img.imageId !== imageId));
      } else {
        alert('Failed to delete image');
      }
    } catch (error) {
      alert('Error deleting image: ' + error.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F103F] p-8">
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg border border-white/20">
        <h1 className="text-2xl font-bold mb-6 text-white">Manage Running Images</h1>
        <form onSubmit={handleUpload} className="space-y-4 mb-8">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#9C90D0] file:text-white hover:file:bg-[#7a6bb7]"
          />
          <button
            type="submit"
            disabled={!file || loading}
            className="w-full px-4 py-2 bg-[#9C90D0] text-white rounded hover:bg-[#7a6bb7] disabled:opacity-50 transition-colors"
          >
            {loading ? 'Uploading...' : 'Upload Image'}
          </button>
        </form>
        <div className="grid grid-cols-2 gap-4">
          {images.map((img) => (
            <div key={img.imageId} className="relative group bg-white/20 rounded-lg overflow-hidden">
              <img src={img.imageUrl} alt="Running" className="w-full h-32 object-cover" />
              <button
                onClick={() => handleDelete(img.imageId)}
                disabled={deleting === img.imageId}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs opacity-80 hover:opacity-100"
              >
                {deleting === img.imageId ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 