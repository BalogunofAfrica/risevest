# Description

This project is setup using [expo sdk 48](https://expo.dev "expo").

## Folder Description

The folders are descriptive of what they contain or what they do, for example the [services](./app/services/) folder contains business logic for the api layer and the storage layer, the [utils](./app/utils/) folder contains utility functions, classes and types used app wide etc...

The [declarations](./app/declarations/) folder might not be as obvious as the rest, but it is essentially used to augment global types app wide to make the developer's experience much better. It augments types for assets like images, svg etc... It also augment types for other things such as the navigation stack, fetch API, environment variables etc...

## Error Handling

The project uses [zod](https://zod.dev/ "zod") to validate both the user's input and REST API requests and responses.

## Code branching

The project uses [ts-pattern](https://github.com/gvergnaud/ts-pattern "ts-pattern") for code branching and exhaustive checks to ensure there are no cases that are not handled.

## Styling

The project uses [restyle](https://github.com/Shopify/restyle "restyle") to create a type enforced design system. This ensures ease of styling and consistency.
