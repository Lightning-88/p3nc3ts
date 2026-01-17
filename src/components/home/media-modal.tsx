import { X } from "lucide-react";
import Image from "next/image";

export function MediaModal({
  mediaUrl,
  onClose,
}: {
  mediaUrl: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed flex justify-center items-center h-dvh top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.5)] z-10">
      <div className="bg-primary w-full max-w-md rounded-md mx-4 overflow-hidden">
        <div className="flex justify-between border-b border-border-primary p-4">
          <h2 className="text-lg font-bold">Media</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="max-w-full flex items-center justify-center p-4">
          <Image
            alt="media"
            src={mediaUrl}
            width={400}
            height={400}
            priority
            unoptimized
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
