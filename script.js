// TODO wtf is this? clean this shit up

let data = null;
let leftSelect = null;
let rightSelect = null;

let leftEmoji = null;
let rightEmoji = null;

let xmlhttp = new XMLHttpRequest();
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
xmlhttp.open("GET", "data.json", true);
xmlhttp.send();

function generateDropdown(){
  console.log('generating dropdown');
  let optionsHTML = "";
  leftEmoji = data.groups[0].options[0];
  rightEmoji = data.groups[0].options[0];
  for(let i = 0; i < data.groups.length; i++){
    let currentGroup = data.groups[i];
    optionsHTML = optionsHTML + '<optgroup label="' + currentGroup.label + '">';
    for(let j = 0; j < currentGroup.options.length; j++){
      console.log(currentGroup.options[j]);
      optionsHTML = optionsHTML + '<option>' + currentGroup.options[j].emoji + ' ' + currentGroup.options[j].label + '</option>';
    }
    optionsHTML = optionsHTML + '</optgroup>';
  }
  console.log(optionsHTML)
  document.getElementById('emoji-select-left').innerHTML = optionsHTML;
  document.getElementById('emoji-select-right').innerHTML = optionsHTML;
}

function compareAndRender(d){
  console.log(leftEmoji.emoji, rightEmoji.emoji);
  console.log(d.target.attributes[0].nodeValue);

  for(i in data.groups){
    for(j in data.groups[i].options){
      if(d.srcElement.value.includes(data.groups[i].options[j].emoji)){
        console.log(data.groups[i].options[j].emoji);
        if(d.target.attributes[0].nodeValue.includes('emoji-select-left')){
          console.log('left');
          leftEmoji = data.groups[i].options[j];
          // rightEmoji = document.getElementById('emoji-select-right').
        } else {
          console.log('right');
          rightEmoji = data.groups[i].options[j];
        }
        break;
      }
    }
  }


  if(leftEmoji.diameter_meters >= rightEmoji.diameter_meters){
    document.getElementById('left-viz').innerHTML = leftEmoji.emoji;
    document.getElementById('left-viz').style = "font-size : 6em";
    let otherHTML = "";
    let multiplier = parseInt(leftEmoji.diameter_meters)/parseInt(rightEmoji.diameter_meters);
    if(multiplier > 10000){
      alert("You're comparing objects with massive size differences between them. This might take a while. Your browser might crash.");
    }
    for(i=0;i<multiplier;i++){
      otherHTML = otherHTML + rightEmoji.emoji;
      document.getElementById('right-viz').innerHTML = otherHTML;
    }
    document.getElementById('right-viz').style = "font-size : 1em";

    // document.getElementById('right-viz').innerHTML = otherHTML;
    document.getElementById('info').innerHTML = leftEmoji.emoji + " is " + multiplier + " times larger than " + rightEmoji.emoji;
    if(leftEmoji.diameter_meters == rightEmoji.diameter_meters){
      document.getElementById('left-viz').style = "font-size : 6em";
      document.getElementById('right-viz').style = "font-size : 6em";
      document.getElementById('info').innerHTML = leftEmoji.emoji + " is the same size as " + rightEmoji.emoji;
    }
  } else {
    document.getElementById('right-viz').innerHTML = rightEmoji.emoji;
    document.getElementById('right-viz').style = "font-size : 6em";
    let otherHTML = "";
    let multiplier = parseInt(rightEmoji.diameter_meters/leftEmoji.diameter_meters);
    if(multiplier > 10000){
      alert("You're comparing objects with massive size differences between them. This might take a while. Your browser might crash.");
    }
    document.getElementById('left-viz').style = "font-size : 1em";
    for(i=0;i<multiplier;i++){
      otherHTML = otherHTML + leftEmoji.emoji;
      document.getElementById('left-viz').innerHTML = otherHTML;
    }
    document.getElementById('info').innerHTML = leftEmoji.emoji + " is " + multiplier + " times smaller than " + rightEmoji.emoji;
  }
}
