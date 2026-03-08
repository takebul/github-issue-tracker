document.getElementById("signInBtn").addEventListener("click", () => {
    const inputUsername = document.getElementById("usernameInput");
    const usernameValue = inputUsername.value;
    console.log(usernameValue);

    const inputPassword = document.getElementById("passwordInput");
    const passwordValue = inputPassword.value;
    console.log(passwordValue);

    if (usernameValue == "admin" && passwordValue == "admin123") {
        window.location.assign("/github_issue_tracker.html")
    }
    else {
        alert("Sign In Failed");
        return;
    };
});