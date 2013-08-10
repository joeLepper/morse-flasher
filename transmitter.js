var telegraph = require('morse-maker').telegraph
  , flash = require('pi-led-flasher').flash
  , ditLength = 200
  , characterPos = 0 
  , currentMessage
  , transmitter = function(message){
      console.log(message);
      if(message !== currentMessage){
        characterPos = 0;
      }
      currentMessage = message
      if(characterPos < message.length){
        sendCharacter(message,characterPos)
        characterPos++
      }
    }    
  , sendCharacter = function(message,index){
      var character = message[index]
      if(character !== undefined){
        if(character === '.'){
          flash(ditLength,next);
        }
        else if (character === '-'){
          flash(ditLength * 3,next);
        }
      } 
    }
  , next = function(){
      setTimeout(function(){
        transmitter(currentMessage)
      },ditLength)
    }

telegraph(transmitter);
