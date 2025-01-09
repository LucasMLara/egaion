"use client";
import React from "react";

export default function Error() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-300">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-auxiliary-error-500 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636l-12.728 12.728m12.728 0L5.636 5.636"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-auxiliary-error-600 mb-4">
          Algo deu errado!
        </h1>
        <p className="text-neutral-600 mb-6">
          Desculpe, mas ocorreu um erro. Por favor, tente recarregar a página ou
          volte mais tarde.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 text-sm font-semibold text-white bg-primary-500 rounded-md hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-300"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}
