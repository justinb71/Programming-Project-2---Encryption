
//Creates a global variable that stores the current mode (encrption or decryption)
var mode = "";
var encryptionType = "";

//Creates a global variable that stores the current page the user is on
var currentPage = "modeSelection";


//This function sets the mode to encryption and changes the page
function encryptionMode(){

	document.getElementById("selectionMenu").style.top="30vw";
	document.getElementById("selectionMenu").style.opacity="0";
	
	document.getElementById("typeMenu").style.top="250px";
	document.getElementById("typeMenu").style.opacity="1";
	
	mode = "encryption";
	
	currentPage = "typeSelectionMenu";
	
}


//This function sets the mode to decryption and changes the page
function decryptionMode(){

	document.getElementById("selectionMenu").style.top="30vw";
	document.getElementById("selectionMenu").style.opacity="0";
	
	document.getElementById("typeMenu").style.top="250px";
	document.getElementById("typeMenu").style.opacity="1";
	
	mode = "decryption";
	
	currentPage = "typeSelectionMenu";

}

//This function selects the type of encryption/decryption the user wants (Simple Ceaser or Keyword Encryption)
function selectType() {

	
	//Detects which radio button is pressed
	if(document.getElementById("keywordButton").checked) {
	
		encryptionType = "keyword";
	}else{
		encryptionType = "simple";
	}
	
	
	//This makes sure one button is pressed
	if (document.getElementById("keywordButton").checked || document.getElementById("simpleButton").checked){
		
		document.getElementById("typeSelectionLabel").style.color = "#cfd0d3";
		
		
		if (mode == "encryption"){
	
			document.getElementById("typeMenu").style.top="30vw";
			document.getElementById("typeMenu").style.opacity="0";
			
			if (encryptionType == "simple"){
				//This sets the page to simpleCeaserEncryption

				document.getElementById("simpleCeaserMenu").style.top="250px";
				document.getElementById("simpleCeaserMenu").style.opacity="1";
				
				currentPage = "simpleCeaserEncryption";

			
			}else{
				//This sets the page to keywordEncryptionMenu
			
				document.getElementById("keywordEncryptionMenu").style.top="250px";
				document.getElementById("keywordEncryptionMenu").style.opacity="1";
				currentPage = "keywordEncryptionMenu";
				
			
			
			}
	
		}else{

			document.getElementById("typeMenu").style.top="30vw";
			document.getElementById("typeMenu").style.opacity="0";

			if (encryptionType == "simple"){
				//This sets the page to simpleCeaserEncryption

				document.getElementById("simpleCeaserDecryptionMenu").style.top="250px";
				document.getElementById("simpleCeaserDecryptionMenu").style.opacity="1";
				
				currentPage = "simpleCeaserDecryption";

			
			}else{
				//This sets the page to keywordEncryptionMenu

				document.getElementById("keywordDecryptionMenu").style.top="250px";
				document.getElementById("keywordDecryptionMenu").style.opacity="1";
			
				currentPage = "keywordDecryptionMenu";
				
			
			
			}


		
		
		}
	}
	
	else{
		document.getElementById("typeSelectionLabel").style.color = "#e02f1e";
		
	
	}

}


//Function for Simple Ceaser Encryption
function simpleCeaserMode(){
	

	//Gets the inputted data from HTML file
	let message = document.getElementById("simpleCeaserMessage").value;
	let offset = parseInt(document.getElementById("offsetNumber").value);
	
	
	
	//Validation variables
	let offsetValid = false;
	let messageValid = false;

	//Makes sure the input fields are not empty, if they are change corresponding text label to red
	if (document.getElementById("offsetNumber").value.length == 0){
	
		offsetValid = false;
		document.getElementById("simpleCeaserOffsetNumberLabel").style.color = "#e02f1e";
		
	}else{
		offsetValid = true;
	
	
		document.getElementById("simpleCeaserOffsetNumberLabel").style.color = "#cfd0d3";
	}	
	if (message.length == 0){
	
		document.getElementById("simpleCeaserMessageLabel").style.color = "#e02f1e";
		messageValid = false;
	}else{
		messageValid = true;
	
		document.getElementById("simpleCeaserMessageLabel").style.color = "#cfd0d3";
	}	
	
	if (messageValid == true && offsetValid == true) {

		// Makes sure that the offset is =< 26
		while (offset - 26 > 0){
			offset = offset -26;
			
		}

		// Initialises Variables
		let encryptedCharacter = "";
		let characterPosition = 0;
		let encryptedMessage = "";
		
		
		//Loops through each character in the message including spaces
		for (x = 0; x < message.length; x+=1){
		
			//Handles spaces
			if (message[x] == " "){
				encryptedMessage = encryptedMessage + " ";
				
			}else{
			
				//Handles upper case characters
				if (message[x].toUpperCase() == message[x]) {

					//Gets the position of the character in the alphabet
					characterPosition = characterPositionFinder(message[x].toLowerCase());
					
					//Gets the encrypted character from the offset and the position of the character
					encryptedCharacter = getCharacter(offset, characterPosition);
					
					//Combines the encrypted character with the whole encrypted word
					encryptedMessage = encryptedMessage + encryptedCharacter.toUpperCase();
				}
				else{
				
					characterPosition = characterPositionFinder(message[x].toLowerCase());
					
					
					encryptedCharacter = getCharacter(offset, characterPosition);
					
					encryptedMessage = encryptedMessage + encryptedCharacter;
				}
			
			
			}
		
		}
		

		//Outputs the results to the HTML page
		document.getElementById("simpleMessageOutput").innerHTML = message;
		document.getElementById("simpleEncryptionOutput").innerHTML = encryptedMessage;
	}
		
}


// Function for Simple Ceaser Decryption
function simpleCeaserDecyption(){

	//Gets the inputted data from HTML file
	offset = parseInt(document.getElementById("simpleDecryptionOffsetInput").value);
	message = document.getElementById("simpleCeaserEncryptedMessage").value;

	//Validation variables
	let offsetValid = false;
	let messageValid = false;

	//Makes sure the input fields are not empty, if they are change corresponding text label to red
	if (message.trim() == ""){

		document.getElementById("simpleCeaserDecryptionMessageLabel").style.color = "#e02f1e";
		messageValid = false;

	}else{

		document.getElementById("simpleCeaserDecryptionMessageLabel").style.color = "#cfd0d3";
		messageValid = true;
	}

	if (document.getElementById("simpleDecryptionOffsetInput").value.length == 0){

		document.getElementById("simlpeDecryptionOffsetLabel").style.color = "#e02f1e";
		offsetValid = false;

	}else{

		document.getElementById("simlpeDecryptionOffsetLabel").style.color = "#cfd0d3";
		offsetValid = true;
	}

	
	if (messageValid = true && offsetValid == true){

		// Makes sure that the offset is =< 26
		while (offset - 26 > 0){
			offset = offset -26;
			
		}
		
		// Initialises Variables
		let encryptedIndex = 0;
		let decryptedMessage = "";
		let decryptedCharacter = "";
		let character = "";

		// Loops through each character in the message. including spaces
		for (d in message) {
			character = message[d];

			// Handles Spaces
			if (character == " "){
				decryptedMessage = decryptedMessage + " ";

			}else{

				// Handles upper case characters
				if (character.toUpperCase() == character){

					
					character = character.toLowerCase();

					// Gets the index of the current encrypted character
					encryptedIndex = characterPositionFinder(character)

					//Handles Final Indexes That Are Below 0
					if (encryptedIndex-offset < 0 ){
					
						decryptedCharacter = getCharacter(0, 26 + (encryptedIndex-offset))
					}else{
						decryptedCharacter = getCharacter(0,encryptedIndex-offset);
					}
				
					
					// Appends the decrypted character to the decrypted word
					decryptedMessage = decryptedMessage + decryptedCharacter.toUpperCase();

				}else{

					character = character.toLowerCase();

					encryptedIndex = characterPositionFinder(character)
				
					if (encryptedIndex-offset < 0 ){
						
						decryptedCharacter = getCharacter(0, 26 + (encryptedIndex-offset))
					}else{
						decryptedCharacter = getCharacter(0,encryptedIndex-offset);
					}
	
					decryptedMessage = decryptedMessage + decryptedCharacter;

				}
				
		

			
			
			}
		}

	// Outputs the results to the HTML page
	document.getElementById("encryptedMessageOutput").innerHTML = message;
	document.getElementById("decryptedMessageOutput").innerHTML = decryptedMessage;
	}
	
}

function keywordDecryptionMode() {
	let keyword = document.getElementById("decryptionKeywordInput").value;
	let message = document.getElementById("decryptionKeywordMessageInput").value



}

//Function for Keyword Encryption
function keywordEncryptionMode(){

	//Validation variables
	let keywordValid = false;
	let messageValid = false;
	
	
	//Gets the users inputs
	let keyword = document.getElementById("keywordInput").value;
	let message = document.getElementById("keywordMessageInput").value

	//Makes sure the input fields are not empty, if they are change corresponding text label to red
	if (keyword.length == 0 ){
		keywordValid = false;
		document.getElementById("keywordInputLabel").style.color="#e02f1e";
	
	}else{
		keywordValid = true;
		document.getElementById("keywordInputLabel").style.color="#cfd0d3";
	
	}
	
	if (message.length == 0 ){
		messageValid = false;
		document.getElementById("keywordMessageLabel").style.color="#e02f1e";
	
	}else{
		messageValid = true;
		document.getElementById("keywordMessageLabel").style.color="#cfd0d3";
	
	}
	
	
	if (messageValid == true && keywordValid) {

		//Initialises Variables
		let encryptedMessage = "";
		let keywordIndex = []
		let currentKeywordIndex = 0;
		
		//This loops thorugh all the charcters in the keyword and saves the corresponding index
		for (y = 0; y < keyword.length; y++) {
		
			let index = characterPositionFinder(keyword[y].toLowerCase());
			//Appends the index to the array
			keywordIndex.push(index+1);
			
		}
		
		//Loops through each character in the message
		for (z=0; z < message.length; z++) {
		
			//Handles spaces
			if (message[z] == " "){
				encryptedMessage = encryptedMessage + " ";
				
				currentKeywordIndex --;
				
			}else{ 

				//Handles Upper Case
				if (message[z].toUpperCase() == message[z]) {

					//Gets the position of the character
					currentCharIndex = characterPositionFinder(message[z].toLowerCase());
					
					//Combines the current keyword index with the index of current character
					encryptedIndex = currentCharIndex + keywordIndex[currentKeywordIndex];

					//Gets the character at that encrypted index
					encryptedCharacter = getCharacter(0,encryptedIndex);

					//Appends the encrypeted character to the encrypted word
					encryptedMessage = encryptedMessage + encryptedCharacter.toUpperCase();
					
				}else{
					currentCharIndex = characterPositionFinder(message[z].toLowerCase());
					
					
					encryptedIndex = currentCharIndex + keywordIndex[currentKeywordIndex];
					
					encryptedMessage = encryptedMessage + getCharacter(0,encryptedIndex);
				
				}
			}
			
			
			//Increments the keyword index
			if (currentKeywordIndex == (keywordIndex.length-1)){
			
				currentKeywordIndex=0;
			}else{
			
				currentKeywordIndex ++;
			}
		}
		
		//Outputs the results to the HTML page
		document.getElementById("keywordMessageOutput").innerHTML = message;
		document.getElementById("keywordEncryptedOutput").innerHTML = encryptedMessage;

	}
}



//This function returns the position of the character in the alphabet
function characterPositionFinder(character){

	//Defines the alphabet
	const alphabet = "abcdefghijklmnopqrstuvwxyz";
	
	//Linear search through the alphabet until the characters match
	for (i=0;i<26;i++) {
	
		if (alphabet[i] == character) {
		
			//Returns the position
			return i 
		}

	}
}


//This function returns a character from combining the offset and character position
function getCharacter(offset,charPosition) {

	//Defines the alphabet
	const alphabet = "abcdefghijklmnopqrstuvwxyz";
	
	//Checks if the inputted character position + offset is over 26
	if ((charPosition + offset) < 26) {
	
		//returns the corresponding character 
		return alphabet[(charPosition + offset)];
	
	}else{


	return alphabet[(offset+charPosition)-26];
	
	}
}


//This function allows the user to return to the previous page 
function goBack(){

	//If page is the type selection page, go to the mode selection page
	if (currentPage == "typeSelectionMenu") {
	
		document.getElementById("selectionMenu").style.top="250px";
		document.getElementById("selectionMenu").style.opacity="1";
		
		document.getElementById("typeMenu").style.top="30vw";
		document.getElementById("typeMenu").style.opacity="0";

		document.getElementById("simpleButton").checked = false;
		document.getElementById("keywordButton").checked = false;
		
		currentPage = "modeSelection";

	}

	//If page is the simple Ceaser Encryption page, go to the type selection page
	else if (currentPage == "simpleCeaserEncryption") {
	

		document.getElementById("typeMenu").style.top="250px";
		document.getElementById("typeMenu").style.opacity="1";
		
		document.getElementById("simpleCeaserMenu").style.top="30vw";
		document.getElementById("simpleCeaserMenu").style.opacity="0"
		
		document.getElementById("simpleMessageOutput").innerHTML = "";
		document.getElementById("simpleEncryptionOutput").innerHTML = ""
		document.getElementById("simpleCeaserMessage").value = "";
		document.getElementById("offsetNumber").value = "";

		currentPage = "typeSelectionMenu"

	} 

	//If page is the Keyword Encryption page, go to the type selection page
	else if (currentPage=="keywordEncryptionMenu") {
	
		document.getElementById("typeMenu").style.top="250px";
		document.getElementById("typeMenu").style.opacity="1";

		document.getElementById("keywordEncryptionMenu").style.top="30vw";
		document.getElementById("keywordEncryptionMenu").style.opacity="0";
		
		document.getElementById("keywordMessageOutput").innerHTML = "";
		document.getElementById("keywordEncryptedOutput").innerHTML = ""
		document.getElementById("keywordMessageInput").value = "";
		document.getElementById("keywordInput").value = "";	

		currentPage = "typeSelectionMenu";

	}

	//If page is the Simple Ceaser Decryption page, go to the type selection page
	else if (currentPage == "simpleCeaserDecryption") {

		document.getElementById("typeMenu").style.top="250px";
		document.getElementById("typeMenu").style.opacity="1";

		document.getElementById("simpleCeaserDecryptionMenu").style.top="30vw";
		document.getElementById("simpleCeaserDecryptionMenu").style.opacity="0";

		document.getElementById("encryptedMessageOutput").innerHTML = "";
		document.getElementById("decryptedMessageOutput").innerHTML = ""
		document.getElementById("simpleCeaserEncryptedMessage").value = "";
		document.getElementById("simpleDecryptionOffsetInput").value = "";
				
		currentPage = "typeSelectionMenu";


	}

	else if (currentPage == "keywordDecryptionMenu") {

		document.getElementById("typeMenu").style.top="250px";
		document.getElementById("typeMenu").style.opacity="1";

		document.getElementById("keywordDecryptionMenu").style.top="30vw";
		document.getElementById("keywordDecryptionMenu").style.opacity="0";
		
		currentPage = "typeSelectionMenu";


	}
}




