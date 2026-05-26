export const generatePassword = (
  length: number,
  options: {
    lowercase: boolean;
    uppercase: boolean;
    numbers: boolean;
    symbols: boolean;
  },
): string => {
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nums = '0123456789';
  const syms = '!@#$%^&*()_+[]{}|;:,.<>?';

  let charset = '';
  const requiredChars: string[] = [];

  if (options.lowercase) {
    charset += lower;
    requiredChars.push(lower[Math.floor(Math.random() * lower.length)]);
  }
  if (options.uppercase) {
    charset += upper;
    requiredChars.push(upper[Math.floor(Math.random() * upper.length)]);
  }
  if (options.numbers) {
    charset += nums;
    requiredChars.push(nums[Math.floor(Math.random() * nums.length)]);
  }
  if (options.symbols) {
    charset += syms;
    requiredChars.push(syms[Math.floor(Math.random() * syms.length)]);
  }

  if (!charset) return ''; // Return empty string if no character set is selected

  const remainingLength = length - requiredChars.length;
  let remainingPassword = '';
  for (let i = 0; i < remainingLength; i++) {
    remainingPassword += charset[Math.floor(Math.random() * charset.length)];
  }

  const fullPassword = [...requiredChars, ...remainingPassword]
    .sort(() => Math.random() - 0.5)
    .join('');

  return fullPassword;
};
