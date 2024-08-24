# hellos
Simple API for getting a "Hello" text in multiple languages

## Params

The following options that can be passed to the API as query parameters:

| Name           | Type                  | Default  | Description                                                 |
|----------------|-----------------------|----------|-------------------------------------------------------------|
| `width`        | `number`              | 300      | Width of the image.                                         |
| `height`       | `number`              | 200      | Height of the image.                                        |
| `fontSize`     | `number`              | 40       | Font size of the text.                                      |
| `textColor`    | `string`              | "white"  | Color of the text. Can be any valid CSS color value.        |
| `bgColor`      | `string`              | "teal"   | Color of the background. Can be any valid CSS color value.  |
| `borderRadius` | `number` or `string`  | 20       | Radius of the borders. Can be set individually following the syntax of [CSS border-radius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius#values) (e.g. `20,10,40,10`). |
