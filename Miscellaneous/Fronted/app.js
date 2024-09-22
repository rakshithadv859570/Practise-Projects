let btn = document.querySelector("button");

btn.addEventListener("click", async () => {
    let country = document.querySelector("input").value.trim(); // Remove leading/trailing spaces

    if (country) {
        console.log(country);
        let collarr = await getFacts(country);
        show(collarr);
    } else {
        console.log("Please enter a valid country name.");
    }
});

let url2 = "http://universities.hipolabs.com/search?name="; // Base URL for searching by name

function show(collarr) {
    let list = document.querySelector("#list");
    list.innerHTML = ''; // Clear the list before adding new items

    if (collarr.length === 0) {
        let li = document.createElement("li");
        li.innerText = "No universities found.";
        list.append(li);
    } else {
        for (let col of collarr) {
            let li = document.createElement("li");
            console.log(col.name);

            li.innerText = col.name;
            list.append(li);
        }
    }
}

async function getFacts(country) {
    try {
        let res = await axios.get(url2 + encodeURIComponent(country)); // Properly encode the country name
        console.log("Response:", res.data);
        return res.data;
    } catch (e) {
        console.log("Error =", e);
        return [];
    }
}
