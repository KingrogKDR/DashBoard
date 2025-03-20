"use client"

import { useState, useEffect } from 'react';
import PostTable from '../components/PostTable';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex justify-center p-8 dark:text-gray-200">Loading...</div>;
  if (error) return <div className="text-red-500 dark:text-red-400 p-8">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 transition-colors">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Posts</h1>
      <PostTable posts={posts} />
    </div>
  );
}