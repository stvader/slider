function Slider(selector, options) {
	__self = this;

	var sliderNode = document.querySelector(selector),
		sliderImagesNode = sliderNode.querySelector('.slider__images-wrap'),
		prevSliderNode = sliderNode.querySelector('.slider__pager_previous'),
		nextSliderNode = sliderNode.querySelector('.slider__pager_next'),
		paginationNode = sliderNode.querySelector('.slider__pagination');
	

	var currentSlideIndex = options.currentSlide || 0,
		imagesCount = sliderImagesNode.children.length,
		//width = 940px, height = 529px
		slideSide = sliderImagesNode[(options.direction === 'vertical') ? 'offsetHeight' : 'offsetWidth'],
		directionStyle = (options.direction === 'vertical') ? 'marginTop' : 'marginLeft',
		directionStyleValue = currentSlideIndex;
		frameSec = options.frameSec || 50,
		animateDuration = options.animateDuration || 500,
		dir = -1;
		

	

	this.prevSlide = function() {
		if (currentSlideIndex === 0) {
			currentSlideIndex = imagesCount - 1;
			return;
		}
		dir = 1;
		currentSlideIndex--;
	}

	this.nextSlide = function() {
		if (currentSlideIndex === imagesCount - 1) {
			currentSlideIndex = 0;			
			//console.log(currentSlideIndex);
			return;
		}
		dir = -1;
		currentSlideIndex++;
		//console.log(currentSlideIndex);		
	}

	this.__renderCycleNext = function() {		
		var firstImage = sliderImagesNode.children[0];
		var copyFirstImage = firstImage.cloneNode(true);
		sliderImagesNode.appendChild(copyFirstImage);
		currentSlideIndex++;
		//console.log(currentSlideIndex);
		__self.__render();
		sliderImagesNode.removeChild(firstImage);
		//currentSlideIndex--;
		//console.log(sliderImagesNode.style.marginLeft);

		//console.log(currentSlideIndex);
	}

	this.__render = function() {
		__self.__animate(directionStyleValue, directionStyleValue + dir*slideSide);
		//directionStyleValue += imageSize;
		__self.__paginationRender();
	}

	this.__paginationRender = function() {
		if (paginationNode.querySelector('.active')) {
			paginationNode.querySelector('.active').classList.remove('active');
		};
		//paginationNode.children[currentSlideIndex].querySelector('a').classList.add('active');
	}

	this.__slidePicture = function(timePassedDuration) {
		var start = directionStyleValue;
		var finish;		
		//if (timePassedDuration <= 1) {			
			//sliderImagesNode.style[directionStyle] = (directionStyleValue + imageSize*timePassedDuration) + 'px';
		//}else {
			sliderImagesNode.style[directionStyle] = (directionStyleValue + imageSize) + 'px';			
		//}
		
	}

	this.__animate = function(startDirectionStyle, finishDirectionStyle) {
		var startTime = Date.now();
		var startDirectionStyle = startDirectionStyle;
		var finishDirectionStyle = finishDirectionStyle;

		var timer = setInterval(function() {
			var timePassed = (Date.now() - startTime)/animateDuration;
			if (timePassed >= 1) {
				directionStyleValue = finishDirectionStyle;
				clearInterval(timer);				
			}else {
				directionStyleValue = startDirectionStyle + (dir*timePassed*slideSide);
			}			
			
			sliderImagesNode.style[directionStyle] = directionStyleValue + 'px';

		}, 1000/frameSec);
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
		//console.log(currentSlideIndex);
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
        if (currentSlideIndex != 0) {
        	__self.__animate(0, currentSlideIndex*slideSide);
        }
    	__self.__paginationRender();
    	//__self.__render();
    };

    this.__init();
}