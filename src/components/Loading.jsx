import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#181C14] z-50">
      <div className="w-20 h-20 border-4 border-t-amber-400 border-b-amber-400 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
