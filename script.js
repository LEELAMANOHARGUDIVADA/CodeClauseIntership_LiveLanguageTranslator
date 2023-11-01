const fromText = document.querySelector('.from-text'),
toText = document.querySelector('.to-text'),
exchangeBtn = document.querySelector('.exchange-btn'),
selectBtn = document.querySelectorAll('select'),
translateBtn = document.querySelector('button');
const copyBtns = document.querySelectorAll('.bx-copy');

selectBtn.forEach((tag, id) => {
    for (const country_code in countries) {
        let selected;

        if (id === 0 && country_code === 'en-GB') {
            selected = 'selected';
        } else if (id === 1 && country_code === 'hi-IN') {
            selected = 'selected';
        }

        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML('beforeend', option);
    }
});

copyBtns.forEach((copyBtn, idx) => {
    copyBtn.addEventListener('click', () => {
        const textArea = idx === 0 ? fromText : toText;

        textArea.select();
        document.execCommand('copy');
        alert('Text copied to clipboard');
    });
});


exchangeBtn.addEventListener('click', () => {
    let tempText = fromText.value,
    tempLang = selectBtn[0].value;
    fromText.value =  toText.value;
    selectBtn[0].value =  selectBtn[1].value;
    toText.value = tempText;
    selectBtn[1].value = tempLang;
});

translateBtn.addEventListener('click', ()=>{
    let text = fromText.value,
    translateFrom = selectBtn[0].value,
    translateTo = selectBtn[1].value;
    let API_URL = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(API_URL).then(res => res.json()).then(data => {
        console.log(data);
        toText.value = data.responseData.translatedText;
    })
});
