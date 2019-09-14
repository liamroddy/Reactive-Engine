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

			transition(document.getElementById("txt-active"), document.getElementsByClassName(props.goTo)[0]);
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