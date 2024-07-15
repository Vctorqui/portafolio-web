import React from 'react'

interface IconProps {
  width?: any
  height?: any
  additionalClassName?: any
  color: any
}

export const LinkedinIcon = ({
  width,
  height,
  color,
  additionalClassName,
}: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={width}
    height={height}
    className={additionalClassName}
    viewBox='0 0 22.886 22.886'
  >
    <path
      id='Icon_akar-linkedin-fill'
      data-name='Icon akar-linkedin-fill'
      d='M11.5,10.975h4.25v2.117a4.876,4.876,0,0,1,4.541-2.312c4.521,0,5.595,2.424,5.595,6.87v8.236H21.309V18.663c0-2.532-.612-3.96-2.171-3.96-2.162,0-3.06,1.539-3.06,3.959v7.224H11.5ZM3.652,25.692H8.23V10.78H3.652V25.692ZM8.885,5.918A2.9,2.9,0,0,1,8.024,7.98,2.941,2.941,0,0,1,3,5.918a2.9,2.9,0,0,1,.862-2.063,2.96,2.96,0,0,1,4.162,0A2.9,2.9,0,0,1,8.885,5.918Z'
      transform='translate(-3 -3)'
      fill={color}
    />
  </svg>
)

export const PlayIcon = ({ width, height, additionalClassName }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={width}
    height={height}
    className={additionalClassName}
  >
    <path d='M8 5v14l11-7z' />
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
    className={additionalClassName}
  >
    <path d='M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-4v8h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9' />
  </svg>
)
