import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const MyImage = ({className,imageUrl,style}) => (
  <>
    <LazyLoadImage
      className={className}
      style={style}
      // alt={image.alt}
      height={"100%"}
      src={imageUrl} // use normal <img> attributes as props
      width={"100%"} 
      effect="blur"
      />
    {/* <span>{image.caption}</span> */}
  </>
);

export default MyImage;