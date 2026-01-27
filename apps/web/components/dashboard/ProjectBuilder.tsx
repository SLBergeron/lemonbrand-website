"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Grid } from "@/components/shared/Grid";
import { useInViewport } from "@/hooks/design-system/useInViewport";

export interface ProjectCategory {
  id: string;
  label: string;
  description?: string;
  projects: Array<{
    title: string;
    description: string;
    time: string;
    highlight?: boolean;
  }>;
}

interface ProjectBuilderProps {
  categories: ProjectCategory[];
  onProjectHover?: (project: ProjectCategory["projects"][0] | null) => void;
  className?: string;
}

/**
 * ProjectBuilder Component
 * 
 * Visual representation of project progression through categories.
 */
export function ProjectBuilder({
  categories,
  onProjectHover,
  className,
}: ProjectBuilderProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const { ref, isInView } = useInViewport<HTMLDivElement>({ once: true });

  const handleProjectHover = (
    project: ProjectCategory["projects"][0] | null
  ) => {
    setHoveredProject(project?.title || null);
    onProjectHover?.(project);
  };

  return (
    <div ref={ref} className={cn("space-y-12 overflow-visible", className)}>
      {categories.map((category, categoryIndex) => {
        const isActive = activeCategory === category.id || activeCategory === null;
        const gridColumns =
          category.projects.length === 1
            ? 1
            : category.projects.length === 2
            ? 2
            : 3;

        return (
          <motion.div
            key={category.id}
            initial={isInView ? { opacity: 0, y: 20 } : {}}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
            className="space-y-4"
          >
            {/* Category Header */}
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() =>
                setActiveCategory(
                  activeCategory === category.id ? null : category.id
                )
              }
            >
              <div>
                <p className="text-sm uppercase tracking-wider text-muted-foreground mb-1">
                  {category.label}
                </p>
                {category.description && (
                  <p className="text-muted-foreground">{category.description}</p>
                )}
              </div>
            </div>

            {/* Projects Grid */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pt-6 overflow-visible"
                >
                  <Grid columns={gridColumns} gap="md" className="overflow-visible">
                    {category.projects.map((project, projectIndex) => (
                      <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: projectIndex * 0.05 }}
                        onMouseEnter={() => handleProjectHover(project)}
                        onMouseLeave={() => handleProjectHover(null)}
                        className="overflow-visible"
                      >
                        <ProjectCard
                          title={project.title}
                          description={project.description}
                          time={project.time}
                          highlight={project.highlight}
                          category={category.label}
                        />
                      </motion.div>
                    ))}
                  </Grid>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

