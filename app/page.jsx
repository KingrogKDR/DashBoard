"use client";

import { useState, useEffect } from "react";
import PostTable from "../components/PostTable";
import { redirect } from "next/navigation";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-r-2 border-blue-500 dark:border-blue-400"></div>
        <p className="mt-4 text-gray-700 dark:text-gray-200">
          Loading posts...
        </p>
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 dark:text-red-400 p-8">Error: {error}</div>
    );

  return (
    <div className="container mx-auto p-4 transition-colors">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Posts</h1>
      <PostTable posts={posts} />
    </div>
  );
}
