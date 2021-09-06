import { useLayoutEffect } from 'react'
import { ComponentWillAppearEvent, Navigation } from 'react-native-navigation'

export function useNavigationComponentWillAppear(
  handler: (event: ComponentWillAppearEvent) => void,
  componentId: string,
): void {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerComponentWillAppearListener((event) => {
      if (event.componentId === componentId) {
        handler(event)
      }
    })
    return () => {
      return subscription.remove()
    }
  }, [handler, componentId])
}
