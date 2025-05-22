/** @format */

import styled from "styled-components";
import FadeInOnScroll from "../components/FadeInOnScroll";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./../firebase-config";
import DeletePost from "./DeletePost";

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 60px 60px;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }

  .thread {
    img {
      border: 4px solid #1a1a1a;
      height: 300px;
      width: 100%;
      border-radius: 10px;
    }
  }

  .col {
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 100%;
    justify-content: center;
  }

  .content {
    border-radius: 10px;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.45);
  }

  .imageCard {
    border-radius: 10px;
    width: 100%;
    height: 300px;
    text-align: left;
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    img {
      max-height: 100%;
      max-width: 100%;
      height: auto;
      width: auto;
    }
  }
`;

const DisplayCard = styled.div`
  .preview_card {
    border: 4px solid #1a1a1a;
    border-radius: 10px;
    width: 100%;
    min-height: 200px;
    text-align: left;
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    background: #fff8f0;
  }

  p {
    font-size: 1.2rem;
  }

  h4 {
    font-family: "Luckiest Guy", cursive;
    font-size: 2rem;
    color: #ff4d00;
    -webkit-text-stroke: 1px black;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
`;

type ChakamFeedsProps = {
  refreshKey: number;
  onUploadComplete: () => void;
};

type Post = {
  id: string;
  authorId?: string;
  userValue?: string;
  postType: string;
};

function ChakamFeeds({ refreshKey, onUploadComplete }: ChakamFeedsProps) {
  const [posts, setPosts] = useState<Post[]>([]);

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
  }, [refreshKey]);

  return (
    <PageWrapper>
      <div className="thread flex flex-col">
        {posts.map((item) => (
          <FadeInOnScroll key={item.id} direction="up" delay={0.4}>
            <div className="w-[60%] m-h-[400px] py-6 content mx-auto bg-[#ffffff] mb-4 flex flex-col">
              <div className="px-4 flex-1">
                <div className="text-end">
                  <DeletePost
                    postId={item.id}
                    onUploadComplete={onUploadComplete}
                  />
                </div>
                {item.postType === "text" ? (
                  <DisplayCard className="mt-3">
                    <div className="p-4 preview_card">
                      <p className="mb-3"> {item.userValue}</p>
                      <h4>chakam</h4>
                    </div>
                  </DisplayCard>
                ) : (
                  <div className="imageCard">
                    <img src={item.userValue} alt={item.postType} />
                  </div>
                )}
              </div>
              <div className="px-4 mt-4 w-[100%] md:text-end">
                <Link to={`/single-feed/${item.id}`}>
                  <button type="button">Comment</button>
                </Link>
              </div>
            </div>
          </FadeInOnScroll>
        ))}
      </div>
    </PageWrapper>
  );
}

export default ChakamFeeds;
