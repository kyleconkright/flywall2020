const whitelist = ['https://flywall.org', 'https://www.flywall.org', 'localhost', 'http://localhost:3000'];

export const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}