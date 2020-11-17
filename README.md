# JavaScript Based Image Search Plugin for Online Stores

## Quick Integration

1. Include `dist/bundle.js` in the head of your site:
```
<script src="path_to/bundle.js" />
```
2. Create a container element with a defined `id` in your site, where the plugin will be rendered, e.g.
```
<div id="btn-container-id"> </div>
```
3. (Optional) Create an `img` element with defined `id` , if you want image preview, e.g.
```
<img id="preview-img" style="height:200px;" />
```
4. Initialize the plugin
```
ImageSearch({
    buttonContainerId: "btn-container-id",
    // Id of the image where the preview will be rendered (Optional)
    previewImageId: "preview-img",
    // Content of the container, accpts html string. In this example, it will show a camera icon.
    buttonContent: '<img src="https://upload.wikimedia.org/wikipedia/commons/8/86/Line-style-icons-camera.svg">',
    // Whether to open the camera immediatly on mobile devices or allow to choose from gallery as well
    mobileCameraOnly: true,
    // Provided search API endpoint,
    endpoint: "http://search.engine/search/your_shop_name",
    // Specify a custom callback, which handles results from search engine.
    onresult: function(result) {
      alert(result)
    }
})
```

### Search Results

The search result contains product ids of the products which are most similar to the one available in the image. These products should be inserted beforehand into the search engine using the search engine API.
The search result also contains the distance measure between the product and the stuff depicted in the image. The search result is represented in JSON format as follows:

```
{
  // Statuse code
  "status": 200,
  // Ids of the most similar products (the most similar first)
  "products": [
    "5",
    "177"
    ...
  ],
  // Distance measure for the above product ids ranging [0,1]
  "distances": [
    0.5645317196846008,
    0.9645317196846008,
    ...
  ]
}
```
A complete example is available [here](./dist/sample.html).


## In Case if you want to contribute or change the plugin for your own needs.
### Install Dependencies
```
npm install
```

## Run in development Mode
```
npm run dev
```
## Build the Plugin

```
npm run build
```
The output will be written to `dist`
