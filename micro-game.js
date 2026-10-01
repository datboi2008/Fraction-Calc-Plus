/**
 * StepMania Micro - Game Loop & Event Listener Pipeline
 */
window.addEventListener('load', function() {
    SMMicro.InitCanvas();
    
    let keysPressed = [false, false, false, false];
    let keyMap = { 'd': 0, 'f': 1, 'j': 2, 'k': 3 };
    let score = 0;
    let combo = 0;
    
    // Original step tracking array template configuration
    let chart = [];
    for(let i = 0; i < 150; i++) {
        chart.push({ lane: Math.floor(Math.random() * 4), y: 700 + (i * 180), active: true });
    }
    
    window.addEventListener('keydown', function(e) {
        let l = keyMap[e.key.toLowerCase()];
        if(l !== undefined) {
            keysPressed[l] = true;
            for(let n of chart) {
                if(n.lane === l && n.active && Math.abs(n.y - SMMicro.ReceptorY) < 30) {
                    n.active = false;
                    score += 100;
                    combo++;
                }
            }
        }
    });
    
    window.addEventListener('keyup', function(e) {
        let l = keyMap[e.key.toLowerCase()];
        if(l !== undefined) keysPressed[l] = false;
    });
    
    function loop() {
        SMMicro.ctx.clearRect(0, 0, SMMicro.canvas.width, SMMicro.canvas.height);
        
        // Render Lane Tracks
        SMMicro.ctx.fillStyle = "rgba(20,20,30,0.9)";
        SMMicro.ctx.fillRect(80, 0, 640, SMMicro.canvas.height);
        
        SMMicro.DrawReceptors(keysPressed);
        
        for(let note of chart) {
            if(note.active) {
                note.y -= SMMicro.ScrollSpeed;
                if(note.y > -50 && note.y < 650) {
                    SMMicro.DrawNote(note.lane, note.y);
                }
                if(note.y < SMMicro.ReceptorY - 40) {
                    note.active = false;
                    combo = 0;
                }
            }
        }
        
        // HUD Overlay text elements
        SMMicro.ctx.fillStyle = "#fff";
        SMMicro.ctx.font = "20px sans-serif";
        SMMicro.ctx.fillText("SCORE: " + score, 20, 40);
        if(combo > 0) SMMicro.ctx.fillText("COMBO: " + combo, 380, 550);
        
        requestAnimationFrame(loop);
    }
    loop();
});
