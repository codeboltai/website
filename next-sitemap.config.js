   /** @type {import('next-sitemap').IConfig} */
   module.exports = {
    siteUrl: process.env.SITE_URL || 'https://codebolt.ai',
    generateRobotsTxt: true, // (optional) Generate a robots.txt file
  }