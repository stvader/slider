function Slider(selector, options) {
	__self = this;

	var sliderNode = document.querySelector(selector),
		sliderImagesNode = sliderNode.querySelector('.slider__images-wrap'),
		prevSliderNode = sliderNode.querySelector('.slider__pager_previous'),
		nextSliderNode = sliderNode.querySelector('.slider__pager_next'),
		paginationNode = sliderNode.querySelector('.slider__pagination');
	

	var currentSlideIndex = options.currentSlide || 0,
		imagesCount = sliderImagesNode.children.length,
		slideSide = sliderImagesNode[(options.direction === 'vertical') ? 'offsetHeight' : 'offsetWidth'];

	

	this.prevSlide = function() {
		if (currentSlideIndex === 0) {
			currentSlideIndex = imagesCount - 1;
			return;
		}
		currentSlideIndex--;
	}

	this.nextSlide = function() {
		if (currentSlideIndex === imagesCount - 1) {
			//currentSlideIndex = 0;
			__self.__renderCycleNext();			
			//return;
		}
		currentSlideIndex++;
	}

	this.__renderCycleNext = function() {
		currentSlideIndex--;
		var firstImage = sliderImagesNode.children[0];
		sliderImagesNode.removeChild(firstImage);
		sliderImagesNode.appendChild(firstImage);
		__self.__render();
		//console.log(sliderImagesNode.style.marginLeft);

		//console.log(currentSlideIndex);
	}

	this.__render = function() {
		var directionStyle = (options.direction === 'vertical') ? 'marginTop' : 'marginLeft';
		sliderImagesNode.style[directionStyle] = -(currentSlideIndex*slideSide) + 'px';
		//console.log('margin');
		console.log(sliderImagesNode.style.marginLeft);
		if (paginationNode.querySelector('.active')) {
			paginationNode.querySelector('.active').classList.remove('active');
		};
		paginationNode.children[currentSlideIndex].querySelector('a').classList.add('active');
	}

	this.__createPoints = function() {
		var fragmentPoints = document.createDocumentFragment();
		var pointTmp = paginationNode.querySelector('.slider__pagination-item_tmpl');
		for (var i=0; i<imagesCount; i++) {
			var point = pointTmp.cloneNode(true);
			point.firstChild.setAttribute('data-slider__item', i);
			point.firstChild.innerHTML = i;
			
			point.classList.remove('slider__pagination-item_tmpl');
			//console.log(point);
			fragmentPoints.appendChild(point);
		}
		paginationNode.appendChild(fragmentPoints);
		pointTmp.parentNode.removeChild(pointTmp);
	}

	prevSliderNode.onclick = function(e) {
		e.preventDefault();
		__self.prevSlide();
		__self.__render();
	}

	nextSliderNode.onclick = function(e) {
		e.preventDefault();
		__self.nextSlide();
		__self.__render();
	}

	paginationNode.onclick = function(e) {
		e.preventDefault();

		var target = event.target;
		if (target.tagName != 'A') {return;}

		currentSlideIndex = +target.dataset['slider__item'];
		__self.__render();
	}

	this.__init = function () {
	if (options.direction === 'vertical') {
            sliderImagesNode.style.whiteSpace = 'normal';
        }
        __self.__createPoints();
    	
    	__self.__render();
    };

    this.__init();
}