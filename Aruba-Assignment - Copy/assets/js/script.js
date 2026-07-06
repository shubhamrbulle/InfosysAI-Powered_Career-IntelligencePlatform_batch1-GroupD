// ========================================
// DARK MODE HANDLING
// ========================================

// Runs after page loads
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");
  const savedTheme = localStorage.getItem("theme");

  // Apply saved theme
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (toggle) toggle.checked = true;
  }

  // Toggle Theme
  if (toggle) {
    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
    });
  }
});

// ========================================
// AUTH (SIGNUP / LOGIN) - client-side demo
// Stores users in localStorage under key `users` (array of {name,email,password})
// Note: This is for demo only. Do NOT use in production (passwords stored in plain text).
// ========================================

// Helpers
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
const isValidPassword = (pw) =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,}$/.test(String(pw));

function getUsers() {
  try {
    const raw = localStorage.getItem("users");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveUsers(users) {
  try {
    localStorage.setItem("users", JSON.stringify(users));
  } catch (e) {
    console.error("Failed to save users:", e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = (document.getElementById("signupName") || {}).value || "";
      const email = (document.getElementById("signupEmail") || {}).value || "";
      const password =
        (document.getElementById("signupPassword") || {}).value || "";

      // Basic validation
      if (!name.trim()) {
        alert("Please enter your full name.");
        return;
      }
      if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }
      if (!isValidPassword(password)) {
        alert(
          "Password must be at least 8 characters and include letters and numbers."
        );
        return;
      }

      // Check duplicate email (case-insensitive)
      const users = getUsers();
      const exists = users.some(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );
      if (exists) {
        alert(
          "An account with this email already exists. Please login or use a different email."
        );
        return;
      }

      // Save new user
      users.push({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });
      saveUsers(users);

      alert(
        "Account created successfully! You will be redirected to the login page."
      );
      window.location.href = "login.html";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = (document.getElementById("loginEmail") || {}).value || "";
      const password =
        (document.getElementById("loginPassword") || {}).value || "";

      if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }
      if (!password) {
        alert("Please enter your password.");
        return;
      }

      const users = getUsers();
      const user = users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );
      if (!user) {
        alert("No account found with this email. Please sign up first.");
        return;
      }

      if (user.password === password) {
        // Successful login
        try {
          localStorage.setItem(
            "currentUser",
            JSON.stringify({ name: user.name, email: user.email })
          );
        } catch (err) {}
        alert("Login successful! Redirecting to home page.");
        window.location.href = "index.html";
      } else {
        alert("Incorrect password. Please try again.");
      }
    });
  }
});
