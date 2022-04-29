import {
  KotlinJumpExpression,
  KotlinJumpExpressionBreak,
  KotlinJumpExpressionContinue,
  KotlinJumpExpressionReturn,
  KotlinJumpExpressionThrow,
  KotlinPrimaryExpressionJumpExpression,
  KotlinStatement,
  KotlinStatementExpression
} from "../../../syntax/kotlin";
import {SwiftKotlinConvertTable} from "../swift-converter";
import {SwiftControlTransferStatement} from "../../../syntax/swift";
import {createKotlinExpression} from "../expression/primary-expression";

export function convert_controlTransferStatement_statement(
  table: SwiftKotlinConvertTable,
  input: SwiftControlTransferStatement,
): KotlinStatement {
  const jumpExpression = table['control-transfer-statement__jumpExpression'](table, input);
  const primaryExpression = <KotlinPrimaryExpressionJumpExpression>{
    type: 'jumpExpression',
    value: jumpExpression,
  };
  const expression = createKotlinExpression(primaryExpression);
  return <KotlinStatement>{
    value: <KotlinStatementExpression>{
      type: "expression",
      value: expression,
    }
  };
}

export function convert_controlTransferStatement_jumpExpression(
  table: SwiftKotlinConvertTable,
  input: SwiftControlTransferStatement,
): KotlinJumpExpression {
  switch (input.type) {
    case "return":
      return <KotlinJumpExpressionReturn>{
        type: 'return',
        label: null,
        expression: input.expression !== null ? table['expression'](table, input.expression) : null,
      }
    case "throw":
      return <KotlinJumpExpressionThrow>{
        type: 'throw',
        expression: input.expression !== null ? table['expression'](table, input.expression) : null,
      }
    case "continue":
      return <KotlinJumpExpressionContinue>{
        type: 'continue',
        label: input.label,
      }
    case "break":
      return <KotlinJumpExpressionBreak>{
        type: 'break',
        label: input.label,
      }
    case "fallthrough":
      throw Error('Cannot handle fallthrough')
  }
}
