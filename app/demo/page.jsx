"use client";
import React, { useState, useRef } from "react";

const Page = () => {
  const [transcription, setTranscription] = useState("");
  const [summary, setSummary] = useState("");
  const [loadingTranscription, setLoadingTranscription] = useState(false);
  const [loadingSummarization, setLoadingSummarization] = useState(false);
  const [error, setError] = useState(null);
  const [transcriptionStarted, setTranscriptionStarted] = useState(false);
  const [summarizationStarted, setSummarizationStarted] = useState(false);
  const videoRef = useRef(null);

  const handleFetchTranscription = async () => {
    setLoadingTranscription(true);
    setError(null);

    try {
      const response = await fetch(
        "https://vs.virsteno.workers.dev/transcribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            audio_url:
            "https://raw.githubusercontent.com/NisargPatel14/VirSteno/main/public/SpongeBob.mp4",
            "assembly-ai-api-key": "07b10cbba5684870bb4b628a97d110ea",
            //"speakers_labels":"true",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transcription");
      }

      const data = await response.json();
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
      setLoadingTranscription(false);
    }
  };

  const handleFetchSummarization = async () => {
    setLoadingSummarization(true);
    setError(null);

    try {
      const response = await fetch("https://virai.virsteno.workers.dev/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ai-api-key": "pk-rgCybLsNqeXpLFmGgPTTqFKkpAkigFWOyubETOzVkREhkREc",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant.",
            },
            {
              role: "user",
              content: transcription,
            },
            {
              role: "user",
              content: "Summarize the above text",
            },
          ],
        }),
      });

      const data = await response.json();
      setSummarizationStarted(true);
      setSummary(data.choices[0].message.content);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingSummarization(false);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center md:my-29 lg:my-29 xl:my-29">
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
          disabled={loadingTranscription}
        >
          {loadingTranscription ? "Loading..." : "Fetch Transcription"}
        </button>
        {transcriptionStarted && (
          <div className="w-full border-2 rounded-lg p-3 mb-4 mt-4">
            {transcription}
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="card-1 m-4 p-8 border-2 bg-white shadow-lg rounded-2xl xs:text-[15px] xxs:text-[15px] xs:w-full xxs:w-full sm:w-full md:w-full lg:w-3/6">
        <h2 className="font-bold mb-4">Video Summarization</h2>
        <button
          onClick={handleFetchSummarization}
          className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
          disabled={loadingSummarization || !transcriptionStarted}
        >
          {loadingSummarization ? "Loading..." : "Fetch Summarization"}
        </button>
        {summarizationStarted && (
          <div className="w-full border-2 rounded-lg p-3 mb-4 mt-4">
            {summary}
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </main>
  );
};

export default Page;
