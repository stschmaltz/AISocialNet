"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Post {
  id: number;
  content: string;
  author: {
    username: string;
  };
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    fetchFeed(page, limit);
  }, [page, limit]);

  const fetchFeed = async (page: number, limit: number) => {
    try {
      const response = await axios.get("/api/feed", {
        params: { page, limit },
      });
      setPosts(response.data.data);
      setTotalPosts(response.data.count);
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  const handleNextPage = () => {
    if (page * limit < totalPosts) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Feed</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded-lg shadow-sm">
            <p className="text-lg">{post.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              Author: {post.author?.username ?? ""}
            </p>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={page * limit >= totalPosts}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Feed;
