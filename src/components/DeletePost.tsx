/** @format */

import { useState, useRef, useEffect } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { ref, deleteObject } from "firebase/storage";

interface DeletePostProps {
  postId: string;
  onUploadComplete: () => void;
  imagePath: string | undefined;
  postType: string;
}

const DeletePost = ({
  postId,
  onUploadComplete,
  imagePath,
  postType,
}: DeletePostProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const deletePost = async () => {
    setLoading(true);
    try {
      if (postType === "url") {
        const fileRef = ref(storage, imagePath); // path like "uploads/image.jpg"
        await deleteObject(fileRef);
      }

      await deleteDoc(doc(db, "feeds", postId));
      onUploadComplete();
      setLoading(false);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <svg
        onClick={() => setIsOpen(!isOpen)}
        className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 4 15">
        <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      </svg>

      {isOpen && (
        <div className="absolute z-10 mt-2 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <p
                onClick={() => deletePost()}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                {loading ? "Deleting..." : "Delete"}
              </p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DeletePost;
