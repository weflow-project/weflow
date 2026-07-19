// /service — 서비스 소개 페이지.
// 메인처럼 섹션을 위에서 아래로 쌓고, 스크롤 스냅(snap-home)을 켠다.
'use client'
import { useEffect } from 'react'
import ServiceFeatures from '@/components/service/ServiceFeatures'
import ServiceSteps from '@/components/service/ServiceSteps'
import ServiceSwitch from '@/components/service/ServiceSwitch'
import AdManagement from '@/components/service/AdManagement'
import ServiceCTA from '@/components/service/ServiceCTA'
import PageIntro from '@/components/PageIntro'

export default function ServicePage() {
  // 이 페이지에 있는 동안만 body에 스크롤 스냅 클래스를 붙인다
  useEffect(() => {
    document.body.classList.add('snap-home')
    return () => document.body.classList.remove('snap-home')
  }, [])

  return (
    <>
      <PageIntro
        eyebrow="SERVICE"
        title={
          <>
            제작부터 관리까지, <span className="c-accent">한 번에</span>
          </>
        }
        body="기획·디자인·개발은 물론 광고 연동과 운영 관리까지 — WEFLOW가 어디까지 함께하는지 정리했습니다."
      />
      <ServiceFeatures />
      <ServiceSteps />
      <ServiceSwitch />
      <AdManagement />
      <ServiceCTA />
    </>
  )
}
