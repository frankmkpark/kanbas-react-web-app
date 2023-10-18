import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import BooleanVariables from "./BooleanVariables";
import IfElse from "./IfElse";
import TernaryOperatior from "./TernaryOperator";
import WorkingWithFunctions from "./WorkingWithFunctions";
import TemplateLiterals from "./TemplateLiterals";
import House from "./House";
import Spread from "./Spread";
import Destructing from "./Destructing";
import FunctionDestructing from "./FunctionDestructing";
import Add from "./Add";
import PathParameters from "./PathParameters";
import ConditionalOutputInline from "./ConditionalOutput/ConditionalOutputInline";
import ConditionalOutputIfElse from "./ConditionalOutput/ConditionalOutputIfElse";
import TodoList from "./todos/TodoList";

function JavaScript() {
   console.log('Hello World!');
   return(
      <div>
         <h1>JavaScript</h1>
         <VariablesAndConstants/>
         <VariableTypes/>
         <BooleanVariables/>
         <IfElse/>
         <TernaryOperatior/>
         <WorkingWithFunctions/>
         <TemplateLiterals/>
         <House />
         <Spread />
         <Destructing />
         <FunctionDestructing />
         <Add />
         <PathParameters />
         <ConditionalOutputIfElse />
         <ConditionalOutputInline />
         <TodoList />
      </div>
   );
}
export default JavaScript