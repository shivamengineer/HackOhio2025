class RectangleKeyframeDictionary {

    RectangleFrameDictionary = {};
    times = [];
    id;

    constructor(id){
      this.id = id;
    }

    addKeyframe(rect, time){
      this.RectangleFrameDictionary[time] = rect;
      if(!this.times.includes(time)) this.times.push(time);
      this.times.sort((a, b) => a - b);
    }

    removeKeyframe(time){
      delete this.RectangleFrameDictionary[time];
      var index = this.times.indexOf(time);
      this.times.splice(index, 1);
    }

    translateKeyframe(x, y, time){
      this.RectangleFrameDictionary[time].x += x;
      this.RectangleFrameDictionary[time].y += y;
    }

    getRectAtTime(time){
      if(this.RectangleFrameDictionary[time] != null) return this.RectangleFrameDictionary[time];

      var rect = new Rectangle();
      if(time < this.times[0]){
          rect = this.RectangleFrameDictionary[this.times[0]];
      } else if(time > this.times[this.times.length - 1]){
          rect = this.RectangleFrameDictionary[this.times[this.times.length - 1]];
      } else {
          var index0 = -1;
          var index1 = -1;
          var found = false;
          for(i = 0; !found && i < this.times.length; i++){
              if(time < this.times[i]){
                  index0 = i - 1;
                  index1 = i;
                  found = true;
              }
          }
          var rect1 = this.RectangleFrameDictionary[this.times[index0]];
          var rect2 = this.RectangleFrameDictionary[this.times[index1]];

          var timeDifference = time - this.times[index - 1];
          rect.x = (rect2.x - rect1.x) / timeDifference;
          rect.y = (rect2.y - rect1.y) / timeDifference;
          rect.width = (rect2.width - rect1.width) / timeDifference;
          rect.height = (rect2.height - rect1.height) / timeDifference;
          rect.color = rect1.color;
      }

      return rect;

      /*var index = 0;
      while(index < this.times.length - 1 && time > this.times[index]){
        index++;
      }
      //if(index == 0) return this.RectangleFrameDictionary[this.times[index]];
      if(index == this.times.length - 1) return this.RectangleFrameDictionary[this.times[index]];
      var rect1 = this.RectangleFrameDictionary[this.times[index - 1]];
      var rect2 = this.RectangleFrameDictionary[this.times[index]];
      var timeDifference = time - this.times[index - 1];
      return new Rectangle(
        (rect2.x - rect1.x) / timeDifference,
        (rect2.y - rect1.y) / timeDifference,
        (rect2.width - rect1.width) / timeDifference,
        (rect2.height - rect1.height) / timeDifference,
        rect1.color);*/
    }

    draw(time){
        var rect = this.getRectAtTime(time);
        rect.draw();
    }
}
