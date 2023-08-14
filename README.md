
# Decoupled Parts Kit proof of concept

This is a proof of concept for a decoupled (headless?) parts kit.

#### Table of Contents
- [Key Concepts](#key-concepts)
- [Contribute to this project](#contribute-to-this-project)

![Diagram of decoupled parts kit](docs/hero-image.png)

### Key Concepts

#### The Navigation JSON file
The navigation JSON file contains a nested tree of pages.

You could either write this JSON by hand, or your CMS of choice could have a plugin created to create this navigation on the fly.

```json
[
  {
    "title": "Buttons",
    "children": [
      {
        "title": "Primary",
        "url": "/parts-kit/button/primary"
      },
      {
        "title": "Disabled",
        "url": "/parts-kit/button/disabled"
      }
    ]
  },
  {
    "title": "Cards",
    "children": [
      {
        "title": "Basic Card",
        "url": "/parts-kit/cards/basic"
      }
    ]
  }
]
```

#### CMS or App Rendered Content

The CMS or App renders the content. All it needs to do is provide urls for each part. These URLS render the CSS, JS and Markup for a part.

It is optional for a CMS to generate a Navigation JSON file. But for commonly used platforms, it would make sense to automate this.

#### Parts Kit Shell

The parts kit reads the Navigation JSON file and creates a nav.

When a nav item is clicked, an `<iframe>` in the parts kit loads the URLs listed in the Nav file.

The `<iframe>` isolates projects styles and scripts from the parts kits. It also makes it easy to emulate screen sizes and test the responsive behaviors of your components.

## Possible Features

### Parts Kit
**Required**
- Loads a JSON file that builds the parts kit navigation.
- On clicking a nav item Loads the part URL within an `<iframe>`

**Optional**
- URLS are updated, so you can link to a specific part
- Screen size emulation
- Multiple frame sizes at once (like [Responsively](/Users/joshuapease/Development/_internal/parts-kit/README.md))
- Editable text / images with JavaScript that inserts `contenteditable` attributes .
- Can parse the URL that the CMS provides and pull out copy/pastable snippets.
- If the CMS provides a .md file, will render and style the documentation
- Expanding a nav item auto-selects the first child with a URL
- 3+ levels of navigation.
```
Styles
- Colors
-- Colors
- Typography
-- Headings
-- Rich Text

Components
- Buttons
-- Primary
-- Secondary
```

### CMS Plugin

**Required**

- Provides a URL to render individual parts.

**Optional**
- Generates JSON for the parts kit navigation.
- Provides a `/parts-kit` url that inserts loads JavaScript for parts kit.
- Automatically inserts any JavaScript for turning on `contenteditable` or copy/paste of snippets.
- Helpers for dummy text and images (some of this already exists in `craft-viget-base`)

# Contribute to this project

## Deploy

Right now the demo is deployed to github pages. It's a manual process that uses the [gh-pages](https://github.com/tschaub/gh-pages) npm package.
- Check out the `main` branch
- Call `npm run deploy`
