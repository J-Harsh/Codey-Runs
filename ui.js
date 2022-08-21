export class UI
{
    constructor(game)
    {
        this.game=game;
        this.fontSize=30;
        this.fontFamily="'Creepster', cursive";
        this.livesImage=document.getElementById("lives");
    }
    draw(context)
    {
        context.save();
        context.shadowOffsetX=2;
        context.shadowOffsetY=-1;
        context.shadowColor="white";
        context.shadowBlur=0;
        context.font=this.fontSize+"px "+this.fontFamily;
        context.textAlign="left";
        context.fillStyle=this.game.fontColor;
        //score
        context.fillText("Score: "+this.game.score,20,50);
        //timer
        context.font=this.fontSize*0.8+"px "+this.fontFamily;
        context.fillText("Time: "+(this.game.time*0.001).toFixed(1)+"s",20,80);
        //lives
        for(let i=0;i<this.game.lives;i++)
        context.drawImage(this.livesImage,25*i+20,95,20,20);
        //game over
        if(this.game.gameOver)
        {
            context.textAlign="center";
            context.font=this.fontSize*2+"px "+this.fontFamily;
            if(this.game.score>=this.game.maxScore)
            {
            context.fillText("Boo-yah",this.game.width*0.5,this.game.height*0.5-20);
            context.font=this.fontSize*0.9+"px "+this.fontFamily;
            console.log(context.font);
            context.fillStyle="dark gray";
            context.fillText("What are creatures of the night afraid of?",this.game.width*0.5,this.game.height*0.5+25);
            context.font=this.fontSize*1.2+"px "+this.fontFamily;
            context.fillStyle="black";
            context.fillText("YOU😈",this.game.width*0.5,this.game.height*0.5+70);
            context.fillStyle="red";
            context.fillText("YOU😈",this.game.width*0.5,this.game.height*0.5+70);
            }
            else 
            {
            context.font=this.fontSize*2+"px "+this.fontFamily;
            context.fillText("Love at first bite?",this.game.width*0.5,this.game.height*0.5-10);
            console.log(context.font);
            context.fillStyle="rgba(0, 129, 76, 1)";
            context.font=this.fontSize*1+"px "+this.fontFamily;
            context.fillText("Nope. Better luck next time😉",this.game.width*0.5,this.game.height*0.5+35);
            }
        }
        context.restore();
    }
}