
window.addEventListener("DOMContentLoaded", (event) => {
    setTimeout(() => {
        const searchBar = document.getElementById('search');
        console.log("search bar is nullllllll: " + (searchBar === null));
    }, 10);
    const searchBar = document.getElementById('search');
    console.log("search bar is nullllllll: " + (searchBar === null));
});

async function getColorPalette(query){
    try{
    const response = await fetch('http://localhost:4000/get_palette', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({query: query})
    });
    if (!response.ok){
        throw new Error('Network not alright');
    }

    const data = await response.json();
    return data;
} catch(error){
    console.error('Error fetching data', error);
    return null;
}
}

async function getTest()
{
    try{
        const response = await fetch('http://localhost:4000/get_test', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok){
            throw new Error('Network not alright');
        }
        const data = await response.json();
        console.log("data: " + data["value"]);
        return data;
    } catch(error){
        console.error('Error fetching data', error);
        return null;
    }
}


function setPalette(colors){
    for(let i = 0; i < colors.length; i++){
        document.getElementById("color" + (i + 1)).setAttribute("fill", colors[i]);
        document.getElementById("code" + (i + 1)).innerHTML = colors[i]
    }
}

document.addEventListener("keydown", async function(event){
    if (event.key === " "){
        const query = "starry night";
        const colors = await getColorPalette(query);
        setPalette(colors);
    }
})

window.onload = () => 
    {
        //document.addEventListener("DOMContentLoaded", function(){
        const searchBar = document.getElementById('search');
            console.log("search bar is null: " + (searchBar === null));
            searchBar.addEventListener("keydown", async function(event) {
                console.log("search bar event key: " + event.key);
                if (event.key === "Enter"){
                    event.preventDefault();
                    const query = searchBar.value.toLowerCase();
                    const colors = await getColorPalette(query);
                    setPalette(colors);
                }
            });
       // });

       getTest();
    }

