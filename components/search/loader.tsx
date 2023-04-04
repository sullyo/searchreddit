import React from "react";

const Loader = () => {
  return (
    <div
      role="status"
      className="max-w-lg animate-pulse space-y-2.5 md:max-w-2xl"
    >
      <div className="grid-cols grid grid-flow-col gap-x-2">
        <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </div>
      <div className="grid-cols grid grid-flow-col gap-x-2">
        <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </div>
      <div className="grid-cols grid grid-flow-col gap-x-2">
        <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </div>
      <div className="grid-cols grid grid-flow-col gap-x-2">
        <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </div>

      <div className="grid-cols grid grid-flow-col gap-x-2">
        <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </div>
      <div className="grid-cols grid grid-flow-col gap-x-2">
        <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
