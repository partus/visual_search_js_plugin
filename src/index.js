import {
  registerPlugin,
  create
} from 'filepond';

import 'filepond/dist/filepond.min.css';

import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

registerPlugin(
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImagePreview,
  FilePondPluginImageEdit
);
// Import the plugin code
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';

// Import the plugin styles
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';

import editor from './editor.js'

export function build(options) {
  const buttonContainer = document.getElementById(options.buttonContainerId)
  let inputElement = buttonContainer.querySelector("input")
  if (!inputElement) {
    inputElement = document.createElement('input');
    inputElement.type = "file";
    // inputElement.accept = "image/*"
    if (options.mobileCameraOnly) {
      inputElement.setAttribute("capture", "camera");
    }
    buttonContainer.appendChild(inputElement)

  }
  inputElement.name = "image"


  const pond = create(inputElement, {
    // maxFiles: 1,
    imagePreviewHeight: 128,
    instantUpload: true,
    labelIdle: options.buttonContent,
    imageEditEditor: editor,
    onpreparefile: (file, output) => {
      console.log("prepare", file, output)
      if (options.previewImageId) {
        const img = document.getElementById(options.previewImageId)
        img.src = URL.createObjectURL(output)
        // img.src = URL.createObjectURL(file)
      }
    },
    credits: [],
    dropOnPage: true, //[false, Type.BOOLEAN], // Allow dropping of files anywhere on page (prevents browser from opening file if dropped outside of Up)
    dropOnElement: false, // [true, Type.BOOLEAN], // Drop needs to happen on element (set to false to also load drops outside of Up)
    dropValidation: true, //[false, Type.BOOLEAN], // Enable or disable validating files on drop
    server: {
      // url: "http://127.127.0.1:8080",
      process: {
        url: 'http://127.127.0.1:8080/search/default',
        method: 'POST',
        // withCredentials: false,
        withCredentials: false,
        // headers: {
        //   'Access-Control-Allow-Origin': "*"
        // },
        timeout: 7000,
        onload:  function(result){
          options.onresult(JSON.parse(result))
        },
        onerror: function() {
          console.log('onerror', arguments)
        },
        // ondata: null
      },
      fetch: null,
      revert: null
    },
    allowProcess: false,
    allowMultiple: false,
    allowReplace: true
  });
}
// module.exports =  {build}

// export default ImageSearch
window.ImageSearch = build
