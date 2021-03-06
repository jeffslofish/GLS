import { CaseStyle } from "../Languages/Casing/CaseStyle";
import { LineResults } from "../LineResults";
import { CommandNames } from "../Names/CommandNames";
import { KeywordNames } from "../Names/KeywordNames";
import { Command } from "./Command";
import { CommandMetadata } from "./Metadata/CommandMetadata";
import { KeywordParameter } from "./Metadata/Parameters/KeywordParameter";
import { SingleParameter } from "./Metadata/Parameters/SingleParameter";

/**
 * Declares a member variable.
 */
export class MemberVariableDeclareCommand extends Command {
    /**
     * Metadata on the command.
     */
    private static metadata: CommandMetadata = new CommandMetadata(CommandNames.MemberVariableDeclare)
        .withDescription("Declares a member variable")
        .withParameters([
            new KeywordParameter(KeywordNames.Privacies, "The privacy of the member variable.", true),
            new SingleParameter("name", "The name of the member variable.", true),
            new SingleParameter("type", "The type of the variable.", true),
        ]);

    /**
     * @returns Metadata on the command.
     */
    public getMetadata(): CommandMetadata {
        return MemberVariableDeclareCommand.metadata;
    }

    /**
     * Renders the command for a language with the given parameters.
     *
     * @param parameters   The command's name, followed by any parameters.
     * @returns Line(s) of code in the language.
     */
    public render(parameters: string[]): LineResults {
        if (this.language.syntax.classes.members.variables.skipMemberVariables) {
            return LineResults.newSingleLine("\0");
        }

        let output = "";
        const privacy: string = parameters[1];
        let variableName: string = parameters[2];
        const type: string = parameters[3];
        let casingStyle: CaseStyle;

        if (privacy === KeywordNames.Protected) {
            output += this.language.syntax.classes.members.variables.protected;
            output += this.language.syntax.classes.members.variables.protectedPrefix;
            casingStyle = this.language.syntax.classes.members.variables.protectedCase;
        } else if (privacy === KeywordNames.Private) {
            output += this.language.syntax.classes.members.variables.private;
            output += this.language.syntax.classes.members.variables.privatePrefix;
            casingStyle = this.language.syntax.classes.members.variables.privateCase;
        } else {
            output += this.language.syntax.classes.members.variables.public;
            output += this.language.syntax.classes.members.variables.publicPrefix;
            casingStyle = this.language.syntax.classes.members.variables.publicCase;
        }

        variableName = this.context.convertStringToCase(variableName, casingStyle);

        const inlineParameters = [CommandNames.VariableInline, variableName, type];
        const variableLine = this.context.convertParsed(inlineParameters);
        const variableText = variableLine.commandResults[0].text;

        if (variableText === "\0") {
            output += variableName;
        } else {
            output += variableText;
        }

        return LineResults.newSingleLine(output)
            .withAddSemicolon(true)
            .withImports(variableLine.addedImports);
    }
}
