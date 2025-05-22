/** @format */
import { useState } from "react";
import ChakamUpload from "../components/ChakamUpload";
import ChakamFeeds from "../components/ChakamFeeds";

function ChakamCard() {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };
  return (
    <>
      <ChakamUpload onUploadComplete={triggerRefresh} />
      <ChakamFeeds refreshKey={refreshKey} />
    </>
  );
}

export default ChakamCard;
