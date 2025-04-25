// app/providers.js
"use client";

import { ThirdwebProvider } from "@thirdweb-dev/react";

export function Providers({ children }) {
  return <ThirdwebProvider activeChain="mumbai">{children}</ThirdwebProvider>;
}
