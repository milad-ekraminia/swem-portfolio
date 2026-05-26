import { describe, it, expect } from 'vitest';
import { animationConfig } from '@/helpers/chart-config';

describe('animationConfig', () => {
  it('should have the expected top-level properties', () => {
    expect(animationConfig.enabled).toBe(true);
    expect(animationConfig.easing).toBe('easeinout');
    expect(animationConfig.speed).toBe(800);
  });

  it('should configure gradual animation correctly', () => {
    expect(animationConfig.animateGradually).toBeDefined();
    expect(animationConfig.animateGradually?.enabled).toBe(true);
    expect(animationConfig.animateGradually?.delay).toBe(150);
  });

  it('should configure dynamic animation correctly', () => {
    expect(animationConfig.dynamicAnimation).toBeDefined();
    expect(animationConfig.dynamicAnimation?.enabled).toBe(true);
    expect(animationConfig.dynamicAnimation?.speed).toBe(350);
  });

  it('should match the expected overall structure', () => {
    expect(animationConfig).toMatchObject({
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
    });
  });
});


