
function getCrop(imageEditor) {
  /* Constants. */
  const canvasData = imageEditor.getCanvasData() // Cropperjs method getCanvasData()
  const cropData = imageEditor.getData() // Cropperjs method getData()

  /* Ratio of selected crop area. */
  const cropAreaRatio = cropData.height / cropData.width

  /* Center point of crop area in percent. */
  const percentX = (cropData.x + cropData.width / 2) / canvasData.naturalWidth
  const percentY = (cropData.y + cropData.height / 2) / canvasData.naturalHeight

  /* Calculate available space round image center position. */
  const cx = percentX > 0.5 ? 1 - percentX : percentX
  const cy = percentY > 0.5 ? 1 - percentY : percentY

  /* Calculate image rectangle respecting space round image from crop area. */
  let width = canvasData.naturalWidth
  let height = width * cropAreaRatio
  if (height > canvasData.naturalHeight) {
    height = canvasData.naturalHeight
    width = height / cropAreaRatio
  }
  const rectWidth = cx * 2 * width
  const rectHeight = cy * 2 * height

  /* Calculate zoom. */
  const zoom = Math.max(rectWidth / cropData.width, rectHeight / cropData.height)

  /* Callback filepond. */
  return {
    data: {
      crop: {
        center: {
          x: percentX,
          y: percentY
        },
        flip: {
          horizontal: cropData.scaleX < 0,
          vertical: cropData.scaleY < 0
        },
        zoom: zoom,
        rotation: (Math.PI / 180) * cropData.rotate,
        aspectRatio: cropAreaRatio
      }
    }
  }
}



const instructions =  {
    crop: {

        // Center point of crop
        center: {
            x: .5,
            y: .5
        },

        // Has the image been flipped
        flip: {
            horizontal: false,
            vertical: false
        },

        // How far to zoom the image
        zoom: 1,

        // Rotation of image
        rotation: 0,

        // Aspect ratio of crop, `null` === free
        aspectRatio: null
    }
}

const output = {
    data: {
        // This is the same as the instructions object
        crop: {
            center: {
                x: .5,
                y: .5
            },
            flip: {
                horizontal: false,
                vertical: false
            },
            zoom: 1,
            rotation: 0,
            aspectRatio: null
        }
    }
}

export default {getCrop}
