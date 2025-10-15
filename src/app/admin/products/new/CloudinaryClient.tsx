"use client";
import { CldUploadWidget } from "next-cloudinary";

export default function CloudinaryClient({ onAdd }: { onAdd: (url: string) => void }) {
  return (
    <CldUploadWidget uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string} onSuccess={(r) => {
      const info = (r?.info as any) ?? {};
      if (info?.secure_url) onAdd(info.secure_url);
    }}>
      {({ open }) => (
        <button type="button" onClick={() => open()} className="rounded-full border px-3 py-2">Upload Image</button>
      )}
    </CldUploadWidget>
  );
}


