/**
* Calculator written by Adam Schaeffer
* http://technologyordie.com
*/
const xapi = require('xapi');

var formula ="";

function error_handle(error){
  console.log('Error',error);
}

//write the calulator screen with currnet data or solution
function write_screen(data){
  xapi.command("UserInterface Extensions Widget SetValue", { WidgetId: "display", Value: data}).catch(error_handle); 
}

// Unset the button's blue background when its press is released
function clear_button(event) {
   xapi.command('UserInterface Extensions Widget UnsetValue', {WidgetId: event.WidgetId}).catch(error_handle);
}

function solve(){
  //formula = eval(formula);
  formula = "answer";
  
}



function clear_screen() {
  //xapi.command('UserInterface Extensions Widget UnsetValue', {WidgetId: "display"}).catch(error_handle);
  formula = "";
  write_screen("");
  //console.log("clear");
}

//builds the formula and outputs it as text to display
function formula_builder(event){
  formula = formula + event.Value;
  console.log(formula);
  xapi.command("UserInterface Extensions Widget SetValue", { WidgetId: "display", Value: formula}).catch(error_handle);
}



//listen for events from the calculator widget
xapi.event.on('UserInterface Extensions Widget Action', (event) => {
    //console.log(event);
    
  if (event.Type === "pressed" && event.Value === "="){
    //solve
  }
    
  if(event.Type === 'pressed'){
    switch(event.Value) {
    case "C":
      clear_screen();
      break;
      case "=":
        solve();
        break;
      case "()":
        //parenz logic
        break;
      default:
        formula_builder(event);
        //code block
      } 
    }
    
  
    if (event.Type === 'released'){
      clear_button(event);
    }
    
  
});
