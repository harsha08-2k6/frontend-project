// FileStorageService.js - A service to handle file uploads and storage
// In a real application, this would interact with a server to store files

// Upload a file
const uploadFile = (file, metadata) => {
  return new Promise((resolve, reject) => {
    // In a real app, this would be an API call to upload the file
    // For this demo, we'll simulate storing the file in memory
    
    try {
      // Generate a unique file ID
      const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Create a URL for the file (in a real app, this would be a server URL)
      const fileUrl = URL.createObjectURL(file);
      
      // Store the file information in localStorage to persist across page refreshes
      const storedFiles = JSON.parse(localStorage.getItem('storedFiles') || '{}');
      storedFiles[fileId] = {
        id: fileId,
        name: file.name,
        type: file.type,
        size: file.size,
        url: fileUrl,
        metadata
      };
      localStorage.setItem('storedFiles', JSON.stringify(storedFiles));
      
      // Simulate network delay
      setTimeout(() => {
        resolve({
          id: fileId,
          name: file.name,
          url: fileUrl
        });
      }, 1500);
    } catch (error) {
      reject(error);
    }
  });
};

// Get a file by ID
const getFile = (fileId) => {
  const storedFiles = JSON.parse(localStorage.getItem('storedFiles') || '{}');
  return storedFiles[fileId] || null;
};

// Export the file storage service
const FileStorageService = {
  uploadFile,
  getFile
};

export default FileStorageService;