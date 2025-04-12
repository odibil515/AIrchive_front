"use client";
import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

// MetaMask 전용 커넥터
const metaMaskConnector = injected({
  target: "metaMask", // 단순히 'metaMask'로 지정
  shimDisconnect: true,
});

// Wagmi 설정
export const config = createConfig({
  chains: [sepolia],

  connectors: [metaMaskConnector], // MetaMask 커넥터만 사용
  transports: {
    [sepolia.id]: http(),
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage, // 또는 localStorage로 변경 가능
  }),
});
