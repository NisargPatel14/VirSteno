'use client';

import { useState } from 'react';

export default function DevelopmentNotice() {
  const [dismissed, setDismissed] = useState(false);

  // Check if we've already dismissed the notice
  if (dismissed || typeof window !== 'undefined' && localStorage.getItem('noticeDismissed')) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('noticeDismissed', 'true');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-yellow-400 p-2 text-center">
        <span className="text-sm">
          API services are currently limited. Some features might not work as expected as the project is not updated.
        </span>
        <button 
          onClick={handleDismiss}
          className="ml-4 text-sm underline hover:no-underline"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
