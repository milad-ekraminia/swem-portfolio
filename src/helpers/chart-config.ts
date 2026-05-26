import { AnimationConfig } from '@/types/components/ui/charts';

export const animationConfig: AnimationConfig = {
  enabled: true,
  easing: 'easeinout',
  speed: 800,
  animateGradually: {
    enabled: true,
    delay: 150,
  },
  dynamicAnimation: {
    enabled: true,
    speed: 350,
  },
};
