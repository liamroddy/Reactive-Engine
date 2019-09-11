var opacity = 1; // opacity of the currently displayed element
var opacityStep = .05; // how much to change div opacity by per 1/60th of sec

var preventInput = false; // whether to prevent user input

function Option(props) {
	// "Option" component is basically just a button with a "text" prop:
	return <button onClick={handleClick}>{props.label}</button>;

    function handleClick(e) {
		e.preventDefault();

		var currentDiv = document.getElementById("txt-active"); // find currently active div, i.e. the one this "Option" is inside of
		var nextDiv = document.getElementsByClassName(props.text)[0]; // find div with class that matches this Option's "text" prop

		if(preventInput) // exit if we're in a transition
			return;
		else preventInput = true; // make sure player can't select something else during transition

		transition(currentDiv, nextDiv); // begin to transtion from currently displayed div to the one player has selected.
	}

}

function Input(props) {
	// an Input component is a text box and OK button that takes user input (eg player name) and updates the script with this value
	return <form>
		<input id={props.valueToSet} placeholder={props.placeholder} type="text" name="name" />
		<input type="submit" value="OK" onClick={handleClick}/>
  	</form>
	
    function handleClick(e) {
		e.preventDefault();

		if(document.getElementById(props.valueToSet).value.length > 0) { // no blank input allowed
			if(preventInput) // exit if we're in a transition
				return;
			else preventInput = true; // make sure player can't select something else during transition

			var instancesToUpdate = document.getElementsByClassName(props.valueToSet); // find all spans with this variable as class name
 
			var playerInput = document.getElementById(props.valueToSet).value;

			if(props.capitaliseFirstLetter) { // handy for autocorrecting things like names
				playerInput = playerInput[0].toUpperCase() + playerInput.slice(1);
			} 

			for (var i = 0; i < instancesToUpdate.length; i++) {
				instancesToUpdate[i].textContent = playerInput;
			}

			transition(document.getElementById("txt-active"), document.getElementsByClassName(props.goto)[0]);
		}
	}
}

function transition(startDiv, finishDiv) {
	opacity -= opacityStep; // reduce opacity by per step amount
	var active = startDiv; // by default the active div is the one we start the transition at
	
	if(opacity <= 0) { // if we've already faded startDiv to invisisbility
		// make finsihDiv the active one: 
		startDiv.id = "txt-inactive";
		finishDiv.id = "txt-active";

		active = finishDiv;
	}
	
	active.style = "opacity: " + Math.abs(opacity); // apply our opacity value as absolute (it goes down to -1, see below)
	
	if(opacity > -1) { // if finishDiv hasn't been fully faded in [ opacity != absolute(-1) ]
		setTimeout(transition, 16, startDiv, finishDiv); // continue transition in 16ms
	}
	else { // we're done transitioning to finishDiv
		preventInput = false; // allow user input
		opacity = 1; // reset opacity for next transition
	}
}

var script = (
<div id="gameContainer">
	<h1>Adventure Game Demo</h1>

	{/* The starting div is given id="txt-active": */}
	<div className="initial" id="txt-active"> 
		<p>You wake up slouched at a desk with a horrible headache. There&rsquo;s an empty bottle on your desk of something unpleasantly cheap. There&rsquo;s a loud ringing in your ears, which you soon realise is actually on the desk.</p>
		<p>It&rsquo;s your phone, ringing away, an unknown number on the screen.</p>
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
			<p>Congratulations! You’ve failed the game in two clicks!</p>
			<Option label="Try again" text="initial"/>
		</div>

	<div className="answerPhone">
		<p>&ldquo;Hello?&rdquo; you croak out.</p>
		<p><em>“Hello,”</em> comes the elderly woman’s voice on the other end. <em>“Is this Ace Valentine?”</em></p>
		<p>Well, that definitely sounds like a made-up name. Still – and this is quite embarrassing – you appear to have forgotten your own name. May as well make one up too.</p>
		<p>“No,” you say. “Not Ace. I’m…”</p>
		<Input valueToSet="playerName" placeholder="Your name" capitaliseFirstLetter="true" goto="nameGiven"/>
	</div>

	<div className="nameGiven">
		<p><em>“Oh, <span className="playerName"></span>, is it? Do I have the right number, <span className="playerName"></span>? Is this the, eh, the… ‘Special’ Detective Agency?"</em></p>
		<p>A faint memory swims up from the murky depths of your brain. Yes, the agency! That’s where you are. You got drunk off cheap wine by yourself in your office last night, in celebration of having cheap wine. It's all coming back to you now, unfortunately.</p>
		<p>“Yes,” you say. “This is us. How may I help you?”</p>
		<p><em>“Well, It’s my printer,”</em> she responds. <em>“It’s being… strange.”</em></p>
		
		<h2>End of demo (for now)</h2>

		<Option label="Replay" text="initial"/>
	</div> 
</div>
);

ReactDOM.render(
script, document.getElementById('root')
);