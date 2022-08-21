import {Dust,Fire,Splash} from "./particles.js";

const states=
{
    sitting:0,
    running:1,
    jumping:2,
    falling:3,
    rolling:4,
    diving:5,
    hit:6
}

class State
{
    constructor(state,game)
    {
        this.state=state;
        this.game=game;
    }
}

export class Sitting extends State
{
    constructor(game)
    {
        super("sitting",game);
    }

    enter()
    {
        this.game.player.frameX=0;
        this.game.player.maxFrame=4;
        this.game.player.frameY=5;
    }

    handleInput(input)
    {
        if(input.includes("ArrowRight")||input.includes("ArrowLeft"))
            this.game.player.setState(states.running,1);
        else if(input.includes(" "))
        {
            this.game.player.setState(states.rolling,2.5);
        }
    }
}

export class Running extends State
{
    constructor(game)
    {
        super("running",game);
    }

    enter()
    {
        this.game.player.frameX=0;
        this.game.player.maxFrame=8;
        this.game.player.frameY=3;
    }

    handleInput(input)
    {
        this.game.particles.unshift(new Dust(this.game,this.game.player.x+this.game.player.width*0.6,this.game.player.y+this.game.player.height));
        if(input.includes("ArrowDown"))
            this.game.player.setState(states.sitting,0);
        else if(input.includes("ArrowUp"))
            this.game.player.setState(states.jumping,1);
        else if(input.includes(" "))
        {
            this.game.player.setState(states.rolling,2.5);
        }
    }
}

export class Jumping extends State
{
    constructor(game)
    {
        super("jumping",game);
    }

    enter()
    {
        if(this.game.player.onGround())
            this.game.player.vy-=27 ;
        this.game.player.frameX=0;
        this.game.player.maxFrame=6;
        this.game.player.frameY=1;
    }

    handleInput(input)
    {
        if(this.game.player.vy>this.game.player.weight)
            this.game.player.setState(states.falling,1);
        else if(input.includes(" "))
            {
                this.game.player.setState(states.rolling,2.5);
            }
            else if(input.includes("ArrowDown"))
            {
                this.game.player.setState(states.diving,0);
            }
    }
}

export class Falling extends State
{
    constructor(game)
    {
        super("falling",game);
    }

    enter()
    {
        this.game.player.frameX=0;
        this.game.player.maxFrame=6;
        this.game.player.frameY=2;
    }

    handleInput(input)
    {
        if(this.game.player.onGround())
            this.game.player.setState(states.running,1);
            else if(input.includes("ArrowDown"))
            {
                this.game.player.setState(states.diving,0);
            }
    }
}

export class Rolling extends State
{
    constructor(game)
    {
        super("rolling",game);
    }

    enter()
    {
        this.game.player.frameX=0;
        this.game.player.maxFrame=6;
        this.game.player.frameY=6;
    }

    handleInput(input)
    {
        this.game.particles.unshift(new Fire(this.game,this.game.player.x+this.game.player.width*0.5,this.game.player.y+this.game.player.height*0.5));
        if(!input.includes(" ") && this.game.player.onGround())
            this.game.player.setState(states.running,1);
        else if(!input.includes(" ") && !this.game.player.onGround())
            this.game.player.setState(states.falling,1);
        else if(input.includes(" ") && input.includes("ArrowUp") && this.game.player.onGround())
            {
                this.game.player.vy-=27;
            }
            else if(input.includes("ArrowDown") && !this.game.player.onGround())
            {
                this.game.player.setState(states.diving,0);
            }
    }
}

export class Diving extends State
{
    constructor(game)
    {
        super("diving",game);
    }

    enter()
    {
        this.game.player.frameX=0;
        this.game.player.maxFrame=6;
        this.game.player.frameY=6;
        this.game.player.vy=15;
    }

    handleInput(input)
    {
        this.game.particles.unshift(new Fire(this.game,this.game.player.x+this.game.player.width*0.5,this.game.player.y+this.game.player.height*0.5));
        if(this.game.player.onGround())
            {
                this.game.player.setState(states.running,1);
                for(let i=0;i<20;i++)
                    this.game.particles.unshift(new Splash(this.game,this.game.player.x+this.game.player.width*0.5,this.game.player.y+this.game.player.height));
            }
        else if(input.includes(" ") && this.game.player.onGround())
            this.game.player.setState(states.rolling,2.5);
        
    }
}

export class Hit extends State
{
    constructor(game)
    {
        super("hit",game);
    }

    enter()
    {
        this.game.player.frameX=0;
        this.game.player.maxFrame=10;
        this.game.player.frameY=4;
    }

    handleInput(input)
    {
        if(this.game.player.frameX>=10 && this.game.player.onGround())
            {
                this.game.player.setState(states.running,1);
            }
        else if(this.game.player.frameX>=10 && !this.game.player.onGround())
        {
            this.game.player.setState(states.falling,1);
        }
        
    }
}