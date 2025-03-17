import React, {useCallback, useEffect, useState} from 'react';
import {EmblaCarouselType, EmblaOptionsType} from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import {LazyLoadImage} from './EmbleCarouselLazyLoadImage';

import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButton';
import {DotButton, useDotButton} from './EmblaCarouselDotButton';
import {useLoaderData} from '@remix-run/react';
import {json, LoaderFunction} from '@remix-run/server-runtime';
import {IconDot, IconLeft, IconRight} from './Icon';

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
};
interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  images: string[];
}

const EmblaCarousels: React.FC<PropType> = (props) => {
  const {slides, options} = props;

  const [emblaRed, emblaApi] = useEmblaCarousel(options);
  const [slidesInView, setSlidesInView] = useState<number[]>([]);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const {selectedIndex, scrollSnaps, onDotButtonClick} = useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
    setSlidesInView((slidesInView) => {
      if (slidesInView.length === emblaApi.slideNodes().length) {
        emblaApi.off('slidesInView', updateSlidesInView);
      }
      const inView = emblaApi
        .slidesInView()
        .filter((index) => !slidesInView.includes(index));
      return slidesInView.concat(inView);
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    updateSlidesInView(emblaApi);
    emblaApi.on('slidesInView', updateSlidesInView);
    emblaApi.on('reInit', updateSlidesInView);
  }, [emblaApi, updateSlidesInView]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRed}>
        <div className="embla__container">
          {product.images.map((img, index) => (
            <div className="embla__slide">
              <img
                key={index}
                src={img}
                alt="thumbnail"
                className={`rounded-lg cursor-pointer border  ${
                  selectedImage === img ? 'border-green-500' : ''
                }`}
                onClick={() => setSelectedImage(img)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled}>
            <IconLeft className="w-6 h-6 text-gray-500" />
          </PrevButton>
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled}>
            <IconRight className="w-6 h-6 text-gray-500" />
          </NextButton>
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : '',
              )}
            >
              {/* <IconDot className="w-6 h-6" /> */}
            </DotButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousels;
