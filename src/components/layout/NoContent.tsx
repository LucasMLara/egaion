import React from "react";

export default function NoContent({ texto }: { texto: string }) {
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div className="text-center flex w-5/6 md:w-3/4 flex-col rounded-md border-2 bg-neutral-500 justify-center items-center p-14">
        <h1 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          {texto}
        </h1>
      </div>
    </div>
  );
}
