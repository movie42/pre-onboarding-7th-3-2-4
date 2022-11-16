import Image, { ImageProps } from "next/image";
import React from "react";

interface IImageProps {
  imageProps: ImageProps;
}

const ImageContainer = ({ imageProps }: IImageProps) => {
  return <Image {...imageProps} alt={imageProps.alt} />;
};

export default ImageContainer;
