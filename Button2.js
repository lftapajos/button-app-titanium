function Button(params) {
	var self = Ti.UI.createView({
			backgroundColor: params.backgroundColor,
			borderRadius: params.borderRadius,
			width: params.width || '100%',
			height: params.height,
			top: params.top,
			left: params.left,
			bottom: params.bottom,
			right: params.right,
			id: params.id
		}),
		cover = Ti.UI.createView({
			width: '100%',
			height: '100%',
			backgroundColor: '#ffffff',
			opacity: 0,
			id: params.id
		}),
		blockCover = Ti.UI.createView({
			width: '100%',
			height: '100%',
			backgroundColor: '#ffffff',
			opacity: 0.1
		}),
		title = Ti.UI.createLabel({
			text: params.title,
			color: params.color,
			font: params.font,
			width: '100%',
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			backgroundColor: 'transparent',
			id: params.id
		});
		
	self.add(title);
	
	self.add(cover);
	
	blockCover.addEventListener('click', function(e) {
		e.cancelBubble = true;
	});
	
	self.addEventListener('click', function() {
		cover.opacity = 0.5;
		setTimeout(
			function() {
				if(self && self.children.length > 0) {
					self.children[0].opacity = 1;
					cover.opacity = 0;
				}
			},
			250
		);
	});
	
	self.addEventListener('touchend', function() {
		self.children[0].opacity = 1;
		cover.opacity = 0;
	});
	
	self.addEventListener('destroy', function() {
		self.remove(title);
		self.remove(cover);
		
		title = null;
		cover = null;
	});
	
	self.addEventListener('changeTitle', function(e) {
		title.text = e.title;
	});
	
	self.addEventListener('disable', function(e) {
		e.cancelBubble = true;
		self.opacity = 0.5;
		self.remove(cover);
		self.add(blockCover);
	});
	
	self.addEventListener('enable', function(e) {
		e.cancelBubble = true;
		self.opacity = 1;
		self.add(cover);
		self.remove(blockCover);
	});
	
	return self;
}
module.exports = Button;
