"use client";
import { useState } from "react";

export default function GalleryClient({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const list = images.length ? images : ["gradient://placeholder"];
  return (
    <div>
      <div className="aspect-[3/4] w-full rounded-xl bg-gradient-to-br from-[#D8D4CD] to-[#F8F4E3]" />
      <div className="mt-3 grid grid-cols-5 gap-2">
        {list.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} className={`h-16 rounded-md ${i===active?"ring-2 ring-foreground":""} bg-gradient-to-br from-[#D8D4CD] to-[#F8F4E3]`} />
        ))}
      </div>
    </div>
  );
}


