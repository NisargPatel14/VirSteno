"use client";
import React, { useState, useRef } from "react";
import { CldUploadWidget, CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

const Page = () => {
  const [transcription, setTranscription] = useState("");
  const [loadingTranscription, setLoadingTranscription] = useState(false);
  const [error, setError] = useState(null);
  const [transcriptionStarted, setTranscriptionStarted] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const videoRef = useRef(null);

  const handleFetchTranscription = async (audioUrl) => {
    setLoadingTranscription(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transcribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "audio-url": audioUrl,
            "assembly-ai-api-key": process.env.ASSEMBLYAI_API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transcription");
      }

      const data = await response.json();
      setTranscriptionStarted(true);
      setTranscription("");

      // Start playing the video
      if (videoRef.current) {
        videoRef.current.play();
      }

      // Process transcription data
      if (data.transcript && Array.isArray(data.transcript.words)) {
        data.transcript.words.forEach((word) => {
          setTimeout(() => {
            setTranscription(
              (prevTranscription) => prevTranscription + " " + word.text
            );
          }, word.start);
        });
      } else {
        throw new Error("Invalid transcription data format");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingTranscription(false);
    }
  };

  const handleUploadSuccess = (result) => {
    const audioUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${result.info.public_id}.mp3`;
    handleFetchTranscription(audioUrl);
    setUploadedVideo(result.info.public_id);
  };

  return (
    <main className="flex flex-col justify-center items-center md:my-29 lg:my-29 xl:my-29">
      <div className="m-2 xs:w-full xxs:w-full sm:w-full md:w-full lg:w-3/6">
        {transcriptionStarted && uploadedVideo && (
          <CldVideoPlayer
            className="aspect-video rounded-lg"
            width={1920}
            height={1080}
            publicId={uploadedVideo}
            autoPlay={true}
            colors={{
              accent: "#6C47FF",
              base: "#000000",
              text: "#ffffff",
            }}
            controls={true}
          />
        )}
      </div>
      <div className="card-1 m-4 p-8 border-2 bg-white shadow-lg rounded-2xl xs:text-[15px] xxs:text-[15px] xs:w-full xxs:w-full sm:w-full md:w-full lg:w-3/6">
        <h2 className="font-bold mb-4">Video Transcription</h2>
        {loadingTranscription ? (
          <p>Loading Transcription...</p>
        ) : (
          <>
            {!uploadedVideo && (
              <CldUploadWidget
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={handleUploadSuccess}
                options={{
                  sources: ["local", "url", "camera"],
                  clientAllowedFormats: ["mp4", "avi", "mov"],
                  maxFileSize: 500000000,
                  multiple: false,
                  resourceType: "video",
                }}
              >
                {({ open }) => (
                  <button
                    onClick={() => open()}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded mr-5"
                    disabled={loadingTranscription}
                  >
                    Upload a Video
                  </button>
                )}
              </CldUploadWidget>
            )}
            {transcriptionStarted && (
              <div className="w-full border-2 rounded-lg p-3 mb-4 mt-4">
                {transcription}
              </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
          </>
        )}
      </div>
    </main>
  );
};

export default Page;
