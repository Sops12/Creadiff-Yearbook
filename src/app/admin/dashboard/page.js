"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

function PortfolioModal({ open, onClose, onUploaded }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) return;
    setLoading(true);
    setSuccess(false);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setSuccess(true);
        setFile(null);
        setTitle('');
        onUploaded();
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      alert('Error uploading: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-[#0F103F]">Upload Portfolio</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0F103F] mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="block w-full text-sm text-[#0F103F] border rounded px-3 py-2 mb-2"
              required
            />
            <label className="block text-sm font-medium text-[#0F103F] mb-2">Select Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => setFile(e.target.files[0])}
              className="block w-full text-sm text-[#0F103F] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#9C90D0] file:text-white hover:file:bg-[#7a6bb7] transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            disabled={!file || !title || loading}
            className="w-full px-4 py-2 bg-[#9C90D0] text-white rounded hover:bg-[#7a6bb7] disabled:opacity-50 transition-colors"
          >
            {loading ? 'Uploading...' : 'Upload Portfolio'}
          </button>
          {success && <div className="text-green-600 text-center">Upload successful!</div>}
        </form>
      </div>
    </div>
  );
}

function UpdatePortfolioModal({ open, onClose, item, onUpdated }) {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setTitle(item.title);
    }
    setFile(null);
  }, [item]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('id', item._id);
      formData.append('title', title);
      if (file) {
        formData.append('file', file);
      }
      
      const res = await fetch(`/api/portfolio`, {
        method: 'PUT',
        body: formData,
      });

      if (res.ok) {
        alert("Item updated successfully");
        onUpdated();
        onClose();
      } else {
        const errorData = await res.json();
        alert(`Failed to update item: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Failed to update portfolio item:", error);
      alert("An error occurred while updating the item.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-6 text-[#0F103F]">Update Portfolio Item</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#0F103F] mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="block w-full text-sm text-[#0F103F] border rounded px-3 py-2 mb-2"
            required
          />
          <label className="block text-sm font-medium text-[#0F103F] mb-2">Change Image (Optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => setFile(e.target.files[0])}
            className="block w-full text-sm text-[#0F103F] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#9C90D0] file:text-white hover:file:bg-[#7a6bb7] transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-[#9C90D0] text-white rounded hover:bg-[#7a6bb7] disabled:opacity-50 transition-colors"
        >
          {loading ? 'Updating...' : 'Update Item'}
        </button>
      </form>
    </Modal>
  );
}

function PortfolioManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/portfolio');
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch portfolio items", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }
    try {
      const res = await fetch(`/api/portfolio?id=${itemId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        alert("Item deleted successfully");
        fetchItems();
      } else {
        const errorData = await res.json();
        alert(`Failed to delete item: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Failed to delete portfolio item:", error);
      alert("An error occurred while deleting the item.");
    }
  };

  const handleUpdateClick = (item) => {
    setCurrentItem(item);
    setUpdateModalOpen(true);
  };

  if (loading) {
    return <div className="mt-12 text-white text-center">Loading portfolio...</div>;
  }
  
  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Portfolio</h2>
        <button 
          onClick={() => setUploadModalOpen(true)}
          className="px-4 py-2 bg-[#9C90D0] text-white rounded hover:bg-[#7a6bb7] transition-colors"
        >
          Upload New Item
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item._id} className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20 flex flex-col">
            <div className="relative w-full h-48 mb-4">
              <Image src={item.imageUrl} alt={item.title} layout="fill" className="rounded-lg object-cover" />
            </div>
            <h4 className="text-white font-bold truncate flex-grow">{item.title}</h4>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={() => handleUpdateClick(item)} className="text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg transition-colors">Update</button>
              <button onClick={() => handleDelete(item._id)} className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <PortfolioModal
        open={isUploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUploaded={fetchItems}
      />
      {currentItem && (
        <UpdatePortfolioModal 
          open={isUpdateModalOpen}
          onClose={() => {
            setUpdateModalOpen(false);
            setCurrentItem(null);
          }}
          item={currentItem}
          onUpdated={fetchItems}
        />
      )}
    </div>
  );
}

function RunningImagesManager() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/running-images');
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error("Failed to fetch running images", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = async (imageId) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }
    try {
      const res = await fetch(`/api/running-images?id=${imageId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        alert("Image deleted successfully");
        fetchImages(); 
      } else {
        const errorData = await res.json();
        alert(`Failed to delete image: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Failed to delete running image:", error);
      alert("An error occurred while deleting the image.");
    }
  };

  if (loading) {
    return <div className="mt-12 text-white text-center">Loading images...</div>;
  }
  
  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Running Images</h2>
        <button 
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-[#9C90D0] text-white rounded hover:bg-[#7a6bb7] transition-colors"
        >
          Upload New Image
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {images.map(img => (
          <div key={img._id} className="relative group">
            <Image src={img.imageUrl} alt="Running Image" width={200} height={200} className="rounded-lg object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleDelete(img._id)} className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <RunningImageModal 
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onUploaded={fetchImages}
      />
    </div>
  );
}

function RunningImageModal({ open, onUploaded, onClose }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/running-images', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert('Upload successful');
        onClose();
        setFile(null);
        if(onUploaded) onUploaded();
      } else {
        const errorData = await res.json();
        alert(`Upload failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert('An error occurred during upload.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-6 text-[#0F103F]">Upload Running Image</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">Image File</label>
          <input 
            id="file-upload" 
            name="file-upload" 
            type="file" 
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            required 
          />
        </div>
        <button 
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0F103F] hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>
    </Modal>
  );
}

function Sidebar({ setActiveContent, onLogoutClick }) {
  const navItems = [
    { name: 'Dashboard', icon: '/dashboard-icon.svg', content: 'dashboard' },
    { name: 'Portfolio', icon: '/portfolio-icon.svg', content: 'portfolio' },
    { name: 'Running Images', icon: '/running-images-icon.svg', content: 'running-images' },
    { name: 'Logout', icon: '/logout-icon.svg', content: 'logout' },
  ];

  return (
    <aside className="w-24 bg-[#1C1C65] p-2 flex flex-col items-center space-y-6 pt-8 shadow-lg">
      <div className="w-12 h-12 bg-white/20 rounded-full mb-4"></div>
      <nav>
        <ul className="flex flex-col items-center space-y-4">
          {navItems.map((item) => (
            <li key={item.name} className="w-full">
              <button 
                onClick={() => item.content === 'logout' ? onLogoutClick() : setActiveContent(item.content)}
                className="w-full flex flex-col items-center p-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors duration-200 focus:outline-none focus:bg-white/20"
                title={item.name}
              >
                <Image src={item.icon} alt={item.name} width={28} height={28} />
                <span className="text-xs mt-2 truncate">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default function AdminDashboard() {
  const [activeContent, setActiveContent] = useState('dashboard');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [stats, setStats] = useState({ portfolioCount: 0, runningImagesCount: 0 });
  const router = useRouter();

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    }
    fetchStats();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (error) {
      console.error('Failed to logout', error);
    } finally {
      router.push('/admin/login');
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
          setModalOpen(false);
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

  const renderContent = () => {
    switch (activeContent) {
      case 'portfolio':
        return <PortfolioManager />;
      case 'running-images':
        return <RunningImagesManager />;
      case 'logout':
        return <div className="mt-12 text-white">Logging out...</div>;
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    className="w-full px-4 py-2 bg-[#9C90D0] text-white rounded hover:bg-[#7a6bb7] transition-colors"
                    onClick={() => setActiveContent('portfolio')}
                  >
                    Manage Portfolio
                  </button>
                  <button
                    className="w-full px-4 py-2 bg-[#9C90D0] text-white rounded hover:bg-[#7a6bb7] transition-colors"
                    onClick={() => setActiveContent('running-images')}
                  >
                    Manage Running Images
                  </button>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">Statistics</h3>
                <div className="space-y-2 text-white">
                  <p>Total Portfolio Items: <span className="font-bold">{stats.portfolioCount}</span></p>
                  <p>Total Running Images: <span className="font-bold">{stats.runningImagesCount}</span></p>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar setActiveContent={setActiveContent} onLogoutClick={handleLogout} />
      <main 
        className="flex-1 p-8" 
        style={{
          background: 'linear-gradient(to bottom, #1C1C65 0%, #2F2F8A 67%, #3E27A5 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
          
          {renderContent()}

          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <h2 className="text-2xl font-bold mb-6 text-[#0F103F]">Upload Running Images</h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#0F103F] mb-2">
                  Select Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="block w-full text-sm text-[#0F103F] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#9C90D0] file:text-white hover:file:bg-[#7a6bb7] transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={!file || loading}
                className="w-full px-4 py-2 bg-[#9C90D0] text-white rounded hover:bg-[#7a6bb7] disabled:opacity-50 transition-colors"
              >
                {loading ? 'Uploading...' : 'Upload Image'}
              </button>
            </form>
          </Modal>
        </div>
      </main>
    </div>
  );
} 