class RectangleKeyframeDictionary {

    RectangleFrameDictionary = {};
    times = [];

    constructor(rect, time){
      addKeyframe(rect, time);
    }

    addKeyframe(rect, time){
      RectangleFrameDictionary[time] = rect;
      if(!times.includes(time)) times.push(time);
      times.sort((a, b) => a - b);
    }

    removeKeyframe(time){
      delete RectangleFrameDictionary[time];
      var index = times.indexOf(time);
      times.splice(index, 1);
    }

    translateKeyframe(x, y, time){
      RectangleFrameDictionary[time].x += x;
      RectangleFrameDictionary[time].y += y;
    }

    getRectAtTime(time){
      var index = 0;
      while(index < times.length && time > times[index]){
        index++;
      }
      if(index == 0) return RectangleFrameDictionary[times[index]];
      if(index == times.length - 1) return RectangleFrameDictionary[times[index]];
      var rect1 = RectangleFrameDictionary[times[index]];
      var rect2 = RectangleFrameDictionary[times[index + 1]];
      var timeDifference = times[index + 1] - times[index];
      return new Rectangle(
        (rect2.x - rect1.x) / timeDifference,
        (rect2.y - rect1.y) / timeDifference,
        (rect2.width - rect1.width) / timeDifference,
        (rect2.height - rect1.height) / timeDifference,
        rect1.color);
    }
}
