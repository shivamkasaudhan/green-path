import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Blogs = ({ selectedLanguage = 'english' }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await fetch('http://localhost:5000/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        setError(`Error: ${response.statusText}`);
      }
    } catch (error) {
      setError('Error fetching blogs.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center mt-10">
          <p className="text-gray-500 text-lg">Loading blogs...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center mt-10">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative mb-4 m-4">
        <div className="pt-2 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 duration-300"
            >
              <Link to={`/blog/${blog._id}/${selectedLanguage}`}>
                <img
                  src={blog.image}
                  alt={blog.title[selectedLanguage] || 'Blog Image'}
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {blog.title[selectedLanguage] || 'Untitled Blog'}
                  </h2>
                  <p className="text-gray-600">
                    {blog.summary?.[selectedLanguage] ||
                      blog.content?.[selectedLanguage]?.slice(0, 100) + '...' ||
                      'No summary available.'}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Blogs;
