// fix for IFrames - they need to be resized after they load
//
// make this function execute immediately
// use it to not pollute the global context
(function () {
  function resizeIframe (obj) {
    obj.style.height = (obj.contentWindow.document.body.offsetHeight + 32) + 'px'
  }
  const oldOnload = window.onload
  const resizeFunc = function () {
    if (oldOnload) {
      oldOnload()
    }
    const frames = document.getElementsByTagName('iframe')
    for (const iframe of frames) {
      resizeIframe(iframe)
    }
  };
  // we assume this is called exactly once, so we can just set up handlers
  window.onload = resizeFunc;
  window.addEventListener('resize', function () {
    resizeFunc();
  })
})();
