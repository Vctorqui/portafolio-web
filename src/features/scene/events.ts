import { SCENE_SHAKE_EVENT } from './config'

/** Asks the footer scene to shake its biggest pine (colophon's "Try it"). */
export function shakeTallestPine() {
  window.dispatchEvent(new Event(SCENE_SHAKE_EVENT))
}
