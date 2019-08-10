function Option(props) {
	// "Option" component is basically just a button with a "text" prop:
	return <button onClick={handleClick}>{props.label}</button>;

    function handleClick(e) {
		e.preventDefault();

		var a = document.getElementById("txt-active"); // find currently active div, i.e. the one this "Option" is inside of
		a.id = "txt-inactive"; // deactivate it (see CSS)

		var b = document.getElementsByClassName(props.text)[0]; // find div with class that matches this Option's "text" prop
		b.id = "txt-active"; // activate that div (see CSS)
    }
}


var game = (
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
		<p>THE END!</p>
		<Option label="Try again!" text="initial"/>
	</div>    
</div>
);

ReactDOM.render(
game, document.getElementById('root')
);
  