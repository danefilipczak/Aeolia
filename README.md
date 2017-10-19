# IN PROGRESS

# methods 
### `.play(value, when)`

Plays a note, the timbre of which is determed by the current `switch` setting.

- `value` is a midi note number, which should be within the range of the instrument.

### `.stop()`

Stops a currently sustaining note. (see: `.sustain()`)

### `.pan(value, when)`



- `value` is a number between -1 (full left) and 1 (full right)

### `.gain(value, when)`

- `value` is a midi note number within the range of the instrument.

### `.switch(value)`

Changes the tibre of the instrument. 

- `value` is an integer, consult the table above for the timbres available to different instruments.

### `.transpose(value)`

### `.sustain(boolean)`

Determines whether sustained notes should loop or not. Only applicable to the sustain and crescendo/decrecendo timbres.