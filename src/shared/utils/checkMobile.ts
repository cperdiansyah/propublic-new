export const checkMobile = (): boolean => {
  // Check if the user agent matches common mobile device patterns
  const userAgent = navigator.userAgent

  // Regular expression to match mobile devices
  const mobileRegex =
    /android|avantgo|blackberry|bada\/|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce; ppc; |xda/

  return mobileRegex.test(userAgent)
}
