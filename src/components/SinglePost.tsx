/** @format */

import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import FadeInOnScroll from "../components/FadeInOnScroll";
import FeatherIcon from "feather-icons-react";
import { db } from "./../firebase-config";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import DeleteComment from "./DeleteComment";

const PageWrapper = styled.div`
  width: 100%;
  padding: 20px 60px;

  .thread {
    min-height: 84vh;
    width: 100%;
    margin: 0 auto;
    position: relative;
  }

  .comment_section {
    background: #ffffff;
    border: 2px solid #333333;
    border-radius: 10px;
    min-height: 80vh;
  }

  .comment_post {
    background: #ffffff;
    border: 2px solid #333333;
    border-radius: 10px;
    height: 100%;
  }

  @media (max-width: 768px) {
    padding: 20px 20px;
    .thread {
      width: 100%;
    }
  }

  .image_Card {
    width: 100%;
    border: 4px solid #333333;
    border-radius: 10px;
    height: 300px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 10px;
    }
  }
`;

const DisplayCard = styled.div`
  .preview_card {
    width: 100%;
    text-align: left;
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    background: #ff4d00;
    color: #1a1a1a;
    height: 200px;
    border: 4px solid #333333;
    border-radius: 10px;
  }

  p {
    font-size: 1.2rem;
  }

  h4 {
    font-family: "Luckiest Guy", cursive;
    font-size: 2rem;
    color: #ffffff;
    -webkit-text-stroke: 1px #333333;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
`;

const CommentFeed = styled.div`
  width: 100%;
  .feeds_overview {
    height: 68vh;
  }
  @media (max-width: 768px) {
    padding: 20px 20px;
    .thread {
      width: 100%;
    }
  }
`;

interface Post {
  authorId: string;
  id: string;
  userValue?: string;
  userId?: string;
  createdAt?: unknown;
  postType: string;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  createdAt: CreatedAt;
  content: string;
  likedBy: string[];
  photoURL: string;
}

export interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}

function SinglePost() {
  const { id } = useParams(); // ← get postId from URL
  const [singlePost, setSinglePost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const getSinglePost = async (postId: string) => {
    try {
      const docRef = doc(db, "feeds", postId); // make sure "feeds" matches your Firestore collection
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSinglePost({ id: docSnap.id, ...docSnap.data() } as Post);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const fetchComments = useCallback(async (postId: string) => {
    try {
      const commentsRef = collection(db, "feeds", postId, "comments");
      const commentSnapshot = await getDocs(commentsRef);
      const commentList = commentSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data.userId ?? "",
          username: data.username ?? "",
          createdAt: data.createdAt ?? { seconds: 0, nanoseconds: 0 },
          content: data.content ?? "",
          likedBy: data.likedBy ?? [],
          photoURL: data.photoURL,
        } as Comment;
      });
      setComments(commentList);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, []);

  useEffect(() => {
    if (id) {
      getSinglePost(id);
      fetchComments(id);
    }
  }, [fetchComments, id, refreshKey, singlePost, user]);

  return (
    <PageWrapper>
      <FadeInOnScroll direction="down" delay={0.4}>
        <div className="thread px-2 flex flex-col lg:flex-row gap-3">
          {singlePost ? (
            <>
              <div className="comment_post mx-auto w-[100%] md:w-[70%] lg:w-[40%]">
                {singlePost.postType === "text" ? (
                  <DisplayCard className="p-4">
                    <div className="p-4 preview_card">
                      <p className="mb-3"> {singlePost?.userValue}</p>
                      <h4>chakam</h4>
                    </div>
                  </DisplayCard>
                ) : (
                  <div className="p-4">
                    <div className="image_Card">
                      <img
                        src={singlePost.userValue}
                        alt={singlePost.postType}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="relative comment_section mx-auto md:w-[70%] w-[100%] lg:w-[80%]">
                <CommentFeed className="py-4">
                  <div className="feeds_overview overflow-auto">
                    {comments &&
                      comments.map((message) => (
                        <div
                          key={message.id}
                          className="px-2 py-4 border-t border-radius">
                          <div className="flex flex-col">
                            <div className="flex items-start gap-2.5 flex-wrap">
                              <div className="w-[100%] sm:w-[50px]">
                                <img
                                  className="w-10 h-10 rounded-full"
                                  src={message.photoURL}
                                  alt="Jese image"
                                />
                              </div>
                              <div className="flex flex-col leading-1.5 w-[100%] sm:flex-1">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                  <span className="text-sm text-gray-500">
                                    {message.username}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    {new Date(
                                      message.createdAt.seconds * 1000
                                    ).toLocaleString()}
                                  </span>

                                  {message.userId === user.uid && (
                                    <div className="flex-1 text-end">
                                      <DeleteComment
                                        postId={singlePost.id}
                                        onUploadComplete={triggerRefresh}
                                        commentId={message.id}
                                      />
                                    </div>
                                  )}
                                </div>
                                <p className="py-2 text-gray-900 dark:text-white">
                                  {message.content}
                                </p>

                                <VotingButton
                                  quoteId={singlePost.id}
                                  replyId={message.id}
                                  initiallyLiked={message.likedBy?.includes(
                                    user.id
                                  )}
                                  userId={user.uid}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CommentFeed>
                <div className="w-[100%] bg-white">
                  <ReplyBox
                    userInfo={user}
                    postId={singlePost.id}
                    onUploadComplete={triggerRefresh}
                  />
                </div>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </FadeInOnScroll>
    </PageWrapper>
  );
}

export default SinglePost;

const Input = styled.div`
  width: 100%;
  input {
    width: 100%;
    height: 60px;
    font-size: 16px;
    border: 2px solid #333333;
    border-radius: 10px;
    padding: 12px 10px;
    outline: none;
  }
`;

interface UserInfo {
  photoURL: string;
  uid: string;
  displayName: string;
}

interface ReplyBoxProps {
  userInfo?: UserInfo;
  postId?: string;
  onUploadComplete: () => void;
}

export const ReplyBox = ({
  userInfo,
  postId,
  onUploadComplete,
}: ReplyBoxProps) => {
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const submitTextPost = async () => {
    setLoading(true);
    if (!userInfo) {
      console.error("User not logged in");
      return;
    }

    if (!postId) {
      console.error("Post ID is missing");
      return;
    }

    try {
      await addDoc(collection(db, "feeds", postId, "comments"), {
        content: reply,
        userId: userInfo.uid,
        username: userInfo.displayName,
        photoURL: userInfo.photoURL,
        createdAt: Timestamp.now(),
        likedBy: [],
      });
      onUploadComplete();
      setReply("");
      setLoading(false);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return (
    <div>
      <Input className="p-2">
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="name@flowbite.com"
          />
          <div className="">
            <button onClick={() => submitTextPost()}>
              {loading ? "Commenting..." : "Comment"}
            </button>
          </div>
        </div>
      </Input>
    </div>
  );
};

type VotingButtonProps = {
  quoteId: string;
  replyId: string;
  initiallyLiked: boolean;
  userId: string;
};

export const VotingButton = ({
  quoteId,
  replyId,
  userId,
}: VotingButtonProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  useEffect(() => {
    const fetchLikeData = async () => {
      if (!quoteId || !replyId) return;
      const replyRef = doc(db, "feeds", quoteId, "comments", replyId);
      const commentSnap = await getDoc(replyRef);

      if (commentSnap.exists()) {
        const likedByArr: string[] = commentSnap.data().likedBy || [];
        setLikeCount(likedByArr.length);
        setLiked(likedByArr.includes(userId));
      }
    };

    fetchLikeData();
  }, [quoteId, replyId, userId]);

  const toggleLike = async () => {
    if (!quoteId || !replyId || !userId) {
      console.error("Missing quoteId, replyId, or userId");
      return;
    }

    const replyRef = doc(db, "feeds", quoteId, "comments", replyId);
    const commentSnap = await getDoc(replyRef);

    if (!commentSnap.exists()) {
      console.error("Comment does not exist!");
      return;
    }

    const likedByArr: string[] = commentSnap.data().likedBy || [];

    if (likedByArr.includes(userId)) {
      await updateDoc(replyRef, {
        likedBy: arrayRemove(userId),
      });
      setLiked(false);
      setLikeCount((prev) => Math.max(0, prev - 1));
    } else {
      await updateDoc(replyRef, {
        likedBy: arrayUnion(userId),
      });
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };
  return (
    <div className="flex items-center justify-start">
      {liked ? (
        <svg
          onClick={toggleLike}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24"
          height="24"
          style={{ cursor: "pointer", color: "#ff4d00" }}>
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
          4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 
          14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
          6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      ) : (
        <FeatherIcon
          onClick={toggleLike}
          icon="heart"
          style={{ color: "#ff4d00", cursor: "pointer" }}
        />
      )}
      <span style={{ marginLeft: "8px" }}>{likeCount}</span>
    </div>
  );
};
