var script = (<div id="gameContainer">
<div id="txt-active" className="initial">
	<p>You wake up slouched at a desk with a horrible headache. There’s an empty bottle on your desk of something unpleasantly cheap. There’s a loud ringing in your ears, which you soon realise is actually on the desk. It’s your phone, ringing away, an unknown number on the screen.</p>
	<Option label="Answer it" text="answerPhone"/>
	<Option label="Hang it up and go back to sleep" text="dontAnswerPhone"/>
</div>


<div className="dontAnswerPhone">
	<p>You cancel the call and drift back into your hungover stupor. Before too long though, it rings again. Same number.</p>
	<Option label="Answer it" text="answerPhone"/>
	<Option label="Chuck it out the window" text="chuckOutPhone"/>
</div>


<div className="chuckOutPhone">
	<p>You fling your phone out the nearby open window and doze off back to sleep.</p>
	<p></p>
	<h2>Congratulations! You’ve failed the game in two clicks!</h2>
	<Option label="Try again" text="initial"/>
</div>


<div className="answerPhone">
	<p>“Hello?” you croak out.</p>
	<p>“Hello,” comes the elderly woman’s voice on the other end. “Is this Ace Valentine?”</p>
	<p>Well, that definitely sounds like a made-up name. Still – and this is quite embarrassing – you appear to have forgotten your own name. May as well make one up too.</p>
	<p>“No,” you say. “Not Ace. I’m…”</p>
	<Input valueToSet="playerName" goTo="nameGiven" placeholder="Your name" capitaliseFirstLetter="true"/>
</div>


<div className="nameGiven">
	<p>“Oh, <span className="playerName"></span>? Do I have the right number, <span className="playerName"></span>? Is this the… ‘Special’ Detective Agency?”</p>
	<p>A faint memory swims up from the murky depths of your brain. Yes, the agency! That’s where you are. You got drunk off cheap wine by yourself in your office last night, in celebration of having cheap wine.</p>
	<p>“Yes,” you try say smoothly. “This is us. How may I’s helped you?”</p>
	<p>“Well, It’s my printer,” she responds. “It’s being… strange.”</p>
	<p></p>
	<h2>Demo complete</h2>
	<Option label="Reset" text="initial"/>
</div>
</div>
);ReactDOM.render(script, document.getElementById('root'));