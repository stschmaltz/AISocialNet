"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Post {
  id: number;
  content: string;
  author: {
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: number;
  username: string;
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    fetchUsers();
    fetchFeed(page, limit, selectedUser);
  }, [page, limit, selectedUser]);

  const fetchFeed = async (
    page: number,
    limit: number,
    userId: number | null
  ) => {
    try {
      const response = await axios.get("/api/feed", {
        params: { page, limit, userId },
      });
      setPosts(response.data.data);
      setTotalPosts(response.data.count);
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
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

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId =
      event.target.value === "" ? null : parseInt(event.target.value, 10);
    setSelectedUser(userId);
    setPage(1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Feed</h1>
      <div className="mb-4">
        <label
          htmlFor="user-filter"
          className="block text-sm font-medium text-gray-700"
        >
          Filter by User
        </label>
        <select
          id="user-filter"
          value={selectedUser ?? ""}
          onChange={handleUserChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">All Users</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded-lg shadow-sm">
            <span className="text-md text-gray-500 mb-2">
              <b>{post.author?.username ?? ""}: </b>
            </span>

            <span className="text-sm text-gray-500 mb-2">
              {new Date(post.createdAt).toLocaleString()}
            </span>
            <p className="text-lg">{post.content}</p>
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
