import React from "react";

const Page = () => {
  return (
    <main
      className="flex flex-col justify-center items-center"
      style={{ height: "calc(100vh - 160px)" }}
    >
      <div className="card-div flex justify-center items-center h-full w-3/4">
        <div className="card-1 m-4 p-8 border-2 bg-white shadow-lg rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Video Transcription and Summarization
          </h2>
          <input placeholder="Upload video" type="file" />
          <textarea
            name="videoTranscript"
            placeholder="Transcribed text"
            className="w-full border-2 rounded-lg p-3 mb-4 mt-4"
            rows={5}
          />
          <textarea
            name="videoSummary"
            placeholder="Summarized text"
            className="w-full border-2 rounded-lg p-3"
            rows={5}
          />
        </div>
        <div className="card-2 m-4 p-8 border-2 bg-white shadow-lg rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Audio Transcription and Summarization
          </h2>
          <input placeholder="Upload audio" type="file" />
          <textarea
            name="audioTranscript"
            placeholder="Transcribed text"
            className="w-full border-2 rounded-lg p-3 mb-4 mt-4"
            rows={5}
          />
          <textarea
            name="audioSummary"
            placeholder="Summarized text"
            className="w-full border-2 rounded-lg p-3"
            rows={5}
          />
        </div>
      </div>
    </main>
  );
};

export default Page;
