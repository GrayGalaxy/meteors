# Project Meteors ![][sh_vercel]

![][sh_gh_stars] ![sh_version]

It is a simple API to scrape the app stores with urls and app ids. You can make the external links look beautiful with this.

<small><i>Currently this is in beta stages. Some of the api routes may not work.</i></small>

<details>
<summary><strong>Contents</strong></summary>
<ul>
	<li><a href='#inspiration'>Inspiration</a></li>
	<li><a href='#use'>Use</a></li>
	<li><a href='#output'>Output</a></li>
	<li><a href='#development'>Installation</a></li>
	<li><a href='#dependencies'>Dependencies</a></li>
</ul>
</details>

## Inspiration

WordPress has some very interesting plugins. One of them is WP-Appbox. You can check out what it does [here](https://wordpress.org/plugins/wp-appbox/). It is a simple plugin to look the links of your app interesting. If you want the website to look professional, you should use it. It creates a card with information about the apps just from the link.

The problem is that this type of thing is not available for React, and even if you could do it, you will run into some CORS error. So there is no easy way to do this on the front-end.

This project intended the mitigate this problem by acting as a middleman, providing a Rest API so that you can use it on any of your projects.

## Use

Like most of the other Rest APIs you can create a fetch request and get the result.

**Primary url:** `https://meteors.vercel.app/api/v1/`

```js
const axios = require('axios') // HTTP client
const { data } = axios.get('https://meteors.vercel.app/api/v1/microsoft?id=9mspc6mp8fm4')
```

### Routes

**`/api/v1/microsoft`** : To get Windows apps \
**`/api/v1/android`** : to get Google Playstore apps \
**`/api/v1/wordpress`** : to get WordPress Plugins \
**`/api/v1/firefox`** : to get Firefox plugins

### Parameters

`id` : (required) pass in the id of app \
`regn` : Region to get the result in a preferred language

## Output

the output of the above request will look like this

```js
{
  title: "Microsoft Whiteboard",
    image: "https://store-images.s-microsoft.com/image/apps.40339.13824105887454405.4132b91c-7a9c-494e-b21d-fcef1f82a553.1de0ffb1-b186-4aa2-9fe3-82e31d07b5bf?mode=scale&q=90&h=270&w=270&background=%230C34FA",
    type: "Apps",
    id: "9MSPC6MP8FM4",
    category: "Productivity",
    publisher: "‪Microsoft Corporation‬"
}
```

## Development

The installation is as simple as any other Node Project.

- Clone the repo\
  `git clone https://github.com/graygalaxy/appbox`
- Install dependencies with any package mannager\
  `npm ci`
- Start the server by\
  `vercel dev`\
  <small><i>
  Note: If the Vercel CLI is not installed you can install it using : <code>npm i vercel -g</code>
  </i></small>
- Open `localhost:3000` to use the API

## Dependencies

- [Axios](//github.com/cheeriojs/cheerio) : To fetch the HTML from given url
- [Cheerio](//github.com/axios/axios) : To scrape the website and get necessary data

[&#x21e1; Back to top](#)

[sh_gh_stars]: https://img.shields.io/github/stars/graygalaxy/appbox.svg?logo=github&label=Stars
[sh_vercel]: https://img.shields.io/badge/-Vercel-black?logo=vercel&logoColor=white
[sh_version]: https://img.shields.io/github/package-json/v/graygalaxy/appbox/main?label=version
[sh_issue_o]: https://img.shields.io/github/issues-raw/graygalaxy/appbox?label=Open
[sh_issue_c]: https://img.shields.io/github/issues-closed-raw/graygalaxy/appbox?label=Closed
