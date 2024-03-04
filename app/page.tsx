"use client";
import Link from "next/link";
import { RightArrow } from "./icons";
import "./home.css";
import { MainPagePic } from "./components/SVGS/MainPagePic";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const { isLoaded, user } = useUser();

  useEffect(() => {
    const checkSession = () => {
      const cookies = document.cookie;
      if (cookies.includes("__session")) {
        setHasSession(true);
      } else {
        setHasSession(false);
      }
    };
    checkSession();
    setMounted(true);
  }, []);
  if(!mounted) return <div>Loading....</div>;
  return (
    <main className="">
      <article className="grid lg:grid-cols-2 py-5">
        <div className="px-8 py-20 md:px-20 lg:py-20 flex flex-col justify-center sm:items-center md:items-center lg:items-center xl:items-start">
          <h1 className="text-5xl font-semibold text-transparent md:text-6xl gradient ">
            {isLoaded && user ? (
              <p>Welcome Back {user.firstName}!</p>
            ) : (
              <p>Auth starts here.</p>
            )}
          </h1>
          <p className="mt-2 text-lg">
            A real-time meeting assistant for Google Meet and Microsoft Teams,
            transcribing conversations and organizing chats for enhanced
            productivity.
          </p>
          <div className="flex gap-2 mt-8">
            <Link
              href="/profile"
              className="flex content-center gap-2 px-4 py-2 font-semibold text-white transition-colors duration-200 rounded-lg bg-primary-600 hover:bg-primary-700"
            >
              {hasSession ? <p>Go to Profile</p> : <p>Login</p>}

              <div className="m-auto">
                <RightArrow />
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center sm:items-center md:items-center lg:items-center xl:items-start">
          <MainPagePic className="responsive-svg sm:w-2/5 md:w-1/2 lg:w-3/5 xl:w-3/4" />
        </div>
      </article>

      <article
        className="px-8 py-20 bg-black bg-opacity-5 md:px-20 md:py-19"
        id="features"
      >
        <h2 className="text-3xl font-semibold">What's under the hood?</h2>

        <div className="grid gap-8 mt-8 lg:grid-cols-3">
          <div className="flex flex-col h-56 gap-1 p-8 bg-white shadow-lg rounded-2xl">
            <h3 className="text-lg font-medium">Powerful AI Model</h3>
            <p className="text-gray-700">
              Our AI model is trained to transcribe audio and video
              conversations with high accuracy.
            </p>
            <div className="grow"></div>
            <Link
              href="/demo"
              className="text-[#6C47FF] cta hover:underline"
              target="_self"
            >
              View Demo <span className="arrow">-&gt;</span>
            </Link>
          </div>
          <div className="flex flex-col h-56 gap-1 p-8 bg-white shadow-lg rounded-2xl">
            <h3 className="text-lg font-medium">99% Accuracy</h3>
            <p className="text-gray-700">
              We created our model to be highly accurate, that fliter out
              background noise and other disturbances.
            </p>
            <div className="grow"></div>
            <Link
              href="/text-services"
              className="text-[#6C47FF] cta hover:underline"
              target="_self"
            >
              Try it Yourself <span className="arrow">-&gt;</span>
            </Link>
          </div>
          <div className="flex flex-col h-56 gap-1 p-8 bg-white shadow-lg rounded-2xl">
            <h3 className="text-lg font-medium">99% Uptime</h3>
            <p className="text-gray-700">
              Our services are always up and running, so you can rely on us for
              your transcription needs.
            </p>
            <div className="grow"></div>
          </div>
        </div>
      </article>
    </main>
  );
}
