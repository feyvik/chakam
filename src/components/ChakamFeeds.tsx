/** @format */

import styled from "styled-components";
import { Link } from "react-router-dom";
import DeletePost from "./DeletePost";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const PageWrapper = styled.div`
  width: 100%;
  min-height: 80vh;
  padding: 20px 60px 60px 60px;

  @media (max-width: 768px) {
    padding: 20px 20px;
  }

  button {
    box-shadow: none;
    color: #333333;
  }

  .empty_state {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      font-size: 2rem;
      font-family: "Luckiest Guy", cursive;
      text-align: center;
    }

    p {
      font-size: 1.3rem;
    }
  }

  .thread {
    .content {
      border-radius: 10px;
      box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.45);
      padding: 12px 18px;
      border-top-left-radius: 40px;
      border-bottom-right-radius: 40px;
      background: #ffffff;
      border: 2px solid #333333;
    }

    .card {
      width: 100%;
      height: 100%;
    }

    .imageFeeds {
      width: 100%;
      overflow: hidden;
      height: 300px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
`;

const DisplayCard = styled.div`
  .preview_card {
    border: 4px solid #333333;
    border-radius: 10px;
    width: 100%;
    min-height: 200px;
    text-align: left;
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    background: #ff4d00;
    color: #1a1a1a;
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

type Post = {
  id: string;
  authorId?: string;
  userValue?: string;
  postType: string;
};

type ChakamFeedsProps = {
  refreshKey: number;
  onUploadComplete: () => void;
  paginatedItems: Post[];
};

function ChakamFeeds({
  refreshKey,
  onUploadComplete,
  paginatedItems,
}: ChakamFeedsProps) {
  const { user } = useAuth();

  useEffect(() => {}, [refreshKey]);

  return (
    <PageWrapper>
      {paginatedItems.length > 0 ? (
        <div className="thread grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3  gap-4">
          {paginatedItems &&
            paginatedItems.map((item) => (
              <div
                key={item.id}
                className="w-[100%] content p-4 animate-fade-in">
                <div className="grid gap-4 card">
                  {item.authorId === user.uid && (
                    <div className="text-end">
                      <DeletePost
                        postId={item.id}
                        onUploadComplete={onUploadComplete}
                        imagePath={item.userValue}
                        postType={item.postType}
                      />
                    </div>
                  )}
                  {item.postType === "text" ? (
                    <DisplayCard className="mt-3">
                      <div className="p-4 preview_card">
                        <p className="mb-3"> {item.userValue}</p>
                        <h4>chakam</h4>
                      </div>
                    </DisplayCard>
                  ) : (
                    <div className="imageFeeds">
                      <img src={item.userValue} alt={item.postType} />
                    </div>
                  )}
                  <div className="px-4 mt-4 w-[100%] self-end md:text-end">
                    <Link to={`/single-feed/${item.id}`}>
                      <button type="button">Comment</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="empty_state">
          <div className="w-[100%] text-center">
            <h1>Oops! Looks Like There's Nothing Here</h1>
            <p>Be the First to Share a Moment!</p>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}

export default ChakamFeeds;
