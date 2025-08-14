import type { ICourseItem } from '@/types/home.types'
import type { CourseModule } from '@/types/academy-detail.types'
import { Lock, PlayCircle, FileText, Clock } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion'

interface CourseModulesProps {
  course: ICourseItem
}

// Mock modules data
const mockModules: CourseModule[] = [
  {
    id: '1',
    title: 'Introduction & Academy Overview',
    duration: '15 min',
    description: "Welcome to the academy and what you'll learn",
    isLocked: false,
  },
  {
    id: '2',
    title: 'Fundamentals of Game Mechanics',
    duration: '45 min',
    description: 'Understanding core mechanics and how to master them',
    isLocked: false,
  },
  {
    id: '3',
    title: 'Advanced Strategies & Tactics',
    duration: '60 min',
    description: 'Pro-level strategies used by top players',
    isLocked: true,
  },
  {
    id: '4',
    title: 'Communication & Team Coordination',
    duration: '30 min',
    description: 'Effective communication for team success',
    isLocked: true,
  },
  {
    id: '5',
    title: 'Mental Game & Performance',
    duration: '40 min',
    description: 'Building mental resilience and consistency',
    isLocked: true,
  },
  {
    id: '6',
    title: 'Review & Practice Sessions',
    duration: '90 min',
    description: 'Hands-on practice with instructor feedback',
    isLocked: true,
  },
]

export default function CourseModules({ course }: CourseModulesProps) {
  return (
    <div className="enhanced-card border-radius-propublic p-4 sm:p-6 md:p-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
        Course Content
      </h2>

      <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
        {mockModules.map((module, index) => (
          <AccordionItem
            key={module.id}
            value={module.id}
            className="border border-cream/20 border-radius-propublic overflow-hidden data-[state=open]:border-custom-primary"
          >
            <AccordionTrigger className="w-full p-3 sm:p-4 md:p-6 flex items-center justify-between hover:bg-cream/5 transition-colors [&[data-state=open]>svg]:rotate-180">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                    module.isLocked ? 'bg-cream/10' : 'bg-custom-primary'
                  }`}
                >
                  {module.isLocked ? (
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : index === 0 ? (
                    <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-sm sm:text-base md:text-lg">
                    {module.title}
                  </h4>
                  <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-cream/60">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      {module.duration}
                    </span>
                    {!module.isLocked && (
                      <span className="text-custom-accent">
                        Preview available
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6 border-t border-cream/10">
              <p className="text-sm sm:text-base text-cream/70 mt-2 sm:mt-3 md:mt-4">
                {module.description}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-custom-accent/10 border border-custom-accent/20 border-radius-propublic">
        <p className="text-xs sm:text-sm text-center">
          <span className="text-custom-accent font-bold">6 modules</span> •
          <span className="text-custom-accent font-bold"> 4+ hours</span> of
          content •
          <span className="text-custom-accent font-bold"> Lifetime access</span>
        </p>
      </div>
    </div>
  )
}
