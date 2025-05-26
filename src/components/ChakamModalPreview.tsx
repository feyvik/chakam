/** @format */
import { useState, useRef } from "react";
import styled from "styled-components";
import { toPng } from "html-to-image";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage, authAppImage } from "./../firebase-config";
import {
  uploadBytes,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";
import { signInAnonymously } from "firebase/auth";
import useAuth from "../hooks/useAuth";

type textValue = {
  statement: string;
  reply: string;
};

type ChakamModalPreviewProps = {
  userValue: textValue;
  handleSetModal: (value: boolean) => void;
  onUploadComplete: () => void;
  imageUrlValue: File | null;
  handleSetSelectedFile: (file: File | null) => void;
  handleSetOutputText: (value: textValue) => void;
  handleSetPostInitialized: (value: boolean) => void;
};

const CloseButton = styled.button`
  padding: 0px !important;
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
    -webkit-text-stroke: 1px #1a1a1a;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
`;

export const ChakamModalPreview = ({
  onUploadComplete,
  userValue,
  handleSetModal,
  imageUrlValue,
  handleSetSelectedFile,
  handleSetOutputText,
  handleSetPostInitialized,
}: ChakamModalPreviewProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const downloadImage = async () => {
    if (ref.current === null) return;

    await new Promise((resolve) => setTimeout(resolve, 100));

    const originalHeight = ref.current.style.height;
    ref.current.style.height = `${ref.current.scrollHeight}px`;

    toPng(ref.current, {
      cacheBust: true,
      pixelRatio: 2,
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "quote.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error("Error exporting image", error);
      })
      .finally(() => {
        ref.current!.style.height = originalHeight;
      });
  };

  const createPost = async () => {
    setLoading(true);

    const postRef = collection(db, "feeds");

    const doc = await addDoc(postRef, {
      userValue: {
        statement: userValue.statement,
        reply: userValue.reply,
      },
      authorId: user.uid,
      createdAt: serverTimestamp(),
      postType: "text",
    });

    handleSetModal(false);
    onUploadComplete();
    setLoading(false);
    handleSetOutputText({ statement: "", reply: "" });
    return doc.id;
  };

  const handleUpload = async () => {
    setLoading(true);
    if (!imageUrlValue) return;

    try {
      const savedUserId = localStorage.getItem("anonymousUserId");

      if (!savedUserId) {
        signInAnonymously(authAppImage)
          .then((result) =>
            localStorage.setItem("anonymousUserId", result.user.uid)
          )
          .catch((err) => console.error("Login error:", err));
      }

      const fileRef = storageRef(
        storage,
        `chakam/${Date.now()}-${imageUrlValue.name}`
      );
      await uploadBytes(fileRef, imageUrlValue);
      const url = await getDownloadURL(fileRef);

      const postRef = collection(db, "feeds");

      const doc = await addDoc(postRef, {
        imageUrl: url,
        authorId: user.uid,
        createdAt: serverTimestamp(),
        postType: "url",
      });

      console.log(doc, url);

      handleSetModal(false);
      onUploadComplete();
      setLoading(false);
      handleSetSelectedFile(null);
      handleSetPostInitialized(false);
      return doc.id;
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleStateReset = () => {
    handleSetModal(false);
    setLoading(false);
    handleSetSelectedFile(null);
    handleSetOutputText({ statement: "", reply: "" });
  };

  return (
    <div className="modal">
      <div className="p-4 w-full max-w-md md:inset-0 m-auto">
        <div className="p-4 bg-white text-end rounded-lg shadow-sm dark:bg-gray-700">
          <CloseButton
            onClick={() => handleStateReset()}
            type="button"
            className="w-8 h-8 me-auto inline-flex justify-center items-center"
            data-modal-hide="popup-modal">
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </CloseButton>

          {userValue &&
            userValue.reply !== "" &&
            userValue.statement !== "" && (
              <DisplayCard className="mt-3">
                <div ref={ref} className="p-4 preview_card">
                  <p className="mb-3">{userValue.statement}</p>
                  <h4>chakam</h4>
                  <p>{userValue.reply}</p>
                </div>
              </DisplayCard>
            )}

          {imageUrlValue && (
            <div ref={ref} className="imageCard mt-3">
              <img
                src={URL.createObjectURL(imageUrlValue)}
                alt={imageUrlValue.type}
              />
            </div>
          )}

          <div className="mt-4 text-start flex gap-2 flex-wrap">
            {imageUrlValue ? (
              <button onClick={() => handleUpload()} type="button">
                {loading ? "Uploading..." : "Upload Image"}
              </button>
            ) : (
              <button onClick={() => createPost()} type="button">
                {loading ? "Posting..." : "Post"}
              </button>
            )}

            {userValue &&
              userValue.reply !== "" &&
              userValue.statement !== "" && (
                <button type="button" onClick={downloadImage}>
                  Download
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
