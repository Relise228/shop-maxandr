import Layout from '@components/Layout';
import axios from 'axios';
import React, { useState } from 'react';

const UploadImage = ({ setImage }) => {
  const [isUploading, setIsUploading] = useState(false);
  const uploadHandler = async (e) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    try {
      setIsUploading(true);
      const {
        data: { signature, timestamp },
      } = await axios('/api/admin/cloudinary-sign');

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      const { data } = await axios.post(url, formData);
      console.log(data, 'imageData');
      setImage({ url: data.secure_url, public_id: data.public_id });
      setIsUploading(false);
    } catch (err) {
      setIsUploading(false);
    }
  };

  return (
    <div className='mb-4'>
      <label htmlFor='imageFile'>Upload image</label>
      <input
        type='file'
        className='w-full'
        id='imageFile'
        onChange={uploadHandler}
      />
      {isUploading && <div>Uploading....</div>}
    </div>
  );
};

export { UploadImage };
