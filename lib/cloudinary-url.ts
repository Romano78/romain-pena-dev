const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const cldImage = (publicId: string, w?: number) => {
  const t = w ? `f_auto,q_auto,w_${w}` : 'f_auto,q_auto';
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${t}/${publicId}`;
};
