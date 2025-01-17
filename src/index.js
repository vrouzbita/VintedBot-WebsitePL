import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCKd8gi7RIjeEIVj9GnAn4AvkBxgEmCJ2w",
    authDomain: "vintedbot-3f0d6.firebaseapp.com",
    projectId: "vintedbot-3f0d6",
    storageBucket: "vintedbot-3f0d6.appspot.com",
    messagingSenderId: "495357704111",
    appId: "1:495357704111:web:df56b60220ec07fd97e15a",
    measurementId: "G-F70EHN3FVM"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();
  // For emulation use : 
  // connectAuthEmulator(auth, "http://127.0.0.1:9099");




const signupForm = document.querySelector('.signup')
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value
    if (signupForm.terms.checked) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(cred => {
          console.log('user created:', cred.user)
          signupForm.reset()
          window.location = 'index.html'
        })
        .catch(err => {
          console.log(err.message)
          alert(err.message)
        })
    } else {
      alert('Please agree to terms and conditions')
    }
  })
}

const logoutButton = document.querySelector('.logout')
if (logoutButton) {
  logoutButton.addEventListener('click', (e) => {
    e.preventDefault()
    signOut(auth).then(() => {
      console.log('user signed out')
      window.location = 'index.html'
    })
    .catch(err => {
      console.log(err.message)
    })
  })
}

const loginForm = document.querySelector('.login')
if (loginForm) {
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      loginForm.reset()
      window.location = 'index.html'
    })
    .catch(err => {
      console.log(err.message)
      alert(err.message)
    })
})
}

onAuthStateChanged(auth, user => {
  if (user) {
    console.log('user logged in:', user)
    if (document.querySelector('.logout')) {
      document.querySelector('.logout').style.display = 'inline-block'
      document.querySelector('.dashboard').style.display = 'inline-block'
    }
  } else {
    console.log('user logged out')
    if (document.querySelector('.button.small')) {
      document.querySelector('.button.small').style.display = 'inline-block'
    }
  }
})

const dashboardButton = document.querySelector('.dashboard')
if (dashboardButton) {
dashboardButton.addEventListener('click', (e) => {
  e.preventDefault()
  window.location = 'dashboard.html'
})
}

const manageButton = document.querySelector('.manage')
if (manageButton) {
manageButton.addEventListener('click', (e) => {
  e.preventDefault()
  window.open('https://billing.stripe.com/p/login/eVa17dcQLfO82fm8ww?prefilled_email='+auth.currentUser.email)
})
}

const discordButton = document.querySelector('.discordbutton')
if (discordButton) {
discordButton.addEventListener('click', (e) => {
  e.preventDefault()
  window.open('https://discord.gg/W6MRNaXwQ8')
})
}

const discordButtonMobile = document.querySelector('.discordbuttonmobile')
if (discordButtonMobile) {
discordButtonMobile.addEventListener('click', (e) => {
  e.preventDefault()
  window.open('https://discord.gg/W6MRNaXwQ8')
})
}
