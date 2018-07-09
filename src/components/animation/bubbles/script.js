/**
* @vuedoc
* @exports components/animation/bubbles
* @see @/components/animation/bubbles
*
* @version 1.0
* @desc Анимация (Bubbles)
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/

const data = {
	/**
	* @typedef {Object} Data
	* 	@property {int} width - Валидация (зарезервированная переменная)
	* 	@property {int} height - (зарезервированная переменная)
	* 	@property {object} canvas - (зарезервированная переменная)
	* 	@property {object} ctx - (зарезервированная переменная)
	* 	@property {object} draw - (зарезервированная переменная)
	* 	@property {array} circles - (зарезервированная переменная)
	* 	@property {object} target - (зарезервированная переменная)
	* 	@property {boolean} animateHeader - (зарезервированная переменная)
	*
	*/
	width: '',
	height: '',
	canvas: '',
	ctx: '',
	draw: '',
	circles: [],
	target: '',
	animateHeader: true
}


const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Canvas manipulation
	*	@method Circle
	**/
    Circle(t) {
        var _this = this;
        // constructor
        (function() {
            _this.pos = {};
            init();
        })();

        function init() {
            _this.pos.x = Math.random()*t.width;
            _this.pos.y = t.height+Math.random()*100;
            _this.alpha = 0.1+Math.random()*0.9;
            _this.scale = 0.1+Math.random()*0.9;
            _this.velocity = Math.random();
        }

        _this.draw = function() {
            if(_this.alpha <= 0) {
                init();
            }
            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.0005;
            t.ctx.beginPath();
            t.ctx.arc(_this.pos.x, _this.pos.y, _this.scale*8, 0, 4 * Math.PI, false);
            t.ctx.fillStyle = 'rgba(204,212,7,'+ _this.alpha+')';
            t.ctx.fill();
        };
    },

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Animate canvas
	*	@method animate
	**/
	animate() {
		let draw = this.draw;
		if(this.animateHeader) {
			this.ctx.clearRect(0,0,this.width,this.height);
			for(let i in this.circles) {
				this.circles[i].draw();
			}
		}
		requestAnimationFrame(this.animate.bind(this));
	},

	/**
	*	@method scrollCheck
	**/
	scrollCheck() {
        if(document.body.scrollTop > this.height) this.animateHeader = false;
        else this.animateHeader = true;
    },

	/**
	*	@method resize
	**/
    resize() {
		this.$log.debug('component \'Animation bubbles\' (@/components/animation/bubbles) - method init');

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
}

export default {
	// Set data
	data: function() { return data },

	// Methods
	methods: methods,

	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	*
	* @event module:components/animation/bubbles~Component <strong>Animation bubbles</strong> mounted
	*/
	mounted: function () {
		this.$log.info('component \'Animation bubbles\' (@/components/animation/bubbles) - mounted hook init');

		this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.target = {x: 0, y: this.height};

		this.canvas = document.getElementById("bubbles");
		this.canvas.width = parseInt(this.width);
        this.canvas.height = this.height;
		this.ctx = this.canvas.getContext("2d");

		 // create particles
        for(let x = 0; x < this.width*0.1; x++) {
            let c = new this.Circle(this);
            this.circles.push(c);
        }
        let animation_ = this.animate.bind(this);
        let scroll_ = this.scrollCheck.bind(this);
        let resize_ = this.resize.bind(this);

        window.addEventListener('scroll', scroll_);
        window.addEventListener('resize', resize_);
        
        animation_();
	}
}
