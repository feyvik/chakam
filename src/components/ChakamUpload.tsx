/** @format */

import { useEffect, useState } from "react";
import styled from "styled-components";
import FadeInOnScroll from "../components/FadeInOnScroll";
import clickSound from "../assets/camera.wav";
import { ChakamModalPreview } from "./ChakamModalPreview";
import ReactDOM from "react-dom";
import { useDarkMode } from "../hooks/useDarkMode";

const PageWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "darkmode",
})<{ $darkmode: boolean }>`
  width: 100%;
  padding: 60px 60px 20px 60px;
  position: relative;

  h1 {
    font-size: 2rem;
    font-family: "Luckiest Guy", cursive;
  }

  h2 {
    font-size: 1.5rem;
    font-family: "Luckiest Guy", cursive;
  }

  .postForm {
    min-height: 60vh;
  }

  .card {
    background: ${({ $darkmode }) => ($darkmode ? "#fff8f0" : "")};
    color: ${({ $darkmode }) => ($darkmode ? "#1a1a1a" : "")};
    padding: 20px;
    border: 4px solid #1a1a1a;
    border-top-left-radius: 40px;
    border-bottom-right-radius: 40px;
    width: 600px;
    margin: 0 auto;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.45);
  }

  @media (max-width: 768px) {
    padding: 20px 20px;
    .card {
      width: 100%;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  height: 46px;
  font-size: 16px;
  border: 2px solid #1a1a1a;
  border-radius: 8px;
  padding: 12px 10px;
  box-shadow: none;
  outline: none;
`;

const FileInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
  z-index: 0 !important;
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
  const [textReply, setTextReply] = useState("");
  const [outputText, setOutputText] = useState({
    statement: "",
    reply: "",
  });
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [postInitialized, setPostInitialized] = useState(false);
  const { isDarkMode } = useDarkMode();

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleTextReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextReply(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sound = new Audio(clickSound);
      sound.play();
      setSelectedFile(file);
      setModal(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && textReply.trim()) {
      const sound = new Audio(clickSound);
      sound.play();
      setOutputText({ statement: text.trim(), reply: textReply.trim() });
      setModal(true);
      setText("");
      setTextReply("");
      setError("");
    } else {
      setError("Please enter some text or upload a file.");
    }
  };

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [modal]);

  return (
    <PageWrapper $darkmode={isDarkMode}>
      <FadeInOnScroll direction="up" delay={0.4}>
        <div className="text-center w-[100%]">
          <h1>Meme Maker</h1>
          <p>
            Type your bold statement, click "Chakam Me!", and let the fun begin!
          </p>
          {!postInitialized && (
            <div className="mt-3">
              <button onClick={() => setPostInitialized(true)} type="button">
                Chakam Me! 📸
              </button>
            </div>
          )}
        </div>
        {postInitialized && (
          <div className="postForm mt-10">
            <div className="card">
              <div className="mb-4">
                <h2>Create Your Chakam</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-2 mb-2">
                  <label className="font-medium text-lg" htmlFor="statement">
                    Statement:
                  </label>
                  <Input
                    type="text"
                    id="statement"
                    className="mt-2"
                    placeholder="“We are a family in this company”"
                    value={text}
                    onChange={handleTextChange}
                  />
                </div>
                <div className="space-y-2 mb-2">
                  <label className="font-medium text-lg" htmlFor="statement">
                    Reply:
                  </label>
                  <Input
                    type="text"
                    id="reply"
                    className="mt-2"
                    placeholder="Before I hear, 'why are you sleeping at work'"
                    value={textReply}
                    onChange={handleTextReplyChange}
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
                  Preview Post
                </button>
              </form>
              {error && <Output>{error}</Output>}
            </div>
          </div>
        )}
      </FadeInOnScroll>
      {modal &&
        typeof window !== "undefined" &&
        ReactDOM.createPortal(
          <ChakamModalPreview
            onUploadComplete={onUploadComplete}
            userValue={outputText}
            handleSetModal={setModal}
            imageUrlValue={selectedFile}
            handleSetSelectedFile={setSelectedFile}
            handleSetOutputText={setOutputText}
            handleSetPostInitialized={setPostInitialized}
          />,
          document.body
        )}
    </PageWrapper>
  );
}

export default ChakamUpload;
