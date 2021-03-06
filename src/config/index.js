module.exports = {
  author: "@hotpinkpoliticalmatrix",
  siteTitle: "Stacey Eliuk Personal Portfolio",
  siteShortTitle: "Stacey Eliuk", // Used as logo text in header, footer, and splash screen
  siteDescription: "Web Developer Portfolio",
  siteUrl: "https://gatsby-starter-portfolio-minimal.netlify.app/",
  siteLanguage: "en_US",
  siteIcon: "src/content/rebels.png", // Relative to gatsby-config file

  splashScreen: true, // Set this to true if you want to use the splash screen

  // You can create your own Medium feed with this rss to json converter: https://rss2json.com/
  // To access your Medium RSS feed, just replace this url with your username: https://medium.com/feed/@{yourname}
  // mediumRssFeed:
  //   "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40konstantin.muenster",
  // shownArticles: 3,

  // There are icons available for the following platforms:
  // Medium, GitHub, LinkedIn, XING, Behance
  socialMedia: [
    {
      name: "Linkedin",
      url: "https://www.linkedin.com/in/staceyeliuk/",
    },
    {
      name: "Github",
      url: "https://github.com/hotpinkpoliticalmatrix",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/stacey.eliuk/",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/hotpinkpoliticalmatrix",
    },
  ],

  navLinks: {
    menu: [
      {
        name: "About Me",
        url: "/#about",
      },
      {
        name: "Proficiencies",
        url: "/#proficiencies",
      },
      {
        name: "Projects",
        url: "/#projects",
      },
    ],
    button: {
      name: "Contact",
      url: "/#contact",
    },
  },
}
