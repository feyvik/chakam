/** @format */
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./../firebase-config";
import useAuth from "../hooks/useAuth";
import ChakamUpload from "../components/ChakamUpload";
import ChakamFeeds from "../components/ChakamFeeds";
import { Pagination } from "../components/Pagination";

type Post = {
  id: string;
  authorId?: string;
  userValue?: string;
  postType: string;
};

function ChakamCard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedItems = posts.slice(start, start + itemsPerPage);

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const getAllPosts = async () => {
    try {
      const postRef = collection(db, "feeds");
      const q = query(postRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const postList = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          authorId: data.authorId,
          userValue: data.userValue,
          postType: data.postType ?? "text", // fallback if missing
        } as Post;
      });

      setPosts(postList);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, [posts, user]);
  return (
    <>
      <ChakamUpload onUploadComplete={triggerRefresh} />
      <ChakamFeeds
        refreshKey={refreshKey}
        onUploadComplete={triggerRefresh}
        paginatedItems={paginatedItems}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        posts={posts}
        pageChange={totalPages}
      />
    </>
  );
}

export default ChakamCard;
