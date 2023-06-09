/* 
Rachel Children - 12/05/23 
This is my JavaScript document
*/

//Variables
const API_URL = `https://api.thecatapi.com/v1/`;
const API_KEY = "live_amP09F5V04BeGtfbqYEjp8wFbUnFz0EODqLOoOr0fpLY4OyVZxbtkSiOZtuzKLUo"

//Images to vote on 
let currentImageToVoteOn;

function showHistoricVotes() {

    document.getElementById('vote-options').style.display = 'none';
    document.getElementById('vote-results').style.display = 'block';
    document.getElementById('breedheader').style.display = 'none';


    const url = `${API_URL}votes?limit=10&order=DESC`;

    fetch(url, {
        headers: {
            'x-api-key': API_KEY
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            data.map(function (voteData) {

                const imageData = voteData.image

                let image = document.createElement('img');
                //use the url from the image object
                image.src = imageData.url

                let gridCell = document.createElement('div');

                if (voteData.value < 0) {
                    gridCell.classList.add('red')
                } else {
                    gridCell.classList.add('green')
                }

                gridCell.classList.add('col-lg');

                gridCell.appendChild(image)

                document.getElementById('grid').appendChild(gridCell);

            });

        })
        .catch(function (error) {
            console.log(error);
        });

}

function showVoteOptions() {
    document.getElementById("grid").innerHTML = '';

    document.getElementById('vote-options').style.display = 'block';
    document.getElementById('vote-results').style.display = 'none';
    document.getElementById('breedheader').style.display = 'none';

    showImageToVoteOn()
}

//Load image to vote on
function showImageToVoteOn() {

    const url = `${API_URL}images/search`;

    fetch(url, {
        headers: {
            'x-api-key': API_KEY
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            currentImageToVoteOn = data[0];
            document.getElementById("image-to-vote-on").src = currentImageToVoteOn.url;
        });

}
// showVoteOptions()
function vote(value) {

    const url = `${API_URL}votes/`;
    const body = {
        image_id: currentImageToVoteOn.id,
        value
    }
    fetch(url, {
        method: "POST", body: JSON.stringify(body), headers: {
            'content-type': "application/json",
            'x-api-key': API_KEY
        }
    })
        .then((response) => {
            showVoteOptions()
        })
}

//Random grid of cats 
const url = `https://api.thecatapi.com/v1/images/search?limit=20`;

function catImages() {
    document.getElementById('breedheader').style.display = 'none';
    
    fetch(url, {
        headers: {
            'x-api-key': API_KEY
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let imagesData = data;
            imagesData.map(function (imageData) {

                let image = document.createElement('img');
                //use the url from the image object
                image.src = `${imageData.url}`;

                let gridCell = document.createElement('div');
                gridCell.classList.add('col');
                gridCell.classList.add('col-lg');
                gridCell.appendChild(image)

                document.getElementById('grid').appendChild(gridCell);

            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

//Filter by breed 

