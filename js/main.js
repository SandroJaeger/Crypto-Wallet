
// Your web app's Firebase configuration

const firebaseConfig = {

	apiKey: "AIzaSyDttxxVrooFSbmMeqxC2QgrLP9keT45WT4",
  
	authDomain: "nft-project-b286f.firebaseapp.com",
  
	databaseURL: "https://nft-project-b286f-default-rtdb.firebaseio.com",
  
	projectId: "nft-project-b286f",
  
	storageBucket: "nft-project-b286f.appspot.com",
  
	messagingSenderId: "390564185484",
  
	appId: "1:390564185484:web:884a5f884258fb11efc2a9"
  
  };
  
  
  // Initialize Firebase
  
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();



// Sign Up Button    // Sign In Button 
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});








const sign_up = document.querySelector("#sign-up");
sign_up.addEventListener("click", function() {
  register();
},false);



const sign_in = document.querySelector("#sign-in");
sign_in.addEventListener("click", function() {
  login();
},false);




function validate_email(email) {
	expression = /^[^@]+@\w+(\.\w+)+\w$/
	if(expression.test(email) == true) {
	  //Email is good
	  return true
	} else {
	  //Email is not good
	  return false
	}
}
  
  function validate_password(password) {
	//Firebase only accepts lengths greater than 6
	if(password < 6){
	  return false
	} else {
	  return true
	}
  }
  
  function validate_field(field) {
	if(field == null) {
	  return false
	} 
  
	if(field.length <= 0) {
	  return false
	} else {
	  return true
	}
  }
  
  
  
  
  
  
  
  
  
  
var username;
var email;
var password;

var accountID;
  
function register() {
	username = document.getElementById("username-sign-up").value;
	email = document.getElementById("email-sign-up").value;
	password = document.getElementById("password-sign-up").value;
	console.log(username);
	console.log(password);
	console.log(email);

	//Validate input fields
	if(validate_email(email) == false || validate_password(password) == false) {
		alert("Email or Password is Outta Line !!");
		return
		//Dont continue running the code
	}

	if(validate_field(username) == false){
		alert("Username Field is Outta Line !!");
		return
	}




		

	auth.createUserWithEmailAndPassword(email, password)
	.then(function() {
		// Declare user variable
		var user = auth.currentUser

		// Add this user to Firebase Database
		var database_ref = database.ref()

		// Create User data
		var user_data = {
		username : username,
		email : email,
		password : password,
		last_login : Date.now()
		}

		// Push to Firebase Database
		database_ref.child('Users/' + user.uid).set(user_data)

		accountID = user.uid
		// DOne
		alert('User Created!!')
		console.log("User Created"+"|||"+Date(Date.now()))
		hideSignAndShowHome()
	})
	.catch(function(error) {
		// Firebase will use this to alert of its errors
		var error_code = error.code
		var error_message = error.message

		alert(error_message)
	})




}




// Set up our login function
function login () {
	// Get all our input fields
	var username = document.getElementById("username-sign-in").value; 
	var password = document.getElementById("password-sign-in").value;


	firebaseRef = firebase.database().ref("Users");

	var userarr = [];

	firebaseRef.once("value",function(data){
		vl = data.val();
		userarr = Object.keys(vl);

		userarr.forEach(function(e){
			var usernamesearch;
			firebaseRef = firebase.database().ref("Users/"+e);
			firebaseRef.child("username").once("value",function(data){
				vl = data.val();
				usernamesearch = vl;
				if(username == usernamesearch) {
					firebaseRef = firebase.database().ref("Users/"+e);
					firebaseRef.child("password").once("value",function(data){
						hah = data.val();
						if(password == hah){
							accountID = e;
							firebaseRef = firebase.database().ref("Users/"+e);
							firebaseRef.child("email").once("value",function(data){
								email = data.val();
							});
						}
					});
				}
			});
		});
	});


	setTimeout(function() {
		auth.signInWithEmailAndPassword(email, password)
		.then(function() {
			// Declare user variable
			var user = auth.currentUser

			// Add this user to Firebase Database
			var database_ref = database.ref()

			// Create User data
			var user_data = {
				last_login : Date.now()
			}

			// Push to Firebase Database
			database_ref.child('Users/' + user.uid).update(user_data)

			// DOne
			console.log("User Logged In "+"||||"+Date(Date.now()))
			alert('User Logged In!!')
			hideSignAndShowHome()

		})
		.catch(function(error) {
			// Firebase will use this to alert of its errors
			var error_code = error.code
			var error_message = error.message

			alert(error_message)
		})
	},1000);

}



var transactionsarr = [];

var cards = [];

function hideSignAndShowHome() {
	document.querySelector(".wrapper").style.display = "flex";
	document.querySelector(".container").style.display = "none";
	firebaseRef = firebase.database().ref("Users/"+accountID+"/transactions");
	console.log(accountID);
	firebaseRef.once("value",function(data){
		vl = data.val();
		console.log(vl);
		transactionsarr = Object.values(vl);
		console.log(transactionsarr);
		cards = [
			{
				type: "visa",
				number: "**** **** **** 2562",
				expiration: "12/17",
				transactions:  
					transactionsarr,
				
			},
			{
				type: "amex",
				number: "**** ****** 21001",
				expiration: "07/19",
				transactions: [
					
				]
			},
			{
				type: "mc",
				number: "**** **** **** 8335",
				expiration: "09/17",
				transactions: [
					
				]
			}
		];
		//Display Cards on Page
		document.querySelector('.cards').innerHTML = generateCards();
		//Add initial active class
		document.querySelector('.credit-card.visa').classList.add('active');;
				
		//Grab cardList
		var cardsList = document.querySelectorAll('.credit-card');
		//Grab single card
		var creditCard = document.querySelector( '.credit-card' );
		//Grab activeCard
		var activeCard = document.querySelector('.credit-card.active');
		//Grab transaction
		var transaction = document.querySelector('.transactions');

		//Show transactions
		showTransactions(cardsList, activeCard);
		console.log("showed");

		//add class show to transaction div for animation
		transaction.classList.add('show')
				
		//Toggle Active class on Cards and show class on transactions
		for(let i = 0; i < cardsList.length; i++) {
			cardsList[i].addEventListener("click", function(e) {
				e.preventDefault;
				for(let n = 0; n < cardsList.length; n++) {
					if(cardsList[n].classList.contains('active')) {
						cardsList[n].classList.remove('active');
					}
				}
				this.classList.add('active');
				showTransactions(cardsList, this);

				transaction.classList.remove("show");
				//triggering reflow
				void transaction.offsetWidth;

				transaction.classList.add("show");		
		});
		}
		[...document.getElementsByClassName("switch")].forEach(sw => {
			sw.addEventListener("click", function(){
				$(this).toggleClass('active');
			});
		});

				
	});

}







//Print Cards
function generateCards() {
	var output = "";
	cards.forEach(function(cards, index) {
		output += "<div class='credit-card " + cards.type + "'>";
		output += "<div class='card-image'></div>";
		output += "<div class='credit-card_number'>" + cards.number + "</div>";
		output += "<div class='credit-card_expiration'>Valid Thru:" + cards.expiration + "</div>";
		output += "<button class='switch'><div class='bt'></div></button>";
		output += "</div>";
	});
	
	return output;
}
// //Display Cards on Page
// setTimeout(function(){
// 	document.querySelector('.cards').innerHTML = generateCards();
// 	//Add initial active class
// 	document.querySelector('.credit-card.visa').classList.add('active');;
		
// 	//Grab cardList
// 	var cardsList = document.querySelectorAll('.credit-card');
// 	//Grab single card
// 	var creditCard = document.querySelector( '.credit-card' );
// 	//Grab activeCard
// 	var activeCard = document.querySelector('.credit-card.active');
// 	//Grab transaction
// 	var transaction = document.querySelector('.transactions');

// 	//Show transactions
// 	showTransactions(cardsList, activeCard);
// 	console.log("showed");

// 	//add class show to transaction div for animation
// 	transaction.classList.add('show')

// 	//Toggle Active class on Cards and show class on transactions
// 	for(let i = 0; i < cardsList.length; i++) {
// 		cardsList[i].addEventListener("click", function(e) {
// 			e.preventDefault;
// 			for(let n = 0; n < cardsList.length; n++) {
// 				if(cardsList[n].classList.contains('active')) {
// 					cardsList[n].classList.remove('active');
// 				}
// 			}
// 			this.classList.add('active');
// 			showTransactions(cardsList, this);

// 			transaction.classList.remove("show");
// 			//triggering reflow
// 			void transaction.offsetWidth;

// 			transaction.classList.add("show");		
// 	});
// 	}
// },10000);

//Print Cards
function showTransactions(creditCards, card) {
	var output = "";
	var total = 0;
  //if card is active print its transactions from cards data 
	for (var i = 0; i < creditCards.length; i++) {
		if (creditCards[i] === card) {
			console.log(cards[i].transactions);
			for (var n = 0; n < cards[i].transactions.length; n++) {
				output += "<div class='transaction-item " + cards[i].transactions[n].type + "'>";
				output += "<div class='transaction-item_details'>";
				output += "<h3>"+ cards[i].transactions[n].name +"</h3>";
				output += "<span class='details'>"+ cards[i].transactions[n].ID +" - " + cards[i].transactions[n].date + "</span>";
				output += "</div>";
				output += "<div class='transaction-item_amount'><span>ETH&nbsp;&nbsp;</span><p class='amount'>"+ cards[i].transactions[n].amount +"</p></div>";
				output += "</div>";
				//for transaction length add amounts to total 
				total += parseFloat(cards[i].transactions[n].amount);
			}
			document.querySelector('.transactions').innerHTML = output;
			document.querySelector('.total-balance').innerHTML = total.toFixed(9); //2 decimal places
		} 
	}
}


//simple modal
var modalControl = document.querySelector('.modal-control');
var modalClose = document.querySelector('.modal-close');
var modal = document.querySelector('.modal');

modalControl.addEventListener('click', function() {
	document.querySelector('.modal').classList.add('open');
}, false);

//click anywhere to close example modal
modal.addEventListener('click', function() {
	document.querySelector('.modal').classList.remove('open');
}, false);


