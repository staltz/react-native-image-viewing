import React, { useState, useCallback } from "react";
import { View, Image, Dimensions } from "react-native";
import useImageDimensions from "../../hooks/useImageDimensions";
import { ImageSource } from "../../@types";
import { ImageLoading } from "./ImageLoading";

type Props = {
  imageSrc: ImageSource;
};

const ImageItem = ({ imageSrc }: Props) => {
    const SCREEN = Dimensions.get('window');
    const SCREEN_WIDTH = SCREEN.width;
    const SCREEN_HEIGHT = SCREEN.height;
    const imageDimensions = useImageDimensions(imageSrc);
    const [isLoaded, setLoadEnd] = useState(false);
    const onLoaded = useCallback(() => setLoadEnd(true), []);
    const imagesStyles = imageDimensions ? {
        width: '100%',
        height: '100%',
    } : null;
    return (<View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Image source={imageSrc} style={imagesStyles} resizeMode={'contain'} onLoad={onLoaded}/>
      {(!isLoaded || !imageDimensions) && <ImageLoading />}
    </View>);
};
export default React.memo(ImageItem);

