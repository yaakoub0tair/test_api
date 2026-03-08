const form = document.getElementById("form");
form.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    // fetch("http://localhost:8000/register", {
    //         method: "POST",
    //         body: formData,
    //         headers: { accept: "application/json" },
    //     })
    //     .then((response) => response.json())
    //     .then((data) => console.log(data));

    postData("http://127.0.0.1:8000/register", formData);
});

const getCsrfCookie = async() => {
    try {
        await fetch("http://127.0.0.1:8000/sanctum/csrf-cookie", {
            method: "GET",
            credentials: "include", // Important: ensures cookies are sent and received
            headers: {
                Accept: "application/json",
            },
        });
        console.log("CSRF cookie set successfully.");
    } catch (error) {
        console.error("Error fetching CSRF cookie:", error);
    }
};

const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    console.log(value);
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
};

const postData = async(url, data) => {
    await getCsrfCookie();

    const csrfToken = getCookieValue('XSRF-TOKEN');

    if (!csrfToken) {
        console.error('CSRF token not found.');
        return;
    }

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json', // Requis car on envoie du JSON
            'Accept': 'application/json',
            'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
        },
        // Conversion du FormData en objet simple pour JSON.stringify
        body: JSON.stringify(Object.fromEntries(data)),
    });

    const result = await response.json();
    console.log(result);
    return result;
};