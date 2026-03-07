import { cubicBezier } from 'framer-motion';

export const cubicBezierPreset = [0.45, 0.05, 0, 1];
export const cubicBezierPreset2 = [0.25, 0.1, 0.25, 1];
export const cubicBezierPreset3 = [0.165, 0.84, 0.44, 1];
export const easeCubic = cubicBezier(...cubicBezierPreset);
export const easeCubic2 = cubicBezier(...cubicBezierPreset2);
export const easeCubic3 = cubicBezier(...cubicBezierPreset3);
export const cubicCSS = 'cubic-bezier(0.45,0.05,0,1)';
export const cubicCSS2 = 'cubic-bezier(0.25,0.1,0.25,1)';
export const cubicCSS3 = 'cubic-bezier(0.165,0.84,0.44,1)';
