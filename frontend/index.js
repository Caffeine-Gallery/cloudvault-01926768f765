import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  const fileInput = document.getElementById('fileInput');
  const uploadButton = document.getElementById('uploadButton');
  const fileList = document.getElementById('fileList');

  uploadButton.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = new Uint8Array(e.target.result);
      try {
        await backend.uploadFile(file.name, content, file.type);
        alert('File uploaded successfully');
        updateFileList();
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file');
      }
    };
    reader.readAsArrayBuffer(file);
  });

  async function updateFileList() {
    try {
      const files = await backend.listFiles();
      fileList.innerHTML = '';
      files.forEach(fileName => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = fileName;
        link.addEventListener('click', (e) => {
          e.preventDefault();
          downloadFile(fileName);
        });
        li.appendChild(link);
        fileList.appendChild(li);
      });
    } catch (error) {
      console.error('Error listing files:', error);
    }
  }

  async function downloadFile(fileName) {
    try {
      const file = await backend.getFile(fileName);
      if (file) {
        const blob = new Blob([file.content], { type: file.contentType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        alert('File not found');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Error downloading file');
    }
  }

  // Initial file list update
  updateFileList();
});
