
/* ======= Model ======= */

var model = {
    currentCat: null,
    //مجموعة من الكائنات ويمثل كل من هذي الكائنات نوع قطة 
    cats: [
 // clickCount , name و مصدر الصورة  وسمات الصورة
        {
            clickCount : 0,
            name : 'baby cat',
            imgSrc : 'img/cat1.jpg',
           // imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'cute cat',
            imgSrc : 'img/cat2.jpg',
          //  imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'cool cat',
            imgSrc : 'img/cat3.jpg',
            //imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'Shy cat',
            imgSrc : 'img/cat4.jpg',
            //imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Sad cat',
            imgSrc : 'img/cat5.jpg',
            //imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
};


/* ======= Octopus ======= */

var octopus = {
// نبدأ با اسلوب init والي يبدأ التطبيق بأ كمله 
    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
    },
// لدي دالتين  git , getCurrent  ,ومنها نستدعي كلنا الدالتين لكي نحصل على قطة الحالية أو جميع القطط   ومنها نعرض بشكل ملائم 
    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
 // اضبط القط المحدد حاليًا على الكائن الذي تم تمريره
 // setCurrent ادخلت فيها opjact (cat) وعينت currentCat مساوي للopjact (cat)
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    // يزيد من عداد القط المختار حاليًا
    //  ب   clickCount يأخذ عنصر الحالي للقطه وتزيد العنصر     catView نامر بالعرض
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    }
};


/* ======= View ======= */

var catView = {
//  catView عبارة عن دالتين     init تهيئه ,   عرضrender 
    
init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },
// render يمكن لدالة استدعاء  دايماً  لكن دالة التهيئه تستدعي لمره واحدة
    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {
// int يستدعي لمره واحدة
    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
// مر على octp بتعيين مجموعة currrnt Cat ثم أعرض الدالة CatView
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

// make it go!
octopus.init();
