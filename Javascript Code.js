
<script>

	var mode = "";
	var encryptionType = "";
	
	var currentPage = "modeSelection";

	function encryptionMode(){
	
		document.getElementById("selectionMenu").style.top="30vw";
		document.getElementById("selectionMenu").style.opacity="0";
		
		document.getElementById("typeMenu").style.top="250px";
		document.getElementById("typeMenu").style.opacity="1";
		
		mode = "encryption";
		
		currentPage = "typeSelectionMenu";
		
		
		
		
	}
	
	function selectType() {

		
		if(document.getElementById("keywordButton").checked) {
		
			encryptionType = "keyword";
		}else{
			encryptionType = "simple";
		}
		
		
		if (document.getElementById("keywordButton").checked || document.getElementById("simpleButton").checked){
			
			document.getElementById("typeSelectionLabel").style.color = "#cfd0d3";
			
			if (mode == "encryption"){
		
				document.getElementById("typeMenu").style.top="30vw";
				document.getElementById("typeMenu").style.opacity="0";
				
				if (encryptionType == "simple"){
				
				document.getElementById("simpleCeaserMenu").style.top="250px";
				document.getElementById("simpleCeaserMenu").style.opacity="1";
				
				currentPage = "simpleCeaserEncryption";
				
				}else{
				
					document.getElementById("keywordEncryptionMenu").style.top="250px";
					document.getElementById("keywordEncryptionMenu").style.opacity="1";
					currentPage = "keywordEncryptionMenu";
					
				
				
				}
		
			}else{
			
			
			}
		}
		
		else{
			document.getElementById("typeSelectionLabel").style.color = "#e02f1e";
			
		
		}

	}
	
	
	
	function simpleCeaserMode(){
		let message = document.getElementById("simpleCeaserMessage").value;
		let offset = parseInt(document.getElementById("offsetNumber").value);
		
		let offsetValid = false;
		let messageValid = false;
		
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
				let encryptedCharacter = "";
				let characterPosition = 0;
				
				
				let encryptedMessage = "";
				
				
				
				for (x = 0; x < message.length; x+=1){
				
					if (message[x] == " "){
						encryptedMessage = encryptedMessage + " ";
						
					}else{
					
					
						if (message[x].toUpperCase() == message[x]) {
							characterPosition = characterPositionFinder(message[x].toLowerCase());
							
							encryptedCharacter = getCharacter(offset,characterPosition);
							
							encryptedMessage = encryptedMessage + encryptedCharacter.toUpperCase();
						}
						else{
						
							characterPosition = characterPositionFinder(message[x].toLowerCase());
							
							encryptedCharacter = getCharacter(offset,characterPosition);
							
							encryptedMessage = encryptedMessage + encryptedCharacter;
						}
					
					
				}
				
				}
				
				
				document.getElementById("simpleMessageOutput").innerHTML = message;
				document.getElementById("simpleEncryptionOutput").innerHTML = encryptedMessage;
			}
			
		}
	
	
	
	function getCharacter(offset,charPosition) {
	
		let alphabet = "abcdefghijklmnopqrstuvwxyz";
		
		if ((charPosition + offset) < 26) {
		
			
			return alphabet[(charPosition + offset)];
		
		}else{
	

		return alphabet[(offset+charPosition)-26];
		
		}
	}
	
	function characterPositionFinder(character){
	
		let alphabet = "abcdefghijklmnopqrstuvwxyz";
		
		
		for (i=0;i<26;i++) {
		
			if (alphabet[i] == character) {
			
				return i 
			}
	
		}
	}
	
	
	
	function keywordEncryptionMode(){
	
		let keywordValid = false;
		let messageValid = false;
		
		
	
		let keyword = document.getElementById("keywordInput").value;
		
		let message = document.getElementById("keywordMessageInput").value
		
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
			let encryptedMessage = "";
			let keywordIndex = []
			
			let currentKeywordIndex = 0;
			
			for (y = 0; y < keyword.length; y++) {
			
				let index = characterPositionFinder(keyword[y].toLowerCase());
				keywordIndex.push(index+1);
				
			}
			
			console.log(keywordIndex);
			for (z=0; z < message.length; z++) {
			
				if (message[z] == " "){
					encryptedMessage = encryptedMessage + " ";
					
					currentKeywordIndex --;
					
				}else{ 
					if (message[z].toUpperCase() == message[z]) {
						currentCharIndex = characterPositionFinder(message[z].toLowerCase());
						
						
						encryptedIndex = currentCharIndex + keywordIndex[currentKeywordIndex];
						encryptedCharacter = getCharacter(0,encryptedIndex);
						encryptedMessage = encryptedMessage + encryptedCharacter.toUpperCase();
						
					}else{
						currentCharIndex = characterPositionFinder(message[z].toLowerCase());
						
						
						encryptedIndex = currentCharIndex + keywordIndex[currentKeywordIndex];
						
						encryptedMessage = encryptedMessage + getCharacter(0,encryptedIndex);
					
					}
				}
				
				
				
				if (currentKeywordIndex == (keywordIndex.length-1)){
				
					currentKeywordIndex=0;
				}else{
				
					currentKeywordIndex ++;
				}
			}
			
			document.getElementById("keywordMessageOutput").innerHTML = message;
			document.getElementById("keywordEncryptedOutput").innerHTML = encryptedMessage;
	
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	function goBack(){
	
	
		if (currentPage == "typeSelectionMenu"){
		
			document.getElementById("selectionMenu").style.top="250px";
			document.getElementById("selectionMenu").style.opacity="1";
			
			document.getElementById("typeMenu").style.top="30vw";
			document.getElementById("typeMenu").style.opacity="0";
			
			currentPage = "modeSelection";
	
		}else if (currentPage == "simpleCeaserEncryption") {
		
		
				document.getElementById("typeMenu").style.top="250px";
				document.getElementById("typeMenu").style.opacity="1";
				
				document.getElementById("simpleCeaserMenu").style.top="30vw";
				document.getElementById("simpleCeaserMenu").style.opacity="0"
				
				currentPage = "typeSelectionMenu"
				
				document.getElementById("simpleMessageOutput").innerHTML = "";
				document.getElementById("simpleEncryptionOutput").innerHTML = ""
				document.getElementById("simpleCeaserMessage").value = "";
				document.getElementById("offsetNumber").value = "";
		
		
		} else if (currentPage=="keywordEncryptionMenu") {
		
				document.getElementById("typeMenu").style.top="250px";
				document.getElementById("typeMenu").style.opacity="1";
		
				document.getElementById("keywordEncryptionMenu").style.top="30vw";
				document.getElementById("keywordEncryptionMenu").style.opacity="0";
				currentPage = "typeSelectionMenu";
				
				document.getElementById("keywordMessageOutput").innerHTML = "";
				document.getElementById("keywordEncryptedOutput").innerHTML = ""
				document.getElementById("keywordMessageInput").value = "";
				document.getElementById("keywordInput").value = "";
				
				
				
	
		}
		
		
		}
		function simpleCeaserDecoder(){
		
			alphabet = "abcdefghijklmnopqrstuvwxyz";
			let index = "";
			message = document.getElementById("simpleCeaserEncryptedMessage").value;
			result = "";
			for (key = 0; key <alphabet.length; key ++) {
			
				
			
				for (letter in message) {
				
					
					
						index = characterPositionFinder(letter);
						
						index = (index + key)%(alphabet.length);
						
						if (index < 0){
							index = index + alphabet.length;
						}

						
						result = result + alphabet[index];
					
					
				
				}
			
			
			}
			
			
				console.log(result);
			}

	


</script>
