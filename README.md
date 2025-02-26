# Mosaic

A start-page for self-hosted services and bookmarks.

## Deploy

To run it as a docker service, execute: `docker compose up`.

The website is available on [http://localhost:8080](http://localhost:8080).

## Customization

There are two sections to which you can add new elements. Each application entry is a single tile with icon. Bookmarks tiles have their own titles.

### Applications

To add new entry to applications' section, simply copy it's icon to `data/icons`, then edit `data/applications.json`.
Notice that there is no comma after the very last entry.

```
[
    {
        "name": "Foo",
        "url": "https://foo",
        "icon": "foo.svg",
        "hidden": false
    },
    {
        "name": "Bar",
        "url": "https://bar",
        "icon": "bar.svg",
        "hidden": false
    }

]
```

### Bookmarks

Same as above, there should be no comma after the very last entry.

```
[
    {
        "category": "Category Foo",
        "links": [
            {
                "name": "Foo",
                "url": "https://example.com/"
            },
            {
                "name": "Bar",
                "url": "https://example.com/"
            }
        ]
    },
    {
        "category": "Category Bar",
        "links": [
            {
                "name": "Foo",
                "url": "https://example.com/"
            }
        ]
    }
```

Do note, that each of the files mentioned above is by default mounted into a named volume `config`.

### Background

The background image is loaded from `backgrounds/desktop.jpg`. You can replace it with your own image.

## Hidden entries

Each entry in `application.json` file can have an extra parameter set: `"hidden": true`. Those entries won't be displayed by default. To toggle their visibility on desktop version of the website, press the `H` button. On the mobile site, those can be toggled using a floating action bar, that is shown on page scroll.

## License

This project is licensed under the GPL-3.0 License. See the [LICENSE](LICENSE) file for details.
