"use client";

import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

interface PortfolioCardProps {
  title: string;
  description: string;
  category: string;
  tags: string[];
  image?: string;
  video?: string;
  link?: string;
  index: number;
}

export default function PortfolioCard({
  title,
  description,
  category,
  tags,
  image,
  video,
  link,
  index,
}: PortfolioCardProps) {
  const cardContent = (
    <div className="card-base overflow-hidden h-full flex flex-col justify-between">
      <div>
        {/* Image placeholder */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-accent/10 to-cyan/10 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-[1]" />
          {video ? (
            <video
              src={video}
              autoPlay
              muted
              loop
              playsInline
              className="relative z-[2] w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
            />
          ) : image ? (
            <img
              src={image}
              alt={title}
              className="relative z-[2] w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
            />
          ) : (
            <div className="relative z-[2] w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/30 to-cyan/30 flex items-center justify-center">
              <span className="text-2xl font-heading font-bold text-gradient">
                {title.charAt(0)}
              </span>
            </div>
          )}
          {/* Category chip */}
          <div className="absolute top-4 left-4 z-[3]">
            <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-glass-bg backdrop-blur-md text-foreground border border-glass-border">
              {category}
            </span>
          </div>
          {/* Live Preview badge */}
          {link ? (
            <div className="absolute top-4 right-4 z-[3]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20 text-xs font-medium group-hover:border-accent/60 group-hover:bg-black/90 transition-all shadow-md">
                Live Preview
                <ExternalLink
                  size={13}
                  className="text-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </span>
            </div>
          ) : video ? (
            <div className="absolute top-4 right-4 z-[3]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20 text-xs font-medium shadow-md">
                Video Preview
              </span>
            </div>
          ) : null}
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-heading font-bold text-xl group-hover:text-gradient transition-all">
              {title}
            </h3>
            {link && (
              <ExternalLink
                size={18}
                className="text-foreground-muted group-hover:text-foreground transition-colors shrink-0 ml-2"
              />
            )}
          </div>
          <p className="text-foreground-muted text-sm leading-relaxed mb-4 line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 mt-auto">
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="feature-badge text-[11px]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
        >
          {cardContent}
        </a>
      ) : (
        cardContent
      )}
    </motion.div>
  );
}
