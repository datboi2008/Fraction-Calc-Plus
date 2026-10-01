/**
 * StepMania Micro - Core Logic & Input Vector Processing Matrix
 */
window.SMMicro = {
    Lanes:,
    Colors: ['#ff2a6d', '#05d9e8', '#a352ff', '#f5a623'],
    ReceptorY: 100,
    ScrollSpeed: 4.5,
    
    InitCanvas: function() {
        this.canvas = document.getElementById('sm-canvas');
        this.ctx = this.canvas.getContext('2d');
        document.getElementById('loading').style.display = 'none';
    },
    
    DrawReceptors: function(keys) {
        for(let i = 0; i < 4; i++) {
            this.ctx.strokeStyle = keys[i] ? "#ffffff" : "rgba(255,255,255,0.3)";
            this.ctx.lineWidth = keys[i] ? 5 : 3;
            this.ctx.beginPath();
            this.ctx.arc(this.Lanes[i], this.ReceptorY, 35, 0, 2 * Math.PI);
            this.ctx.stroke();
        }
    },
    
    DrawNote: function(lane, y) {
        this.ctx.fillStyle = this.Colors[lane];
        this.ctx.save();
        this.ctx.translate(this.Lanes[lane], y);
        if(lane === 0) this.ctx.rotate(Math.PI / 2);
        if(lane === 2) this.ctx.rotate(Math.PI);
        if(lane === 3) this.ctx.rotate(-Math.PI / 2);
        
        this.ctx.beginPath();
        this.ctx.moveTo(0, 30);
        this.ctx.lineTo(28, 0);
        this.ctx.lineTo(12, 0);
        this.ctx.lineTo(12, -25);
        this.ctx.lineTo(-12, -25);
        this.ctx.lineTo(-12, 0);
        this.ctx.lineTo(-28, 0);
        this.closePath ? this.closePath() : ctx.closePath();
        this.ctx.fill();
        this.ctx.strokeStyle = "#fff";
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        this.ctx.restore();
    }
};
