// Layout Components Export
export { Navigation } from "./layout/Navigation"
export { Footer } from "./layout/Footer"

// Section Components Export
export { HeroSection } from "./sections/HeroSection"
export { FeaturesSection } from "./sections/FeaturesSection"
export { HowItWorksSection } from "./sections/HowItWorksSection"
export { CTASection } from "./sections/CTASection"
export { AboutSection } from "./sections/AboutSection"

// UI Components Export
export { FeatureCard } from "./ui/FeatureCard"
export { ProcessStep } from "./ui/ProcessStep"
export { UploadArea } from "./ui/UploadArea"
export { LoadingFallback } from "./ui/LoadingFallback"

import { LucideIcon } from "lucide-react"

export interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: number
}

export interface ProcessStepProps {
  number: number
  title: string
  description: string
  showLine?: boolean
}
