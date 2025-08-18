export const imageUrlF = (url, defaultUrl, opts) =>
  `https://wsrv.nl/?${new URLSearchParams({

    /* The image URL to optimize */
    url,

    /* In case something goes wrong, just show the image */
    default: defaultUrl,

    /* 
      Compress it as much as possible (PNG).
      See: https://images.weserv.nl/docs/format.html#compression-level 
    */
    l: 9,

    /* 
      Reduce PNG file size.
      See: https://images.weserv.nl/docs/format.html#adaptive-filter
    */
    af: '',

    /*
      Enable image optimization for GIF and JPEG.
      See: https://images.weserv.nl/docs/format.html#interlace-progressive
    */
    il: '',

    /*
      Enable image optimization for WebP and GIF.
      See: https://images.weserv.nl/docs/format.html#number-of-pages
    */
    n: -1,

    /* 
      Pass any other option.
      See https://images.weserv.nl/docs/quick-reference.html 
      
      It's recommended to pass `w` for cutting down the image size.
    */
    ...opts
  }).toString()}`
