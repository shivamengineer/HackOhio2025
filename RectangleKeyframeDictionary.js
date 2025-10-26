class RectangleKeyframeDictionary {

    RectangleFrameDictionary = {};
    id;

    constructor(id){
      this.id = id;
    }

    addKeyframe(rect, time){
      this.RectangleFrameDictionary[time] = rect;
      console.log(this.RectangleFrameDictionary);
    }

    moveKeyframe(rect, time){
      this.RectangleFrameDictionary[time];
    }

    removeKeyframe(time){
      delete this.RectangleFrameDictionary[time];
    }

    translateKeyframe(x, y, time){
      this.RectangleFrameDictionary[time].x += x;
      this.RectangleFrameDictionary[time].y += y;
    }

    getKeys(){
      var keys = [];
      Object.keys(this.RectangleFrameDictionary).forEach(key => {
        keys.push(key);
      });
      keys.sort((a, b) => a - b);
      return keys;
    }

    getRectAtTime(time){
      if(this.RectangleFrameDictionary[time] != null) return this.RectangleFrameDictionary[time];

      /*var keys = this.getKeys();

      var rect = new Rectangle();
      if(time < keys[0]){
          rect = this.RectangleFrameDictionary[keys[0]];
      } else if(time > keys[keys.length - 1]){
          rect = this.RectangleFrameDictionary[keys[keys.length - 1]];
      } else {
          var index0 = -1;
          var index1 = -1;
          var found = false;
          for(i = 0; !found && i < keys.length; i++){
              if(time < keys[i]){
                  index0 = i - 1;
                  index1 = i;
                  console.log("found " + i);
                  found = true;
              }
          }
          if(!found) return this.RectangleFrameDictionary[keys[keys.length - 1]];

          var rect1 = this.RectangleFrameDictionary[keys[index0]];
          var rect2 = this.RectangleFrameDictionary[keys[index1]];

          var timeDifference = time - keys[index0];
          rect.x = (rect2.x - rect1.x) / timeDifference;
          rect.y = (rect2.y - rect1.y) / timeDifference;
          rect.width = (rect2.width - rect1.width) / timeDifference;
          rect.height = (rect2.height - rect1.height) / timeDifference;
          rect.color = rect1.color;
      }

      return rect;*/

      var keys = this.getKeys();

      if(time > keys[keys.length - 1]) return this.RectangleFrameDictionary[keys[keys.length - 1]];

      var index = 0;
      while(index < keys.length  - 1 && time > keys[index]){
        index++;
      }
      
      if(index == 0) return this.RectangleFrameDictionary[keys[index]];
      if(index == keys.length - 1) return this.RectangleFrameDictionary[keys[index]];
      var rect1 = this.RectangleFrameDictionary[keys[index - 1]];
      var rect2 = this.RectangleFrameDictionary[keys[index]];
      var timeDifference = time - keys[index - 1];
      console.log("rect1: " + rect1);
      console.log("rect2: " + rect2);
      return new Rectangle(
        (rect2.x - rect1.x) / timeDifference,
        (rect2.y - rect1.y) / timeDifference,
        (rect2.width - rect1.width) / timeDifference,
        (rect2.height - rect1.height) / timeDifference,
        rect1.color);
    }

    draw(time){
        var rect = this.getRectAtTime(time);
        this.drawRect(rect);
    }

    drawRect(rect){
      ctx.fillStyle = rect.color;
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    }
}
