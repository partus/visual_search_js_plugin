import tingle from './tingle.js'
import './tingle.css'
console.log(tingle,"tingle")
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs'
import getCrop from './cr.js'

// pond.imageEditEditor.onconfirm(getCrop.getCrop(cropper))

const editor = {

    // Called by FilePond to edit the image
    // - should open your image editor
    // - receives file object and image edit instructions
    open: (file, instructions) => {
      console.log("should open",this,file,instructions)
      modalEditor(file,instructions,editor)
        // open editor here
    },

    // Callback set by FilePond
    // - should be called by the editor when user confirms editing
    // - should receive output object, resulting edit information
    onconfirm: (output) => {

    },

    // Callback set by FilePond
    // - should be called by the editor when user cancels editing
    oncancel: () => {},

    // Callback set by FilePond
    // - should be called by the editor when user closes the editor
    onclose: () => {}
}

function instCrop(image) {
  const cropper = new Cropper(image, {
    // aspectRatio: 16 / 9,
    crop(event) {
      console.log(event.detail.x);
      console.log(event.detail.y);
      console.log(event.detail.width);
      console.log(event.detail.height);
      console.log(event.detail.rotate);
      console.log(event.detail.scaleX);
      console.log(event.detail.scaleY);
    },
  });
  return cropper;
}
function modalEditor (file,instructions,editor){
  // instanciate new modal
  var modal = new tingle.modal({
      footer: true,
      stickyFooter: false,
      closeMethods: ['overlay', 'button', 'escape'],
      // closeLabel: "Close",
      // cssClass: ['custom-class-1', 'custom-class-2'],
      onOpen: function() {
          console.log('modal open');
      },
      onClose: function() {
          this.destroy()
          console.log('modal closed');
      },
      beforeClose: function() {
          // here's goes some logic
          // e.g. save content before closing the modal
          return true; // close the modal
          return false; // nothing happens
      }
  });
  const img = document.createElement("img")
  // img.src = "./h4.jpg"
  img.src = URL.createObjectURL(file)
  img.height = 300
  // set content
  modal.setContent(img);
  const cropper = instCrop(img)


  // add a button
  modal.addFooterBtn('Ok', 'tingle-btn tingle-btn--primary', function() {
      const crop = getCrop.getCrop(cropper);
      editor.onconfirm(crop)
      // here goes some logic
      modal.close();
  });
  // open modal
  modal.open();

}


export default editor
