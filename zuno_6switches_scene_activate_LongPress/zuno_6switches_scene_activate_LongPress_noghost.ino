/*
 * That is a Simple Sensor BInary example
 * It watches over the built in button state
 * And sends report to the controller if button's state changes
 */

BYTE myPins[6] = {9, 10, 11, 12, 13, 14};
//BYTE myPins[6] = {18, 10, 11, 12, 13, 14};

long buttonTimer = 0;
long PressTime = 100;
long longPressTime = 1000;

// variable to store current button state
int lastButtonState [6];
int lastButtonState_long [6];

// next macro sets up the Z-Uno channels
// in this example we set up 1 sensor binary channel
// you can read more on http://z-uno.z-wave.me/Reference/ZUNO_SENSOR_BINARY/
//ZUNO_SETUP_CHANNELS(ZUNO_SENSOR_BINARY(ZUNO_SENSOR_BINARY_TYPE_GENERAL_PURPOSE, getter));
ZUNO_SETUP_CHANNELS(ZUNO_SENSOR_BINARY(ZUNO_SENSOR_BINARY_TYPE_GENERAL_PURPOSE, getter1),
ZUNO_SENSOR_BINARY(ZUNO_SENSOR_BINARY_TYPE_GENERAL_PURPOSE, getter2),
ZUNO_SENSOR_BINARY(ZUNO_SENSOR_BINARY_TYPE_GENERAL_PURPOSE, getter3),
ZUNO_SENSOR_BINARY(ZUNO_SENSOR_BINARY_TYPE_GENERAL_PURPOSE, getter4),
ZUNO_SENSOR_BINARY(ZUNO_SENSOR_BINARY_TYPE_GENERAL_PURPOSE, getter5),
ZUNO_SENSOR_BINARY(ZUNO_SENSOR_BINARY_TYPE_GENERAL_PURPOSE, getter6)
);
//Setup SceneId & Associations Group
ZUNO_SETUP_ASSOCIATIONS(ZUNO_ASSOCIATION_GROUP_SCENE_CONTROL);

void setup() {
 Serial.begin();
 for (byte i=0;i<6;i++)
 {
    //pinMode(myPins[i],INPUT_PULLUP);
    pinMode(myPins[i],INPUT);
    lastButtonState[i]=1;
    lastButtonState_long[i]=1;
 }
}

// button states 0 = pressed (due to pull-up resistor
//               1 = not pressed

void loop() {

  for (byte i=0;i<6;i++)
  {
    byte currentButtonState= digitalRead(myPins[i]);
    
   if (currentButtonState == 0) // pressed
   {
      if (lastButtonState[i] == 1) // was not pressed in last pass / loop
      { 
        lastButtonState[i] = currentButtonState;
        buttonTimer = millis();
      }
      if ((millis()- buttonTimer > longPressTime) && lastButtonState_long[i] == 1)
      {
        lastButtonState_long[i] = 0;
        zunoSendToGroupScene(CTRL_GROUP_1, i+1+6); // 0-based count, scenes start at 1, long press at 7
        Serial.print("Button ");
        Serial.print(i);
        Serial.println(" long press detected, scene event sent ");
      }
  }
  else // not pressed
  {
     if (lastButtonState[i] == 0) // was pressed, now released
     {
       if (lastButtonState_long[i] == 0) // was long-pressed
       {
          lastButtonState_long[i] = 1;
          lastButtonState[i] = 1;
          // no need to send report, already done when long pressing was first detected  
       }
       else // was not long pressed
       {
          // attempt to remove ghost presses
          if (millis()- buttonTimer > PressTime) 
          {  
            lastButtonState[i] = 1;
            zunoSendToGroupScene(CTRL_GROUP_1, i+1); // 0-based count, scenes start at 1
            Serial.print("Button ");
            Serial.print(i);
            Serial.println(" regular press detected, scene event sent");
            Serial.print(currentButtonState);
          }
       }
     }
  }
 }
}

// this function runs only once the controller asks
byte getter1(void) {
  return lastButtonState [0];
}
byte getter2(void) {
  return lastButtonState [1];
}
byte getter3(void) {
  return lastButtonState [2];
}
byte getter4(void) {
  return lastButtonState [3];
}
byte getter5(void) {
  return lastButtonState [4];
}
byte getter6(void) {
  return lastButtonState [5];
}
