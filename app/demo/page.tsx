import React from "react";

const Page = () => {
  return (
    <main className="flex flex-col justify-center items-center md:my-29 lg:my-29 xl:my-29">
      <div className="m-4 w-2/5"><video src={"SpongeBob.mp4"} preload="none" controls height={500} width={500}/></div>
      <div className="w-3/5 card-1 m-4 p-8 border-2 bg-white shadow-lg rounded-2xl xs:text-[15px] xxs:text-[15px]">
          <h2 className="font-bold mb-4">
            Video Transcription
          </h2>
          <textarea
            name="videoTranscript"
            placeholder="Transcribed text"
            className="w-full border-2 rounded-lg p-3 mb-4 mt-4"
            rows={5}
          />
      </div>
    </main>
  );
};

export default Page;
