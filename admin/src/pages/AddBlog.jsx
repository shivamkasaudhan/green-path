import React, { useState } from 'react';
import Layout from '../components/Layout';

function AddBlog() {
  const [title_english, setTitleEnglish] = useState('');
  const [title_hindi, setTitleHindi] = useState('');
  const [image, setImage] = useState('');
  const [discription_english, setDiscriptionEnglish] = useState('');
  const [discription_hindi, setDiscriptionHindi] = useState('');
  const [content_english, setContentEnglish] = useState('');
  const [content_hindi, setContentHindi] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/addblogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title_english,
          title_hindi,
          image, 
          discription_english, 
          discription_hindi,
          content_english, 
          content_hindi
        }),
      });
      if (response.ok) {
        setTitleEnglish('');
        setTitleHindi('');
        setImage('');
        setDiscriptionEnglish('');
        setDiscriptionHindi('');
        setContentEnglish('');
        setContentHindi('');
        setSuccessMessage('Blog post created successfully');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create blog post');
      }
    } catch (error) {
      setError('Failed to create blog post');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-brandBlue">Add New Blog Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title_en" className="block text-gray-800">Title (English)</label>
            <input type="text" id="title_en" value={title_english} onChange={(e) => setTitleEnglish(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full" required />
          </div>
          <div className="mb-4">
            <label htmlFor="title_hi" className="block text-gray-800">Title (Hindi)</label>
            <input type="text" id="title_hi" value={title_hindi} onChange={(e) => setTitleHindi(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full" required />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-800">Image URL</label>
            <input type="text" id="image" value={image} onChange={(e) => setImage(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full" required />
          </div>
          <div className="mb-4">
            <label htmlFor="summary_en" className="block text-gray-800">Summary (English)</label>
            <textarea id="summary_en" value={discription_english} onChange={(e) => setDiscriptionEnglish(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full" rows="4" required />
          </div>
          <div className="mb-4">
            <label htmlFor="summary_hi" className="block text-gray-800">Summary (Hindi)</label>
            <textarea id="summary_hi" value={discription_hindi} onChange={(e) => setDiscriptionHindi(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full" rows="4" required />
          </div>
          
          <div className="mb-4">
            <label htmlFor="content_en" className="block text-gray-800">Content (English)</label>
            <textarea id="content_en" value={content_english} onChange={(e) => setContentEnglish(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full" rows="8" required />
          </div>
          <div className="mb-4">
            <label htmlFor="content_hi" className="block text-gray-800">Content (Hindi)</label>
            <textarea id="content_hi" value={content_hindi} onChange={(e) => setContentHindi(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full" rows="8" required />
          </div>
          
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
          <button type="submit" className="bg-green-500 mb-4  text-white py-2 px-4 rounded-md hover:bg-secondary transition-colors duration-300">Submit</button>
        </form>
      </div>
    </Layout>
  );
}

export default AddBlog;
