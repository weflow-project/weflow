import Script from 'next/script'

/**
 * 스마트로그(smlog) 방문 추적 메인 스크립트 — 광고 대행사 요청으로 전 페이지에 심는다.
 * 설치 안내상 </body> 바로 앞 삽입이라 레이아웃 body 끝에서 렌더한다.
 *
 * 계정 설정(hpt_info)은 smart.js 가 실행되기 전에 정의돼 있어야 해서
 * 일반 <script> 로 HTML 에 바로 새기고, 본체는 next/script 로 불러온다.
 * 전환 스크립트(회원가입·주문·문의)는 대행사에서 필수가 아니라고 해 넣지 않았다.
 */
const ACCOUNT = 'UHPT-39185'
const SERVER = 'a31'

export default function Smartlog() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `var hpt_info={'_account':'${ACCOUNT}','_server':'${SERVER}'};`,
        }}
      />
      <Script src="https://cdn.smlog.co.kr/core/smart.js" strategy="afterInteractive" />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://${SERVER}.smlog.co.kr/smart_bda.php?_account=${ACCOUNT.replace('UHPT-', '')}`}
          alt=""
          style={{ display: 'none', width: 0, height: 0 }}
        />
      </noscript>
    </>
  )
}
