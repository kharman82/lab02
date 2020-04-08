'use strict';

const monstersArray = [];
const keywordArray = [];

//Grab the Monsters
$.ajax('data/page-1.json', {method: 'GET', dataType: 'JSON'})
    .then ( (data) => {
        data.forEach( value => {
             new Monster(value).render();
            
            if (!keywordArray.includes(value.keyword)){
                keywordArray.push(value.keyword);
            }
        });
    populateDropDown();
});





// Constructor function for our Monsters
function Monster(data) {
    this.image_url = data.image_url;
    this.title = data.title;
    this.description = data.description;
    this.keyword =data.keyword;
    this.horns = data.horns;
    monstersArray.push(this);
}


// Render the function
Monster.prototype.render = function() {
    let template = $('#photo-template').html();

    let $newSection = $('<section></section>');
    $newSection.html(template);
    $newSection.find('img').attr('src', this.image_url);
    $newSection.find('h2').text(this.title);
    $newSection.find('p').text(this.description);
    $newSection.attr('keyword', this.keyword);
    $newSection.attr('horns', this.horns);

    $('main').append($newSection);
}


// Function for drop down menue to populate.
function populateDropDown() {
    keywordArray.forEach( (word) => {
        let $options = $('<option></option>');
        $options.text(word);
        $options.val(word);
        $('select').append($options);
    });

}

// Function to sort keyword
function filterByKeyword(event) {
    const sections = $('section');
    
    sections.each( function (sect, value) {
        if ( $(value).attr('keyword') === event.target.value) {
            $(value).show();
        }else {
            $(value).hide()
        }
    });
}
$('select').change(filterByKeyword);