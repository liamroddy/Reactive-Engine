var opacity = 1; // opacity of the currently displayed element
var opacityStep = .05; // how much to change div opacity by per 1/60th of sec

var preventInput = false; // whether to prevent user input

function Option(props) {
	// "Option" component is basically just a button with a "text" prop:
	return <button onClick={handleClick}>{props.label}</button>;

    function handleClick(e) {
		e.preventDefault();

		if(preventInput) // exit if we're in a transition
			return;
		else preventInput = true; // make sure player can't select something else during transition

		var currentDiv = document.getElementById("txt-active"); // find currently active div, i.e. the one this "Option" is inside of
		var nextDiv = document.getElementsByClassName(props.text)[0]; // find div with class that matches this Option's "text" prop

		transition(currentDiv, nextDiv); // begin to transtion from currently displayed div to the one player has selected.
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
}


var script = (
<div id="gameContainer">
	<h1>Adventure Game Demo</h1>

	{/* The starting div is given id="txt-active": */}
	<div className="initial" id="txt-active"> 
		<p>Hey, what's your name?</p>
		<Option label="Bob" text="nameBob"/>
		<Option label="Sarah" text="nameSarah"/>
	</div>

	<div className="nameBob">
		<p>Uh, Bob!? That's such an ugly name!</p>
		<Option label="No, it's not!" text="bobMoveOn"/>
		<Option label="Sorry, forgot my own name there. It's actually Sarah" text="nameSarah"/>
	</div>

	<div className="nameSarah">
		<p>Oh, Sarah is a lovely name.</p>
		<Option label="Thanks!" text="sarahMoveOn"/>
		<Option label="I've actually just changed my name. It's now Bob" text="nameBob"/>
	</div>

	<div className="bobMoveOn">
		<p>Ugly name aside, let's wrap this up and get to <strong>THE END</strong>.</p>
		<Option label="Is this already the end?" text="almostEnd"/>
		<Option label="Okay" text="theEnd"/>
	</div>

	<div className="sarahMoveOn">
		<p>You're welcome. Anyway, Sarah, let's get a move on to <strong>THE END</strong>.</p>
		<Option label="I only get one ending option? Bob gets two!" text="almostEnd"/>
	</div>

	<div className="almostEnd">
		<p>Yeah, sorry about that. Bye!</p>
		<Option label="Bye" text="theEnd"/>
	</div>

	<div className="theEnd">
		<h2>THE END!</h2>
		<Option label="Try again!" text="initial"/>
	</div>    
</div>
);

ReactDOM.render(
script, document.getElementById('root')
);