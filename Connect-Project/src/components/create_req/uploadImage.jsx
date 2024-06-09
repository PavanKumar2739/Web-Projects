import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import './UploadImage.css';

function UploadImage({image,setImage,setFile}) {
 
  function handleChange(e) {
    const uploadedFile = e.target.files[0];
    const reader = new FileReader();

    setFile(uploadedFile);
    reader.onloadend = () => {
      setImage(reader.result);
     
      console.log(image)
    };
    

    reader.readAsDataURL(uploadedFile);
  }

  return (
    <div className="upload-container">
      <label htmlFor="upload-input" className="upload-label">
        <FaUpload className="upload-icon" />
        Choose Image
      </label>
      <input type="file" id="upload-input" onChange={handleChange} />
      {image && <img src={image} alt="Uploaded" className="uploaded-image" name='image' />}
    </div>
  );
}

export default UploadImage;
