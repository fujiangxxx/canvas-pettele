class Draw {
	constructor(cobj, options) {
		this.cobj = cobj
		this.options = options
		this.type = options.type;
		this.shape = options.shape;
		this.sides=options.sides;
		this.wid=options.Cwidth;
		this.hei=options.Cheight;
		this.cobj.lineWidth = options.width;
		this.cobj.strokeStyle = options.color;
		this.cobj.fillStyle = options.color;
	}
	rect(sx, sy, ox, oy) {
		if(this.type === "stroke") {
			this.cobj.strokeRect(sx, sy, ox - sx, oy - sy)
		} else {
			this.cobj.fillRect(sx, sy, ox - sx, oy - sy)
		}
	}
	line(sx, sy, ox, oy) {
		this.cobj.beginPath()
		this.cobj.moveTo(sx, sy)
		this.cobj.lineTo(ox, oy)
		this.cobj.stroke();
	}
	circle(sx, sy, ox, oy) {
		this.cobj.beginPath()
		let r = Math.abs(ox - sx) > Math.abs(oy - sy) ? Math.abs(sy - oy) / 2 : Math.abs(ox - sx) / 2
		this.cobj.arc(sx > ox ? sx - r : sx + r, sy > oy ? sy - r : sy + r, r, 0, 2 * Math.PI)
		this.cobj[this.type]()
	};
	poly(sx,sy,ox,oy,s){
		this.cobj.save();
		let r=Math.sqrt(Math.pow(sx-ox,2)+Math.pow(sy-oy,2))
		this.cobj.translate(sx,sy)
		this.cobj.rotate(Math.atan((oy-sy)/(ox-sx)))
		let x=Math.cos(2*Math.PI/(s*2))*r
		let y=Math.sin(2*Math.PI/(s*2))*r
		this.cobj.beginPath()
		this.cobj.moveTo(x,-y)
		for(let i=0;i<s;i++){
			this.cobj.save()
			this.cobj.rotate(i*2*Math.PI/s)
			this.cobj.lineTo(x,y)
			this.cobj.restore()
		}
		this.cobj[this.type]()
		this.cobj.restore()
	}

}