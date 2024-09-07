let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  
  let players =['X','O'];
  let available = [];
  let cuurentPlayer;
  
  function setup() {
    createCanvas(400, 400);
    frameRate(2);
    for(let i = 0; i < 3; i++){
      for(let j= 0; j < 3; j++){
        available.push([i,j]);
      }
    }
    currentPlayer = floor(random(players.length));
  }
  
  function equal(a,b,c){
    return (a == b && b == c && a != '');
  }
  
  function Winner(){
    let winner = null;
     
    // horizontally
    for(let i = 0; i < 3; i++){
      if(equal(board[i][0],board[i][1], board[i][2])){
        winner = board[i][0];
        break;
      }
    }
    // vertically
    for(let i = 0; i < 3; i++){
      if(equal(board[0][i],board[1][i], board[2][i])){
        winner = board[0][i];
        break;
      }
    }
    
    // diagonally
    if(equal(board[0][0], board[1][1], board[2][2])){
      winner = board[0][0];
    }
    
    if(equal(board[0][2], board[1][1], board[2][0])){
      winner = board[0][2];
    }
    if(winner == null && available.length == 0){
      return 'tie';
    }
    return winner;
  }
  
  function nextTurn(){
    let index = floor(random(available.length));
    let spot = available.splice(index, 1)[0];
    
    let i = spot[0];
    let j = spot[1];
    board[i][j] = players[currentPlayer];
    currentPlayer = (currentPlayer + 1) % players.length;
  }
  
  // function mousePressed(){
  //   nextTurn();
  // }
  
  function draw() {
    background(255);
    stroke(50);
    strokeWeight(4);
    line(400/3, 0, 400/3, 400);
    line(800/3, 0, 800/3, 400);
    line(0,400/3, 400, 400/3);
    line(0, 800/3, 400, 800/3);
    
    let h = height/3;
    let w = width/3;
    
    stroke(0);
    for(let i = 0; i <3; i++){
      for(let j = 0; j <3; j++){
         if( board[i][j] == 'X'){
           line(h*i + w/3, w*j + h/3, h*i+h - h/3, w*j+ w - w/3);
           line(h*i+h - h/3, w*j + h/3, h*i + w/3, w*j+ w - w/3);
         }
        else if(board[i][j] == 'O'){
          ellipse(h*i + h/2, w*j + w/2, w/2, h/2);
        }
      }
    }
    
    let result = Winner();
    if(result != null){
      noLoop();
      let resultP = createP("");
      resultP.style('font-size', '32px');
      if(result == 'tie'){
        resultP.html("Tie!");
      }
      else{
        resultP.html(`${result} wins!`);
      }
    }
    else{
      nextTurn();
    }
    
  }