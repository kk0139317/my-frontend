'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ObjectDetectionPage: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const response = await axios.get('/detect');
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
      }
    };

    fetchVideo();

    return () => {
      // Cleanup video URL when component unmounts
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('/upload_image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data); // Process the response data as needed
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('video', file);

      const response = await axios.post('/upload_video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data); // Process the response data as needed
    }
  };

  return (
    <div>
      <h1>Live Object Detection</h1>
      {videoUrl && <video src={videoUrl} controls />}
      <div>
        <h2>Upload Image</h2>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
      <div>
        <h2>Upload Video</h2>
        <input type="file" accept="video/*" onChange={handleVideoUpload} />
      </div>
    </div>
  );
};

export default ObjectDetectionPage;
