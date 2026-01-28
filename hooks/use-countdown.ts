import { useEffect, useState } from "react";

export function useOtpCountdown(initialSeconds: number = 60) {
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const startCountdown = () => setCountdown(initialSeconds);

  return { countdown, startCountdown };
}
