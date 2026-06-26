'use client'
import { useEffect } from 'react'
import HeroBanner from '@/components/home/HeroBanner'
import PartnershipSection from '@/components/home/PartnershipSection'
import ListeningSection from '@/components/home/ListeningSection'
import WhyWeflowSection from '@/components/home/WhyWeflowSection'
import BenefitsSection from '@/components/home/BenefitsSection'
import ReviewsSection from '@/components/home/ReviewsSection'
import ComparisonCTA from '@/components/home/ComparisonCTA'
import FinalCTA from '@/components/home/FinalCTA'

export default function HomePage() {
  useEffect(() => {
    document.body.classList.add('snap-home')
    return () => document.body.classList.remove('snap-home')
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <HeroBanner />
      <PartnershipSection />
      <ListeningSection />
      <WhyWeflowSection />
      <BenefitsSection />
      <ReviewsSection />
      <ComparisonCTA />
      <FinalCTA />
    </>
  )
}
