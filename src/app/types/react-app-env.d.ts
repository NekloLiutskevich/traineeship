// / <reference types="node" />
// / <reference types="react" />
// / <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly PUBLIC_URL: string
  }
}

declare module '*.avif' {
  const src: string
  export default src
}

declare module '*.bmp' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.svg' {
  import type * as React from 'react'

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >

  const src: string
  export default src
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module 'mic-recorder-to-mp3' {
  type IConfigProps = {
    bitRate: number
    startRecordingAt?: number
    deviceId?: string
  }

  type IConfig = {
    bitRate: number
    startRecordingAt: number
    deviceId?: null
  }

  export default class MicRecorder {
    public start: () => Promise
    public stop: () => Promise
    public getMp3: () => Promise

    config: IConfigProps
    activeStream: MediaStream | null
    context: AudioContext | null
    microphone: MediaStreamAudioSourceNode | null
    processor: ScriptProcessorNode | null
    startTime: number
    timerToStart?: number

    constructor(config: IConfigProps) {
      this.config = config
    }
  }
}

declare module '*.mp3' {
  export default string
}

declare module '*.wav' {
  export default string
}
