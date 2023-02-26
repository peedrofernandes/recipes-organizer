import React, { useEffect, useState } from "react"
import styled from "styled-components"
import useTheme from "../hooks/useTheme"
import useViewportTracker from "../hooks/useViewportTracker"

const WaveContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 0;
  overflow: hidden;
`

export default function Wave() {
  const { theme } = useTheme()
  const viewportStatus = useViewportTracker()
  const [extraHeight, setExtraHeight] = useState<number>(1)

  useEffect(() => {
    switch (true) {
    case viewportStatus.lg:
      setExtraHeight(200)
      break

    case viewportStatus.md:
      setExtraHeight(400)
      break
    case viewportStatus.sm:
      setExtraHeight(1000)
      break
    case viewportStatus.xs:
      setExtraHeight(1400)
      break
    }
  }, [viewportStatus])

  return (
    <WaveContainer>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 1440 ${320 + extraHeight}`}>
        <linearGradient id="wave-gradient" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor={theme.color.primaryV1} />
          <stop offset="100%" stopColor={theme.color.primaryV2} />
        </linearGradient>
        <path fill="url(#wave-gradient)" fillOpacity="1" d={`
        M0,${extraHeight + 192}
        L80,${extraHeight + 170.7}
        C160,${extraHeight + 149},320,${extraHeight + 107},480,${extraHeight + 101.3}
        C640,${extraHeight + 96},800,${extraHeight + 128},960,${extraHeight + 165.3}
        C1120,${extraHeight + 203},1280,${extraHeight + 245},1360,${extraHeight + 266.7}
        L1440,${extraHeight + 288}
        L1440,0
        L1360,0
        C1280,0,1120,0,960,0
        C800,0,640,0,480,0
        C320,0,160,0,80,0
        L0,0Z`}>
        </path>
      </svg>
    </WaveContainer>
  )
}