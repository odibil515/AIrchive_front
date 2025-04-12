import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Starfield from "@/components/Starfield"
import { Inter } from "next/font/google"
import { useRouter } from "next/router"

const inter = Inter({ subsets: ["latin"] })

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <div className={`${inter.className} relative min-h-screen`}>
      {/* 항상 렌더링되는 Starfield 배경 */}
      <div className="fixed inset-0 -z-10">
        {/* 페이지 전환시 새롭게 마운트하도록 key를 추가 */}
        <Starfield key={router.asPath} />
      </div>

      <div className="relative z-10">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Component {...pageProps} />
          <Toaster />
        </ThemeProvider>
      </div>
    </div>
  )
}
