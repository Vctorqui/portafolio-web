import React from 'react'

interface IconProps {
  width?: any
  height?: any
  additionalClassName?: any
}

export const AccessibilityIcon = ({ width, height }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 14 17'
      fill='none'
    >
      <path d='M8.5 0H5.5V3H8.5V0Z' fill='currentColor' />
      <path d='M0 5H14V7H10V17H8V13H6V17H4V7H0V5Z' fill='currentColor' />
    </svg>
  )
}

export const BlockIcon = ({
  width,
  height,
  additionalClassName,
}: IconProps) => (
  <svg
    style={additionalClassName}
    width={width}
    height={height}
    focusable='false'
    viewBox='0 0 200 28'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    aria-labelledby='blockLogo'
    role='img'
  >
    <title id='blockLogo'>{'Block logo'}</title>
    <path
      d='M138.735 27.6325C149.321 27.6325 154.146 25.242 155.154 18.2536H147.636C146.703 20.9589 144.532 22.0346 137.464 22.0346H136.005C127.145 22.0346 125.496 20.2179 125.496 14.7196V13.867C125.496 8.34486 127.141 6.52806 136.002 6.52806H137.448C144.516 6.52806 146.687 7.6038 147.619 10.3091H155.137C154.13 3.34068 149.305 0.930237 138.719 0.930237H134.698C122.578 0.930237 118.017 4.15745 118.017 13.349V15.2017C118.017 24.3933 122.578 27.6206 134.698 27.6206L138.735 27.6325Z'
      fill='black'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M112.638 15.2135C112.638 24.4051 107.924 27.6323 95.4741 27.6323H91.3583C78.9395 27.6323 74.2261 24.4051 74.2261 15.2135V13.3609C74.2261 4.16928 78.9434 0.942046 91.3583 0.942046H95.4741C107.924 0.942046 112.638 4.16928 112.638 13.3609V15.2135ZM92.5535 22.0544H94.3141V22.0345C103.514 21.9946 105.195 20.2177 105.195 14.7195V13.8987C105.195 8.37661 103.514 6.59566 94.3141 6.55981H92.5535C83.3022 6.59566 81.7085 8.37661 81.7085 13.8987V14.7514C81.7085 20.2376 83.3181 22.0145 92.5535 22.0544Z'
      fill='black'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M34.8303 19.6244V20.1821C34.8303 25.4055 31.866 27.2621 23.527 27.27H0.0400391V1.32086H22.7501C30.866 1.32086 34.0812 2.76713 34.0812 7.54819V7.91075C34.0812 11.8113 32.2485 13.405 29.2205 13.8034V13.9907C32.5473 14.2497 34.7545 15.6959 34.8303 19.6244ZM21.9652 6.79916H7.37898V11.3969H22.1485C25.6625 11.3969 26.7463 10.879 26.7463 9.20961V9.06219C26.7463 7.3171 25.6665 6.79916 21.9652 6.79916ZM27.5033 19.1064C27.5033 16.9828 26.2283 16.5844 21.9253 16.5844L7.37898 16.5924V21.7719H21.9253C26.2681 21.7719 27.5033 21.2938 27.5033 19.2539V19.1064Z'
      fill='black'
    />
    <path
      d='M69.8557 27.262V21.2538H48.5362V1.33267H41.2092V27.2819L69.8557 27.262Z'
      fill='black'
    />
    <path
      d='M168.683 27.2618V19.1021L174.629 15.6557H174.852L189.139 27.2578H200L181.114 11.9863L199.478 1.3086H188.278L168.871 12.6875H168.683V1.31256H161.353V27.2618H168.683Z'
      fill='black'
    />
  </svg>
)

export const PlayIcon = ({ width, height, additionalClassName }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={width}
    height={height}
    style={additionalClassName}
  >
    <path d='M8 5v14l11-7z' />
  </svg>
)

export const CloseIcon = ({ width, height }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    width={width}
    height={height}
  >
    <path
      stroke='currentColor'
      strokeLinecap='square'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M18 6 6 18M6 6l12 12'
    />
  </svg>
)

export const MuteIcon = ({ width, height }: IconProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height}>
    <path d='M12 4c3.87 0 7 3.13 7 7v2h-2.92L21 17.92V11a9 9 0 0 0-9-9c-1.95 0-3.76.62-5.23 1.68l1.44 1.44A6.9 6.9 0 0 1 12 4M2.27 1.72 1 3l3.33 3.32A8.9 8.9 0 0 0 3 11v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-1.17.29-2.26.79-3.22L15 17v4h3c.3 0 .59-.06.86-.14L21 23l1.27-1.27z' />
  </svg>
)

export const SoundIcon = ({
  width,
  height,
  additionalClassName,
}: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={width}
    height={height}
    style={additionalClassName}
  >
    <path d='M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-4v8h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9' />
  </svg>
)

export const TidalIcon = ({
  width,
  height,
  additionalClassName,
}: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={width}
    height={height}
    style={additionalClassName}
  >
    <path d='M4 4 0 8l4 4 4-4 4 4-4 4 4 4 4-4-4-4 4-4 4 4 4-4-4-4-4 4-4-4-4 4z' />
  </svg>
)
