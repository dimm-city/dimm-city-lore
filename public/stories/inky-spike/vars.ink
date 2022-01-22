// Character variables. We track just two, using a +/- scale
VAR forceful = 0
VAR evasive = 0


// Inventory Items
VAR teacup = false
VAR gotcomponent = false


// Story states: these can be done using read counts of knots; or functions that collect up more complex logic; or variables
VAR drugged = false
VAR hooper_mentioned = false

VAR losttemper = false
VAR admitblackmail = false

// what kind of clue did we pass to Hooper?
CONST NONE = 0
CONST STRAIGHT = 1
CONST CHESS = 2
CONST CROSSWORD = 3
VAR hooperClueType = NONE

VAR hooperConfessed = false

CONST SHOE = 1
CONST BUCKET = 2
VAR smashingWindowItem = NONE

VAR notraitor = false
VAR revealedhooperasculprit = false
VAR smashedglass = false
VAR muddyshoes = false

VAR framedhooper = false

// What did you do with the component?
VAR putcomponentintent = false
VAR throwncomponentaway = false
VAR piecereturned = false
VAR longgrasshooperframe = false


// DEBUG mode adds a few shortcuts - remember to set to false in release!
VAR DEBUG = true
{DEBUG:
	IN DEBUG MODE!
	*	[Beginning...]	-> start
	*	[Framing Hooper...] -> claim_hooper_took_component
	*	[In with Hooper...] -> inside_hoopers_hut
- else:
	// First diversion: where do we begin?
 -> start
}