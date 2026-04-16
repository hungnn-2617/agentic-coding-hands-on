import Image from 'next/image';
import type { ReactNode } from 'react';

interface LoginHeroProps {
  children?: ReactNode;
}

/**
 * Login hero section with key visual background, gradients, ROOT FURTHER logo,
 * hero text, and slot for login button.
 */
export function LoginHero({ children }: LoginHeroProps) {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#00101A]">
      {/* Key Visual Background */}
      <div className="absolute inset-0 z-[1]">
        <Image
          src="/images/login-keyvisual.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      {/* Gradient Left Overlay */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            'linear-gradient(90deg, #00101A 0%, #00101A 25.41%, transparent 100%)',
        }}
      />

      {/* Gradient Bottom Overlay */}
      <div
        className="absolute inset-0 z-[3]"
        style={{
          background:
            'linear-gradient(0deg, #00101A 22.48%, transparent 51.74%)',
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col min-h-screen px-4 py-12 pt-24 sm:px-12 sm:py-16 sm:pt-28 lg:px-36 lg:py-24 lg:pt-32">
        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20 justify-center flex-1">
          {/* ROOT FURTHER Logo */}
          <div className="w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[451px]">
            <Image
              src="/images/root-further-logo.png"
              alt="ROOT FURTHER"
              width={451}
              height={200}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Content Area */}
          <div className="flex flex-col gap-6 lg:pl-4">
            {/* Hero Text */}
            <div className="flex flex-col gap-0">
              <p className="font-bold text-base leading-8 sm:text-lg sm:leading-9 lg:text-xl lg:leading-10 tracking-[0.5px] text-white whitespace-nowrap">
                Bắt đầu hành trình của bạn cùng SAA 2025.
              </p>
              <p className="font-bold text-base leading-8 sm:text-lg sm:leading-9 lg:text-xl lg:leading-10 tracking-[0.5px] text-white">
                Đăng nhập để khám phá!
              </p>
            </div>

            {/* Login Button Slot */}
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
