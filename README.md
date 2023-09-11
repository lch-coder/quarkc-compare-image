# quarkc-compare-image

Image comparison component is realized based on Quarkc, modified according to vue-compare-image.

Simple web component to compare two images using slider.

![img](https://user-images.githubusercontent.com/10986861/67158760-0f02a480-f377-11e9-9b83-75bc8005693a.gif)

## Demo

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello Quark</title>
    <script type="module" src="https://unpkg.com/quarkc-compare-image"></script>
    <style>
      body {
        margin: 0;
        display: grid;
        justify-content: center;
      }
      p {
        text-align: center;
      }
      quarkc-compare-image {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <quarkc-compare-image
      leftImage="https://vue-compare-image.yuuniworks.com/cat1.jpg"
      rightImage="https://vue-compare-image.yuuniworks.com/cat2.jpg"
    />
  </body>
</html>
```

## Features

- Simple
- Responsive (fit to the parent width)
- Size difference between two images handled correctly. Element size determined by following two factors:
  - width of the parent
  - right image's aspect ratio

## How to use

This component can be used whether it is a Vue, React, Angular, or Jq project.

In the shell:

```bash
npm install quarkc-compare-image
```

In your component file:

```js
import QuarkcCompareImage from "quarkc-compare-image";
```

```xml
<QuarkcCompareImage
      leftImage="https://vue-compare-image.yuuniworks.com/cat1.jpg"
      rightImage="https://vue-compare-image.yuuniworks.com/cat2.jpg"
    />
```

## Props

| Prop (\* required)       | type           | default | description                          |
| ------------------------ | -------------- | :-----: | ------------------------------------ |
| handleSize               | number (px)    |   40    | diameter of slider handle (by pixel) |
| hover                    | boolean        |  false  | Whether to slide at hover            |
| leftImage \*             | string         |  null   | left image's url                     |
| leftImageAlt             | string         |  null   | left image's alt                     |
| leftLabel                | string         |  null   | Left image text label                |
| rightImage \*            | string         |  null   | right image's url                    |
| rightImageAlt            | string         |  null   | right image's alt                    |
| rightLabel               | string         |  null   | Right image text label               |
| sliderLineWidth          | number (px)    |    2    | line width of slider (by pixel)      |
| sliderPositionPercentage | number (float) |   0.5   | Starting line position (from 0 to 1) |

## Dependencies

- [css-element-queries](https://github.com/marcj/css-element-queries) to detect element resize event.
