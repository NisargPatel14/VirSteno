"use client";
import React, { useState, useEffect, useRef } from "react";

const Page = () => {
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transcriptionStarted, setTranscriptionStarted] = useState(false);
  const videoRef = useRef(null);

  const handleFetchTranscription = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://vir-server.virsteno.workers.dev/transcribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            audio_url:
              "https://cdn.discordapp.com/attachments/929587596470910994/1214630425742540891/spongebob.mp3?ex=660c44bc&is=65f9cfbc&hm=01f06fda142aa3d6fddd3908a101748614054c87d3df2cd97ce668b6b22e3caa&",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transcription");
      }

      const data = await response.json();
      console.log(data.transcript.text);

      setTranscriptionStarted(true);

      setTranscription("");

      data.transcript.words.forEach((word) => {
        setTimeout(() => {
          setTranscription((prevTranscription) => {
            return prevTranscription + " " + word.text;
          });
        }, word.start);
      });

      if (videoRef.current) {
        videoRef.current.play();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center md:my-29 lg:my-29 xl:my-29 ">
      <div className="m-2 xs:w-full xxs:w-full sm:w-full md:w-full lg:w-3/6">
        <video
          ref={videoRef}
          src={"SpongeBob.mp4"}
          preload="none"
          controls
          className="w-full aspect-video rounded-xl"
        />
      </div>
      <div className="card-1 m-4 p-8 border-2 bg-white shadow-lg rounded-2xl xs:text-[15px] xxs:text-[15px] xs:w-full xxs:w-full sm:w-full md:w-full lg:w-3/6">
        <h2 className="font-bold mb-4">Video Transcription</h2>
        <button
          onClick={handleFetchTranscription}
          className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Loading..." : "Fetch Transcription"}
        </button>
        {transcriptionStarted && (
          <div className="w-full border-2 rounded-lg p-3 mb-4 mt-4">
            {transcription}
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </main>
  );
};

export default Page;
