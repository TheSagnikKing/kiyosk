import React from 'react'
import './AdvertisementSlider.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const AdvertisementSlider = () => {
    return (
        <Carousel 
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        >
            <div className='advertisement-comp'>
                <img src="https://wallpapers.com/images/hd/hotel-background-2qosz2h6xb1xpnka.jpg" />
            </div>
            <div className='advertisement-comp'> 
                <img src="https://png.pngtree.com/thumb_back/fh260/background/20220312/pngtree-hotel-lobby-image_1064968.jpg" />
            </div>
            <div className='advertisement-comp'>
                <img src="https://wallpapers.com/images/hd/hotel-background-fl2hcha9i9np5uw5.jpg" />
            </div>
        </Carousel>
    )
}

export default AdvertisementSlider