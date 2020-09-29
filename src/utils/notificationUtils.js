import {NOTIFICATIONS_POSITIONS} from "../constants/constants";

export const generateFlyTransition = (position, transitionDuration = 1000) => {
  const duration = transitionDuration
  switch (position){
    case NOTIFICATIONS_POSITIONS.TOP_RIGHT:
      return {
        x: 1000,
        duration
      }
    case NOTIFICATIONS_POSITIONS.TOP_LEFT:
      return {
        x: -1000,
        duration
      }
    case NOTIFICATIONS_POSITIONS.TOP_CENTER:
      return {
        y: -1000,
        duration
      }
    case NOTIFICATIONS_POSITIONS.BOTTOM_RIGHT:
      return {
        x: 1000,
        duration
      }
    case NOTIFICATIONS_POSITIONS.BOTTOM_LEFT:
      return {
        x: -1000,
        duration
      }
    case NOTIFICATIONS_POSITIONS.BOTTOM_CENTER:
      return {
        y: 1000,
        duration
      }
    default:
      return {
        x: -1000,
        duration
      }
  }
}