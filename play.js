    const moleImg = new Image();
    const buracoImg = new Image();
    const canvas = document.querySelector('#myCanvas');
    const ctx = canvas.getContext("2d");
    const scoreText = document.querySelector('#scoreText');
    const menuReturn = document.querySelector('#menu_return')
    const overlay = document.querySelector('.overlay')
    const body = document.querySelector('body');
    const easy = document.querySelector('#easy_button')
    const medium = document.querySelector('#medium_button')
    const hard = document.querySelector('#hard_button')
    const count = document.querySelector('#count')
    let difficulty = 1500;
    buracoImg.src = "../images/buraco.png";
    moleImg.src = "../images/toupeirinha.png";
    const playButton = document.querySelector('#play')
    const buracos = 9;
    const initialPosX = 40;
    const initialPosY = 80;
    const sizeX = 50;
    const sizeY = 50;
    let displayMoleInterval = difficulty;
    let clearMoleInterval = displayMoleInterval - 500;
    const toupeiraOffset = 5;
    const positions = {}
    let offsetX = 230;
    let offsetY = 120;
    let score = 0;
    let index = 1;
    scoreText.innerHTML = score;
    let currentPosX = initialPosX;
    let currentPosY = initialPosY;
    let globalMolePosition = {};
    let gameInterval = null;
    const createField = () => {
        let number = 0
        const a = setInterval(() => {
            number += 1
            count.innerHTML = number
            if(number === 4) {
                count.style.display = 'none'
            }
        }, 1000)
        setTimeout(() => {
            clearInterval(a)
            for (let i = 0; i < 3; i += 1) {
                ctx.drawImage(buracoImg, currentPosX += 20, currentPosY += 20);
                positions[index] = { 
                  initialX: currentPosX, 
                  initialY: currentPosY, 
                  finalX: currentPosX + sizeX, 
                  finalY: currentPosY + sizeY 
                };
                index += 1;
              
                for (let j = 0; j < 2; j += 1) {
                  currentPosY += offsetY;
                  ctx.drawImage(buracoImg, currentPosX, currentPosY);
                  positions[index] = { 
                    initialX: currentPosX, 
                    initialY: currentPosY, 
                    finalX: currentPosX + sizeX, 
                    finalY: currentPosY + sizeY 
                  };
                  index += 1;
                }
                currentPosY =  initialPosY;
                currentPosX += offsetX;
              }
              canvas.style.backgroundImage = "url(../images/grass.png)";
        }, 4000)
   }



    const startGame = () => {

    const setMolePosition = () => {
      const index =  Math.floor(Math.random() * 9 + 1);
      return positions[index];
    }

     gameInterval = setInterval((() => {
      const { initialX, initialY, finalX, finalY } = setMolePosition();
      globalMolePosition = { initialX, initialY, finalX, finalY };
      ctx.drawImage(moleImg, initialX + 2.5, initialY - 16);
      const timeoutID = setTimeout((() => {
        ctx.clearRect(initialX, initialY - 20, 100, 140)
        ctx.drawImage(buracoImg, initialX, initialY);
        globalMolePosition = {}
        clearTimeout(timeoutID)
      }), clearMoleInterval);
    }), displayMoleInterval);
  }
  playButton.addEventListener('click', () => {
    currentPosX = initialPosX;
    currentPosY = initialPosY;
    displayMoleInterval = difficulty;
    clearMoleInterval = displayMoleInterval - 500;
    createField();
    startGame();
    overlay.style.display = 'none'
    playButton.style.display = 'none'
  })
    const clearDisplay = () => {
      canvas.style.backgroundImage = "none";
      clearInterval(gameInterval);
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      scoreText.innerHTML = 0
      score = 0
    }
    
    menuReturn.addEventListener('click', () => {
        clearDisplay();
        overlay.style.display = 'flex'
        playButton.style.display = 'flex'
    })

    easy.addEventListener('click', () => {
      difficulty = (1500)
    })
    
    medium.addEventListener('click', () => {
      difficulty = (1100)
    })
    
    hard.addEventListener('click', () => {
      difficulty = (900)
    })
  

    canvas.addEventListener('click', (evt) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = evt.clientX - rect.left;
      const mouseY = evt.clientY - rect.top;
      const { initialX, initialY, finalX, finalY } = globalMolePosition;
      if (mouseX >= initialX && mouseX <= finalX 
          && mouseY >= initialY - 16 && mouseY <= finalY
        ) {
          score += 1;
          globalMolePosition = {};
          scoreText.innerHTML = score;
        }
    });