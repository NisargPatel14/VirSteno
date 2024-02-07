import Link from "next/link";
import { DownArrow, RightArrow } from "./icons";
import "./home.css";

export default function Home() {
  return (
    <main className="">
      <article className="grid lg:grid-cols-2">
        <div className="px-8 py-20 md:px-20 lg:py-20">
          <h1 className="text-5xl font-semibold text-transparent md:text-6xl gradient ">
            Auth starts here.
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
              Login
              <div className="m-auto">
                <RightArrow />
              </div>
            </Link>
          </div>
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
            <a
              href=""
              className="text-gray-500 cta hover:underline cursor-not-allowed pointer-events-none"
              target="_blank"
            >
              View Demo <span className="arrow">-&gt;</span>
            </a>
          </div>
          <div className="flex flex-col h-56 gap-1 p-8 bg-white shadow-lg rounded-2xl">
            <h3 className="text-lg font-medium">99% Accuracy</h3>
            <p className="text-gray-700">
              We created our model to be highly accurate, that fliter out
              background noise and other disturbances.
            </p>
            <div className="grow"></div>
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
