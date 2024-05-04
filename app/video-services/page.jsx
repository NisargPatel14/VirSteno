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
        "https://vs.virsteno.workers.dev/transcribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            audio_url: audioUrl,
            "assembly-ai-api-key": "07b10cbba5684870bb4b628a97d110ea",
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
      data.transcript.words.forEach((word) => {
        setTimeout(() => {
          setTranscription(
            (prevTranscription) => prevTranscription + " " + word.text
          );
        }, word.start);
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingTranscription(false);
    }
  };

  const handleUploadSuccess = (result) => {
    const audioUrl = `https://res.cloudinary.com/virsteno/video/upload/${result.info.public_id}.mp3`;
    handleFetchTranscription(audioUrl);
    setUploadedVideo(result.info.public_id);
  };

  const handleUploadWidgetOpen = () => {
    // Open Cloudinary Upload Widget
    cloudinary.openUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        sources: ["local", "url", "camera"],
        clientAllowedFormats: ["mp4", "avi", "mov"], // Allowed video formats
        maxFileSize: 500000000, // Maximum file size in bytes (e.g., 500 MB)
        multiple: false, // Allow multiple file uploads
        resourceType: "video", // Specify resource type as 'video'
        uploadSignatureTimestamp: Date.now() / 1000, // Timestamp for secure upload
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          handleUploadSuccess(result);
        } else {
          console.error("Upload error:", error);
        }
      }
    );
  };

  return (
    <main className="flex flex-col justify-center items-center md:my-29 lg:my-29 xl:my-29">
      <div className="m-2 xs:w-full xxs:w-full sm:w-full md:w-full lg:w-3/6">
        {/* Display video only when transcription is fetched */}
        {transcriptionStarted && uploadedVideo && (
          <CldVideoPlayer
            className=" aspect-video rounded-lg"
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
                signatureEndpoint="/api/sign-cloudinary-params"
                onSuccess={handleUploadSuccess}
              >
                {({ open }) => (
                  <button
                    onClick={handleUploadWidgetOpen}
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
