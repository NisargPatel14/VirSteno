import React from "react";

const Page = () => {
  return (
    <main
      className="flex flex-col justify-center items-center"
      style={{ height: "calc(100vh - 160px)" }}
    >
      <div className="card-div flex justify-center items-center h-full w-1/2">
        <div className="card-1 bg-slate-400 m-4 p-8 rounded-lg border-2 border-gray-300">
          <h2 className="text-2xl font-bold mb-4">Card 1</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id
            felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed
            aliquam dictum sapien, id sagittis augue malesuada eu.
          </p>
        </div>
        <div className="card-2 bg-slate-400 m-4 p-8 rounded-lg border-2 border-gray-300">
          <h2 className="text-2xl font-bold mb-4">Card 2</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id
            felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed
            aliquam dictum sapien, id sagittis augue malesuada eu.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Page;
