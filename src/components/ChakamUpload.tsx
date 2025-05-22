/** @format */

import { useState, useRef } from "react";
import styled from "styled-components";
import FadeInOnScroll from "../components/FadeInOnScroll";
import { toPng } from "html-to-image";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage, authAppImage } from "./../firebase-config";
import {
  uploadBytes,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";
import { signInAnonymously } from "firebase/auth";

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 60px 60px;
  position: relative;

  h1 {
    font-size: 2rem;
    font-family: "Luckiest Guy", cursive;
  }

  h2 {
    font-size: 1.5rem;
    font-family: "Luckiest Guy", cursive;
  }

  .card {
    padding: 20px;
    border: 4px solid #1a1a1a;
    border-top-left-radius: 40px;
    border-bottom-right-radius: 40px;
    width: 600px;
    margin: 0 auto;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.45);
  }

  @media (max-width: 768px) {
    padding: 0px 20px;
    .card {
      width: 100%;
    }
  }

  .modal {
    background: rgba(26, 26, 26, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .imageCard {
    border: 4px solid #1a1a1a;
    border-radius: 10px;
    width: 100%;
    min-height: 200px;
    text-align: left;
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
  }
`;

const Input = styled.textarea`
  width: 100%;
  height: 100px;
  font-size: 16px;
  border: 2px solid #1a1a1a;
  border-radius: 8px;
  padding: 12px 10px;
`;

const FileInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
`;

const Output = styled.div`
  margin-top: 20px;
  font-weight: bold;
  font-size: 18px;
  color: red;
`;

type ChakamUploadProps = {
  onUploadComplete: () => void;
};

function ChakamUpload({ onUploadComplete }: ChakamUploadProps) {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setModal(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      setOutput(text.trim());
      setModal(true);
    } else {
      setError("Please enter some text or upload a file.");
    }
  };

  return (
    <PageWrapper>
      <FadeInOnScroll direction="up" delay={0.4}>
        <div className="mb-10 text-center w-[100%]">
          <h1>Meme Maker</h1>
          <p>
            Type your bold statement, click "Chakam Me!", and let the fun begin!
          </p>
        </div>
        <div className="card">
          <div className="mb-4">
            <h2>Create Your Chakam</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-2 mb-2">
              <label className="font-medium text-lg" htmlFor="statement">
                Your Statement:
              </label>
              <Input
                id="statement"
                className="mt-2"
                placeholder="e.g., Pineapple belongs on pizza..."
                value={text}
                onChange={handleTextChange}
              />
            </div>

            <h2 className="text-center mb-2">Or</h2>

            <div className="flex items-center justify-center w-full mb-4">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg relative">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2">
                    <span>Click to upload</span>
                  </p>
                  <p>SVG, PNG, JPG (MAX. 2MB)</p>
                </div>
                <FileInput
                  type="file"
                  accept=".jpg,.png,.svg"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <button type="submit" className="w-[100%]">
              Chakam Me! 📸
            </button>
          </form>
          {error && <Output>{error}</Output>}
        </div>
      </FadeInOnScroll>
      {modal && (
        <ChakamModal
          onUploadComplete={onUploadComplete}
          userValue={output}
          handleSetModal={setModal}
          imageUrlValue={selectedFile}
        />
      )}
    </PageWrapper>
  );
}

export default ChakamUpload;

type ChakamModalProps = {
  userValue: string;
  handleSetModal: (value: boolean) => void;
  onUploadComplete: () => void;
  imageUrlValue: File | null;
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

export const ChakamModal = ({
  userValue,
  handleSetModal,
  onUploadComplete,
  imageUrlValue,
}: ChakamModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

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
    const postRef = collection(db, "feeds");

    const doc = await addDoc(postRef, {
      userValue,
      authorId: Math.random().toString(36).substring(2, 10),
      createdAt: serverTimestamp(),
      postType: "text",
    });

    handleSetModal(false);
    onUploadComplete();

    return doc.id;
  };

  const handleUpload = async () => {
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
        userValue: url,
        authorId: Math.random().toString(36).substring(2, 10),
        createdAt: serverTimestamp(),
        postType: "url",
      });

      handleSetModal(false);
      onUploadComplete();

      return doc.id;
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-50 modal w-full md:inset-0 h-[calc(100%)] max-h-full">
      <div className="p-4 w-full max-w-md md:inset-0 m-auto">
        <div className="p-4 bg-white text-end rounded-lg shadow-sm dark:bg-gray-700">
          <CloseButton
            onClick={() => handleSetModal(false)}
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

          {userValue && (
            <DisplayCard className="mt-3">
              <div ref={ref} className="p-4 preview_card">
                <p className="mb-3">{userValue}</p>
                <h4>chakam</h4>
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
                Upload Image
              </button>
            ) : (
              <button onClick={() => createPost()} type="button">
                Post
              </button>
            )}

            <button type="button" onClick={downloadImage}>
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
