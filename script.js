// TODO wtf is this? clean this shit up

let data = null;
let leftSelect = null;
let rightSelect = null;

let leftEmoji = null;
let rightEmoji = null;

const xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    data = JSON.parse(this.responseText);
    generateDropdown();

    leftSelect = document.getElementById('emoji-select-left');
    leftSelect.addEventListener("change", compareAndRender);
    rightSelect = document.getElementById('emoji-select-right');
    rightSelect.addEventListener("change", compareAndRender);
  }
};
xmlhttp.open("GET", "data/data.json", true);
xmlhttp.send();

const generateDropdown = () => {
  console.log('generating dropdown');
  let optionsHTML = "";
  leftEmoji = data.groups[0].options[0];
  rightEmoji = data.groups[0].options[0];
  for (const group of data.groups) {
    const currentGroup = group;
    optionsHTML = `${optionsHTML}<optgroup label="${currentGroup.label}">`;
    for (const option of currentGroup.options) {
      console.log(option);
      optionsHTML = `${optionsHTML}<option>${option.emoji} ${option.label}</option>`;
    }
    optionsHTML = `${optionsHTML}</optgroup>`;
  }
  console.log(optionsHTML)
  document.getElementById('emoji-select-left').innerHTML = optionsHTML;
  document.getElementById('emoji-select-right').innerHTML = optionsHTML;
}

const compareAndRender = (d) => {
  console.log(leftEmoji.emoji, rightEmoji.emoji);
  console.log(d.target.attributes[0].nodeValue);

  for(const group of data.groups){
    for(const option of group.options){
      if (d.srcElement.value.includes(option.emoji)) {
        console.log(option.emoji);
        if(d.target.attributes[0].nodeValue.includes('emoji-select-left')){
          console.log('left');
          leftEmoji = option;
          // rightEmoji = document.getElementById('emoji-select-right').
        } else {
          console.log('right');
          rightEmoji = option;
        }
        break;
      }
    }
  }
  
  if(leftEmoji.diameter_meters >= rightEmoji.diameter_meters){
    document.getElementById('left-viz').innerHTML = leftEmoji.emoji;
    document.getElementById('left-viz').style = "font-size : 6em";
    let otherHTML = "";
    let multiplier = leftEmoji.diameter_meters/rightEmoji.diameter_meters;
    document.getElementById('info').innerHTML = `${leftEmoji.emoji} is ${multiplier.toFixed(2)} times larger than ${rightEmoji.emoji}`;

    if(multiplier > 10000){ //TODO fix bug
      multiplier = 10000;
      alert("You're comparing objects with massive size differences between them. The generated representation will be inaccurate. Your browser might crash if it was accurate.");
    }
    for(let i=0; i<multiplier; i++){
      otherHTML = otherHTML + rightEmoji.emoji;
      document.getElementById('right-viz').innerHTML = otherHTML;
    }
    document.getElementById('right-viz').style = "font-size : 1em";

    // document.getElementById('right-viz').innerHTML = otherHTML;
    if(leftEmoji.diameter_meters == rightEmoji.diameter_meters){
      document.getElementById('left-viz').style = "font-size : 6em";
      document.getElementById('right-viz').style = "font-size : 6em";
      document.getElementById('info').innerHTML = `${leftEmoji.emoji} is the same size as ${rightEmoji.emoji}`;
    }
  } else {
    document.getElementById('right-viz').innerHTML = rightEmoji.emoji;
    document.getElementById('right-viz').style = "font-size : 6em";
    let otherHTML = "";
    let multiplier = rightEmoji.diameter_meters/leftEmoji.diameter_meters;
    document.getElementById('info').innerHTML = `${leftEmoji.emoji} is ${multiplier.toFixed(2)} times smaller than ${rightEmoji.emoji}`;
    if(multiplier > 10000){ //TODO fix bug
      multiplier = 10000;
      alert("You're comparing objects with massive size differences between them. The generated representation will be inaccurate. Your browser might crash if it was accurate.");
    }
    document.getElementById('left-viz').style = "font-size : 1em";
    for(let i=0; i<multiplier; i++){
      otherHTML = `${otherHTML}${leftEmoji.emoji}`;
      document.getElementById('left-viz').innerHTML = otherHTML;
    }
  }
}
