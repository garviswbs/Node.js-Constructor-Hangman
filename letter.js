function Letter(value) {
	this.value = value;
	this.visible = false;
}
// Reveal or Hide
Letter.prototype.show = function () {
	return (this.visible) ? this.value : " _ ";
}
module.exports = Letter;