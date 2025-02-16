### About
This project is my personal attempt to document the typings of [Firebot](https://github.com/crowbartools/Firebot/)'s internal application services. If you are not constructing a custom Firebot plugin, or building Firebot yourself, this project offers you nothing (*these aren't the droids you're looking for.apng*).

### Usage
1. Install the `@phroggie/firebot-typed-services` package using your preferred package manager (as well as the official plugin types), e.g.:
    - npm: `npm install -D @crowbartools/firebot-custom-scripts-types @phroggie/firebot-typed-services`
    - yarn: `yarn add --D @crowbartools/firebot-custom-scripts-types @phroggie/firebot-typed-services`
2. In a custom effect definition, or any other place that utilizes auto-injected symbol names:
    - Import the type definition: `import { NgToast } from "@phroggie/firebot-typed-services";`
    - Utilize it:
```ts
// ... this is an excerpt ... In the real world, there would be a lot of other stuff above and below this.
optionsController: ($scope: any, ngToast: NgToast) => {
    $scope.showToast = () => {
        // Note that the ngToast instance is now fully typed, and is fully commented with JSDoc
        ngToast.create({className: "success", content: "Hello world from phroggie's Firebot Typed Services!", timeout: 10 * 1000});
    };
}
```
