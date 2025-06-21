"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
function OtherSessionWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" || status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [status]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

export function SessionWrapper({ children }: { children: React.ReactNode }) {
  
  return <SessionProvider>
    <OtherSessionWrapper>
      {children}
    </OtherSessionWrapper>
  </SessionProvider>
}

