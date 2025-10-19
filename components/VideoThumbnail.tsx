"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface VideoThumbnailProps {
  previewSrc: string;
  posterSrc: string;
  onOpenModal: () => void;
  className?: string;
}

export function VideoThumbnail({
  previewSrc,
  posterSrc,
  onOpenModal,
  className = "",
}: VideoThumbnailProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`group relative cursor-pointer overflow-hidden rounded-[20px] ${className}`}
      onClick={onOpenModal}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Video Preview */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={posterSrc}
        className="h-full w-full object-cover"
        preload="metadata"
      >
        <source src={previewSrc} type="video/mp4" />
        {/* Fallback to poster if video doesn&apos;t load */}
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/40" />

      {/* Play Button */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-2xl backdrop-blur-sm transition-all group-hover:bg-white md:h-24 md:w-24">
          <Play className="ml-1 h-8 w-8 fill-neutral-900 text-neutral-900 md:h-10 md:w-10" />
        </div>
      </motion.div>

      {/* Pulsing Ring */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="h-28 w-28 rounded-full border-4 border-white/50 md:h-32 md:w-32" />
      </motion.div>
    </motion.div>
  );
}
