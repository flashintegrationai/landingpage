import confetti from "canvas-confetti";

export const triggerConfetti = () => {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const interval: any = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // since particles fall down, start them a bit higher than average
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ["#1e71cd", "#ffffff", "#3b82f6"],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ["#1e71cd", "#ffffff", "#3b82f6"],
    });
  }, 250);
};

export const triggerSingleConfetti = (event?: any) => {
  const x = event?.clientX ? event.clientX / window.innerWidth : 0.5;
  const y = event?.clientY ? event.clientY / window.innerHeight : 0.6;

  confetti({
    particleCount: 100,
    spread: 100,
    origin: { x, y },
    colors: ["#1e71cd", "#ffffff", "#3b82f6"],
    zIndex: 9999,
    scalar: 1.2,
    gravity: 1.2,
    drift: 0,
    ticks: 200,
  });

  // Also add a burst from the sides for better "expansion"
  confetti({
    particleCount: 40,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: ["#1e71cd", "#ffffff", "#3b82f6"],
    zIndex: 9999,
  });
  confetti({
    particleCount: 40,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: ["#1e71cd", "#ffffff", "#3b82f6"],
    zIndex: 9999,
  });
};
