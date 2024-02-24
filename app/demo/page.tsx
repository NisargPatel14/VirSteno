import React from "react";

const Page = () => {
  return (
    <main
      className="flex flex-col justify-center items-center"
      style={{ height: "calc(100vh - 160px)" }}
    >
      <div className="card-div flex justify-center items-center h-full w-1/2">
        <div className="card-1 m-4 p-8 border-2 bg-white shadow-lg rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Card 1</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id
            felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed
            aliquam dictum sapien, id sagittis augue malesuada eu.
          </p>
        </div>
        <div className="card-2 m-4 p-8 border-2 bg-white shadow-lg rounded-2xl">
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
